#include<bits/stdc++.h>
#include <cmath>
using namespace std;

int main() {

    int t;
  cin>>t;
  while (t--)
    {
       string str;
       cin>>str;
       int tpcount =0;
       int temp = 0;
        for(int i=0;i<str.size();i++){
        if (str[i] == '0'){
            tpcount = 1;
        }
         else if(str[i] != '0' and tpcount == 1){
            temp++; tpcount = 0;
         }
      }

      if (str[str.size() - 1] == '0'){
        temp++;
      }
      cout<<min(temp, 2)<<endl;
   }
}
