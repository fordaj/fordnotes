[Back](index.md)

# Creating new STM32 project
1. Create workspace folder
```
~/Workspace/RTOS_workspace
```
2. Launch CubeIDE, and select your workspace from the previous step
3. File > New > STM32 Project (This takes a bit)
4. Select your [board](Board.txt) by first clicking "Board Selector" and then searching for and selecting your board
5. Click "Next"
6. Name the project "FreeRTOS_Projects"
7. Leave all prompts as default and click "Next"
8. Ensure "Copy only the necessary library files" is selected, and click "Finish"
9. Click "No" on "Initialize all peripherals with their default Mode?"
10. Click "Yes" on "Open Perspective" (This opens the embedded device configuration tool)

# Adding FreeRTOS kernel source to project
- There is sometimes a configuration tool for specific MCU imports, but we will do a manual import
- **CMSIS**: Common Microcontroller Software Interface Standard
- CMSIS is not used in this course, but is a standard allowing for consistent device support across ARM Cortex M processor based devices
- CMSIS can map universal functions to all RTOS functions, etc.
1. In the IDE, create a new Source Folder to the project called `ThirdParty`
2. In File Explorer, navigate to `Third Party` and add `FreeRTOS`
3. From the unzipped FreeRTOS folder, copy the License folder and everything in the `Source` folder
4. In our new FreeRTOS folder, delete everything in `portable` except `gcc`, `MemMang`, and `readme.txt`
5. In `gcc`, delete everything except our processor, which is based on the `ARM_CM4F`, the cortex M4 floating point processor
6. In the CubeIDE, right-click the project and select "Refresh", at which point our new folders will appear in the project tree
7. Ensure that the `ThirdParty` folder is not excluded from build by right-clicking it, selecting "Properties", then "C/C++ Build", and "Exclude resource from build" should be unchecked
8. Exclude Core/Src/sysmem.c from the project
9. Delete all files from ThirdParty/FreeRTOS/portable/MemMang except `heap_4.c` (these are different heap management schemes documented in the FreeRTOS website)



# Include Path Settings

- In "Project Settings > C/C++ Build > Settings > Tool Settings > MCU GCC Compiler > Include paths", add the following Include paths:

```
ThirdParty/FreeRTOS/include
ThirdParty/FreeRTOS/portable/gcc/ARM_CM4F
```



# FreeRTOSConfig.h and other settings
- The `FreeRTOSConfig.h` file is not included with FreeRTOS
- It is supplied by the user, and documented [here](https://www.freertos.org/a00110.html)
- For our specific board, the config file can be copied from here:
```
FreeRTOS/Demo/CORTEX_M4F_STM32F407ZG-SK
```


## Error: Missing Include Paths

1. Place the `FreeRTOSConfig.h` file here:
```
ThirdParty/FreeRTOS
```
2. In the IDE, add it to the include path
3. The following error persists:
    ```c
    53 | #define configCPU_CLOCK_HZ    ( SystemCoreClock )
    ```
    Navigating to the `SystemCoreClock` declaration, we find that it is declared.
    Moving back to `FreeRTOSConfig.h` reveals the following macro:
    ```c
    /* Ensure stdint is only used by the compiler, and not the assembler. */
    #ifdef __ICCARM__
        #include <stdint.h>
        extern uint32_t SystemCoreClock;
    #endif
    ```
    Which can be changed to:
    ```c
    /* Ensure stdint is only used by the compiler, and not the assembler. */
    #ifdef defined(__ICCARM__) || defined(__GNUC__) || defined(__CC_ARM)
        #include <stdint.h>
        extern uint32_t SystemCoreClock;
    #endif
    ```


## Error: Duplicate Handler Definitions

4. The next error is due to duplicate definitions of a few handlers in the STM32 provided code and the FreeRTOS code. We want to use the FreeRTOS handlers, so open the `.ioc` file.
5. Navigate to Pinout & Configuration > System Core > NVIC > Code Generation
6. Uncheck the second column corresponding to the offending handlers
```
System service call via SWI instruct...
Pendable request for system service
Time base: System tick timer
```
7. `Ctrl-s` to save the `.ioc` file
8. Generate code by "yes"ing through the prompts


## Error: Undefined References

> Disable unnecessary config parameters.

1. `configUSE_TICK_HOOK` --> 0

2. `configUSE_MALLOC_FAILED_HOOK` --> 0

3. `configCHECK_FOR_STACK_OVERFLOW` --> 0

4. `configUSE_IDLE_HOOK` --> 0

# Time base selection for STM32 + FreeRTOS project

- FreeRTOS uses ARM Cortex Mx processor's internal systick timer as its time base (RTOS ticking)

- The STM32 Cube HAL layer also uses the systick timer as its time base source

- This creates a timebase source conflict

- Therefore, use the STM32 cube HAL layer timebase source instead of the systick timer (aka use any timer peripheral of the microcontroller)

1. Open `.ioc`

2. Navigate to:
```
Pinout & Configuration > System Core > SYS
```

3. Set the pink highlighted "System Wake-Up" field to use a non-systick timer (like TIM6)

4. Navigate:
```
NVIC > NVIC > Scroll the window wide enough to reveal "Priority Group" dropdown
```
5. From the dropdown, select "4 bits for pre-emption priority 0 bits for subpriority"