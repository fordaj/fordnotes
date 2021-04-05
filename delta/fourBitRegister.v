module fourBitRegister(D, rst, clk, E , Q);
        input [3:0] D;
        input rst, clk, E;
        output reg [3:0] Q;
        
        always @(negedge rst, posedge clk)
            if (!rst)
                Q <= 0;
            else if (E)
                Q <= D;
endmodule
