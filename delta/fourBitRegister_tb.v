module fourBitRegister_tb();
	reg rst, clk, E;
	reg [3:0] D;
	wire [3:0] Q;
 
	fourBitRegister #() DUT (
		.rst(rst),
		.clk(clk),
		.E(E),
		.D(D),
		.Q(Q)
  	);
 
  	initial begin
    					clk = 0; rst = 1; E = 0; D = 4'b1100;
		#500  @(posedge clk) E = 1;
		#10	  @(posedge clk) D = 4'b1100;
		#500  @(posedge clk) D = 4'b0001;
		#500  @(posedge clk) D = 4'b1110;
		#500  @(posedge clk) rst = 0;
		#500			$finish;
	end
	always
		#10 			clk =! clk;
 
endmodule