import java.util.Scanner;

//good groups

public class Main{
    public static void main(String[] args){
        Scanner in = new Scanner(System.in);

        int numGoodGroup = Integer.parseInt(in.nextLine());

        int violations = 0;  

        String goodGroup[][] = new String[numGoodGroup][2];

        for (int i = 0; i < numGoodGroup; i++){
            String buds[] = in.nextLine().split(" ");
            goodGroup[i][0] = buds[0];
            goodGroup[i][1] = buds[1];
        }

        int numBadGroup = Integer.parseInt(in.nextLine());

        String badGroup[][] = new String[numBadGroup][2];

        for (int i = 0; i < numBadGroup; i++){
            String hates[] = in.nextLine().split(" ");
            badGroup[i][0] = hates[0];
            badGroup[i][1] = hates[1];
        }

        int numGroup = Integer.parseInt(in.nextLine());

        String group[][] = new String[numGroup][3];

        for (int i = 0; i < numGroup; i++){
            String member[] = in.nextLine().split(" ");
            group[i][0] = member[0];
            group[i][1] = member[1];
            group[i][2] = member[2];
        }

        for (int i = 0; i < goodGroup.length; i++){
            String bud1 = goodGroup[i][0];
            String bud2 = goodGroup[i][1];
            boolean isbud1 = false;
            boolean isbud2 = false;
            for (int j = 0; j < group.length; j++){
                for (int y = 0; y < group[j].length; y++){
                    if (bud1.equals(group[j][y])){
                        isbud1 = true;
                    }
                    if (bud2.equals(group[j][y])){
                        isbud2 = true;
                    }

                }
                if (isbud1 && !isbud2){
                    violations++;
                }
                isbud1 = false;
                isbud2 = false;

            }
            
        }

        for (int i = 0; i < badGroup.length; i++){
            String hate1 = badGroup[i][0];
            String hate2 = badGroup[i][1];
            boolean ishate1 = false;
            boolean ishate2 = false;
            for (int j = 0; j < group.length; j++){
                for (int y = 0; y < group[j].length; y++){
                    if (hate1.equals(group[j][y])){
                        ishate1 = true;
                    }
                    if (hate2.equals(group[j][y])){
                        ishate2 = true;
                    }
                }
                if (ishate1 && ishate2){
                   violations++;              
                }
                ishate1 = false;
                ishate2 = false;
            }
            
        }
        
        System.out.println(violations);        
    }
}

