import java.util.Scanner;

public class Main{
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);
        
        int numGoodGroup = Integer.parseint(in.nextLine());

        String[][] goodGroups;

        for (i = 0; i <= numGoodGroup; i++){
            String[] goodGroup = in.nextLine().split(" ");
            goodGroups[i] = goodGroup;
        }

        int numGoodGroup = Integer.parseint(in.nextLine());

        String[][] badGroups;

        for (i = 0; i <= numGoodGroup; i++){
            String[] goodGroup = in.nextLine().split(" ");
            goodGroups[i][0] = goodGroup;
        }


        
        


        
    }
}