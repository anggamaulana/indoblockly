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
 * @fileoverview Generating Dart for math blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 * 
 * MODIFIED BY INDOBLOCKLY
 * Angga Maulana P 2012
 * 
 */

Blockly.C = Blockly.Generator.get('C');

Blockly.C.math_number = function() {
  // Numeric value.
  var code = window.parseFloat(this.getTitleText('NUM')); 
  return [code, Blockly.C.ORDER_ATOMIC];
};

Blockly.C.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var mode = this.getTitleValue('OP');
  var tuple = Blockly.C.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.C.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.C.valueToCode(this, 'B', order) || '0';
  var code;
  if (!operator) {
    code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.C.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.C.math_arithmetic.OPERATORS = {
  ADD: [' + ', Blockly.C.ORDER_ADDITIVE],
  MINUS: [' - ', Blockly.C.ORDER_ADDITIVE],
  MULTIPLY: [' * ', Blockly.C.ORDER_MULTIPLICATIVE],
  DIVIDE: [' / ', Blockly.C.ORDER_MULTIPLICATIVE],
  POWER: [null, Blockly.C.ORDER_NONE]
};

Blockly.C.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.C.valueToCode(this, 'DELTA') || '0';
  var varName = Blockly.C.variableDB_.getName(this.getTitleText('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + varName + '+'+argument0 + ';\n';
};

Blockly.C.math_single = function() {
  // Math operators with single operand.
  var operator = this.getTitleValue('OP');
  var code;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedents.
    var argument = Blockly.C.valueToCode(this, 'NUM',
        Blockly.C.ORDER_UNARY_PREFIX) || '0';
    if (argument.charAt(0) == '-') {
      // --3 is not legal in Dart.
      argument = ' ' + argument;
    }
    code = '-' + argument;
    return [code, Blockly.C.ORDER_UNARY_PREFIX];
  }
  var argNaked = Blockly.C.valueToCode(this, 'NUM',
      Blockly.C.ORDER_NONE) || '0';
  var argMultiplicative = Blockly.C.valueToCode(this, 'NUM',
      Blockly.C.ORDER_MULTIPLICATIVE) || '0';
  var argPostfix = Blockly.C.valueToCode(this, 'NUM',
      Blockly.C.ORDER_UNARY_POSTFIX) || '0';
  
  switch (operator) {
    case 'ABS':
      code =  'abs('+argNaked+')';
      break;
    case 'ROOT':
      code = 'sqrt(' + argNaked + ')';
      break;
    case 'LN':
      code = 'log(' + argNaked + ')';
      break;
    case 'EXP':
      code = 'exp(' + argNaked + ')';
      break;
    case '10POW':
      code = 'pow(10,' + argNaked + ')';
    case 'ROUND':
      
      code = 'ceil('+argNaked+')';
      break;
    case 'ROUNDUP':
      code = 'ceil('+argNaked+')';
      break;
    case 'ROUNDDOWN':
      code = 'floor('+argNaked+')';
      break;
    case 'SIN':
      code = 'sin(' + argNaked + ')';
      break;
    case 'COS':
      code = 'cos(' + argNaked + ')';
      break;
    case 'TAN':
      code = 'tan(' + argNaked + ')';
      break;
    case 'NEG':
      code = '-' + argNaked;
      break;
    case 'LOG10':
      code = 'log10(' + argNaked + ')';
      break;
    case 'ASIN':
      code = 'asin(' + argNaked + ')';
      break;
    case 'ACOS':
      code = 'acos(' + argNaked + ')';
      break;
    case 'ATAN':
      code = 'atan(' + argNaked + ')';
      break;
    default:
      throw 'Unknown math operator.';
  }
  if (code) {
    return [code, Blockly.C.ORDER_UNARY_POSTFIX];
  }
  
  return [code, Blockly.C.ORDER_MULTIPLICATIVE];
  
};

// Rounding functions have a single operand.
Blockly.C.math_round = Blockly.C.math_single;
// Trigonometry functions have a single operand.
Blockly.C.math_trig = Blockly.C.math_single;

Blockly.C.math_on_list = function() {
  // Rounding functions.
  func = this.getTitleValue('OP');
  var list = Blockly.C.valueToCode(this, 'LIST', true) || '[]';
  var panjangList = Blockly.C.listTypeVar[list];
      if(panjangList!=undefined)
          panjangList = panjangList.replace(/arrayint/g,'');  
      else{
          if(panjangList = list.match(/,\s/g)!=null)
            panjangList = list.match(/,\s/g).length+1;
      }
      
  var code;
  switch (func) {
    case 'SUM':
      if (!Blockly.C.definitions_['math_sum']) {
        //var functionName = Blockly.C.variableDB_.getDistinctName(
        //    'math_sum', Blockly.Generator.NAME_TYPE);
        
        var func = [];
        func.push('\n//---FUNCTION GENERATED BY INDOBLOCKLY-----------------\n');
        func.push('int mathlist_sum(int a[],int length){');
        func.push('  int i,sum=0;');
        func.push('  for(i=0;i&lt;length;i++)');
        func.push('             sum+=a[i];');
        func.push('      return sum;\n}');
        func.push('\n//------------------------------------------------------');
        Blockly.C.definitions_['math_sum'] = func.join('\n');
      } 
      
      code =  'mathlist_sum(' + list + ','+panjangList+')';
      if(list.match(/^size_t\sarrayTemp/g)){
          Blockly.C.definitions_['array_tmp'] = list+';\n';
          code =  'mathlist_sum((int*)arrayTemp,'+panjangList+')';
      }
      break;
    case 'MIN':
      if (!Blockly.C.definitions_['math_min']) {
        var functionName = Blockly.C.variableDB_.getDistinctName(
            'math_min', Blockly.Generator.NAME_TYPE);
        Blockly.C.math_on_list.math_min = functionName;
        var func = [];
        func.push('\n//---FUNCTION GENERATED BY INDOBLOCKLY-----------------\n');
        func.push('int mathlist_min(int a[],int length){');
        func.push('  int i,min=a[0];');
        func.push('  for(i=0;i&lt;length;i++){');
        func.push('             if(a[i]&lt;min)min = a[i];\n');
        func.push('      }return min;\n}');
        func.push('\n//------------------------------------------------------');
        Blockly.C.definitions_['math_min'] = func.join('\n');
      }
       code =  list+';\nmathlist_min(arrayTemp,'+panjangList+')';
       if(list.match(/^size_t\sarrayTemp/g)){
          Blockly.C.definitions_['array_tmp'] = list+';\n';
          code =  'mathlist_min((int*)arrayTemp,'+panjangList+')';
       }
      
      break;
    case 'MAX':
      if (!Blockly.C.definitions_['math_max']) {
        var functionName = Blockly.C.variableDB_.getDistinctName(
            'math_max', Blockly.Generator.NAME_TYPE);
        Blockly.C.math_on_list.math_max = functionName;
        var func = [];
        func.push('\n//---FUNCTION GENERATED BY INDOBLOCKLY-----------------\n');
        func.push('int mathlist_max(int a[],int length){');
        func.push('  int i,max=a[0];');
        func.push('  for(i=0;i&lt;length;i++){');
        func.push('             if(a[i]&gt;max)max = a[i];\n');
        func.push('      }return max;\n}');
        func.push('\n//------------------------------------------------------');
        Blockly.C.definitions_['math_max'] = func.join('\n');
      }
      code =  list+';\nmathlist_max(arrayTemp,'+panjangList+')';
       if(list.match(/^size_t\sarrayTemp/g)){
           Blockly.C.definitions_['array_tmp'] = list+';\n';
          code =  'mathlist_max((int*)arrayTemp,'+panjangList+')';
       }
      break;
    case 'AVERAGE':
      if (!Blockly.C.definitions_['math_average']) {
        var functionName = Blockly.C.variableDB_.getDistinctName(
            'math_average', Blockly.Generator.NAME_TYPE);
        Blockly.C.math_on_list.math_average = functionName;
        var func = [];
        func.push('\n//---FUNCTION GENERATED BY INDOBLOCKLY-----------------\n');
        func.push('int mathlist_avg(int a[],int length){');
        func.push('  int i,sum=0;');
        func.push('  for(i=0;i&lt;length;i++)');
        func.push('             sum+=a[i];');
        func.push('      return sum/length;\n}');
        func.push('\n//------------------------------------------------------');
        Blockly.C.definitions_['math_average'] = func.join('\n');
      }
      code =  list+';\nmathlist_avg(arrayTemp,'+panjangList+')';
       if(list.match(/^size_t\sarrayTemp/g)){
           Blockly.C.definitions_['array_tmp'] = list+';\n';
          code = 'mathlist_avg((int*)arrayTemp,'+panjangList+')';
       }
      break;
    case 'MEDIAN':
      if (!Blockly.C.definitions_['math_median']) {
        var functionName = Blockly.C.variableDB_.getDistinctName(
            'math_median', Blockly.Generator.NAME_TYPE);
        Blockly.C.math_on_list.math_median = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(List myList) {');
        func.push('  // First filter list for numbers only, then sort, then return middle value');
        func.push('  // or the average of two middle values if list has an even number of elements.');
        func.push('  List localList = myList.filter((a) => a is num);');
        func.push('  if (localList.isEmpty()) return;');
        func.push('  localList.sort((a, b) => (a - b));');
        func.push('  int index = (localList.length / 2).toInt();');
        func.push('  if (localList.length.isOdd()) {');
        func.push('    return localList[index];');
        func.push('  } else {');
        func.push('    return (localList[index - 1] + localList[index]) / 2;');
        func.push('  }');
        func.push('}');
        Blockly.C.definitions_['math_median'] = func.join('\n');
      }
      code =  list+';\nmathlist_med(arrayTemp,'+panjangList+')';
       if(list.match(/^size_t\sarrayTemp/g))
          code =  list+';\nmathlist_med(arrayTemp,'+panjangList+')';
      break;
    case 'MODE':
      if (!Blockly.C.definitions_['math_modes']) {
        var functionName = Blockly.C.variableDB_.getDistinctName(
            'math_modes', Blockly.Generator.NAME_TYPE);
        Blockly.C.math_on_list.math_modes = functionName;
        // As a list of numbers can contain more than one mode,
        // the returned result is provided as an array.
        // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
        var func = [];
        func.push('Dynamic ' + functionName + '(values) {');
        func.push('  var modes = [];');
        func.push('  var counts = [];');
        func.push('  var maxCount = 0;');
        func.push('  for (var i = 0; i < values.length; i++) {');
        func.push('    var value = values[i];');
        func.push('    var found = false;');
        func.push('    var thisCount;');
        func.push('    for (var j = 0; j < counts.length; j++) {');
        func.push('      if (counts[j][0] === value) {');
        func.push('        thisCount = ++counts[j][1];');
        func.push('        found = true;');
        func.push('        break;');
        func.push('      }');
        func.push('    }');
        func.push('    if (!found) {');
        func.push('      counts.add([value, 1]);');
        func.push('      thisCount = 1;');
        func.push('    }');
        func.push('    maxCount = Math.max(thisCount, maxCount);');
        func.push('  }');
        func.push('  for (var j = 0; j < counts.length; j++) {');
        func.push('    if (counts[j][1] == maxCount) {');
        func.push('        modes.add(counts[j][0]);');
        func.push('    }');
        func.push('  }');
        func.push('  return modes;');
        func.push('}');
        Blockly.C.definitions_['math_modes'] = func.join('\n');
      }
      code = Blockly.C.math_on_list.math_modes + '(' + list + ')';
      break;
    case 'STD_DEV':
      if (!Blockly.C.definitions_['math_standard_deviation']) {
        var functionName = Blockly.C.variableDB_.getDistinctName(
            'math_standard_deviation', Blockly.Generator.NAME_TYPE);
        Blockly.C.math_on_list.math_standard_deviation = functionName;
        var func = [];
        func.push('Dynamic ' + functionName + '(myList) {');
        func.push('  List numbers = myList.filter((a) => a is num);');
        func.push('  if (numbers.isEmpty()) return;');
        func.push('  var n = numbers.length;');
        func.push('  var sum = 0;');
        func.push('  numbers.forEach((x) => sum += x);');
        func.push('  var mean = sum / n;');
        func.push('  var sumSquare = 0;');
        func.push('  numbers.forEach((x) => sumSquare += Math.pow(x - mean, 2));');
        func.push('  var standard_dev = Math.sqrt(sumSquare / n);');
        func.push('  return standard_dev;');
        func.push('}');
        Blockly.C.definitions_['math_standard_deviation'] = func.join('\n');
      }
      code = Blockly.C.math_on_list.math_standard_deviation + '(' + list + ')';
      break;
    case 'RANDOM':
      code = list + '[rand() * ' + list + '.length).floor().toInt()]';
      break;
    default:
      throw 'Unknown operator.';
  }
  
  return [code, Blockly.C.ORDER_UNARY_POSTFIX];
};

Blockly.C.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.C.valueToCode(this, 'VALUE', true) || '0';
  var argument1 = Blockly.C.valueToCode(this, 'LOW', true) || '0';
  var argument2 = Blockly.C.valueToCode(this, 'HIGH', true) || '0';
  var code =  'Math.min(Math.max(' + argument0 + ', ' + argument1 + '), ' + argument2 + ')';
  return [code, Blockly.C.ORDER_UNARY_POSTFIX];
};

Blockly.C.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.C.valueToCode(this, 'DIVIDEND') || '0';
  var argument1 = Blockly.C.valueToCode(this, 'DIVISOR') || '0';
  var code = argument0 + ' % ' + argument1;
  
  return [code, Blockly.C.ORDER_MULTIPLICATIVE];
};

Blockly.C.math_random_int = function() {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.C.valueToCode(this, 'FROM') || '0';
  var argument1 = Blockly.C.valueToCode(this, 'TO') || '0';
  var rand1 = '(rand() * (' + argument1 + ' - ' + argument0 + ' + 1' +
      ') + ' + argument0 + ').floor()';
  var rand2 = '(rand() * (' + argument0 + ' - ' + argument1 + ' + 1' +
      ') + ' + argument1 + ').floor()';
  var code;
  if (argument0.match(/^[\d\.]+$/) && argument1.match(/^[\d\.]+$/)) {
    if (parseFloat(argument0) < parseFloat(argument1)) {
      code = rand1;
    } else {
      code = rand2;
    }
  } else {
    code = argument0 + ' < ' + argument1 + ' ? ' + rand1 + ' : ' + rand2;
  }
  return [code, Blockly.C.ORDER_UNARY_POSTFIX];
};

Blockly.C.math_random_float = function() {
  // Random fraction between 0 and 1.
  return ['rand()', Blockly.C.ORDER_UNARY_POSTFIX];
};
