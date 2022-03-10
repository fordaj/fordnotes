[Back](index.md)

# Exercise 002

- Toggle 3 LEDs of the STM32F446 Nucleo board with the duration as shown in the below graph

    - LED_GREEN: Task 1 turns on LED at 1kms, turns off after another 1kms

    - LED_ORANGE: Task 2 at 800ms

    - LED_RED: Task 3 at 400ms

- Create 3 FreeRTOS tasks of the same priority to handle 3 different LEDs

- This can be implemented as bare metal code:

    ```cpp
    int main(void){
        while(1){
            LED_Toggle(LED1)
            LED_Toggle(LED2)
            LED_Toggle(LED3)
            Delay(400);
            LED_Toggle(LED3);
            Delay(400);
            ...
        }
    }
    ```

    - However, this approach has drawbacks:

        - Handling of other useful work is tedious

        - Complex logic (alignment of delay intervals)

        - Uses blocking delay (nothing else can run during delay statements)

        - Consumes a lot more power (processor is always engaged)

    - Better approach:

        ```cpp
        void timer_interrupt_handler(TIM_HandleTypeDef *htim){
            
            static int led1_ctrl, led2_ctrl, led3_ctrl;
            
            led1_ctrl++;
            led2_ctrl++;
            led3_ctrl++;

            if (led1_ctrl == 10){
                LED_Toggle(LED1_PIN);
                led1_ctrl=0;
            }
            if (led2_ctrl == 10){
                LED_Toggle(LED2_PIN);
                led2_ctrl=0;
            }
            if (led3_ctrl == 10){
                LED_Toggle(LED3_PIN);
                led3_ctrl=0;
            }
        }
        ```

        - Processor engages once every 100ms

        - Simpler design

        - Downside: Work is done in handler mode (privileged access level)

- FreeRTOS implementation:

    - Runs in thread-mode of the processor (CPU time sharing is achieved by the scheduler)

    - Task management is required (provided by RTOS kernel)

    - Using priority among tasks can achieve prioritized task management

        - Example: You want to integrate a new temperature monitoring task. Now you can prioritize it above or below the LED tasks easily.
    
    - Low power (CPU is not always engaged)


# Exercise 2 Implementation

1. Create a new project

    ```
    File > New > STM32 Project > Board Selector > [Search for board] > [Star board] > Next > Project Name: 002LED_Tasks > Next > Finish > 
    ```

2. Instead of using a `ThirdParty` folder per-project, we can use a `common` folder that projects share

    ```
    [Open File Explorer] > [Navigate to RTOS_workspace] > [create folder "common"] > [Copy "ThirdParty" into "common"] > [Open IDE] > [drag'n'drop "common" into "002LED_Tasks"] > [select "Link to files and folders"] > Ok
    ```

3. Fix include paths

    ```
    [Right-click "002LED_Tasks] > Properties... > C/C++ General > Paths and Symbols > Add...

    common/ThirdParty/FreeRTOS/include
    common/ThirdParty/FreeRTOS/portable/GCC/ARM_CM4F
    common/ThirdParty/SEGGER/Config
    common/ThirdParty/SEGGER/OS
    common/ThirdParty/SEGGER/SEGGER

    Now add assembly paths:

    common/ThirdParty/SEGGER/Config
    common/ThirdParty/SEGGER/SEGGER

    ```
    - Now, GNU C and Assembly paths can be exported to the workspace (`includepathsettings.xml`)

        - Remember to click "Apply" before "Export settings"