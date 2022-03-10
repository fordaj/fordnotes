[Back](index.md)


# Idle and Timer Services Task

- Idle task is created automatically when the RTOS scheduler is started to ensure there is always at least one task that is able to run

- It is created at the lowest possible priority to ensure it does not use any CPU time if there are higher priority tasks in the ready state

- Responsible for freeing memory after they are deleted (cleanup task)

- Applications can be given hook functions in the idle task to send to the CPU to low power mode when no useful tasks are executing

# Timer Services Task

- Aka **timer daemon** task

- Deals with software timers

- Task is created automatically when the scheduler is started and if `configUSE_TIMERS` is set to 1 in `FreeRTOSConfig.h`

- RTOS exclusively uses this daemon to manage FreeRTOS software timers

- If you don't use SW timers in your FreeRTOS application, then you need to use the timer daemon task (simply set `configUSE_TIMERS` to 0)

- All software timer callback functions execute in the context of the timer daemon task