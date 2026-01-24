--entry_point="code_start"


/* Specify the system memory map */

MEMORY
{
    SRAM_LDAx : o=0x200E0000, l=0x20000
    SRAM_LPAx : o=0x20100000, l=0x10000
    SRAM_CPAx : o=0x20110000, l=0x10000

    FLASH_RP0 : o=0x10000000, l=0x80000
    FLASH_RP1 : o=0x10100000, l=0x80000
}



/* Specify the sections allocation into memory */

SECTIONS
{
    codestart     : {} > 0x20100000

    .text         : {} > SRAM_LPAx
    .TI.ramfunc   : {} > SRAM_LPAx
    .cinit        : {} > SRAM_LDAx
    .const        : {} > SRAM_LDAx
    .rodata       : {} > SRAM_LDAx
    .init_array   : {} > SRAM_LDAx

    .data         : {} > SRAM_LDAx
    .bss          : {} > SRAM_LDAx
    .stack        : {} > SRAM_LDAx
    .sysmem       : {} > SRAM_LDAx
    .cio          : {} > SRAM_LDAx

}