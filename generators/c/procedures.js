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
 * 
 * MODIFIED BY INDOBLOCKLY
 * Angga Maulana P 2012
 */

Blockly.C = Blockly.Generator.get('C');

Blockly.C.procedures_defreturn = function() {
    
  var cekString = /^"+[\w]*"/g;
    var cekFungsiReturnChar = /^(strlwr\(|strupr\(|substring\(|trim\(|strcat\()[\w\W]*/g;
    var cekFungsiReturnFloat = /^(sqrt\(|floor\(|ceil\(|sin\(|cos\(|tan\(|asin\(|acos\(|atan\(|log\(|log10\(|exp\(|pow\()[\w\W]*/g;
    var cekFungsiReturnInt = /^(strlen\(|sizeof\(|mathlist_)[\w\W]*/g;
    var cekAngkaFloat = /(\d\.\d|\d\.\s\d)/g;
    var cekAngkaInt = /(^-\d+$|^\d+$|((\d\s\+\s\d)+|(\d\s\-\s\d)+|(\d\s\*\s\d)+|(\d\s\/\s\d)+))/g;
    var cekVariabel = /^[a-zA-Z_]+[\w]?/g;
    
  // Define a procedure with a return value.
  
  var funcName = Blockly.C.variableDB_.getName(this.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.C.statementToCode(this, 'STACK');
  var returnValue = Blockly.C.valueToCode(this, 'RETURN', true) || '';
  
  var returnType = returnValue ? 'dynamic' : 'void';
  //jika dynamic maka kemungkinan int, float,char
  
  if(cekString.test(returnValue)){
      returnType = 'char *';
  }else if(cekFungsiReturnChar.test(returnValue)){
      returnType = 'char *';
  }else if(cekFungsiReturnFloat.test(returnValue)){
      returnType = 'float';
  }else if(cekFungsiReturnInt.test(returnValue)){
      returnType = 'int';
  }else if(cekAngkaFloat.test(returnValue)){
      returnType = 'float';
  }else if(cekAngkaInt.test(returnValue)){
      returnType = 'int';
  }else if(cekVariabel.test(returnValue)){
      if(Blockly.C.listTypeVar[returnValue]=='char'){
          returnType = 'char *';
      }else if(Blockly.C.listTypeVar[returnValue]=='int'){
          returnType = 'int';
      }else if(Blockly.C.listTypeVar[returnValue]=='float'){
          returnType = 'float';
      }else if(Blockly.C.listTypeVar[returnValue]=='char *'){
          returnType = 'char *';
      }else{
          returnType = 'size_t';
      }
  }
  
  
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.C.variableDB_.getName(this.arguments_[x],
        Blockly.Variables.NAME_TYPE);
        if(args[x].match(/^char_/g)){
            Blockly.C.listTypeVar[args[x]] = 'param_char *';
            args[x] = 'char * '+args[x];
        }else if(args[x].match(/^int_/g)){
            Blockly.C.listTypeVar[args[x]] = 'param_int';
            args[x] = 'int '+args[x];
        }else if(args[x].match(/^float_/g)){
            Blockly.C.listTypeVar[args[x]] = 'param_float';
            args[x] = 'float '+args[x];
        }else{
            Blockly.C.listTypeVar[args[x]] = 'param_int';
            args[x] = 'int '+args[x];
        }
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}\n';
   
  code = Blockly.C.scrub_(this, code);
  
  Blockly.C.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.C.procedures_defnoreturn = Blockly.C.procedures_defreturn;

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.C.procedures_defnoreturn = Blockly.C.procedures_defreturn;

Blockly.C.procedures_callreturn = function() {
  // Call a procedure with a return value.
  var funcName = Blockly.C.variableDB_.getName(this.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.C.valueToCode(this, 'ARG' + x,
        Blockly.C.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
return [code, Blockly.C.ORDER_UNARY_POSTFIX];
};

Blockly.C.procedures_callnoreturn = function() {
  // Call a procedure with no return value.
  var funcName = Blockly.C.variableDB_.getName(this.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < this.arguments_.length; x++) {
    args[x] = Blockly.C.valueToCode(this, 'ARG' + x,
        Blockly.C.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};
