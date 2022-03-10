[Back](index.md)

# Introduction to Context Switching

- Process of switching out of one task and into another on the CPU

- In RTOS, taken care of by the scheduler

- In FreeRTOS, taken care of by the PendSV Handler in `port.c`

- If the scheduler is pre-emptive, then every RTOS tick interrupt offers the opportunity to switch from the current task to one with a higher priority in the ready list

- Context switches can be manually triggered using `taskYIELD()`

- Context switching happens immediately whenever a new task unblocks and its priority is higher than the currently running task

# Context Switching: Understanding "State" of a Task

- When a task executes on the Processor it utilizes:

    - Processor core registers

    - If a task wants to do its own push and pop operations (during a function call), it uses its dedicated stack memory

- The state of a task: The contents of the processor core registers + stack contents

- Mx Core Registers:

    - 13 General Purpose registers

    - Stack Pointers

        - PSP: Process stack pointer

        - MSP: Main stack pointer

- Tasks use PSP (pushes/pops), private stack tracked by PSP

- Kernel uses MSP (ISRs use MSP)

- PSR: Program status register

- Heap memory: Configured by `configTOTAL_HEAP_SIZE`

- `xTaskCreate()`

    - `pxTopOfStack`

        - TCB will be created in RAM (Heap section) and initialized

        - Dedicated stack memory will be created and initialized for a task

        - Tracked using PSP Register

        - Task will be placed under "Ready" list for scheduler to pick

# Context Switching: Task Switching-Out Procedure with Animation

- Switching Out

    1. Processor core registers R0, R1, R2, R3, R12, LR, PC, `xPSR` (Stack frame) are saved on the task's private stack automatically by the processor `SysTick` interrupt entry sequence

    2. If Context switch is required, then `SysTick` timer will pend the `PendSV` exception, at which point the `PendSV` handler runs

    3. Processor core registers R4-R11, R14 have to be saved manually on the task's private stack memory (saving the context)

    4. Save the new top of stack value (PSP) into the first member of the TCB

    5. Select the next potential task to execute on the CPU (taken care of by `vTaskSwitchContext()` in `tasks.c`)


# Context Switching: Understanding `pendSV` Handler Code 

- Switching In

    1. Get the address of the top of stack. Copy the value of `pxTopOfStack` into PSP register

    2. Pop all registers (R4-11, R14) "Restoring the context"

    3. Exception exit: Now PSP is pointing to the start address of the stack frame which will be automatically popped out due to exception exit