/*****************************************************************************

  Copyright (C) 2019 Texas Instruments Incorporated - http://www.ti.com/

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:

   Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

   Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the
   distribution.

   Neither the name of Texas Instruments Incorporated nor the names of
   its contributors may be used to endorse or promote products derived
   from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*****************************************************************************/
--retain=".resetVecs"
-stack 0x1600
-heap 0x6000

MEMORY
{
    INT_VEC               (RWX) : origin = 0x00000000, length = 0x000001d0
    TFW_IF_HEAD           (RWX) : origin = 0x000001d0, length = 0x00000030
    TFW_IF_DATA           (RWX) : origin = 0x00000200, length = 0x00000300
    CRAM                 (RWX) : origin = 0x00000500, length = 0x00007B00
    FLASH                (RWX) : origin = 0x10000000, length = 0x00800000
    SLAVES_API          (RW)  : origin = 0x40602000, length = 0x0000001F
    DRAM                 (RWX) : origin = 0x28000000, length = 0x00010000
    MEM_POOL            (RW)  : origin = 0x28034000, length = 0x00004000
    DB_MEM              (RW)  : origin = 0x40A80000, length = 0x0000FFFF
    M3CODE              (RWX) : origin = 0x40700000, length = 0x00048000
    PHY_CTX              (RW)  : origin = 0x40900000, length = 0x00010000
    PHY_SCR              (RW)  : origin = 0x40910000, length = 0x00004800
    CPERAM              (RWX) : origin = 0x40C00000, length = 0x00010000      /* 64k PROGRAM MEMORY (CPERAM)    */
    MCERAM              (RWX) : origin = 0x40C80000, length = 0x00001000      /* 4k PROGRAM MEMORY (MCERAM)      */
    RFERAM              (RWX) : origin = 0x40CA0000, length = 0x00001000      /* 4k PROGRAM MEMORY (RFERAM)      */
    MDMRAM              (RWX) : origin = 0x40CC0000, length = 0x00000100      /* 256Byte PROGRAM MEMORY (MDMRAM) */
}

SECTIONS
{
    .resetVecs		:	> INT_VEC
    .ctx_ull		:   > PHY_CTX
    .scr_ull		:	> PHY_SCR
    .cperam			:   > CPERAM										 /* CPE CODE                          */
    .rferam 	    :   > RFERAM									     /* RFE CODE                          */
    .mceram 	    :   > MCERAM									     /* MCE CODE                          */
    .mdmram 	    :   > MDMRAM									     /* MDM CODE                          */
    .db_mem			:   > DB_MEM
    .cram           :   > CRAM  PALIGN(4)
    /**** EladZ (19/10): Allocate init functions at CRAM ***/
    //.text.resetISR  :   > CRAM  PALIGN(4)
    .text.main             :   > CRAM  PALIGN(4)
    .text.__TI*            :   > CRAM  PALIGN(4)
    .text:_c_int*          :   > CRAM  PALIGN(4)
    .text._system_pre_init :   > CRAM  PALIGN(4)
    /*******************************************************/
    .text           :   > FLASH PALIGN(4)
    .const          :   > FLASH PALIGN(4)
    .pinit 			:	> FLASH PALIGN(4)
    .rodata			:   > FLASH PALIGN(4)
    .data           :   > DRAM
    .cinit          :   > CRAM  PALIGN(4)
    .bss            :   > DRAM
    .cio            :   > DRAM
    .sysmem			:   > DRAM
    .slave_if       :   > SLAVES_API
    .ARM.exidx      :   > DRAM
    .init_array     :   > DRAM
    .binit          :   > DRAM
    .vtable         :   > DRAM
    .args           :   > DRAM
    .stack 			:   > DRAM (HIGH)
}
