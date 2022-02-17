import java.util.Scanner;

//Fergusonball

public class Main{
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);

        int numPlayers = Integer.parseInt(in.nextLine());
        
        int score = 0;
    
        for (int i = 0; i < numPlayers; i++){
            int points = Integer.parseInt(in.nextLine());
            int fouls = Integer.parseInt(in.nextLine());
            
            if(points*5 - fouls*3 > 40){
                score++;
            }
        }

        if(score == numPlayers){
            System.out.println(score + "+");
        }else{
            System.out.println(score);
        }
    }
}