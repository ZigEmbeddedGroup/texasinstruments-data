/* ============================================================================ */
/* Copyright (c) 2020, Texas Instruments Incorporated                           */
/*  All rights reserved.                                                        */
/*                                                                              */
/*  Redistribution and use in source and binary forms, with or without          */
/*  modification, are permitted provided that the following conditions          */
/*  are met:                                                                    */
/*                                                                              */
/*  *  Redistributions of source code must retain the above copyright           */
/*     notice, this list of conditions and the following disclaimer.            */
/*                                                                              */
/*  *  Redistributions in binary form must reproduce the above copyright        */
/*     notice, this list of conditions and the following disclaimer in the      */
/*     documentation and/or other materials provided with the distribution.     */
/*                                                                              */
/*  *  Neither the name of Texas Instruments Incorporated nor the names of      */
/*     its contributors may be used to endorse or promote products derived      */
/*     from this software without specific prior written permission.            */
/*                                                                              */
/*  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" */
/*  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,       */
/*  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR      */
/*  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR            */
/*  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,       */
/*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,         */
/*  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; */
/*  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,    */
/*  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR     */
/*  OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,              */
/*  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.                          */
/* ============================================================================ */

/******************************************************************************/
/* lnk_rf430frl154h_rom.cmd - LINKER COMMAND FILE FOR LINKING RF430FRL154H_ROM PROGRAMS     */
/*                                                                            */
/*   Usage:  lnk430 <obj files...>    -o <out file> -m <map file> lnk.cmd     */
/*           cl430  <src files...> -z -o <out file> -m <map file> lnk.cmd     */
/*                                                                            */
/*----------------------------------------------------------------------------*/
/* These linker options are for command line linking only.  For IDE linking,  */
/* you should set your linker options in Project Properties                   */
/* -c                                               LINK USING C CONVENTIONS  */
/* -stack  0x0100                                   SOFTWARE STACK SIZE       */
/* -heap   0x0100                                   HEAP AREA SIZE            */
/*                                                                            */
/*----------------------------------------------------------------------------*/
/* Version: 1.213                                                             */
/*----------------------------------------------------------------------------*/

/****************************************************************************/
/* Specify the system memory map                                            */
/****************************************************************************/

MEMORY
{
    SFR                     : origin = 0x0000, length = 0x0010
    PERIPHERALS_8BIT        : origin = 0x0010, length = 0x00F0
    PERIPHERALS_16BIT       : origin = 0x0100, length = 0x0100
    RAM                     : origin = 0x1C00, length = 0x0200
    FRAM                    : origin = 0xF840, length = 0x0790
    JTAGSIGNATURE           : origin = 0xFFD0, length = 0x0004, fill = 0xFFFF
    BSLSIGNATURE            : origin = 0xFFD4, length = 0x0004, fill = 0xFFFF
    INT00                   : origin = 0xFFE0, length = 0x0002
    INT01                   : origin = 0xFFE2, length = 0x0002
    INT02                   : origin = 0xFFE4, length = 0x0002
    INT03                   : origin = 0xFFE6, length = 0x0002
    INT04                   : origin = 0xFFE8, length = 0x0002
    INT05                   : origin = 0xFFEA, length = 0x0002
    INT06                   : origin = 0xFFEC, length = 0x0002
    INT07                   : origin = 0xFFEE, length = 0x0002
    INT08                   : origin = 0xFFF0, length = 0x0002
    INT09                   : origin = 0xFFF2, length = 0x0002
    INT10                   : origin = 0xFFF4, length = 0x0002
    INT11                   : origin = 0xFFF6, length = 0x0002
    INT12                   : origin = 0xFFF8, length = 0x0002
    INT13                   : origin = 0xFFFA, length = 0x0002
    INT14                   : origin = 0xFFFC, length = 0x0002
    RESET                   : origin = 0xFFFE, length = 0x0002
}

/****************************************************************************/
/* Specify the sections allocation into memory                              */
/****************************************************************************/

SECTIONS
{
    GROUP(ALL_FRAM)
    {
       GROUP(READ_WRITE_MEMORY)
       {
          .TI.persistent : {}                /* For #pragma persistent            */
       }

       GROUP(READ_ONLY_MEMORY)
       {
          .cinit      : {}                   /* Initialization tables             */
          .pinit      : {}                   /* C++ constructor tables            */
          .binit      : {}                   /* Boot-time Initialization tables   */
          .init_array : {}                   /* C++ constructor tables            */
          .mspabi.exidx : {}                 /* C++ constructor tables            */
          .mspabi.extab : {}                 /* C++ constructor tables            */
          .const      : {}                   /* Constant data                     */
       }

       GROUP(EXECUTABLE_MEMORY)
       {
          .text       : {}                   /* Code                              */
       }
    } > FRAM

#ifdef __TI_COMPILER_VERSION__
  #if __TI_COMPILER_VERSION__ >= 15009000
    #ifndef __LARGE_CODE_MODEL__
    .TI.ramfunc : {} load=FRAM, run=RAM, table(BINIT)
    #else
    .TI.ramfunc : {} load=FRAM | FRAM2, run=RAM, table(BINIT)
    #endif
  #endif
#endif

    .jtagsignature : {} > JTAGSIGNATURE   /* JTAG Signature                    */
    .bslsignature  : {} > BSLSIGNATURE    /* BSL Signature                     */

    .bss        : {} > RAM                /* Global & static vars              */
    .data       : {} > RAM                /* Global & static vars              */
    .TI.noinit  : {} > RAM                /* For #pragma noinit                */
    .cio        : {} > RAM                /* C I/O buffer                      */
    .sysmem     : {} > RAM                /* Dynamic memory allocation area    */
    .stack      : {} > RAM (HIGH)         /* Software system stack             */


    /* MSP430 Interrupt vectors          */
    .int00       : {}               > INT00
    .int01       : {}               > INT01
    .int02       : {}               > INT02
    .int03       : {}               > INT03
    .int04       : {}               > INT04
    RFPMM        : { * ( .int05 ) } > INT05 type = VECT_INIT
    PORT1        : { * ( .int06 ) } > INT06 type = VECT_INIT
    .int07       : {}               > INT07
    USCI_B0      : { * ( .int08 ) } > INT08 type = VECT_INIT
    ISO          : { * ( .int09 ) } > INT09 type = VECT_INIT
    WDT          : { * ( .int10 ) } > INT10 type = VECT_INIT
    TIMER0_A1    : { * ( .int11 ) } > INT11 type = VECT_INIT
    TIMER0_A0    : { * ( .int12 ) } > INT12 type = VECT_INIT
    UNMI         : { * ( .int13 ) } > INT13 type = VECT_INIT
    SYSNMI       : { * ( .int14 ) } > INT14 type = VECT_INIT
    .reset       : {}               > RESET  /* MSP430 Reset vector         */
}

/****************************************************************************/
/* Include peripherals memory map                                           */
/****************************************************************************/

-l rf430frl154h_rom.cmd

