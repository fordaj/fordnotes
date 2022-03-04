[Back](index.md)

# What Is Real Time Application (RTA)?
- Real-time computing is not "fast computing", it is *predictable computing*
- Real-time deals with *guarantees*, not *raw speed*
- Depends on correctness of computation as well as time of result production
- RTAs guarantee expected response time
- RTAs are not fast executing - they are time deterministic
- If the RTA response time varies in the scope of milliseconds or seconds, it can be considered a *soft RTA*.

# What is a Real Time Operating System (RTOS)?
- An RTOS is an operating system specifically designed to run applications with precise timing and a high degree of reliability.
- A GPOS is a General Purpose OS like Windows or Linux.
- The difference between an OS and an RTOS is the time limit for critical operations
- Operations include:
    - Interrupt and exception handling
    - Critical section handling
    - Scheduling mechanism, etc.
- Scheduling in RTOSes typically favors high priority tasks
- FreeRTOS has two flavors: OpenRTOS and SafeRTOS

# RTOS vs GPOS: Task Scheduling
- GPOS scheduling is done to optimize for high throughput (more tasks accomplished > high priority)
- RTOS scheduling is done to maintain priority (high to low)
- This is done in an RTOS to favor predictability

# RTOS vs. GPOS: Latency
- **Latency**: Time elapsed between a stimulus and the response to it
- **Task switching latency**: Allowed time between event trigger and event accomplishment
- **Interrupt latency**: Time between interrupt trigger and ISR start
- **Scheduling latency**: Time between CPU departure of task/ISR and CPU arrival of new task/ISR
    - RTOSes seek to minimize scheduling latency
- **Context switching**: Saving old task context and loading new task context

# RTOS vs. GPOS: Priority Inversion
- **Priority inversion**: When a lower priority tasks "holds up" the CPU, preventing the execution of a higher priority task.
- In GPOS, priority inversion is not an issue and can occur
- In RTOSes, priority inversion is a major issue, and the RTOS must do "on the fly path creation" (rescheduling, reprioritizing) to bypass the low priority task.
- RTOSes have the following features that GPOSes don't:
    - Priority based preemptive scheduling mechanism (favors high priority tasks)
    - No (or very short) critical sections that disable preemption
    - Priority inversion avoidance
    - Bounded interrupt latency
    - Bounded scheduling latency, etc.

# What is Multitasking?
- **Task**: A piece of code that can execute on a CPU.
- **Scheduler**: Assigns times for task execution
- A scheduler is needed whenever the number of tasks exceeds the number of cores on a CPU