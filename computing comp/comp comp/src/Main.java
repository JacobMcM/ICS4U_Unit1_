//cupcake party

public class Main{
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
           
        int numRegBox = Integer.parseint(in.nextLine());
        int numSmallBox = Integer.parseint(in.nextLine());
        int class = 28;

        int numCupcakes = numRegBox*8 + numSmallBox*3;
        
        int leftOver = class - numCupcakes;

        return leftOver;
    }
}