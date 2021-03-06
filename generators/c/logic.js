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
 * @fileoverview Generating Dart for logic blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 * MODIFIED BY INDOBLOCKLY
 * Angga Maulana P 2012
 * 
 */

Blockly.C = Blockly.Generator.get('C');

Blockly.C.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.C.logic_compare.OPERATORS[mode];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.C.ORDER_EQUALITY : Blockly.C.ORDER_RELATIONAL;
  var argument0 = Blockly.C.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.C.valueToCode(this, 'B', order) || '0';
    
  var code = argument0 + ' ' + operator + ' ' + argument1;
  
        if(argument0.match(/^"[\w\W]+"$/g)){
            //keduanya String, both var is String with " symbol
            code = 'strcmp('+argument0+','+argument1+')';
        }else if(argument0.match(/^[a-zA-Z_]/g)){
            //if argument0 is a variable then
            
            if(Blockly.C.listTypeVar[argument0]!=undefined){
                if(Blockly.C.listTypeVar[argument0]=='char'){
                    code = 'strcmp('+argument0+','+argument1+')';
                    code += operator+'0';
                }
            }
            
        }
  
  
    
  
   return [code, order];
};

Blockly.C.logic_compare.OPERATORS = {
  EQ: '==',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.C.logic_operation = function() {
  // Operations 'and', 'or'.
  var argument0 = Blockly.C.valueToCode(this, 'A') || 'false';
  var argument1 = Blockly.C.valueToCode(this, 'B') || 'false';
  var operator = (this.getInputLabelValue('B') == 'AND') ? '&&' : '||';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  var order = (operator == '&&') ? Blockly.C.ORDER_LOGICAL_AND :
      Blockly.C.ORDER_LOGICAL_OR;
    
 
  return [code, order];
};

Blockly.C.logic_negate = function() {
  // Negation.
  var argument0 = Blockly.C.valueToCode(this, 'BOOL') || 'false';
  var code = '!' + argument0;
    
  
  return [code, Blockly.C.ORDER_UNARY_PREFIX];
};

Blockly.C.logic_boolean = function() {
  // Boolean values true and false.
  var code =  (this.getTitleValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.C.ORDER_ATOMIC];
};
