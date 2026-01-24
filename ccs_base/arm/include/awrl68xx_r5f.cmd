
-heap 2048
--retain="*(.intvecs)"
--entry_point=_c_int00


/* SPECIFY THE SYSTEM MEMORY MAP */
MEMORY
{
    P_VEC     : org = 0x00000000   len = 0x00000020  /* PROGRAM MEMORY (ROM) TCMA   */
    P_STARTUP : org = 0x00000020   len = 0x00000800  /* PROGRAM MEMORY (ROM) TCMA   */
    P_MEM     : org = 0x00000820   len = 0x000077E0  /* PROGRAM MEMORY (ROM) TCMA   */
    D_MEM     : org = 0x08000000   len = 0x00004000 //org = 0x00002824   len = 0x00002000 /* DATA MEMORY (RAM)    TCMB0-1*/
    L2_MEM    : org = 0x80800000   len = 0x00020000
    L3_MEM    : org = 0x88000000   len = 0x00020000
}

/* SPECIFY THE SECTIONS ALLOCATION INTO MEMORY */
SECTIONS
{
    .intvecs 	: {*(.intvecs)} > P_VEC  ALIGN(8)              /* INTERRUPT VECTORS                 */
    .startup 	: {} > P_STARTUP ALIGN(8)
    .init_array : {} > P_STARTUP ALIGN(8)
    .vtable 	: {}  > P_STARTUP ALIGN(8)
	.tcmcode 	: {} > P_STARTUP ALIGN(8)

	.code : { *(.text) } > P_MEM ALIGN(8)
	.const {} > P_MEM            ALIGN(8)
	.cinit {} > P_MEM            ALIGN(8)
	.pinit {} > P_MEM            ALIGN(8)

    .bss     : {} > D_MEM              /* GLOBAL & STATIC VARS              */
    .data    : {} > D_MEM              /* GLOBAL & STATIC VARS with C-init  */
    .sysmem  : {} > D_MEM              /* DYNAMIC MEMORY ALLOCATION AREA    */
    .stack   :                         /* SOFTWARE SYSTEM STACK             */
     {
      . += 0x400;    _SP_USERMODE   = .;
      . += 0x400;    _SP_SVCMODE    = .;
      . += 0x400;    _SP_IRQMODE    = .;
      . += 0x400;    _SP_FIQMODE    = .;
      . += 0x400;    _SP_UDEFMODE   = .;
      . += 0x400;    _SP_ABTMODE    = .;
     } > D_MEM (HIGH) ALIGN(32)

     .l3code	: {} > L3_MEM ALIGN(8)
     .l2code	: {} > L2_MEM ALIGN(8)

}

