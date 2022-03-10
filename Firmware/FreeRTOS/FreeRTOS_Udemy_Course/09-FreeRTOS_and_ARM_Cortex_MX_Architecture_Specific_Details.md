[Back](index.md)

# FreeRTOS Kernel Interrupts

- SVC Interrupt

    - Triggered by executing the SVC instruction

    - When executed, the SVC handler runs, which is used to launch the first task

- PendSV Interrupt

    - When executed, PendSVHandler runs

    - Carries out context switching between tasks

    - Default priority as low as possible (if `NVIC_PRIO_BITS` = 4, then `0xF0` is the lowest possible priority)

- SysTick Interrupt

    - Occurs due to timing of SysTick timer hardware of ARM Cortex MX processor

# RTOS Ticking

- "Heartbeat" of RTOS kernel

- Keeps track of time elapsed

- Global `xTickCount` is incremented by 1 whenever a tick interrupt occurs

- Implemented using the SysTick timer of the ARM Cortex MX processor

- Occurs at a rate of `configTICK_RATE_HZ` in `FreeRTOSConfig.h`

- Example: `vTaskDelay(100);` is used to delay a task for 100ms. How does it keep track of how long it has been?

    - It watches the global tick count

- Used for context switching to the next potential task

    1. Tick ISR runs

    2. All ready state tasks are scanned

    3. Next potential task to run is determined

    4. If found, context switch is triggered by pending the `PendSV` interrupt

    5. `PendSV` handler takes care of switching out of the old task and into the new one


# Who Configures the RTOS Tick Timer ?

- `xPortStartScheduler()`

    - Initializes the `Systick` interrupt at lowest priority interrupt possible

    - Loads the rate value to `Systick` timer

    - Enables the `Systick` timer interrupt and starts the timer

- `configSYSTICK_CLOCK_HZ` = `configCPU_CLK_HZ`

- Example: `configCPU_CLK_HZ` = `25MHz` and `configTICK_RATE_HZ` = `1kHz`

    - `portSYSTICK_NVIC_LOAD_REG` = (25MHz/1kHz) = 25k

    - 25k - 1 = 24,999

    - Therefore, the `SysTick` timer counts down from 24,999 to 0, at which point the `SysTick` interrupt occurs, and the `SysTick` timer restarts