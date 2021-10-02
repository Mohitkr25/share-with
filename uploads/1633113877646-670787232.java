
import java.util.*;
public class codeforcestest {
    
    public static void main(String[] args) {       
        Scanner sc =  new Scanner(System.in);
        int q = sc.nextInt();
        for(int z=0;z<q;z++){
           String str = sc.next();
           int zero = 0;
           int one = 1;
           
           int tempone =0; // c
            int tempzero = 0; // t
           for(int i=0;i<str.length();i++){
               char ch = str.charAt(i);
              if (ch == '0'){
                  zero++;
                tempone = 1;
             }else if(ch != '0' && tempone == 1){
                 one++;
                tempzero++; 
                tempone =0;
            }
              
           }
           if (str.charAt(str.length()-1) == '0'){
            tempzero++;
            }
           int ans = Math.min(tempzero,2);
          System.out.println(ans);
           
        }
    }
}
