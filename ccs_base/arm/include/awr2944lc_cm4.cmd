/*
 * Copyright (c) 2021, Texas Instruments Incorporated
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * *  Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * *  Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * *  Neither the name of Texas Instruments Incorporated nor the names of
 *    its contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
 
/* make sure below retain is there in your linker command file, it keeps the vector table in the final binary */
--retain="*(.vectors)"
/* This is the stack that is used by code running within main()
 * In case of NORTOS,
 * - This means all the code outside of ISR uses this stack
 * In case of FreeRTOS
 * - This means all the code until vTaskStartScheduler() is called in main()
 *   uses this stack.
 * - After vTaskStartScheduler() each task created in FreeRTOS has its own stack
 */
--stack_size=4096
/* This is the heap size for malloc() API in NORTOS and FreeRTOS
 * This is also the heap used by pvPortMalloc in FreeRTOS
 */
--heap_size=2048


SECTIONS
{
    /* This has the M4 entry point and vector table, this MUST be at 0x0 */
    .vectors:{} palign(8) > M4_VECS
    .text:   {} palign(8) > M4_RAM     /* This is where code resides */

    .bss:    {} palign(8) > M4_RAM | DSS_L3_BSS   /* This is where uninitialized globals go */
    RUN_START(__BSS_START)
    RUN_END(__BSS_END)

    .data:   {} palign(8) > M4_RAM | DSS_L3_BSS  /* This is where initialized globals and static go */
    .rodata: {} palign(8) > M4_RAM   /* This is where const's go */
    .sysmem: {} palign(8) > M4_RAM   /* This is where the malloc heap goes */
    .stack:  {} palign(8) > M4_RAM | MSS_L2 /* This is where the main() stack goes */
    .customCode: {} palign(8) > DSS_L3_REUSABLE  /* This is where one time config code goes */

    /* Sections needed for C++ projects */
    .ARM.exidx:     {} palign(8) > M4_RAM  /* Needed for C++ exception handling */
    .init_array:    {} palign(8) > M4_RAM  /* Contains function pointers called before main */
    .fini_array:    {} palign(8) > M4_RAM  /* Contains function pointers called after main */

    /* this is used only when IPC RPMessage is enabled, else this is not used */
    .bss.ipc_vring_mem   (NOLOAD) : {} > RTOS_NORTOS_IPC_SHM_MEM
}

MEMORY
{
    M4_VECS : ORIGIN = 0x00000000 , LENGTH = 0x00000200
    M4_RAM  : ORIGIN = 0x00000200 , LENGTH = 0x0000FE00
    MSS_L2  : ORIGIN = 0xC02C8000 , LENGTH = 0x00020000
    DSS_L3  : ORIGIN = 0x88000000 , LENGTH = 0x00198800
    DSS_L3_REUSABLE: ORIGIN = 0x88198800 , LENGTH = 0x20000
    DSS_L3_BSS : ORIGIN = 0x881B8800, LENGTH = 0x00007800

    /* 1st 512 B of DSS mailbox memory and MSS mailbox memory is used for IPC with R4 and should not be used by application */
    /* MSS mailbox memory is used as shared memory, we dont use bottom 32*12 bytes, since its used as SW queue by ipc_notify */
    RTOS_NORTOS_IPC_SHM_MEM : ORIGIN = 0xC5000200, LENGTH = 0x1C80

}
