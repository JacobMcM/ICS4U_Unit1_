import java.util.Scanner;

//cupcake party

public class Main{
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
           
        int numRegBox = Integer.parseInt(in.nextLine());
        int numSmallBox = Integer.parseInt(in.nextLine());
        int classRoom = 28;

        int numCupcakes = numRegBox*8 + numSmallBox*3;
        
        int leftOver = numCupcakes - classRoom;

        System.out.println(leftOver);
    }
}