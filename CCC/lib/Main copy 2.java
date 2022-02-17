import java.util.Scanner;

//harp unfinished

public class Main{
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);

        String command = in.nextLine();

        String instruct[] = new String[8];

        for (int i = 0; i < command.length(); i++){
            String isNumber = isNum(command.indexOf(5));
                
            isNum(command.indexOf(5))){

            }
        }
        



        
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
    public boolean isNum(String str){
        try {  
            Double.parseDouble(str);  
            return true;
        } catch(NumberFormatException e){  
            return false;  
        }
    }
}

