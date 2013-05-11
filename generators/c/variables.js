/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Dart for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 * MODIFIED BY INDOBLOCKLY
 * Angga Maulana P 2012
 * 
 */

Blockly.C = Blockly.Generator.get('C');

Blockly.C.variables_get = function() {
    // Variable getter.
    var code = Blockly.C.variableDB_.getName(this.getTitleText('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.C.ORDER_ATOMIC];
};


Blockly.C.variables_set = function() {
    // Variable setter.
    
    var argument0 = Blockly.C.valueToCode(this, 'VALUE', true) || '0';
    var varName = Blockly.C.variableDB_.getName(this.getTitleText('VAR'),
        Blockly.Variables.NAME_TYPE);
    
    argument0 = argument0.replace(/^\(/g,'');
    argument0 = argument0.replace(/\)$/g,'');      
  
    var cekString = /^"+[\w]*"/g;
    var cekFungsiReturnChar = /^(strlwr\(|strupr\(|substring\(|trim\(|strcat\(|text_toTitleCase\()[\w\W]*/g;
    var cekFungsiReturnFloat = /^(sqrt\(|floor\(|ceil\(|sin\(|cos\(|tan\(|asin\(|acos\(|atan\(|log\(|log10\(|exp\(|pow\()[\w\W]*/g;
    var cekFungsiReturnInt = /^(strlen\(|sizeof\(|mathlist_)[\w\W]*/g;
    
    var cekArrayString = /^size_t\sarrayTemp\[\]\s=\s\{+"[\w\W]*"*\}$/g;
    var cekArrayAngka = /^size_t\sarrayTemp\[\]\s=\s\{+[\d,\s]*\}$/g;
    var cekAngkaFloat = /(\d\.\d|\d\.\s\d)/g;
    var cekAngkaInt = /(^-\d+$|^\d+$|((\d\s\+\s\d)+|(\d\s\-\s\d)+|(\d\s\*\s\d)+|(\d\s\/\s\d)+))/g;
    var cekVariabel = /^[a-zA-Z_]+[\w]?/g;
    var inputVar = /^(\/\/input\svariabel)/g;
    var joinText = /^\/\/jointext\s/g;
    
     
    if(joinText.test(argument0)){
        Blockly.C.listTypeVar[varName] = 'char';
        return Blockly.C.gabungText(varName, argument0);
            
    }else if(inputVar.test(argument0)){
       
       argument0 = argument0.replace(/^\(/g,'');
       argument0 = argument0.replace(/\)$/g,'');
        //if variabel prompt hasnt been defined then
        var inputVarS = /^(\/\/input\svariabel\sString)/g;
        var inputVarAngka = /^(\/\/input\svariabel\sAngka)/g;
       
        if(Blockly.C.listTypeVar[varName]==undefined){
            if(inputVarS.test(argument0)){
                Blockly.C.listTypeVar[varName] = 'char';
            }else{
                Blockly.C.listTypeVar[varName] = 'int';
                varName = '"%d",&'+varName;
            }
        }else{
            if(Blockly.C.listTypeVar[varName] == 'int'){
                if(inputVarAngka.test(argument0))
                    varName = '"%d",&'+varName;
                else
                    return 'printf("variabel '+varName+' berisi nilai angka tidak bisa menggunakan prompt text");\n';
            }else if(Blockly.C.listTypeVar[varName] == 'float'){
                if(inputVarAngka.test(argument0))
                    varName = '"%f",&'+varName;
                else
                    return 'printf("variabel '+varName+' berisi nilai angka tidak bisa menggunakan prompt text\\n");\n';
            }else if(Blockly.C.listTypeVar[varName] == 'char'){
                if(inputVarAngka.test(argument0))                   
                    return 'printf("variabel '+varName+' berisi nilai String tidak bisa menggunakan prompt angka\\n");\n';
            }else if(Blockly.C.listTypeVar[varName].match(/arraychar/g)){
                if(inputVarAngka.test(argument0))                   
                    return 'printf("variabel '+varName+' berisi nilai String tidak bisa menggunakan prompt angka\\n");\n';
            }else if(Blockly.C.listTypeVar[varName].match(/arrayint/g)){
                if(inputVarAngka.test(argument0))
                    varName = '"%d",'+varName;
                else
                    return 'printf("variabel '+varName+' berisi nilai angka tidak bisa menggunakan prompt text");\n';
            }
        }
            
        return argument0+varName+');\n';
            
    }else if(cekArrayString.test(argument0)){
        //jika berupa array string
             

        if(Blockly.C.listTypeVar[varName]==undefined || Blockly.C.listTypeVar[varName].match(/arraychar/g)){
            var cekjumlahElemen = /(",\s"|\w,\s)/g;                
               
            if(argument0.match(cekjumlahElemen) !=null){ 
                var jumlahElemen = argument0.match(cekjumlahElemen).length+1;
                Blockly.C.listTypeVar[varName] = 'arraychar'+jumlahElemen;
                //                    var code = '';
                //                    alert(argument0);
                //                    var elemen = argument0.replace(/[\s\[\];]/g,'').split(',');
                //                    for(var i = 0;i<jumlahElemen;i++)
                //                        code += varName+'['+i+']='+elemen[i]+';\n';
                Blockly.C.arrayDef[varName] = argument0.replace(/size_t\sarrayTemp\[\]\s=\s/g,'');        
                
                return '';
            }else{
                Blockly.C.listTypeVar[varName] = 'arraychar1';
                Blockly.C.arrayDef[varName] = argument0.replace(/size_t\sarrayTemp\[\]\s=\s/g,'');        
                return '';
            }
                
        }else{           
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya  ';
               
        }
            
    }else if(cekArrayAngka.test(argument0)){
        //jika berupa array angka
            
        if(Blockly.C.listTypeVar[varName]==undefined || Blockly.C.listTypeVar[varName].match(/arrayint/g)){
            var cekjumlahElemen = /(\d,\s|\w,\s)/g;
            if(argument0.match(cekjumlahElemen) !=null){ 
                var jumlahElemen = argument0.match(cekjumlahElemen).length+1;
                Blockly.C.listTypeVar[varName] = 'arrayint'+jumlahElemen;
                //                    var code = '';
                //                    var elemen = argument0.replace(/[\s\[\];]/g,'').split(',');
                //                    for(var i = 0;i<jumlahElemen;i++)
                //                        code += varName+'['+i+']='+elemen[i]+';\n';
                Blockly.C.arrayDef[varName] = argument0.replace(/size_t\sarrayTemp\[\]\s=\s/g,'');                    
                return '';
            }else{
                Blockly.C.listTypeVar[varName] = 'arrayint1';
                Blockly.C.arrayDef[varName] = argument0.replace(/size_t\sarrayTemp\[\]\s=\s/g,'');     
                return '';
            }
                
        }else{           
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya  ';
               
        }
    }else if(cekString.test(argument0) || cekFungsiReturnChar.test(argument0)){
        //jika merupakan char
             if(Blockly.C.listTypeVar[varName]!=undefined && Blockly.C.listTypeVar[varName]!='char')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
               
        if(Blockly.C.listTypeVar[varName]==undefined || Blockly.C.listTypeVar[varName]!='char'){
            Blockly.C.listTypeVar[varName] = 'char';
        }
        return 'strncpy('+varName + ', ' + argument0 + ',maxChar);\n';
    }else if(cekAngkaInt.test(argument0) || cekFungsiReturnInt.test(argument0)){
        //jika merupakan int
             if(Blockly.C.listTypeVar[varName]!=undefined && Blockly.C.listTypeVar[varName]!='int')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
         
        if(Blockly.C.listTypeVar[varName]==undefined || Blockly.C.listTypeVar[varName]!='int'){
                
            Blockly.C.listTypeVar[varName] = 'int';
        }
    }else if(cekAngkaFloat.test(argument0)){
        //jika merupakan float
         if(Blockly.C.listTypeVar[varName]!=undefined && Blockly.C.listTypeVar[varName]!='float')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
            
        if(Blockly.C.listTypeVar[varName]==undefined || Blockly.C.listTypeVar[varName]!='float'){
                
            Blockly.C.listTypeVar[varName] = 'float';
        }
    }else if(cekFungsiReturnFloat.test(argument0)){
        //jika merupakan fungsi return float
             if(Blockly.C.listTypeVar[varName]!=undefined && Blockly.C.listTypeVar[varName]!='float')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya  ';
                    
             
        if(Blockly.C.listTypeVar[varName]==undefined || Blockly.C.listTypeVar[varName]!='float'){
                
            Blockly.C.listTypeVar[varName] = 'float';
        }
    }else if(cekVariabel.test(argument0)){
        //jika berupa variabel
        if(Blockly.C.listTypeVar[argument0]!=undefined) {   
            if(Blockly.C.listTypeVar[argument0]=='char'){
                    if(Blockly.C.listTypeVar[varName]!='char')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
                    Blockly.C.listTypeVar[varName] = 'char';                
                return 'strncpy('+varName + ', ' + argument0 + ',maxChar);\n';
            }else if(Blockly.C.listTypeVar[argument0].match(/^param_char/g)){
                    if(Blockly.C.listTypeVar[varName]!='char')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
                
                Blockly.C.listTypeVar[varName] = 'char';                                 
            }else if(Blockly.C.listTypeVar[argument0].match(/^param_int/g)){
                     if(Blockly.C.listTypeVar[varName]!='int')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
                Blockly.C.listTypeVar[varName] = 'int';                                 
            }else if(Blockly.C.listTypeVar[argument0].match(/^param_float/g)){
                     if(Blockly.C.listTypeVar[varName]!='float')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya  ';
                    
                Blockly.C.listTypeVar[varName] = 'float';                                 
            }else if(Blockly.C.listTypeVar[argument0]=='int'){
                     if(Blockly.C.listTypeVar[varName]!='int')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
                Blockly.C.listTypeVar[varName] = 'int';                
            }else if(Blockly.C.listTypeVar[argument0]=='float'){
                     if(Blockly.C.listTypeVar[varName]!='float')
                        return '//[PERINGATAN] Tipe data Variabel "'+varName+'" diset tidak sesuai dengan tipe sebelumnya ';
                    
                Blockly.C.listTypeVar[varName] = 'float';                
            }
        }
    }
    else{
           
        //this for fix bugs double convert
        if(Blockly.C.listTypeVar[varName]==undefined){
            
            Blockly.C.listTypeVar[varName] = 'int';   
        }
            
    }
            
  
    return varName + ' = ' + argument0 + ';\n';
};


Blockly.C.gabungText = function(argument0,text_join) {
    var cekString = /^"+[\w\W]*"/g;
    
    var cekFungsiReturnChar = /^(strlwr\(|strupr\(|substring\(|trim\(|strcat\(|text_toTitleCase\()[\w\W]*/g;
    var cekFungsiReturnInt = /^(strlen\(|sizeof\()[\w\W]*/g;
    var cekFungsiReturnFloat = /^(sqrt\(|floor\(|ceil\(|sin\(|cos\(|tan\(|asin\(|acos\(|atan\(|log\(|log10\(|exp\(|pow\()[\w\W]*/g;
    var cekAngkaFloat = /(\d\.\d|\d\.\s\d)/g;
    var cekAngkaInt = /(^-\d+$|^\d+$|((\d\s\+\s\d)+|(\d\s\-\s\d)+|(\d\s\*\s\d)+|(\d\s\/\s\d)+))/g;
    var cekVariabel = /^[a-zA-Z_]+[\w]?/g;
    
    var code = 
    '\n//---FUNCTION GENERATED BY INDOBLOCKLY-----------------\n'+
    'char charhasilGabungan[maxChar];\n'+
    'void gabungKataFloat(float kata){\n'+
    '   char temp[maxChar];\n'+
    '   sprintf(temp,"%.2f",kata);\n'+
    '   strcat(charhasilGabungan,temp);\n'+
    '}\n'+
    'void gabungKataInt(int kata){\n'+
    '    char temp[maxChar];\n'+
    '    sprintf(temp,"%d",kata);\n'+
    '   strcat(charhasilGabungan,temp);\n'+
    '}\n'+
    ' void gabungKataChar(char *kata){\n'+
    '    char temp[maxChar];\n'+
    '    sprintf(temp,"%s",kata);\n'+
    '    strcat(charhasilGabungan,temp);\n'+
    ' }\n'+
    '//-----------------------------------------------------------\n\n'
    ;
           
    Blockly.C.definitions_['gabung_kata'] = code;
          
    var hasil =
    '\n//---Memulai proses penggabungan karakter---\n'+
    'strncpy(charhasilGabungan,"",maxChar);\n';
    
    var elemen = text_join.replace(/\/\/jointext\s/g,'').split('#');
     
    for(var i=0;i<elemen.length;i++){
      
    
        if(cekString.test(elemen[i]) || cekFungsiReturnChar.test(elemen[i])){
            //jika merupakan char
            
            hasil +='gabungKataChar('+elemen[i]+');\n';
        }else if(cekAngkaInt.test(elemen[i])){
            //jika merupakan int
            hasil +='gabungKataInt('+elemen[i]+');\n';
        }else if(cekAngkaFloat.test(elemen[i])){
            //jika merupakan float
            hasil +='gabungKataFloat('+elemen[i]+');\n';
       
        }else if(cekFungsiReturnFloat.test(elemen[i])){
            //jika merupakan fungsi return float
            hasil +='gabungKataFloat('+elemen[i]+');\n';    
       
        }else if(cekFungsiReturnChar.test(elemen[i])){
            //jika merupakan fungsi return char
            
            hasil +='gabungKataChar('+elemen[i]+');\n';    
       
        }else if(cekFungsiReturnInt.test(elemen[i])){
            //jika merupakan fungsi return int
            hasil +='gabungKataInt('+elemen[i]+');\n';    
       
        }else if(cekVariabel.test(elemen[i])){
            //jika berupa variabel
            if(Blockly.C.listTypeVar[elemen[i]]=='char'){
                
                hasil +='gabungKataChar('+elemen[i]+');\n';
            }else if(Blockly.C.listTypeVar[elemen[i]]=='int'){
                hasil +='gabungKataInt('+elemen[i]+');\n'; 
           
            }else if(Blockly.C.listTypeVar[elemen[i]]=='float'){
                hasil +='gabungKataFloat('+elemen[i]+');\n';          
            }else if(Blockly.C.listTypeVar[elemen[i]]!=undefined && Blockly.C.listTypeVar[elemen[i]].match(/arrayint/g)){
                hasil +='gabungKataInt('+elemen[i]+');\n';          
            }else if(Blockly.C.listTypeVar[elemen[i]]!=undefined && Blockly.C.listTypeVar[elemen[i]].match(/arraychar/g)){
                hasil +='gabungKataChar('+elemen[i]+');\n';          
            }else if(elemen[i].match(/^[a-zA-Z_]+\[[\w\W\s]*\]$/g)){
              //berupa index suatu array
              //tentukan array jenis apa
              
              var ambilVar = elemen[i].replace(/\[[\w\W\s]*\]/g,'');
              if(Blockly.C.listTypeVar[ambilVar]!=undefined){
                  if(Blockly.C.listTypeVar[ambilVar].match(/arrayint/g)){
                      hasil +='gabungKataInt('+elemen[i]+');\n'; 
                  }if(Blockly.C.listTypeVar[ambilVar].match(/arraychar/g)){
                      hasil +='gabungKataChar('+elemen[i]+');\n'; 
                  }
              }
          }
        }
        else{           
            //this for fix bugs double convert
            hasil +='gabungKataInt('+elemen[i]+');\n';
            
        }
    }
    
    hasil+='strncpy('+argument0+', charhasilGabungan,maxChar);\n'
    +'//------------akhir proses penggabungan karakter----\n\n';
    return hasil;
};