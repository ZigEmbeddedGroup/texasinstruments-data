--stack 0x2000
--heap  0xA000
//--heap_size=0x2000

MEMORY {
        L1PRAM       :		o = 0x00E00000, l = 0x8000
        L1DRAM       :	  	o = 0x00F00000, l = 0x8000
	    L2SRAM		 :		o = 0x00800000, l = 0x20000 // dsp_l2--0x00800000 dss_l2--0x80800000
        L3SRAM       :   	o = 0x88000000, l = 0x20000
}

SECTIONS
{

    GROUP
    {
        .vects:      {. = align(8);}
		.l2_int:     {. = align(8);}
        .switch: 	 {. = align(8);}
        .const:      {. += 0x100;}
        .text:       {. = align(4);}
        .int_code:   {. = align(4);}
        .lib_code:   {. = align(4);}
        .sysinit:    {. = align(4);}
        .syssaram:   {. = align(4);}

        .pinit:	     {. = align(4);}
        .data16:	 {. = align(2);}
        .data:       {. = align(2);}
        .bss:	     {. = align(8);}
        .far:	     {. = align(8);}
		.sysmem:     {. = align(16);}
		gem_l2ram_usr_init:   {. = align(8);}
		gem_l2ram_usr_uninit: {. = align(8);}
        .stack:	     {. = align(8);}
        .sysstack:   {. = align(8);}

                    /* EABI sections */
    .binit         {. = align(4);}
    .init_array    {. = align(4);}
    .neardata      {. = align(4);}
    .fardata       {. = align(4);}
    .rodata        {. = align(4);}
    .c6xabi.exidx  {. = align(4);}
    .c6xabi.extab  {. = align(4);}

    .cinit:	     {. = align(4);}

    }	> L2SRAM  //L2SRAM

   GROUP
   {
       .text0:       {. = align(4);}
       .umap0:      {. = align(8);}
       .l2data:     {. = align(8);}

   }	> L2SRAM  //L2SRAM

   GROUP
   {
    .l3data: {. = align(8);}
    } > L3SRAM

       GROUP
   {
    .l1data: {. = align(8);}
    } > L1DRAM

 }
