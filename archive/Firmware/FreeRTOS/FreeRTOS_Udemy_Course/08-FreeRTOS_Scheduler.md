[Back](index.md)

# Free RTOS Scheduler

- Some is implemented in `task.c`, some is in chipset specific `core.c`

- `vPortSVCHandler()`

    - Used to launch the first task

    - Triggered by SVC instruction

- `xPortPendSVHandler()`

    - Achieves context switching between tasks

    - Triggered by pending the `PendSV` System exception of ARM

- `xPortSysTickHandler()`

    - Implements the RTOS tick management

    - Triggered periodically by Systick timer of ARM cortex Mx processor

# Understanding implementation of `xPortStartScheduler()` of `port.c`

- Implemented in `task.c` of FreeRTOS kernel and used to start the RTOS scheduler

- After calling this function, the scheduler code is initialized and all architecture specific interrupts will be activated

- Also creates the idle and Timer daemon task

- Function calls `xPortStartScheduler()` to do the Architecture specific initializations

- `xPortStartScheduler()`

    - Configures the SysTick timer to issue interrupts at the desired rate (as configured in the config item `configTICK_RATE_HZ` in `FreeRTOSConfig.h`
    
    - Configures the priority for PendSV and Systick interrupts
    
    - Starts the first task by executing the SVC instruction)