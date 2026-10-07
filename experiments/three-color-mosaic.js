(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ex.a0 === region.cd.a0)
	{
		return 'on line ' + region.ex.a0;
	}
	return 'on lines ' + region.ex.a0 + ' through ' + region.cd.a0;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dZ,
		impl.eW,
		impl.eC,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**/''//*//**_UNUSED/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		aj: func(record.aj),
		bY: record.bY,
		bU: record.bU
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.aj;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bY;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bU) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dZ,
		impl.eW,
		impl.eC,
		function(sendToApp, initialModel) {
			var view = impl.eX;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.dZ,
		impl.eW,
		impl.eC,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bX && impl.bX(sendToApp)
			var view = impl.eX;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.$7);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.eR) && (_VirtualDom_doc.title = title = doc.eR);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.ec;
	var onUrlRequest = impl.ed;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bX: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.cM === next.cM
							&& curr.co === next.co
							&& curr.cH.a === next.cH.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		dZ: function(flags)
		{
			return A3(impl.dZ, flags, _Browser_getUrl(), key);
		},
		eX: impl.eX,
		eW: impl.eW,
		eC: impl.eC
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { dT: 'hidden', dy: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dT: 'mozHidden', dy: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dT: 'msHidden', dy: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dT: 'webkitHidden', dy: 'webkitvisibilitychange' }
		: { dT: 'hidden', dy: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		cR: _Browser_getScene(),
		c3: {
			c: _Browser_window.pageXOffset,
			a: _Browser_window.pageYOffset,
			bx: _Browser_doc.documentElement.clientWidth,
			bl: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bx: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bl: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			cR: {
				bx: node.scrollWidth,
				bl: node.scrollHeight
			},
			c3: {
				c: node.scrollLeft,
				a: node.scrollTop,
				bx: node.clientWidth,
				bl: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			cR: _Browser_getScene(),
			c3: {
				c: x,
				a: y,
				bx: _Browser_doc.documentElement.clientWidth,
				bl: _Browser_doc.documentElement.clientHeight
			},
			dN: {
				c: x + rect.left,
				a: y + rect.top,
				bx: rect.width,
				bl: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $author$project$FormulaMosaic$SignalStep = {$: 6};
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.l) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.p);
		} else {
			var treeLen = builder.l * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.t) : builder.t;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.l);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.p);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{t: nodeList, l: (len / $elm$core$Array$branchFactor) | 0, p: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {cj: fragment, co: host, cE: path, cH: port_, cM: protocol, cN: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {cL: processes, cX: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.cL;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.cX);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Basics$not = _Basics_not;
var $author$project$FormulaMosaic$hasPending = function (model) {
	return !($elm$core$List$isEmpty(model.aD) && $elm$core$List$isEmpty(model.aC));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$FormulaParser$bitAt = F2(
	function (mask, bitPos) {
		return A2(
			$elm$core$Basics$modBy,
			2,
			(mask / A2($elm$core$Basics$pow, 2, bitPos)) | 0) === 1;
	});
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $elm$core$Set$singleton = function (key) {
	return A2($elm$core$Dict$singleton, key, 0);
};
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$core$Set$union = F2(
	function (_v0, _v1) {
		var dict1 = _v0;
		var dict2 = _v1;
		return A2($elm$core$Dict$union, dict1, dict2);
	});
var $author$project$FormulaParser$collectVariableSet = function (ast) {
	collectVariableSet:
	while (true) {
		switch (ast.$) {
			case 0:
				var name = ast.a;
				return $elm$core$Set$singleton(name);
			case 1:
				var inner = ast.a;
				var $temp$ast = inner;
				ast = $temp$ast;
				continue collectVariableSet;
			case 2:
				var left = ast.a;
				var right = ast.b;
				return A2(
					$elm$core$Set$union,
					$author$project$FormulaParser$collectVariableSet(left),
					$author$project$FormulaParser$collectVariableSet(right));
			default:
				var left = ast.a;
				var right = ast.b;
				return A2(
					$elm$core$Set$union,
					$author$project$FormulaParser$collectVariableSet(left),
					$author$project$FormulaParser$collectVariableSet(right));
		}
	}
};
var $author$project$FormulaParser$collectVariables = function (ast) {
	return $elm$core$Set$toList(
		$author$project$FormulaParser$collectVariableSet(ast));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$FormulaParser$evaluate = F2(
	function (ast, assignment) {
		switch (ast.$) {
			case 0:
				var name = ast.a;
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2($elm$core$Dict$get, name, assignment));
			case 1:
				var inner = ast.a;
				return !A2($author$project$FormulaParser$evaluate, inner, assignment);
			case 2:
				var left = ast.a;
				var right = ast.b;
				return A2($author$project$FormulaParser$evaluate, left, assignment) && A2($author$project$FormulaParser$evaluate, right, assignment);
			default:
				var left = ast.a;
				var right = ast.b;
				return A2($author$project$FormulaParser$evaluate, left, assignment) || A2($author$project$FormulaParser$evaluate, right, assignment);
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$FormulaParser$buildTruthTable = function (ast) {
	var vars = $author$project$FormulaParser$collectVariables(ast);
	var varCount = $elm$core$List$length(vars);
	var rowCount = A2($elm$core$Basics$pow, 2, varCount);
	var assignmentForMask = function (mask) {
		return $elm$core$Dict$fromList(
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, _var) {
						return _Utils_Tuple2(
							_var,
							A2($author$project$FormulaParser$bitAt, mask, (varCount - 1) - i));
					}),
				vars));
	};
	return A2(
		$elm$core$List$map,
		function (mask) {
			var assignment = assignmentForMask(mask);
			return {
				bD: assignment,
				cQ: A2($author$project$FormulaParser$evaluate, ast, assignment)
			};
		},
		A2($elm$core$List$range, 0, rowCount - 1));
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$FormulaParser$Not = function (a) {
	return {$: 1, a: a};
};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$ConstraintMap$anchorAt = F2(
	function (id, state) {
		return A2(
			$elm$core$Maybe$withDefault,
			{
				f: -1,
				cG: {c: 0, a: 0},
				aa: -1
			},
			$elm$core$List$head(
				A2($elm$core$List$drop, id, state.K)));
	});
var $elm$core$Basics$asin = _Basics_asin;
var $elm$core$Basics$atan2 = _Basics_atan2;
var $author$project$FormulaParser$Var = function (a) {
	return {$: 0, a: a};
};
var $author$project$ConstraintMap$addRegion = F3(
	function (info, point, state) {
		var id = $elm$core$List$length(state.aL);
		var anchor = {
			f: $elm$core$List$length(state.K),
			cG: point,
			aa: id
		};
		return _Utils_Tuple2(
			anchor.f,
			_Utils_update(
				state,
				{
					K: _Utils_ap(
						state.K,
						_List_fromArray(
							[anchor])),
					aL: _Utils_ap(
						state.aL,
						_List_fromArray(
							[info]))
				}));
	});
var $author$project$ConstraintMap$join = F3(
	function (a, b, state) {
		return _Utils_update(
			state,
			{
				ar: _Utils_ap(
					state.ar,
					_List_fromArray(
						[
							{J: a, T: b}
						]))
			});
	});
var $author$project$ConstraintMap$attach = F3(
	function (existing, point, state) {
		var source = A2($author$project$ConstraintMap$anchorAt, existing, state);
		var anchor = {
			f: $elm$core$List$length(state.K),
			cG: point,
			aa: source.aa
		};
		return _Utils_Tuple2(
			anchor.f,
			A3(
				$author$project$ConstraintMap$join,
				existing,
				anchor.f,
				_Utils_update(
					state,
					{
						K: _Utils_ap(
							state.K,
							_List_fromArray(
								[anchor]))
					})));
	});
var $author$project$ConstraintMap$expression = function (expr) {
	switch (expr.$) {
		case 0:
			var name = expr.a;
			return name;
		case 1:
			var child = expr.a;
			return '!(' + ($author$project$ConstraintMap$expression(child) + ')');
		case 2:
			var a = expr.a;
			var b = expr.b;
			return '(' + ($author$project$ConstraintMap$expression(a) + (' & ' + ($author$project$ConstraintMap$expression(b) + ')')));
		default:
			var a = expr.a;
			var b = expr.b;
			return '(' + ($author$project$ConstraintMap$expression(a) + (' | ' + ($author$project$ConstraintMap$expression(b) + ')')));
	}
};
var $author$project$ConstraintMap$kind = function (expr) {
	switch (expr.$) {
		case 0:
			return _Utils_Tuple2('INPUT', _List_Nil);
		case 1:
			switch (expr.a.$) {
				case 2:
					var _v1 = expr.a;
					var a = _v1.a;
					var b = _v1.b;
					return _Utils_Tuple2(
						'NAND',
						_List_fromArray(
							[a, b]));
				case 3:
					var _v2 = expr.a;
					var a = _v2.a;
					var b = _v2.b;
					return _Utils_Tuple2(
						'NOR',
						_List_fromArray(
							[a, b]));
				default:
					var child = expr.a;
					return _Utils_Tuple2(
						'NOT',
						_List_fromArray(
							[child]));
			}
		case 2:
			var a = expr.a;
			var b = expr.b;
			return _Utils_Tuple2(
				'AND',
				_List_fromArray(
					[a, b]));
		default:
			var a = expr.a;
			var b = expr.b;
			return _Utils_Tuple2(
				'OR',
				_List_fromArray(
					[a, b]));
	}
};
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$ConstraintMap$measure = function (expr) {
	var _v0 = $author$project$ConstraintMap$kind(expr);
	var gate = _v0.a;
	var children = _v0.b;
	var sizes = A2($elm$core$List$map, $author$project$ConstraintMap$measure, children);
	var childHeight = A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$List$maximum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.bl;
				},
				sizes)));
	var childWidth = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.bx;
			},
			sizes)) + (($elm$core$List$length(sizes) > 1) ? 70 : 0);
	var ownHeight = (gate === 'NOT') ? 125 : (((gate === 'NAND') || (gate === 'NOR')) ? 225 : 180);
	var ownWidth = (gate === 'NOT') ? 150 : 260;
	return (gate === 'INPUT') ? {bl: 0, bx: 110} : {
		bl: (childHeight + ((childHeight > 0) ? 70 : 0)) + ownHeight,
		bx: A2($elm$core$Basics$max, ownWidth, childWidth)
	};
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$ConstraintMap$buildTree = F4(
	function (expr, left, top, state) {
		var size = $author$project$ConstraintMap$measure(expr);
		var bare = {U: $elm$core$Maybe$Nothing, cg: '', bm: $elm$core$Maybe$Nothing};
		var _v0 = $author$project$ConstraintMap$kind(expr);
		var gate = _v0.a;
		var children = _v0.b;
		var first = A2(
			$elm$core$Maybe$withDefault,
			$author$project$FormulaParser$Var('a'),
			$elm$core$List$head(children));
		var second = A2(
			$elm$core$Maybe$withDefault,
			$author$project$FormulaParser$Var('b'),
			$elm$core$List$head(
				A2($elm$core$List$drop, 1, children)));
		var sizes = A2($elm$core$List$map, $author$project$ConstraintMap$measure, children);
		var childHeight = A2(
			$elm$core$Maybe$withDefault,
			0,
			$elm$core$List$maximum(
				A2(
					$elm$core$List$map,
					function ($) {
						return $.bl;
					},
					sizes)));
		var gateY = (top + childHeight) + ((childHeight > 0) ? 70 : 0);
		var child = F4(
			function (index, childExpr, terminal, state0) {
				if (!childExpr.$) {
					var name = childExpr.a;
					return A3(
						$author$project$ConstraintMap$addRegion,
						_Utils_update(
							bare,
							{
								cg: name,
								bm: $elm$core$Maybe$Just(name)
							}),
						terminal,
						state0);
				} else {
					var childSize = $author$project$ConstraintMap$measure(childExpr);
					var childLeft = ($elm$core$List$length(children) === 1) ? (left + ((size.bx - childSize.bx) / 2)) : ((!index) ? left : ((left + size.bx) - childSize.bx));
					var _v14 = A4($author$project$ConstraintMap$buildTree, childExpr, childLeft, (top + childHeight) - childSize.bl, state0);
					var out = _v14.a;
					var subtree = _v14.b;
					var _v15 = A3(
						$author$project$ConstraintMap$attach,
						out,
						{c: terminal.c, a: gateY - 20},
						subtree);
					var bend = _v15.a;
					var routed = _v15.b;
					return A3($author$project$ConstraintMap$attach, bend, terminal, routed);
				}
			});
		var gateX = left + ((size.bx - ((gate === 'NOT') ? 150 : 260)) / 2);
		var position = F2(
			function (dx, dy) {
				return {c: gateX + dx, a: gateY + dy};
			});
		var _v1 = A4(
			child,
			0,
			first,
			A2(position, 40, 35),
			state);
		var x = _v1.a;
		var withX = _v1.b;
		if (gate === 'NOT') {
			var _v2 = A3(
				$author$project$ConstraintMap$addRegion,
				_Utils_update(
					bare,
					{
						cg: $author$project$ConstraintMap$expression(expr)
					}),
				A2(position, 65, 85),
				withX);
			var out = _v2.a;
			var s1 = _v2.b;
			var _v3 = A3(
				$author$project$ConstraintMap$addRegion,
				_Utils_update(
					bare,
					{
						U: $elm$core$Maybe$Just(2)
					}),
				A2(position, 120, 85),
				s1);
			var neutral = _v3.a;
			var s2 = _v3.b;
			return _Utils_Tuple2(
				out,
				A3(
					$author$project$ConstraintMap$join,
					out,
					neutral,
					A3($author$project$ConstraintMap$join, x, out, s2)));
		} else {
			var palette = _Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple3(
						'x',
						2,
						_Utils_Tuple2(70, 20)),
						_Utils_Tuple3(
						'y',
						2,
						_Utils_Tuple2(170, 20)),
						_Utils_Tuple3(
						'and',
						2,
						_Utils_Tuple2(150, 158)),
						_Utils_Tuple3(
						'l',
						1,
						_Utils_Tuple2(8, 18)),
						_Utils_Tuple3(
						'r',
						1,
						_Utils_Tuple2(232, 18)),
						_Utils_Tuple3(
						'd1',
						0,
						_Utils_Tuple2(5, 155)),
						_Utils_Tuple3(
						'd2',
						0,
						_Utils_Tuple2(235, 155))
					]),
				((gate === 'NAND') || (gate === 'NOR')) ? _List_fromArray(
					[
						_Utils_Tuple3(
						'out',
						2,
						_Utils_Tuple2(170, 205))
					]) : _List_Nil);
			var nodes = _Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple3('s1', 80, 80),
						_Utils_Tuple3('s2', 160, 80),
						_Utils_Tuple3('d1', 20, 115),
						_Utils_Tuple3('d2', 220, 115),
						_Utils_Tuple3('l', 10, 55),
						_Utils_Tuple3('r', 230, 55),
						_Utils_Tuple3('and', 120, 130)
					]),
				((gate === 'NAND') || (gate === 'NOR')) ? _List_fromArray(
					[
						_Utils_Tuple3('out', 120, 195)
					]) : _List_Nil);
			var inverted = (gate === 'OR') || (gate === 'NOR');
			var edges = _Utils_ap(
				_List_fromArray(
					[
						_Utils_Tuple2('x', 's1'),
						_Utils_Tuple2('s1', 'and'),
						_Utils_Tuple2('y', 's2'),
						_Utils_Tuple2('s2', 'and'),
						_Utils_Tuple2('s1', 's2'),
						_Utils_Tuple2('l', 'x'),
						_Utils_Tuple2('l', 'd1'),
						_Utils_Tuple2('d1', 'and'),
						_Utils_Tuple2('r', 'y'),
						_Utils_Tuple2('r', 'd2'),
						_Utils_Tuple2('d2', 'and')
					]),
				((gate === 'NAND') || (gate === 'NOR')) ? _List_fromArray(
					[
						_Utils_Tuple2('and', 'out')
					]) : _List_Nil);
			var addNode = F2(
				function (_v11, _v12) {
					var name = _v11.a;
					var px = _v11.b;
					var py = _v11.c;
					var known = _v12.a;
					var acc = _v12.b;
					var isOutput = ((gate === 'NAND') || (gate === 'NOR')) ? (name === 'out') : (name === 'and');
					var _v10 = A3(
						$author$project$ConstraintMap$addRegion,
						_Utils_update(
							bare,
							{
								cg: isOutput ? $author$project$ConstraintMap$expression(expr) : ''
							}),
						A2(position, px, py),
						acc);
					var id = _v10.a;
					var next = _v10.b;
					return _Utils_Tuple2(
						A3($elm$core$Dict$insert, name, id, known),
						next);
				});
			var _v4 = A4(
				child,
				1,
				second,
				A2(position, 200, 35),
				withX);
			var y = _v4.a;
			var withY = _v4.b;
			var _v5 = A3(
				$elm$core$List$foldl,
				addNode,
				_Utils_Tuple2(
					$elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2('x', x),
								_Utils_Tuple2('y', y)
							])),
					withY),
				nodes);
			var ids = _v5.a;
			var withNodes = _v5.b;
			var get = function (name) {
				return A2(
					$elm$core$Maybe$withDefault,
					x,
					A2($elm$core$Dict$get, name, ids));
			};
			var addClue = F2(
				function (_v8, acc) {
					var name = _v8.a;
					var color = _v8.b;
					var _v9 = _v8.c;
					var px = _v9.a;
					var py = _v9.b;
					var actual = (inverted && (color !== 2)) ? (1 - color) : color;
					var _v7 = A3(
						$author$project$ConstraintMap$addRegion,
						_Utils_update(
							bare,
							{
								U: $elm$core$Maybe$Just(actual)
							}),
						A2(position, px, py),
						acc);
					var id = _v7.a;
					var next = _v7.b;
					return A3(
						$author$project$ConstraintMap$join,
						get(name),
						id,
						next);
				});
			var connected = A3(
				$elm$core$List$foldl,
				function (_v6) {
					var a = _v6.a;
					var b = _v6.b;
					return A2(
						$author$project$ConstraintMap$join,
						get(a),
						get(b));
				},
				withNodes,
				edges);
			var completed = A3($elm$core$List$foldl, addClue, connected, palette);
			return _Utils_Tuple2(
				get(
					((gate === 'NAND') || (gate === 'NOR')) ? 'out' : 'and'),
				completed);
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$ConstraintMap$distance = F2(
	function (a, b) {
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, a.c - b.c, 2) + A2($elm$core$Basics$pow, a.a - b.a, 2));
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Basics$sin = _Basics_sin;
var $author$project$ConstraintMap$noise = function (x) {
	var n = $elm$core$Basics$sin(x) * 43758.5453;
	return n - $elm$core$Basics$floor(n);
};
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$ConstraintMap$segmentDistance = F3(
	function (p, a, b) {
		var dy = b.a - a.a;
		var dx = b.c - a.c;
		var t = A3(
			$elm$core$Basics$clamp,
			0,
			1,
			(((p.c - a.c) * dx) + ((p.a - a.a) * dy)) / A2($elm$core$Basics$max, 0.000001, (dx * dx) + (dy * dy)));
		return A2(
			$author$project$ConstraintMap$distance,
			p,
			{c: a.c + (t * dx), a: a.a + (t * dy)});
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$Basics$round = _Basics_round;
var $author$project$ConstraintMap$key = function (p) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(p.c * 1000000)) + (',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(p.a * 1000000)));
};
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$ConstraintMap$union = function (polygons) {
	var addEdge = F2(
		function (_v5, acc) {
			var a = _v5.a;
			var b = _v5.b;
			var kb = $author$project$ConstraintMap$key(b);
			var ka = $author$project$ConstraintMap$key(a);
			var edgeKey = (_Utils_cmp(ka, kb) < 0) ? (ka + ('/' + kb)) : (kb + ('/' + ka));
			return _Utils_eq(ka, kb) ? acc : (A2($elm$core$Dict$member, edgeKey, acc) ? A2($elm$core$Dict$remove, edgeKey, acc) : A3(
				$elm$core$Dict$insert,
				edgeKey,
				_Utils_Tuple2(a, b),
				acc));
		});
	var addPolygon = F2(
		function (poly, acc) {
			return A3(
				$elm$core$List$foldl,
				addEdge,
				acc,
				A3(
					$elm$core$List$map2,
					$elm$core$Tuple$pair,
					poly,
					_Utils_ap(
						A2($elm$core$List$drop, 1, poly),
						A2($elm$core$List$take, 1, poly))));
		});
	var edges = $elm$core$Dict$values(
		A3($elm$core$List$foldl, addPolygon, $elm$core$Dict$empty, polygons));
	var outgoing = $elm$core$Dict$fromList(
		A2(
			$elm$core$List$map,
			function (_v4) {
				var a = _v4.a;
				var b = _v4.b;
				return _Utils_Tuple2(
					$author$project$ConstraintMap$key(a),
					_Utils_Tuple2(a, b));
			},
			edges));
	var walk = F3(
		function (current, remaining, result) {
			walk:
			while (true) {
				if (remaining <= 0) {
					return $elm$core$List$reverse(result);
				} else {
					var _v0 = A2($elm$core$Dict$get, current, outgoing);
					if (_v0.$ === 1) {
						return $elm$core$List$reverse(result);
					} else {
						var _v1 = _v0.a;
						var a = _v1.a;
						var b = _v1.b;
						var $temp$current = $author$project$ConstraintMap$key(b),
							$temp$remaining = remaining - 1,
							$temp$result = A2($elm$core$List$cons, a, result);
						current = $temp$current;
						remaining = $temp$remaining;
						result = $temp$result;
						continue walk;
					}
				}
			}
		});
	if (!edges.b) {
		return _List_Nil;
	} else {
		var _v3 = edges.a;
		var start = _v3.a;
		return A3(
			walk,
			$author$project$ConstraintMap$key(start),
			$elm$core$List$length(edges),
			_List_Nil);
	}
};
var $author$project$ConstraintMap$unique = function (list) {
	return $elm$core$Dict$keys(
		$elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (id) {
					return _Utils_Tuple2(id, 0);
				},
				list)));
};
var $author$project$ConstraintMap$buildCells = F3(
	function (organic, seed, source) {
		var other = F2(
			function (id, edge) {
				return _Utils_eq(edge.J, id) ? edge.T : edge.J;
			});
		var expr = function () {
			if (!source.$) {
				return $author$project$FormulaParser$Not(
					$author$project$FormulaParser$Not(source));
			} else {
				return source;
			}
		}();
		var size = $author$project$ConstraintMap$measure(expr);
		var _v0 = A4(
			$author$project$ConstraintMap$buildTree,
			expr,
			25,
			25,
			{K: _List_Nil, ar: _List_Nil, aL: _List_Nil});
		var outputAnchor = _v0.a;
		var network = _v0.b;
		var anchors = network.K;
		var incident = function (id) {
			return A2(
				$elm$core$List$filter,
				function (edge) {
					return _Utils_eq(edge.J, id) || _Utils_eq(edge.T, id);
				},
				network.ar);
		};
		var point = function (id) {
			return A2($author$project$ConstraintMap$anchorAt, id, network).cG;
		};
		var angle = F2(
			function (id, edge) {
				var b = point(
					A2(other, id, edge));
				var a = point(id);
				return A2($elm$core$Basics$atan2, b.a - a.a, b.c - a.c);
			});
		var gap = F2(
			function (id, edge) {
				return A2(
					$elm$core$Maybe$withDefault,
					2 * $elm$core$Basics$pi,
					$elm$core$List$minimum(
						A2(
							$elm$core$List$map,
							function (e) {
								var delta = $elm$core$Basics$abs(
									A2(angle, id, e) - A2(angle, id, edge));
								return A2($elm$core$Basics$min, delta, (2 * $elm$core$Basics$pi) - delta);
							},
							A2(
								$elm$core$List$filter,
								$elm$core$Basics$neq(edge),
								incident(id)))));
			});
		var clearance = function (anchor) {
			var others = A2(
				$elm$core$List$map,
				function (a) {
					return A2($author$project$ConstraintMap$distance, anchor.cG, a.cG);
				},
				A2(
					$elm$core$List$filter,
					function (a) {
						return !_Utils_eq(a.f, anchor.f);
					},
					anchors));
			var lines = A2(
				$elm$core$List$map,
				function (e) {
					return A3(
						$author$project$ConstraintMap$segmentDistance,
						anchor.cG,
						point(e.J),
						point(e.T));
				},
				A2(
					$elm$core$List$filter,
					function (e) {
						return (!_Utils_eq(e.J, anchor.f)) && (!_Utils_eq(e.T, anchor.f));
					},
					network.ar));
			return A2(
				$elm$core$Basics$min,
				organic ? 24 : 17,
				(organic ? 0.44 : 0.32) * A2(
					$elm$core$Maybe$withDefault,
					40,
					$elm$core$List$minimum(
						_Utils_ap(others, lines))));
		};
		var radii = $elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (anchor) {
					return _Utils_Tuple2(
						anchor.f,
						clearance(anchor) * (0.91 + (0.08 * $author$project$ConstraintMap$noise((seed * 97) + (anchor.f * 23)))));
				},
				anchors));
		var radius = function (id) {
			return A2(
				$elm$core$Maybe$withDefault,
				1,
				A2($elm$core$Dict$get, id, radii));
		};
		var width = function (edge) {
			return A2(
				$elm$core$Basics$min,
				radius(edge.J) * A2(
					$elm$core$Basics$min,
					organic ? 0.68 : 0.45,
					$elm$core$Basics$sin(
						A2(
							$elm$core$Basics$min,
							$elm$core$Basics$pi / 2,
							A2(gap, edge.J, edge) / 3))),
				radius(edge.T) * A2(
					$elm$core$Basics$min,
					organic ? 0.68 : 0.45,
					$elm$core$Basics$sin(
						A2(
							$elm$core$Basics$min,
							$elm$core$Basics$pi / 2,
							A2(gap, edge.T, edge) / 3))));
		};
		var pieces = function (anchor) {
			var sorted = A2(
				$elm$core$List$sortBy,
				angle(anchor.f),
				incident(anchor.f));
			var r = radius(anchor.f);
			var onCircle = function (theta) {
				var radial = organic ? (r * (0.94 + (0.06 * $elm$core$Basics$sin((3 * theta) + (seed + anchor.f))))) : r;
				return {
					c: anchor.cG.c + (radial * $elm$core$Basics$cos(theta)),
					a: anchor.cG.a + (radial * $elm$core$Basics$sin(theta))
				};
			};
			var section = F2(
				function (edge, next) {
					var theta = A2(angle, anchor.f, edge);
					var nextTheta = A2(angle, anchor.f, next);
					var nextAlpha = $elm$core$Basics$asin(
						A2(
							$elm$core$Basics$min,
							0.99,
							width(next) / A2($elm$core$Basics$max, 0.000001, r)));
					var half = width(edge);
					var finish = ((_Utils_cmp(nextTheta, theta) < 1) ? (nextTheta + (2 * $elm$core$Basics$pi)) : nextTheta) - nextAlpha;
					var b = point(
						A2(other, anchor.f, edge));
					var alpha = $elm$core$Basics$asin(
						A2(
							$elm$core$Basics$min,
							0.99,
							half / A2($elm$core$Basics$max, 0.000001, r)));
					var begin = theta + alpha;
					var samples = A2(
						$elm$core$Basics$max,
						2,
						$elm$core$Basics$ceiling((finish - begin) / ($elm$core$Basics$pi / 12)));
					var a = anchor.cG;
					var mid = {c: (a.c + b.c) / 2, a: (a.a + b.a) / 2};
					var cap = function (sign) {
						return {
							c: mid.c - ((sign * $elm$core$Basics$sin(theta)) * half),
							a: mid.a + ((sign * $elm$core$Basics$cos(theta)) * half)
						};
					};
					return _Utils_ap(
						_List_fromArray(
							[
								onCircle(theta - alpha),
								cap(-1),
								cap(1)
							]),
						A2(
							$elm$core$List$map,
							function (i) {
								return onCircle(begin + (((finish - begin) * i) / samples));
							},
							A2($elm$core$List$range, 0, samples)));
				});
			if (!sorted.b) {
				return A2(
					$elm$core$List$map,
					function (i) {
						return onCircle(((2 * $elm$core$Basics$pi) * i) / 24);
					},
					A2($elm$core$List$range, 0, 23));
			} else {
				var first = sorted.a;
				return $elm$core$List$concat(
					A3(
						$elm$core$List$map2,
						section,
						sorted,
						_Utils_ap(
							A2($elm$core$List$drop, 1, sorted),
							_List_fromArray(
								[first]))));
			}
		};
		var regions = A2(
			$elm$core$List$indexedMap,
			F2(
				function (id, info) {
					var neighbors = $author$project$ConstraintMap$unique(
						A2(
							$elm$core$List$filterMap,
							function (e) {
								var b = A2($author$project$ConstraintMap$anchorAt, e.T, network).aa;
								var a = A2($author$project$ConstraintMap$anchorAt, e.J, network).aa;
								return (_Utils_eq(a, id) && (!_Utils_eq(b, id))) ? $elm$core$Maybe$Just(b) : ((_Utils_eq(b, id) && (!_Utils_eq(a, id))) ? $elm$core$Maybe$Just(a) : $elm$core$Maybe$Nothing);
							},
							network.ar));
					var members = A2(
						$elm$core$List$filter,
						function (a) {
							return _Utils_eq(a.aa, id);
						},
						anchors);
					var polygons = A2($elm$core$List$map, pieces, members);
					var center = A2(
						$elm$core$Maybe$withDefault,
						{c: 0, a: 0},
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.cG;
							},
							$elm$core$List$head(members)));
					return {
						af: center,
						U: info.U,
						cg: info.cg,
						f: id,
						bm: info.bm,
						I: neighbors,
						a3: $author$project$ConstraintMap$union(polygons)
					};
				}),
			network.aL);
		var output = A2($author$project$ConstraintMap$anchorAt, outputAnchor, network).aa;
		return {bl: size.bl + 50, bs: output, m: regions, bx: size.bx + 50};
	});
var $author$project$ConstraintMap$buildOrganic = $author$project$ConstraintMap$buildCells(true);
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$CellNetwork$adjacent = F3(
	function (diagonal, grid, index) {
		var y = (index / grid.e) | 0;
		var x = A2($elm$core$Basics$modBy, grid.e, index);
		var offsets = diagonal ? _List_fromArray(
			[
				_Utils_Tuple2(0, -1),
				_Utils_Tuple2(1, 0),
				_Utils_Tuple2(0, 1),
				_Utils_Tuple2(-1, 0),
				_Utils_Tuple2(1, -1),
				_Utils_Tuple2(1, 1),
				_Utils_Tuple2(-1, 1),
				_Utils_Tuple2(-1, -1)
			]) : _List_fromArray(
			[
				_Utils_Tuple2(0, -1),
				_Utils_Tuple2(1, 0),
				_Utils_Tuple2(0, 1),
				_Utils_Tuple2(-1, 0)
			]);
		return A2(
			$elm$core$List$filterMap,
			function (_v0) {
				var dx = _v0.a;
				var dy = _v0.b;
				return (((x + dx) >= 0) && ((_Utils_cmp(x + dx, grid.e) < 0) && (((y + dy) >= 0) && (_Utils_cmp(y + dy, grid.ab) < 0)))) ? $elm$core$Maybe$Just((((y + dy) * grid.e) + x) + dx) : $elm$core$Maybe$Nothing;
			},
			offsets);
	});
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$CellNetwork$owner = F2(
	function (grid, index) {
		return A2(
			$elm$core$Maybe$withDefault,
			-1,
			A2($elm$core$Array$get, index, grid.g));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$Array$toIndexedList = function (array) {
	var len = array.a;
	var helper = F2(
		function (entry, _v0) {
			var index = _v0.a;
			var list = _v0.b;
			return _Utils_Tuple2(
				index - 1,
				A2(
					$elm$core$List$cons,
					_Utils_Tuple2(index, entry),
					list));
		});
	return A3(
		$elm$core$Array$foldr,
		helper,
		_Utils_Tuple2(len - 1, _List_Nil),
		array).b;
};
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$CellNetwork$adjacency = function (grid) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, result) {
				var i = _v0.a;
				var id = _v0.b;
				return (id < 0) ? result : A3(
					$elm$core$List$foldl,
					F2(
						function (n, acc) {
							var other = A2($author$project$CellNetwork$owner, grid, n);
							return ((other < 0) || _Utils_eq(other, id)) ? acc : A3(
								$elm$core$Dict$update,
								id,
								function (old) {
									return $elm$core$Maybe$Just(
										A2(
											$elm$core$Set$insert,
											other,
											A2($elm$core$Maybe$withDefault, $elm$core$Set$empty, old)));
								},
								acc);
						}),
					result,
					A3($author$project$CellNetwork$adjacent, false, grid, i));
			}),
		$elm$core$Dict$empty,
		$elm$core$Array$toIndexedList(grid.g));
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $author$project$CellNetwork$boundary = F3(
	function (grid, _v0, all) {
		var index = _v0.a;
		var id = _v0.b;
		if (id < 0) {
			return all;
		} else {
			var y = (index / grid.e) | 0;
			var x = A2($elm$core$Basics$modBy, grid.e, index);
			var vertex = F2(
				function (a, b) {
					return (b * (grid.e + 1)) + a;
				});
			var side = F4(
				function (isBoundary, a, b, acc) {
					return isBoundary ? A3(
						$elm$core$Dict$update,
						a,
						function (old) {
							return $elm$core$Maybe$Just(
								A2(
									$elm$core$List$cons,
									b,
									A2($elm$core$Maybe$withDefault, _List_Nil, old)));
						},
						acc) : acc;
				});
			var add = function (current) {
				return A4(
					side,
					(!x) || (!_Utils_eq(
						A2($author$project$CellNetwork$owner, grid, index - 1),
						id)),
					A2(vertex, x, y + 1),
					A2(vertex, x, y),
					A4(
						side,
						_Utils_eq(y, grid.ab - 1) || (!_Utils_eq(
							A2($author$project$CellNetwork$owner, grid, index + grid.e),
							id)),
						A2(vertex, x + 1, y + 1),
						A2(vertex, x, y + 1),
						A4(
							side,
							_Utils_eq(x, grid.e - 1) || (!_Utils_eq(
								A2($author$project$CellNetwork$owner, grid, index + 1),
								id)),
							A2(vertex, x + 1, y),
							A2(vertex, x + 1, y + 1),
							A4(
								side,
								(!y) || (!_Utils_eq(
									A2($author$project$CellNetwork$owner, grid, index - grid.e),
									id)),
								A2(vertex, x, y),
								A2(vertex, x + 1, y),
								current))));
			};
			return A3(
				$elm$core$Dict$update,
				id,
				A2(
					$elm$core$Basics$composeR,
					$elm$core$Maybe$withDefault($elm$core$Dict$empty),
					A2($elm$core$Basics$composeR, add, $elm$core$Maybe$Just)),
				all);
		}
	});
var $author$project$CellNetwork$boundaryConnections = function (boundaries) {
	var add = F2(
		function (a, b) {
			return A2(
				$elm$core$Dict$update,
				a,
				function (old) {
					return $elm$core$Maybe$Just(
						A2(
							$elm$core$Set$insert,
							b,
							A2($elm$core$Maybe$withDefault, $elm$core$Set$empty, old)));
				});
		});
	return A3(
		$elm$core$Dict$foldl,
		F3(
			function (_v0, edges, acc) {
				return A3(
					$elm$core$Dict$foldl,
					F3(
						function (a, ends, current) {
							return A3(
								$elm$core$List$foldl,
								F2(
									function (b, next) {
										return A3(
											add,
											b,
											a,
											A3(add, a, b, next));
									}),
								current,
								ends);
						}),
					acc,
					edges);
			}),
		$elm$core$Dict$empty,
		boundaries);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $author$project$CellNetwork$coalesce = function (map) {
	var key = function (region) {
		var _v4 = region.U;
		if (!_v4.$) {
			var c = _v4.a;
			return 'palette:' + $elm$core$String$fromInt(c);
		} else {
			var _v5 = region.bm;
			if (!_v5.$) {
				var name = _v5.a;
				return 'input:' + name;
			} else {
				return 'node:' + $elm$core$String$fromInt(region.f);
			}
		}
	};
	var collect = F2(
		function (region, _v3) {
			var known = _v3.a;
			var regions = _v3.b;
			var aliases = _v3.c;
			var _v2 = A2(
				$elm$core$Dict$get,
				key(region),
				known);
			if (!_v2.$) {
				var id = _v2.a;
				return _Utils_Tuple3(
					known,
					regions,
					A3($elm$core$Dict$insert, region.f, id, aliases));
			} else {
				var id = $elm$core$List$length(regions);
				return _Utils_Tuple3(
					A3(
						$elm$core$Dict$insert,
						key(region),
						id,
						known),
					_Utils_ap(
						regions,
						_List_fromArray(
							[
								_Utils_update(
								region,
								{f: id})
							])),
					A3($elm$core$Dict$insert, region.f, id, aliases));
			}
		});
	var _v0 = A3(
		$elm$core$List$foldl,
		collect,
		_Utils_Tuple3($elm$core$Dict$empty, _List_Nil, $elm$core$Dict$empty),
		map.m);
	var grouped = _v0.b;
	var aliasMap = _v0.c;
	var alias = function (id) {
		return A2(
			$elm$core$Maybe$withDefault,
			-1,
			A2($elm$core$Dict$get, id, aliasMap));
	};
	var original = function (id) {
		return A2(
			$elm$core$List$filter,
			function (r) {
				return _Utils_eq(
					alias(r.f),
					id);
			},
			map.m);
	};
	var neighbors = function (region) {
		var otherPalette = function () {
			var _v1 = region.U;
			if (_v1.$ === 1) {
				return _List_Nil;
			} else {
				var c = _v1.a;
				return A2(
					$elm$core$List$map,
					function ($) {
						return $.f;
					},
					A2(
						$elm$core$List$filter,
						function (r) {
							return (!_Utils_eq(r.U, $elm$core$Maybe$Nothing)) && (!_Utils_eq(
								r.U,
								$elm$core$Maybe$Just(c)));
						},
						grouped));
			}
		}();
		var constrained = A2(
			$elm$core$List$map,
			alias,
			A2(
				$elm$core$List$concatMap,
				function ($) {
					return $.I;
				},
				original(region.f)));
		return _Utils_update(
			region,
			{
				I: $elm$core$Set$toList(
					A2(
						$elm$core$Set$remove,
						region.f,
						$elm$core$Set$fromList(
							_Utils_ap(constrained, otherPalette))))
			});
	};
	return _Utils_Tuple2(
		_Utils_update(
			map,
			{
				bs: alias(map.bs),
				m: A2($elm$core$List$map, neighbors, grouped)
			}),
		aliasMap);
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === -2) {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$core$Set$size = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$size(dict);
};
var $author$project$CellNetwork$vertexPoint = F2(
	function (grid, key) {
		return {
			c: A2($elm$core$Basics$modBy, grid.e + 1, key) * grid.A,
			a: ((key / (grid.e + 1)) | 0) * grid.B
		};
	});
var $author$project$CellNetwork$collapseJunctions = F3(
	function (grid, positions, connections) {
		var flood = F2(
			function (front, visited) {
				flood:
				while (true) {
					if (!front.b) {
						return visited;
					} else {
						var index = front.a;
						var rest = front.b;
						var next = A2(
							$elm$core$List$filter,
							function (n) {
								return (A2($author$project$CellNetwork$owner, grid, n) < 0) && (!A2($elm$core$Set$member, n, visited));
							},
							A3($author$project$CellNetwork$adjacent, false, grid, index));
						var $temp$front = _Utils_ap(next, rest),
							$temp$visited = A3($elm$core$List$foldl, $elm$core$Set$insert, visited, next);
						front = $temp$front;
						visited = $temp$visited;
						continue flood;
					}
				}
			});
		var collapse = F2(
			function (index, _v2) {
				var seen = _v2.a;
				var vertices = _v2.b;
				var links = _v2.c;
				if ((A2($author$project$CellNetwork$owner, grid, index) >= 0) || A2($elm$core$Set$member, index, seen)) {
					return _Utils_Tuple3(seen, vertices, links);
				} else {
					var pixels = A2(
						flood,
						_List_fromArray(
							[index]),
						$elm$core$Set$singleton(index));
					var small = $elm$core$Set$size(pixels) <= 16;
					var mean = function (values) {
						return $elm$core$List$sum(values) / $elm$core$List$length(values);
					};
					var corners = $elm$core$Set$toList(
						$elm$core$Set$fromList(
							A2(
								$elm$core$List$concatMap,
								function (pixel) {
									var y = (pixel / grid.e) | 0;
									var x = A2($elm$core$Basics$modBy, grid.e, pixel);
									var v = F2(
										function (a, b) {
											return (b * (grid.e + 1)) + a;
										});
									return _List_fromArray(
										[
											A2(v, x, y),
											A2(v, x + 1, y),
											A2(v, x, y + 1),
											A2(v, x + 1, y + 1)
										]);
								},
								$elm$core$Set$toList(pixels))));
					var points = A2(
						$elm$core$List$map,
						$author$project$CellNetwork$vertexPoint(grid),
						corners);
					var xs = A2(
						$elm$core$List$map,
						function ($) {
							return $.c;
						},
						points);
					var ys = A2(
						$elm$core$List$map,
						function ($) {
							return $.a;
						},
						points);
					var anchored = F2(
						function (values, edge) {
							return A2($elm$core$List$member, 0, values) ? 0 : (A2($elm$core$List$member, edge, values) ? edge : mean(values));
						});
					var point = {
						c: A2(anchored, xs, grid.e * grid.A),
						a: A2(anchored, ys, grid.ab * grid.B)
					};
					return small ? _Utils_Tuple3(
						A2($elm$core$Set$union, seen, pixels),
						A3(
							$elm$core$List$foldl,
							function (v) {
								return A2($elm$core$Dict$insert, v, point);
							},
							vertices,
							corners),
						A3(
							$elm$core$List$foldl,
							function (v) {
								return A2(
									$elm$core$Dict$insert,
									v,
									$elm$core$Set$fromList(
										_List_fromArray(
											[-1, -2, -3])));
							},
							links,
							corners)) : _Utils_Tuple3(
						A2($elm$core$Set$union, seen, pixels),
						vertices,
						links);
				}
			});
		var _v1 = A3(
			$elm$core$List$foldl,
			collapse,
			_Utils_Tuple3($elm$core$Set$empty, positions, connections),
			A2(
				$elm$core$List$range,
				0,
				$elm$core$Array$length(grid.g) - 1));
		var result = _v1.b;
		var network = _v1.c;
		return _Utils_Tuple2(result, network);
	});
var $author$project$CellNetwork$contourArea = function (points) {
	return function (value) {
		return value / 2;
	}(
		$elm$core$List$sum(
			A3(
				$elm$core$List$map2,
				F2(
					function (a, b) {
						return (a.c * b.a) - (b.c * a.a);
					}),
				points,
				_Utils_ap(
					A2($elm$core$List$drop, 1, points),
					A2($elm$core$List$take, 1, points)))));
};
var $author$project$CellNetwork$curveCorner = F6(
	function (grid, connections, positions, before, current, after) {
		var position = function (v) {
			return A2(
				$elm$core$Maybe$withDefault,
				A2($author$project$CellNetwork$vertexPoint, grid, v),
				A2($elm$core$Dict$get, v, positions));
		};
		var p = position(current);
		var midpoint = F2(
			function (u, v) {
				return {c: (u.c + v.c) / 2, a: (u.a + v.a) / 2};
			});
		var b = position(after);
		var a = position(before);
		var rounded = _Utils_eq(
			A2(
				$elm$core$Maybe$map,
				$elm$core$Set$size,
				A2($elm$core$Dict$get, current, connections)),
			$elm$core$Maybe$Just(2)) && ((p.c > 0.000001) && ((p.a > 0.000001) && ((_Utils_cmp(p.c, (grid.e * grid.A) - 0.000001) < 0) && ((_Utils_cmp(p.a, (grid.ab * grid.B) - 0.000001) < 0) && ($elm$core$Basics$abs(((p.c - a.c) * (b.a - p.a)) - ((p.a - a.a) * (b.c - p.c))) > 0.000001)))));
		return rounded ? {
			bh: $elm$core$Maybe$Just(p),
			W: A2(midpoint, a, p),
			as: A2(midpoint, p, b)
		} : {bh: $elm$core$Maybe$Nothing, W: p, as: p};
	});
var $elm$core$List$map3 = _List_map3;
var $author$project$CellNetwork$curveContour = F4(
	function (grid, connections, positions, loop) {
		var sample = function (piece) {
			var _v0 = piece.bh;
			if (_v0.$ === 1) {
				return _List_fromArray(
					[piece.W]);
			} else {
				var p = _v0.a;
				return A2(
					$elm$core$List$map,
					function (i) {
						var t = i / 8;
						var u = 1 - t;
						return {c: (((u * u) * piece.W.c) + (((2 * u) * t) * p.c)) + ((t * t) * piece.as.c), a: (((u * u) * piece.W.a) + (((2 * u) * t) * p.a)) + ((t * t) * piece.as.a)};
					},
					A2($elm$core$List$range, 0, 8));
			}
		};
		return A2(
			$elm$core$List$concatMap,
			sample,
			A4(
				$elm$core$List$map3,
				A3($author$project$CellNetwork$curveCorner, grid, connections, positions),
				_Utils_ap(
					A2(
						$elm$core$List$drop,
						$elm$core$List$length(loop) - 1,
						loop),
					A2(
						$elm$core$List$take,
						$elm$core$List$length(loop) - 1,
						loop)),
				loop,
				_Utils_ap(
					A2($elm$core$List$drop, 1, loop),
					A2($elm$core$List$take, 1, loop))));
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$CellNetwork$curvedOutline = F4(
	function (grid, connections, positions, loops) {
		var point = function (p) {
			return $elm$core$String$fromFloat(p.c) + (' ' + $elm$core$String$fromFloat(p.a));
		};
		var segment = F3(
			function (before, current, after) {
				var piece = A6($author$project$CellNetwork$curveCorner, grid, connections, positions, before, current, after);
				return {
					bF: function () {
						var _v2 = piece.bh;
						if (!_v2.$) {
							var p = _v2.a;
							return ' Q ' + (point(p) + (' ' + point(piece.as)));
						} else {
							return '';
						}
					}(),
					W: piece.W,
					as: piece.as
				};
			});
		var contour = function (vertices) {
			if (!vertices.b) {
				return '';
			} else {
				var pieces = A4(
					$elm$core$List$map3,
					segment,
					_Utils_ap(
						A2(
							$elm$core$List$drop,
							$elm$core$List$length(vertices) - 1,
							vertices),
						A2(
							$elm$core$List$take,
							$elm$core$List$length(vertices) - 1,
							vertices)),
					vertices,
					_Utils_ap(
						A2($elm$core$List$drop, 1, vertices),
						A2($elm$core$List$take, 1, vertices)));
				var _v1 = $elm$core$List$head(pieces);
				if (_v1.$ === 1) {
					return '';
				} else {
					var first = _v1.a;
					return 'M ' + (point(first.W) + (first.bF + ($elm$core$String$concat(
						A2(
							$elm$core$List$map,
							function (piece) {
								return ' L ' + (point(piece.W) + piece.bF);
							},
							A2($elm$core$List$drop, 1, pieces))) + ' Z')));
				}
			}
		};
		return A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, contour, loops));
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$LabLogic$colorAt = F2(
	function (colors, i) {
		return A2(
			$elm$core$Maybe$withDefault,
			-1,
			A2($elm$core$Array$get, i, colors));
	});
var $author$project$LabLogic$conflicts = F2(
	function (adjacency, colors) {
		return $elm$core$List$concat(
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (i, neighbors) {
						return A2(
							$elm$core$List$map,
							$elm$core$Tuple$pair(i),
							A2(
								$elm$core$List$filter,
								function (j) {
									return (_Utils_cmp(j, i) > 0) && ((A2($author$project$LabLogic$colorAt, colors, i) >= 0) && _Utils_eq(
										A2($author$project$LabLogic$colorAt, colors, i),
										A2($author$project$LabLogic$colorAt, colors, j)));
								},
								neighbors));
					}),
				adjacency));
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $author$project$LabLogic$Impossible = {$: 1};
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{t: nodeList, l: nodeListSize, p: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $author$project$LabLogic$LimitReached = {$: 2};
var $author$project$LabLogic$Solved = function (a) {
	return {$: 0, a: a};
};
var $author$project$LabLogic$search = F6(
	function (colorCount, variant, previous, adjacency, colors, budget) {
		if (budget <= 0) {
			return _Utils_Tuple2($author$project$LabLogic$LimitReached, 0);
		} else {
			var choices = A2(
				$elm$core$List$sortBy,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$length),
				A2(
					$elm$core$List$map,
					function (_v6) {
						var i = _v6.a;
						var neighbors = _v6.b;
						return _Utils_Tuple2(
							i,
							A2(
								$elm$core$List$filter,
								function (c) {
									return A2(
										$elm$core$List$all,
										function (j) {
											return !_Utils_eq(
												A2($author$project$LabLogic$colorAt, colors, j),
												c);
										},
										neighbors);
								},
								A2(
									$elm$core$List$sortBy,
									function (c) {
										return A2($elm$core$Basics$modBy, colorCount, c + (variant * (i + 1)));
									},
									A2($elm$core$List$range, 0, colorCount - 1))));
					},
					A2(
						$elm$core$List$filter,
						function (_v5) {
							var i = _v5.a;
							return A2($author$project$LabLogic$colorAt, colors, i) < 0;
						},
						$elm$core$Array$toIndexedList(adjacency))));
			var _v3 = $elm$core$List$head(choices);
			if (_v3.$ === 1) {
				return _Utils_Tuple2(
					_Utils_eq(
						previous,
						$elm$core$Maybe$Just(colors)) ? $author$project$LabLogic$Impossible : $author$project$LabLogic$Solved(colors),
					budget - 1);
			} else {
				var _v4 = _v3.a;
				var i = _v4.a;
				var available = _v4.b;
				return A8($author$project$LabLogic$tryColors, colorCount, variant, previous, adjacency, colors, i, available, budget - 1);
			}
		}
	});
var $author$project$LabLogic$tryColors = F8(
	function (colorCount, variant, previous, adjacency, colors, i, available, budget) {
		tryColors:
		while (true) {
			if (!available.b) {
				return _Utils_Tuple2($author$project$LabLogic$Impossible, budget);
			} else {
				var c = available.a;
				var rest = available.b;
				var _v1 = A6(
					$author$project$LabLogic$search,
					colorCount,
					variant,
					previous,
					adjacency,
					A3($elm$core$Array$set, i, c, colors),
					budget);
				if (_v1.a.$ === 1) {
					var _v2 = _v1.a;
					var remaining = _v1.b;
					var $temp$colorCount = colorCount,
						$temp$variant = variant,
						$temp$previous = previous,
						$temp$adjacency = adjacency,
						$temp$colors = colors,
						$temp$i = i,
						$temp$available = rest,
						$temp$budget = remaining;
					colorCount = $temp$colorCount;
					variant = $temp$variant;
					previous = $temp$previous;
					adjacency = $temp$adjacency;
					colors = $temp$colors;
					i = $temp$i;
					available = $temp$available;
					budget = $temp$budget;
					continue tryColors;
				} else {
					var other = _v1;
					return other;
				}
			}
		}
	});
var $author$project$LabLogic$solveWithColors = F4(
	function (colorCount, budget, adjacency, fixed) {
		var initial = A3(
			$elm$core$Dict$foldl,
			$elm$core$Array$set,
			A2(
				$elm$core$Array$repeat,
				$elm$core$List$length(adjacency),
				-1),
			fixed);
		return ((!$elm$core$List$isEmpty(
			A2($author$project$LabLogic$conflicts, adjacency, initial))) || A2(
			$elm$core$List$any,
			function (c) {
				return (c < 0) || (_Utils_cmp(c, colorCount) > -1);
			},
			$elm$core$Dict$values(fixed))) ? $author$project$LabLogic$Impossible : A6(
			$author$project$LabLogic$search,
			colorCount,
			0,
			$elm$core$Maybe$Nothing,
			$elm$core$Array$fromList(adjacency),
			initial,
			budget).a;
	});
var $author$project$LabLogic$solve = $author$project$LabLogic$solveWithColors(3);
var $author$project$PackingConstraints$validate = function (state) {
	var adjacency = A2(
		$elm$core$List$map,
		function ($) {
			return $.I;
		},
		state.a1.m);
	var search = function (witness) {
		var _v4 = A3($author$project$LabLogic$solve, 64, adjacency, witness.bI);
		if (!_v4.$) {
			var colors = _v4.a;
			return $elm$core$Maybe$Just(
				_Utils_update(
					witness,
					{dC: colors}));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var repair = function (witness) {
		var unset = A2(
			$elm$core$List$filter,
			function (_v3) {
				var c = _v3.b;
				return c < 0;
			},
			$elm$core$Array$toIndexedList(witness.dC));
		var fill = F2(
			function (_v2, colors) {
				var id = _v2.a;
				var ns = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$head(
						A2($elm$core$List$drop, id, adjacency)));
				var available = A2(
					$elm$core$List$filter,
					function (c) {
						return A2(
							$elm$core$List$all,
							function (n) {
								return !_Utils_eq(
									A2($elm$core$Array$get, n, colors),
									$elm$core$Maybe$Just(c));
							},
							ns);
					},
					_List_fromArray(
						[0, 1, 2]));
				return A3(
					$elm$core$Array$set,
					id,
					A2(
						$elm$core$Maybe$withDefault,
						-1,
						$elm$core$List$head(available)),
					colors);
			});
		var quick = A3($elm$core$List$foldl, fill, witness.dC, unset);
		return A2(
			$elm$core$List$all,
			function (c) {
				return c >= 0;
			},
			$elm$core$Array$toList(quick)) ? ($elm$core$List$isEmpty(
			A2($author$project$LabLogic$conflicts, adjacency, quick)) ? $elm$core$Maybe$Just(
			_Utils_update(
				witness,
				{dC: quick})) : search(witness)) : search(witness);
	};
	var repairAll = F2(
		function (remaining, verified) {
			repairAll:
			while (true) {
				if (!remaining.b) {
					return $elm$core$Maybe$Just(
						_Utils_update(
							state,
							{
								aU: $elm$core$List$reverse(verified)
							}));
				} else {
					var witness = remaining.a;
					var rest = remaining.b;
					var _v1 = repair(witness);
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var updated = _v1.a;
						var $temp$remaining = rest,
							$temp$verified = A2($elm$core$List$cons, updated, verified);
						remaining = $temp$remaining;
						verified = $temp$verified;
						continue repairAll;
					}
				}
			}
		});
	return A2(repairAll, state.aU, _List_Nil);
};
var $author$project$PackingConstraints$connect = F3(
	function (id, neighbors, state) {
		var edges = A2(
			$elm$core$List$filter,
			$elm$core$Basics$neq(id),
			neighbors);
		var regions = A2(
			$elm$core$List$map,
			function (r) {
				return _Utils_eq(r.f, id) ? _Utils_update(
					r,
					{
						I: $elm$core$Set$toList(
							$elm$core$Set$fromList(
								_Utils_ap(r.I, edges)))
					}) : (A2($elm$core$List$member, r.f, edges) ? _Utils_update(
					r,
					{
						I: $elm$core$Set$toList(
							A2(
								$elm$core$Set$insert,
								id,
								$elm$core$Set$fromList(r.I)))
					}) : r);
			},
			state.a1.m);
		return A2(
			$elm$core$List$all,
			function (n) {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						function (r) {
							return A2($elm$core$List$member, n, r.I);
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, id, state.a1.m))));
			},
			edges) ? $elm$core$Maybe$Just(state) : $author$project$PackingConstraints$validate(
			_Utils_update(
				state,
				{
					a1: function () {
						var map = state.a1;
						return _Utils_update(
							map,
							{m: regions});
					}()
				}));
	});
var $author$project$PackingConstraints$contact = F3(
	function (id, neighbors, state) {
		var key = $elm$core$String$fromInt(id) + (':' + A2(
			$elm$core$String$join,
			',',
			A2(
				$elm$core$List$map,
				$elm$core$String$fromInt,
				$elm$core$Set$toList(
					A2(
						$elm$core$Set$remove,
						id,
						$elm$core$Set$fromList(neighbors))))));
		if (A2($elm$core$Set$member, key, state.a4)) {
			return _Utils_Tuple2(state, $elm$core$Maybe$Nothing);
		} else {
			var _v0 = A3($author$project$PackingConstraints$connect, id, neighbors, state);
			if (!_v0.$) {
				var accepted = _v0.a;
				return _Utils_Tuple2(
					accepted,
					$elm$core$Maybe$Just(accepted));
			} else {
				return _Utils_Tuple2(
					_Utils_update(
						state,
						{
							a4: A2($elm$core$Set$insert, key, state.a4)
						}),
					$elm$core$Maybe$Nothing);
			}
		}
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $author$project$ConstraintMap$fixedInputs = F2(
	function (assignment, map) {
		return $elm$core$Dict$fromList(
			A2(
				$elm$core$List$filterMap,
				function (region) {
					var _v0 = region.U;
					if (!_v0.$) {
						var color = _v0.a;
						return $elm$core$Maybe$Just(
							_Utils_Tuple2(region.f, color));
					} else {
						return A2(
							$elm$core$Maybe$map,
							function (name) {
								return _Utils_Tuple2(
									region.f,
									_Utils_eq(
										A2($elm$core$Dict$get, name, assignment),
										$elm$core$Maybe$Just(true)) ? 1 : 0);
							},
							region.bm);
					}
				},
				map.m));
	});
var $author$project$PackingConstraints$initial = function (map) {
	var solve = function (assignment) {
		var fixed = A2($author$project$ConstraintMap$fixedInputs, assignment, map);
		var _v0 = A3(
			$author$project$LabLogic$solve,
			200000,
			A2(
				$elm$core$List$map,
				function ($) {
					return $.I;
				},
				map.m),
			fixed);
		if (!_v0.$) {
			var colors = _v0.a;
			return $elm$core$Maybe$Just(
				{dC: colors, bI: fixed});
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var names = $elm$core$Set$toList(
		$elm$core$Set$fromList(
			A2(
				$elm$core$List$filterMap,
				function ($) {
					return $.bm;
				},
				map.m)));
	var assignments = A3(
		$elm$core$List$foldl,
		F2(
			function (name, rows) {
				return A2(
					$elm$core$List$concatMap,
					function (row) {
						return _List_fromArray(
							[
								A3($elm$core$Dict$insert, name, false, row),
								A3($elm$core$Dict$insert, name, true, row)
							]);
					},
					rows);
			}),
		_List_fromArray(
			[$elm$core$Dict$empty]),
		names);
	var witnesses = A2($elm$core$List$filterMap, solve, assignments);
	return _Utils_eq(
		$elm$core$List$length(witnesses),
		$elm$core$List$length(assignments)) ? $elm$core$Maybe$Just(
		{a1: map, a4: $elm$core$Set$empty, aU: witnesses}) : $elm$core$Maybe$Nothing;
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === -2) {
		return true;
	} else {
		return false;
	}
};
var $author$project$CellNetwork$labelCenters = function (grid) {
	var point = function (i) {
		return {
			c: (A2($elm$core$Basics$modBy, grid.e, i) + 0.5) * grid.A,
			a: (((i / grid.e) | 0) + 0.5) * grid.B
		};
	};
	var loop = F4(
		function (front, back, distances, centers) {
			loop:
			while (true) {
				if (!front.b) {
					if ($elm$core$List$isEmpty(back)) {
						return centers;
					} else {
						var $temp$front = $elm$core$List$reverse(back),
							$temp$back = _List_Nil,
							$temp$distances = distances,
							$temp$centers = centers;
						front = $temp$front;
						back = $temp$back;
						distances = $temp$distances;
						centers = $temp$centers;
						continue loop;
					}
				} else {
					var i = front.a;
					var rest = front.b;
					var id = A2($author$project$CellNetwork$owner, grid, i);
					var next = A2(
						$elm$core$List$filter,
						function (n) {
							return _Utils_eq(
								A2($author$project$CellNetwork$owner, grid, n),
								id) && _Utils_eq(
								A2($elm$core$Array$get, n, distances),
								$elm$core$Maybe$Just(0));
						},
						A3($author$project$CellNetwork$adjacent, false, grid, i));
					var depth = A2(
						$elm$core$Maybe$withDefault,
						1,
						A2($elm$core$Array$get, i, distances));
					var updated = A3(
						$elm$core$List$foldl,
						F2(
							function (n, acc) {
								return A3($elm$core$Array$set, n, depth + 1, acc);
							}),
						distances,
						next);
					var best = A3(
						$elm$core$Dict$update,
						id,
						function (old) {
							return (_Utils_cmp(
								A2(
									$elm$core$Maybe$withDefault,
									0,
									A2(
										$elm$core$Maybe$map,
										function ($) {
											return $.bH;
										},
										old)),
								depth) < 0) ? $elm$core$Maybe$Just(
								{
									bH: depth,
									cG: point(i)
								}) : old;
						},
						centers);
					var $temp$front = rest,
						$temp$back = A3($elm$core$List$foldl, $elm$core$List$cons, back, next),
						$temp$distances = updated,
						$temp$centers = best;
					front = $temp$front;
					back = $temp$back;
					distances = $temp$distances;
					centers = $temp$centers;
					continue loop;
				}
			}
		});
	var border = F2(
		function (i, id) {
			return ($elm$core$List$length(
				A3($author$project$CellNetwork$adjacent, false, grid, i)) < 4) || A2(
				$elm$core$List$any,
				function (n) {
					return !_Utils_eq(
						A2($author$project$CellNetwork$owner, grid, n),
						id);
				},
				A3($author$project$CellNetwork$adjacent, false, grid, i));
		});
	var starts = A2(
		$elm$core$List$map,
		$elm$core$Tuple$first,
		A2(
			$elm$core$List$filter,
			function (_v1) {
				var i = _v1.a;
				var id = _v1.b;
				return (id >= 0) && A2(border, i, id);
			},
			$elm$core$Array$toIndexedList(grid.g)));
	var depths = A3(
		$elm$core$List$foldl,
		F2(
			function (i, acc) {
				return A3($elm$core$Array$set, i, 1, acc);
			}),
		A2(
			$elm$core$Array$repeat,
			$elm$core$Array$length(grid.g),
			0),
		starts);
	return A4(loop, starts, _List_Nil, depths, $elm$core$Dict$empty);
};
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $author$project$PackingConstraints$spacer = F3(
	function (center, neighbors, state) {
		var map = state.a1;
		var id = $elm$core$List$length(state.a1.m);
		var region = {af: center, U: $elm$core$Maybe$Nothing, cg: 'Packing cell', f: id, bm: $elm$core$Maybe$Nothing, I: _List_Nil, a3: _List_Nil};
		var expanded = _Utils_update(
			state,
			{
				a1: _Utils_update(
					map,
					{
						m: _Utils_ap(
							map.m,
							_List_fromArray(
								[region]))
					}),
				aU: A2(
					$elm$core$List$map,
					function (w) {
						return _Utils_update(
							w,
							{
								dC: A2($elm$core$Array$push, -1, w.dC)
							});
					},
					state.aU)
			});
		return A2(
			$elm$core$Maybe$map,
			function (result) {
				return _Utils_Tuple2(result, id);
			},
			A3($author$project$PackingConstraints$connect, id, neighbors, expanded));
	});
var $author$project$CellNetwork$territories = F4(
	function (source, seeded, contracted, grown) {
		var flood = F5(
			function (id, label, front, back, labels) {
				flood:
				while (true) {
					if (!front.b) {
						if ($elm$core$List$isEmpty(back)) {
							return labels;
						} else {
							var $temp$id = id,
								$temp$label = label,
								$temp$front = $elm$core$List$reverse(back),
								$temp$back = _List_Nil,
								$temp$labels = labels;
							id = $temp$id;
							label = $temp$label;
							front = $temp$front;
							back = $temp$back;
							labels = $temp$labels;
							continue flood;
						}
					} else {
						var index = front.a;
						var rest = front.b;
						var next = A2(
							$elm$core$List$filter,
							function (n) {
								return _Utils_eq(
									A2($author$project$CellNetwork$owner, grown, n),
									id) && _Utils_eq(
									A2($elm$core$Array$get, n, labels),
									$elm$core$Maybe$Just(-1));
							},
							A3($author$project$CellNetwork$adjacent, false, grown, index));
						var marked = A3(
							$elm$core$List$foldl,
							function (n) {
								return A2($elm$core$Array$set, n, label);
							},
							labels,
							next);
						var $temp$id = id,
							$temp$label = label,
							$temp$front = rest,
							$temp$back = A3($elm$core$List$foldl, $elm$core$List$cons, back, next),
							$temp$labels = marked;
						id = $temp$id;
						label = $temp$label;
						front = $temp$front;
						back = $temp$back;
						labels = $temp$labels;
						continue flood;
					}
				}
			});
		var collect = F2(
			function (_v3, _v4) {
				var index = _v3.a;
				var id = _v3.b;
				var labels = _v4.a;
				var regions = _v4.b;
				if ((id < 0) || (!_Utils_eq(
					A2($elm$core$Array$get, index, labels),
					$elm$core$Maybe$Just(-1)))) {
					return _Utils_Tuple2(labels, regions);
				} else {
					var label = $elm$core$List$length(regions);
					var marked = A5(
						flood,
						id,
						label,
						_List_fromArray(
							[index]),
						_List_Nil,
						A3($elm$core$Array$set, index, label, labels));
					var info = A2(
						$elm$core$Maybe$withDefault,
						{
							af: {c: 0, a: 0},
							U: $elm$core$Maybe$Nothing,
							cg: '',
							f: id,
							bm: $elm$core$Maybe$Nothing,
							I: _List_Nil,
							a3: _List_Nil
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, id, contracted.m)));
					return _Utils_Tuple2(
						marked,
						_Utils_ap(
							regions,
							_List_fromArray(
								[
									_Utils_update(
									info,
									{f: label})
								])));
				}
			});
		var _v1 = A3(
			$elm$core$List$foldl,
			collect,
			_Utils_Tuple2(
				A2(
					$elm$core$Array$repeat,
					$elm$core$Array$length(grown.g),
					-1),
				_List_Nil),
			$elm$core$Array$toIndexedList(grown.g));
		var owners = _v1.a;
		var packedRegions = _v1.b;
		var grid = _Utils_update(
			grown,
			{g: owners});
		var contacts = $author$project$CellNetwork$adjacency(grid);
		var originalCells = A3(
			$elm$core$List$foldl,
			F2(
				function (_v2, ids) {
					var index = _v2.a;
					var id = _v2.b;
					return (id < 0) ? ids : A3(
						$elm$core$Dict$insert,
						id,
						A2($author$project$CellNetwork$owner, grid, index),
						ids);
				}),
			$elm$core$Dict$empty,
			$elm$core$Array$toIndexedList(seeded.g));
		var cell = function (id) {
			return A2(
				$elm$core$Maybe$withDefault,
				-1,
				A2($elm$core$Dict$get, id, originalCells));
		};
		var preserved = A2(
			$elm$core$List$all,
			function (r) {
				return A2(
					$elm$core$List$all,
					function (n) {
						return _Utils_eq(
							cell(r.f),
							cell(n)) || A2(
							$elm$core$Set$member,
							cell(n),
							A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Set$empty,
								A2(
									$elm$core$Dict$get,
									cell(r.f),
									contacts)));
					},
					r.I);
			},
			source.m);
		var _final = _Utils_update(
			source,
			{
				bs: cell(source.bs),
				m: A2(
					$elm$core$List$map,
					function (r) {
						return _Utils_update(
							r,
							{
								I: $elm$core$Set$toList(
									A2(
										$elm$core$Maybe$withDefault,
										$elm$core$Set$empty,
										A2($elm$core$Dict$get, r.f, contacts)))
							});
					},
					packedRegions)
			});
		return _Utils_Tuple3(grid, _final, preserved);
	});
var $author$project$CellNetwork$fillPacking = F3(
	function (map, _protected, grid) {
		var _v0 = $author$project$PackingConstraints$initial(map);
		if (_v0.$ === 1) {
			return _Utils_Tuple2(grid, map);
		} else {
			var initial = _v0.a;
			var surrounding = F2(
				function (index, owners) {
					return A2(
						$elm$core$List$filterMap,
						function (n) {
							return A2(
								$elm$core$Maybe$andThen,
								function (id) {
									return (id < 0) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(id);
								},
								A2($elm$core$Array$get, n, owners));
						},
						A3($author$project$CellNetwork$adjacent, false, grid, index));
				});
			var palette = A2(
				$elm$core$List$map,
				function ($) {
					return $.f;
				},
				A2(
					$elm$core$List$sortBy,
					function (r) {
						return _Utils_eq(
							r.U,
							$elm$core$Maybe$Just(2)) ? 0 : 1;
					},
					A2(
						$elm$core$List$filter,
						function (r) {
							return !_Utils_eq(r.U, $elm$core$Maybe$Nothing);
						},
						map.m)));
			var donorSafe = F2(
				function (index, owners) {
					var donor = A2(
						$elm$core$Maybe$withDefault,
						-1,
						A2($elm$core$Array$get, index, owners));
					var required = A2(
						$elm$core$List$filter,
						function (n) {
							return _Utils_eq(
								A2($elm$core$Array$get, n, owners),
								$elm$core$Maybe$Just(donor));
						},
						A3($author$project$CellNetwork$adjacent, false, grid, index));
					var ring = A2(
						$elm$core$List$filter,
						function (n) {
							return _Utils_eq(
								A2($elm$core$Array$get, n, owners),
								$elm$core$Maybe$Just(donor));
						},
						A3($author$project$CellNetwork$adjacent, true, grid, index));
					var visit = F2(
						function (front, reached) {
							visit:
							while (true) {
								if (!front.b) {
									return reached;
								} else {
									var n = front.a;
									var rest = front.b;
									var next = A2(
										$elm$core$List$filter,
										function (k) {
											return A2($elm$core$List$member, k, ring) && (!A2($elm$core$Set$member, k, reached));
										},
										A3($author$project$CellNetwork$adjacent, false, grid, n));
									var $temp$front = _Utils_ap(rest, next),
										$temp$reached = A3($elm$core$List$foldl, $elm$core$Set$insert, reached, next);
									front = $temp$front;
									reached = $temp$reached;
									continue visit;
								}
							}
						});
					if (!required.b) {
						return true;
					} else {
						var first = required.a;
						var rest = required.b;
						return A2(
							$elm$core$List$all,
							function (n) {
								return A2(
									$elm$core$Set$member,
									n,
									A2(
										visit,
										_List_fromArray(
											[first]),
										$elm$core$Set$singleton(first)));
							},
							rest);
					}
				});
			var joinCorners = F2(
				function (current, graph) {
					var widen = F2(
						function (index, _v40) {
							var owners = _v40.a;
							var state = _v40.b;
							var changed = _v40.c;
							var id = A2(
								$elm$core$Maybe$withDefault,
								-1,
								A2($elm$core$Array$get, index, owners));
							var info = $elm$core$List$head(
								A2($elm$core$List$drop, id, state.a1.m));
							var mergeable = A2(
								$elm$core$Maybe$withDefault,
								false,
								A2(
									$elm$core$Maybe$map,
									function (r) {
										return (!_Utils_eq(r.U, $elm$core$Maybe$Nothing)) || (!_Utils_eq(r.bm, $elm$core$Maybe$Nothing));
									},
									info));
							var widenBetween = F2(
								function (other, _v39) {
									var latest = _v39.a;
									var model = _v39.b;
									var progress = _v39.c;
									var _try = F2(
										function (links, attempted) {
											_try:
											while (true) {
												if (!links.b) {
													return _Utils_Tuple3(latest, attempted, progress);
												} else {
													var pixel = links.a;
													var rest = links.b;
													var _v37 = A3(
														$author$project$PackingConstraints$contact,
														id,
														A2(surrounding, pixel, latest),
														attempted);
													var checked = _v37.a;
													var accepted = _v37.b;
													if (accepted.$ === 1) {
														var $temp$links = rest,
															$temp$attempted = checked;
														links = $temp$links;
														attempted = $temp$attempted;
														continue _try;
													} else {
														var next = accepted.a;
														return _Utils_Tuple3(
															A3($elm$core$Array$set, pixel, id, latest),
															next,
															true);
													}
												}
											}
										});
									var candidates = A2(
										$elm$core$List$filter,
										function (n) {
											return A2(
												$elm$core$List$member,
												n,
												A3($author$project$CellNetwork$adjacent, false, grid, other)) && ((!_Utils_eq(
												A2($elm$core$Array$get, n, latest),
												$elm$core$Maybe$Just(id))) && (_Utils_eq(
												A2($elm$core$Array$get, n, _protected),
												$elm$core$Maybe$Just(-1)) && A2(donorSafe, n, latest)));
										},
										A3($author$project$CellNetwork$adjacent, false, grid, index));
									return A2(_try, candidates, model);
								});
							var diagonals = A2(
								$elm$core$List$filter,
								function (n) {
									return (_Utils_cmp(
										A2($elm$core$Basics$modBy, grid.e, n),
										A2($elm$core$Basics$modBy, grid.e, index)) > 0) && ((!_Utils_eq((n / grid.e) | 0, (index / grid.e) | 0)) && _Utils_eq(
										A2($elm$core$Array$get, n, owners),
										$elm$core$Maybe$Just(id)));
								},
								A3($author$project$CellNetwork$adjacent, true, grid, index));
							return mergeable ? A3(
								$elm$core$List$foldl,
								widenBetween,
								_Utils_Tuple3(owners, state, changed),
								diagonals) : _Utils_Tuple3(owners, state, changed);
						});
					return A3(
						$elm$core$List$foldl,
						F2(
							function (index, state) {
								return A2(widen, index, state);
							}),
						_Utils_Tuple3(current, graph, false),
						A2(
							$elm$core$List$range,
							0,
							$elm$core$Array$length(current) - 1));
				});
			var round = F3(
				function (pass, current, graph) {
					round:
					while (true) {
						var _v1 = A2(joinCorners, current, graph);
						var updated = _v1.a;
						var next = _v1.b;
						var changed = _v1.c;
						if ((pass <= 0) || (!changed)) {
							return _Utils_Tuple2(updated, next);
						} else {
							var $temp$pass = pass - 1,
								$temp$current = updated,
								$temp$graph = next;
							pass = $temp$pass;
							current = $temp$current;
							graph = $temp$graph;
							continue round;
						}
					}
				});
			var thicken = F3(
				function (pass, current, graph) {
					thicken:
					while (true) {
						var extend = F2(
							function (_v9, _v10) {
								var index = _v9.a;
								var id = _v9.b;
								var latest = _v10.a;
								var model = _v10.b;
								var changed = _v10.c;
								var take = F2(
									function (pixel, _v8) {
										var pixels = _v8.a;
										var state = _v8.b;
										var progress = _v8.c;
										var _v6 = A3(
											$author$project$PackingConstraints$contact,
											id,
											A2(surrounding, pixel, pixels),
											state);
										var checked = _v6.a;
										var accepted = _v6.b;
										if (accepted.$ === 1) {
											return _Utils_Tuple3(pixels, checked, progress);
										} else {
											var nextGraph = accepted.a;
											return _Utils_Tuple3(
												A3($elm$core$Array$set, pixel, id, pixels),
												nextGraph,
												true);
										}
									});
								var candidates = A2(
									$elm$core$List$filter,
									function (pixel) {
										return (!_Utils_eq(
											A2($elm$core$Array$get, pixel, latest),
											$elm$core$Maybe$Just(id))) && (_Utils_eq(
											A2($elm$core$Array$get, pixel, _protected),
											$elm$core$Maybe$Just(-1)) && A2(donorSafe, pixel, latest));
									},
									A3($author$project$CellNetwork$adjacent, false, grid, index));
								return A3(
									$elm$core$List$foldl,
									take,
									_Utils_Tuple3(latest, model, changed),
									candidates);
							});
						var _v2 = A4(
							$author$project$CellNetwork$territories,
							map,
							_Utils_update(
								grid,
								{g: _protected}),
							graph.a1,
							_Utils_update(
								grid,
								{g: current}));
						var physical = _v2.a;
						var centers = $author$project$CellNetwork$labelCenters(physical);
						var weak = A2(
							$elm$core$Dict$filter,
							F2(
								function (_v5, center) {
									return center.bH < 5;
								}),
							centers);
						var targets = A2(
							$elm$core$List$filter,
							function (_v4) {
								var index = _v4.a;
								return A2(
									$elm$core$Dict$member,
									A2($author$project$CellNetwork$owner, physical, index),
									weak);
							},
							$elm$core$Array$toIndexedList(current));
						var _v3 = A3(
							$elm$core$List$foldl,
							extend,
							_Utils_Tuple3(current, graph, false),
							targets);
						var expanded = _v3.a;
						var expandedGraph = _v3.b;
						var grew = _v3.c;
						if ((pass <= 0) || ((!grew) || $elm$core$Dict$isEmpty(weak))) {
							return _Utils_Tuple2(expanded, expandedGraph);
						} else {
							var $temp$pass = pass - 1,
								$temp$current = expanded,
								$temp$graph = expandedGraph;
							pass = $temp$pass;
							current = $temp$current;
							graph = $temp$graph;
							continue thicken;
						}
					}
				});
			var closeJunction = F2(
				function (index, _v35) {
					var current = _v35.a;
					var graph = _v35.b;
					if (!_Utils_eq(
						A2($elm$core$Array$get, index, current),
						$elm$core$Maybe$Just(-1))) {
						return _Utils_Tuple2(current, graph);
					} else {
						var cy = (index / grid.e) | 0;
						var cx = A2($elm$core$Basics$modBy, grid.e, index);
						var patches = A2(
							$elm$core$List$concatMap,
							function (radius) {
								return A2(
									$elm$core$List$concatMap,
									function (ox) {
										return A2(
											$elm$core$List$map,
											function (oy) {
												return A2(
													$elm$core$List$concatMap,
													function (y) {
														return A2(
															$elm$core$List$map,
															function (x) {
																return (y * grid.e) + x;
															},
															A2(
																$elm$core$List$range,
																A2($elm$core$Basics$max, 0, cx - ox),
																A2($elm$core$Basics$min, grid.e - 1, (cx - ox) + radius)));
													},
													A2(
														$elm$core$List$range,
														A2($elm$core$Basics$max, 0, cy - oy),
														A2($elm$core$Basics$min, grid.ab - 1, (cy - oy) + radius)));
											},
											A2($elm$core$List$range, 0, radius));
									},
									A2($elm$core$List$range, 0, radius));
							},
							_List_fromArray(
								[1, 2, 3, 5]));
						var attempt = function (remaining) {
							if (!remaining.b) {
								return _Utils_Tuple2(current, graph);
							} else {
								var pixels = remaining.a;
								var rest = remaining.b;
								var tryId = function (candidates) {
									tryId:
									while (true) {
										if (!candidates.b) {
											return attempt(rest);
										} else {
											var id = candidates.a;
											var others = candidates.b;
											var patched = A3(
												$elm$core$List$foldl,
												F2(
													function (pixel, acc) {
														return (_Utils_eq(
															A2($elm$core$Array$get, pixel, acc),
															$elm$core$Maybe$Just(id)) || (_Utils_eq(
															A2($elm$core$Array$get, pixel, acc),
															$elm$core$Maybe$Just(-1)) || A2(donorSafe, pixel, acc))) ? A3($elm$core$Array$set, pixel, id, acc) : acc;
													}),
												current,
												pixels);
											var movable = A2(
												$elm$core$List$all,
												function (pixel) {
													return _Utils_eq(
														A2($elm$core$Array$get, pixel, _protected),
														$elm$core$Maybe$Just(-1)) || _Utils_eq(
														A2($elm$core$Array$get, pixel, current),
														$elm$core$Maybe$Just(id));
												},
												pixels);
											var borders = $elm$core$Set$toList(
												A2(
													$elm$core$Set$remove,
													id,
													$elm$core$Set$fromList(
														A2(
															$elm$core$List$concatMap,
															function (pixel) {
																return A2(surrounding, pixel, patched);
															},
															pixels))));
											if ((!movable) || A2(
												$elm$core$List$any,
												function (pixel) {
													return !_Utils_eq(
														A2($elm$core$Array$get, pixel, patched),
														$elm$core$Maybe$Just(id));
												},
												pixels)) {
												var $temp$candidates = others;
												candidates = $temp$candidates;
												continue tryId;
											} else {
												var _v34 = A3($author$project$PackingConstraints$connect, id, borders, graph);
												if (_v34.$ === 1) {
													var $temp$candidates = others;
													candidates = $temp$candidates;
													continue tryId;
												} else {
													var accepted = _v34.a;
													return _Utils_Tuple2(patched, accepted);
												}
											}
										}
									}
								};
								var ids = $elm$core$Set$toList(
									$elm$core$Set$fromList(
										A2(
											$elm$core$List$concatMap,
											function (pixel) {
												return A2(surrounding, pixel, current);
											},
											pixels)));
								return tryId(ids);
							}
						};
						return attempt(patches);
					}
				});
			var choose = F3(
				function (index, owners, state) {
					var ns = A2(surrounding, index, owners);
					var _try = F2(
						function (ids, model) {
							_try:
							while (true) {
								if (!ids.b) {
									return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
								} else {
									var id = ids.a;
									var rest = ids.b;
									var _v30 = A3($author$project$PackingConstraints$contact, id, ns, model);
									var checked = _v30.a;
									var accepted = _v30.b;
									if (!accepted.$) {
										var next = accepted.a;
										return _Utils_Tuple2(
											next,
											$elm$core$Maybe$Just(id));
									} else {
										var $temp$ids = rest,
											$temp$model = checked;
										ids = $temp$ids;
										model = $temp$model;
										continue _try;
									}
								}
							}
						});
					var candidates = A2(
						$elm$core$List$sortBy,
						function (id) {
							return -$elm$core$List$length(
								A2(
									$elm$core$List$filter,
									$elm$core$Basics$eq(id),
									ns));
						},
						$elm$core$Set$toList(
							$elm$core$Set$fromList(ns)));
					return A2(
						_try,
						_Utils_ap(
							candidates,
							A2(
								$elm$core$List$filter,
								function (id) {
									return !A2($elm$core$List$member, id, candidates);
								},
								palette)),
						state);
				});
			var sweep = F3(
				function (remaining, owners, state) {
					sweep:
					while (true) {
						var claim = F2(
							function (index, _v15) {
								var current = _v15.a;
								var graph = _v15.b;
								var _v16 = _v15.c;
								var left = _v16.a;
								var progress = _v16.b;
								var _v13 = A3(choose, index, current, graph);
								var checked = _v13.a;
								var selected = _v13.b;
								if (selected.$ === 1) {
									return _Utils_Tuple3(
										current,
										checked,
										_Utils_Tuple2(
											A2($elm$core$List$cons, index, left),
											progress));
								} else {
									var id = selected.a;
									return _Utils_Tuple3(
										A3($elm$core$Array$set, index, id, current),
										checked,
										_Utils_Tuple2(left, true));
								}
							});
						var _v11 = A3(
							$elm$core$List$foldl,
							claim,
							_Utils_Tuple3(
								owners,
								state,
								_Utils_Tuple2(_List_Nil, false)),
							remaining);
						var updated = _v11.a;
						var sweptGraph = _v11.b;
						var _v12 = _v11.c;
						var pending = _v12.a;
						var madeProgress = _v12.b;
						if (madeProgress && (!$elm$core$List$isEmpty(pending))) {
							var $temp$remaining = $elm$core$List$reverse(pending),
								$temp$owners = updated,
								$temp$state = sweptGraph;
							remaining = $temp$remaining;
							owners = $temp$owners;
							state = $temp$state;
							continue sweep;
						} else {
							return _Utils_Tuple3(
								updated,
								sweptGraph,
								$elm$core$List$reverse(pending));
						}
					}
				});
			var fill = F4(
				function (remaining, owners, state, budget) {
					fill:
					while (true) {
						var _v17 = A3(sweep, remaining, owners, state);
						var updated = _v17.a;
						var next = _v17.b;
						var pending = _v17.c;
						var pressure = function (index) {
							return $elm$core$List$length(
								$elm$core$Set$toList(
									$elm$core$Set$fromList(
										A2(surrounding, index, updated))));
						};
						var ordered = A2($elm$core$List$sortBy, pressure, pending);
						var seedSpacer = function (candidates) {
							seedSpacer:
							while (true) {
								if (!candidates.b) {
									return $elm$core$Maybe$Nothing;
								} else {
									var index = candidates.a;
									var rest = candidates.b;
									var center = {
										c: (A2($elm$core$Basics$modBy, grid.e, index) + 0.5) * grid.A,
										a: (((index / grid.e) | 0) + 0.5) * grid.B
									};
									var _v19 = A3(
										$author$project$PackingConstraints$spacer,
										center,
										A2(surrounding, index, updated),
										next);
									if (_v19.$ === 1) {
										var $temp$candidates = rest;
										candidates = $temp$candidates;
										continue seedSpacer;
									} else {
										var _v20 = _v19.a;
										var graph = _v20.a;
										var id = _v20.b;
										return $elm$core$Maybe$Just(
											_Utils_Tuple3(index, id, graph));
									}
								}
							}
						};
						if ($elm$core$List$isEmpty(pending) || (budget <= 0)) {
							return _Utils_Tuple2(updated, next);
						} else {
							var _v21 = seedSpacer(ordered);
							if (_v21.$ === 1) {
								return _Utils_Tuple2(updated, next);
							} else {
								var _v22 = _v21.a;
								var index = _v22.a;
								var id = _v22.b;
								var graph = _v22.c;
								var $temp$remaining = A2(
									$elm$core$List$filter,
									$elm$core$Basics$neq(index),
									pending),
									$temp$owners = A3($elm$core$Array$set, index, id, updated),
									$temp$state = graph,
									$temp$budget = budget - 1;
								remaining = $temp$remaining;
								owners = $temp$owners;
								state = $temp$state;
								budget = $temp$budget;
								continue fill;
							}
						}
					}
				});
			var blanks = A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2(
					$elm$core$List$filter,
					function (_v28) {
						var id = _v28.b;
						return id < 0;
					},
					$elm$core$Array$toIndexedList(grid.g)));
			var _v23 = A4(fill, blanks, grid.g, initial, 256);
			var packedOwners = _v23.a;
			var packed = _v23.b;
			var _v24 = A3(round, 5, packedOwners, packed);
			var joinedOwners = _v24.a;
			var joinedGraph = _v24.b;
			var _v25 = A3(thicken, 5, joinedOwners, joinedGraph);
			var thickOwners = _v25.a;
			var thickGraph = _v25.b;
			var _v26 = A3(
				$elm$core$List$foldl,
				closeJunction,
				_Utils_Tuple2(thickOwners, thickGraph),
				A2(
					$elm$core$List$range,
					0,
					$elm$core$Array$length(thickOwners) - 1));
			var closedOwners = _v26.a;
			var closedGraph = _v26.b;
			var _v27 = A3(round, 3, closedOwners, closedGraph);
			var finalOwners = _v27.a;
			var finalGraph = _v27.b;
			return _Utils_Tuple2(
				_Utils_update(
					grid,
					{g: finalOwners}),
				finalGraph.a1);
		}
	});
var $author$project$CellNetwork$grow = F5(
	function (allowed, speeds, grid, frontier, initialOwners) {
		var enqueue = F4(
			function (cost, id, index, queue) {
				return A3(
					$elm$core$Dict$update,
					cost,
					function (old) {
						return $elm$core$Maybe$Just(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(index, id),
								A2($elm$core$Maybe$withDefault, _List_Nil, old)));
					},
					queue);
			});
		var propose = F5(
			function (cost, id, index, owners, queue) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (n, pending) {
							if (!_Utils_eq(
								A2($elm$core$Array$get, n, owners),
								$elm$core$Maybe$Just(-1))) {
								return pending;
							} else {
								var dy = (((n / grid.e) | 0) - ((index / grid.e) | 0)) * grid.B;
								var dx = (A2($elm$core$Basics$modBy, grid.e, n) - A2($elm$core$Basics$modBy, grid.e, index)) * grid.A;
								var travel = $elm$core$Basics$round(
									(1000 * $elm$core$Basics$sqrt((dx * dx) + (dy * dy))) / A2(
										$elm$core$Maybe$withDefault,
										1,
										A2($elm$core$Array$get, id, speeds)));
								return A4(enqueue, cost + travel, id, n, pending);
							}
						}),
					queue,
					A3($author$project$CellNetwork$adjacent, true, grid, index));
			});
		var queue0 = A3(
			$elm$core$List$foldl,
			F2(
				function (index, queue) {
					return A5(
						propose,
						0,
						A2($author$project$CellNetwork$owner, grid, index),
						index,
						initialOwners,
						queue);
				}),
			$elm$core$Dict$empty,
			frontier);
		var advance = F2(
			function (queue, owners) {
				advance:
				while (true) {
					var _v0 = $elm$core$List$head(
						$elm$core$Dict$toList(queue));
					if (_v0.$ === 1) {
						return owners;
					} else {
						var _v1 = _v0.a;
						var cost = _v1.a;
						var events = _v1.b;
						if (!events.b) {
							var $temp$queue = A2($elm$core$Dict$remove, cost, queue),
								$temp$owners = owners;
							queue = $temp$queue;
							owners = $temp$owners;
							continue advance;
						} else {
							var _v3 = events.a;
							var index = _v3.a;
							var id = _v3.b;
							var rest = events.b;
							var value = function (n) {
								return A2(
									$elm$core$Maybe$withDefault,
									-1,
									A2($elm$core$Array$get, n, owners));
							};
							var remaining = $elm$core$List$isEmpty(rest) ? A2($elm$core$Dict$remove, cost, queue) : A3($elm$core$Dict$insert, cost, rest, queue);
							var permitted = A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Set$empty,
								A2($elm$core$Array$get, id, allowed));
							var canGrow = (value(index) < 0) && (A2(
								$elm$core$List$any,
								function (n) {
									return _Utils_eq(
										value(n),
										id);
								},
								A3($author$project$CellNetwork$adjacent, false, grid, index)) && A2(
								$elm$core$List$all,
								function (n) {
									return (value(n) < 0) || A2(
										$elm$core$Set$member,
										value(n),
										permitted);
								},
								A3($author$project$CellNetwork$adjacent, true, grid, index)));
							if (canGrow) {
								var updated = A3($elm$core$Array$set, index, id, owners);
								var $temp$queue = A5(propose, cost, id, index, updated, remaining),
									$temp$owners = updated;
								queue = $temp$queue;
								owners = $temp$owners;
								continue advance;
							} else {
								var $temp$queue = remaining,
									$temp$owners = owners;
								queue = $temp$queue;
								owners = $temp$owners;
								continue advance;
							}
						}
					}
				}
			});
		return A2(advance, queue0, initialOwners);
	});
var $author$project$CellNetwork$contains = F2(
	function (p, polygon) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, within) {
					var a = _v0.a;
					var b = _v0.b;
					return ((!_Utils_eq(
						_Utils_cmp(a.a, p.a) > 0,
						_Utils_cmp(b.a, p.a) > 0)) && (_Utils_cmp(p.c, (((b.c - a.c) * (p.a - a.a)) / (b.a - a.a)) + a.c) < 0)) ? (!within) : within;
				}),
			false,
			A3(
				$elm$core$List$map2,
				$elm$core$Tuple$pair,
				polygon,
				_Utils_ap(
					A2($elm$core$List$drop, 1, polygon),
					A2($elm$core$List$take, 1, polygon))));
	});
var $author$project$CellNetwork$interiorCenter = F2(
	function (preferred, contours) {
		var points = $elm$core$List$concat(contours);
		var xs = A2(
			$elm$core$List$map,
			function ($) {
				return $.c;
			},
			points);
		var ys = A2(
			$elm$core$List$map,
			function ($) {
				return $.a;
			},
			points);
		var low = function (values) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$minimum(values));
		};
		var inside = function (p) {
			return A2(
				$elm$core$Basics$modBy,
				2,
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						$author$project$CellNetwork$contains(p),
						contours))) === 1;
		};
		var high = function (values) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$maximum(values));
		};
		var edges = A2(
			$elm$core$List$concatMap,
			function (polygon) {
				return A3(
					$elm$core$List$map2,
					$elm$core$Tuple$pair,
					polygon,
					_Utils_ap(
						A2($elm$core$List$drop, 1, polygon),
						A2($elm$core$List$take, 1, polygon)));
			},
			contours);
		var distance = F2(
			function (p, _v0) {
				var a = _v0.a;
				var b = _v0.b;
				var dy = b.a - a.a;
				var dx = b.c - a.c;
				var t = (!((dx * dx) + (dy * dy))) ? 0 : A3($elm$core$Basics$clamp, 0, 1, (((p.c - a.c) * dx) + ((p.a - a.a) * dy)) / ((dx * dx) + (dy * dy)));
				return A2($elm$core$Basics$pow, (p.c - a.c) - (t * dx), 2) + A2($elm$core$Basics$pow, (p.a - a.a) - (t * dy), 2);
			});
		var clearance = function (p) {
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$minimum(
					A2(
						$elm$core$List$map,
						distance(p),
						edges)));
		};
		var candidates = A2(
			$elm$core$List$concatMap,
			function (y) {
				return A2(
					$elm$core$List$map,
					function (x) {
						return {
							c: low(xs) + (((x + 0.5) / 21) * (high(xs) - low(xs))),
							a: low(ys) + (((y + 0.5) / 21) * (high(ys) - low(ys)))
						};
					},
					A2($elm$core$List$range, 0, 20));
			},
			A2($elm$core$List$range, 0, 20));
		return inside(preferred) ? preferred : A2(
			$elm$core$Maybe$withDefault,
			preferred,
			$elm$core$List$head(
				A2(
					$elm$core$List$sortBy,
					A2($elm$core$Basics$composeR, clearance, $elm$core$Basics$negate),
					A2($elm$core$List$filter, inside, candidates))));
	});
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $author$project$CellNetwork$bridge = F5(
	function (allowed, grid, id, starts, target) {
		var fill = F3(
			function (current, parents, owners) {
				fill:
				while (true) {
					if (current < 0) {
						return owners;
					} else {
						var $temp$current = A2(
							$elm$core$Maybe$withDefault,
							-1,
							A2($elm$core$Dict$get, current, parents)),
							$temp$parents = parents,
							$temp$owners = A3($elm$core$Array$set, current, id, owners);
						current = $temp$current;
						parents = $temp$parents;
						owners = $temp$owners;
						continue fill;
					}
				}
			});
		var loop = F3(
			function (front, back, parents) {
				loop:
				while (true) {
					if (!front.b) {
						if ($elm$core$List$isEmpty(back)) {
							return $elm$core$Maybe$Nothing;
						} else {
							var $temp$front = $elm$core$List$reverse(back),
								$temp$back = _List_Nil,
								$temp$parents = parents;
							front = $temp$front;
							back = $temp$back;
							parents = $temp$parents;
							continue loop;
						}
					} else {
						var i = front.a;
						var rest = front.b;
						var neighbors = A3($author$project$CellNetwork$adjacent, false, grid, i);
						if (A2($elm$core$List$any, target, neighbors)) {
							return $elm$core$Maybe$Just(
								A3(fill, i, parents, grid.g));
						} else {
							var next = A2(
								$elm$core$List$filter,
								function (n) {
									return ((A2($author$project$CellNetwork$owner, grid, n) < 0) || _Utils_eq(
										A2($author$project$CellNetwork$owner, grid, n),
										id)) && ((!A2($elm$core$Dict$member, n, parents)) && A2(
										$elm$core$List$all,
										function (k) {
											return (A2($author$project$CellNetwork$owner, grid, k) < 0) || A2(
												$elm$core$Set$member,
												A2($author$project$CellNetwork$owner, grid, k),
												allowed);
										},
										A3($author$project$CellNetwork$adjacent, false, grid, n)));
								},
								neighbors);
							var updated = A3(
								$elm$core$List$foldl,
								F2(
									function (n, acc) {
										return A3($elm$core$Dict$insert, n, i, acc);
									}),
								parents,
								next);
							var $temp$front = rest,
								$temp$back = A3($elm$core$List$foldl, $elm$core$List$cons, back, next),
								$temp$parents = updated;
							front = $temp$front;
							back = $temp$back;
							parents = $temp$parents;
							continue loop;
						}
					}
				}
			});
		return A3(
			loop,
			starts,
			_List_Nil,
			$elm$core$Dict$fromList(
				A2(
					$elm$core$List$map,
					function (i) {
						return _Utils_Tuple2(i, -1);
					},
					starts)));
	});
var $author$project$CellNetwork$prepare = F2(
	function (map, initial) {
		var reserve = F2(
			function (r, owners) {
				var y = A3(
					$elm$core$Basics$clamp,
					0,
					initial.ab - 1,
					$elm$core$Basics$floor(r.af.a / initial.B));
				var x = A3(
					$elm$core$Basics$clamp,
					0,
					initial.e - 1,
					$elm$core$Basics$floor(r.af.c / initial.A));
				return A3($elm$core$Array$set, (y * initial.e) + x, r.f, owners);
			});
		var reserved = _Utils_update(
			initial,
			{
				g: A3($elm$core$List$foldl, reserve, initial.g, map.m)
			});
		var permitted = function (id) {
			return A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Set$empty,
				A2(
					$elm$core$Maybe$map,
					function (r) {
						return $elm$core$Set$fromList(
							A2($elm$core$List$cons, r.f, r.I));
					},
					$elm$core$List$head(
						A2($elm$core$List$drop, id, map.m))));
		};
		var trim = F2(
			function (_v5, owners) {
				var i = _v5.a;
				var id = _v5.b;
				if (id < 0) {
					return owners;
				} else {
					var allowed = permitted(id);
					return A2(
						$elm$core$List$any,
						function (n) {
							var other = A2(
								$elm$core$Maybe$withDefault,
								-1,
								A2($elm$core$Array$get, n, owners));
							return (other >= 0) && (!A2($elm$core$Set$member, other, allowed));
						},
						A3($author$project$CellNetwork$adjacent, false, initial, i)) ? A3($elm$core$Array$set, i, -1, owners) : owners;
				}
			});
		var groups = function (grid) {
			return A3(
				$elm$core$List$foldl,
				F2(
					function (_v4, acc) {
						var i = _v4.a;
						var id = _v4.b;
						return (id < 0) ? acc : A3(
							$elm$core$Dict$update,
							id,
							function (old) {
								return $elm$core$Maybe$Just(
									A2(
										$elm$core$List$cons,
										i,
										A2($elm$core$Maybe$withDefault, _List_Nil, old)));
							},
							acc);
					}),
				$elm$core$Dict$empty,
				$elm$core$Array$toIndexedList(grid.g));
		};
		var component = F5(
			function (grid, id, front, back, visited) {
				component:
				while (true) {
					if (!front.b) {
						if ($elm$core$List$isEmpty(back)) {
							return visited;
						} else {
							var $temp$grid = grid,
								$temp$id = id,
								$temp$front = $elm$core$List$reverse(back),
								$temp$back = _List_Nil,
								$temp$visited = visited;
							grid = $temp$grid;
							id = $temp$id;
							front = $temp$front;
							back = $temp$back;
							visited = $temp$visited;
							continue component;
						}
					} else {
						var i = front.a;
						var rest = front.b;
						var next = A2(
							$elm$core$List$filter,
							function (n) {
								return _Utils_eq(
									A2($author$project$CellNetwork$owner, grid, n),
									id) && (!A2($elm$core$Set$member, n, visited));
							},
							A3($author$project$CellNetwork$adjacent, false, grid, i));
						var $temp$grid = grid,
							$temp$id = id,
							$temp$front = rest,
							$temp$back = A3($elm$core$List$foldl, $elm$core$List$cons, back, next),
							$temp$visited = A3($elm$core$List$foldl, $elm$core$Set$insert, visited, next);
						grid = $temp$grid;
						id = $temp$id;
						front = $temp$front;
						back = $temp$back;
						visited = $temp$visited;
						continue component;
					}
				}
			});
		var clean = _Utils_update(
			reserved,
			{
				g: A3(
					$elm$core$List$foldl,
					trim,
					reserved.g,
					$elm$core$Array$toIndexedList(reserved.g))
			});
		var originalPixels = groups(clean);
		var connectRegion = F2(
			function (region, grid) {
				var _v2 = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2($elm$core$Dict$get, region.f, originalPixels));
				if (!_v2.b) {
					return grid;
				} else {
					var first = _v2.a;
					var again = F2(
						function (current, budget) {
							again:
							while (true) {
								var connected = A5(
									component,
									current,
									region.f,
									_List_fromArray(
										[first]),
									_List_Nil,
									$elm$core$Set$singleton(first));
								if (budget <= 0) {
									return current;
								} else {
									if (A2(
										$elm$core$List$all,
										function (i) {
											return A2($elm$core$Set$member, i, connected);
										},
										A2(
											$elm$core$Maybe$withDefault,
											_List_Nil,
											A2($elm$core$Dict$get, region.f, originalPixels)))) {
										return current;
									} else {
										var _v3 = A5(
											$author$project$CellNetwork$bridge,
											permitted(region.f),
											current,
											region.f,
											$elm$core$Set$toList(connected),
											function (n) {
												return _Utils_eq(
													A2($author$project$CellNetwork$owner, current, n),
													region.f) && (!A2($elm$core$Set$member, n, connected));
											});
										if (_v3.$ === 1) {
											return current;
										} else {
											var owners = _v3.a;
											var $temp$current = _Utils_update(
												current,
												{g: owners}),
												$temp$budget = budget - 1;
											current = $temp$current;
											budget = $temp$budget;
											continue again;
										}
									}
								}
							}
						});
					return A2(again, grid, 100);
				}
			});
		var joinedSeeds = A3($elm$core$List$foldl, connectRegion, clean, map.m);
		var contacts = $author$project$CellNetwork$adjacency(joinedSeeds);
		var joinedPixels = groups(joinedSeeds);
		var join = F2(
			function (region, grid) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (other, current) {
							if (_Utils_cmp(other, region.f) < 1) {
								return current;
							} else {
								var starts = A2(
									$elm$core$Maybe$withDefault,
									_List_Nil,
									A2($elm$core$Dict$get, region.f, joinedPixels));
								if (A2(
									$elm$core$Set$member,
									other,
									A2(
										$elm$core$Maybe$withDefault,
										$elm$core$Set$empty,
										A2($elm$core$Dict$get, region.f, contacts)))) {
									return current;
								} else {
									var _v1 = A5(
										$author$project$CellNetwork$bridge,
										permitted(region.f),
										current,
										region.f,
										starts,
										function (n) {
											return _Utils_eq(
												A2($author$project$CellNetwork$owner, current, n),
												other);
										});
									if (_v1.$ === 1) {
										return current;
									} else {
										var owners = _v1.a;
										return _Utils_update(
											current,
											{g: owners});
									}
								}
							}
						}),
					grid,
					region.I);
			});
		return A3($elm$core$List$foldl, join, joinedSeeds, map.m);
	});
var $author$project$CellNetwork$protectSeeds = function (grid) {
	var mark = F2(
		function (_v3, _v4) {
			var index = _v3.a;
			var id = _v3.b;
			var anchors = _v4.a;
			var edges = _v4.b;
			var pixels = _v4.c;
			if (id < 0) {
				return _Utils_Tuple3(anchors, edges, pixels);
			} else {
				var withAnchor = A2($elm$core$Set$member, id, anchors) ? pixels : A3($elm$core$Array$set, index, id, pixels);
				var keepContact = F2(
					function (n, _v2) {
						var known = _v2.a;
						var kept = _v2.b;
						var other = A2($author$project$CellNetwork$owner, grid, n);
						var key = _Utils_Tuple2(
							A2($elm$core$Basics$min, id, other),
							A2($elm$core$Basics$max, id, other));
						return ((other < 0) || (_Utils_eq(other, id) || A2($elm$core$Set$member, key, known))) ? _Utils_Tuple2(known, kept) : _Utils_Tuple2(
							A2($elm$core$Set$insert, key, known),
							A3(
								$elm$core$Array$set,
								n,
								other,
								A3($elm$core$Array$set, index, id, kept)));
					});
				var _v1 = A3(
					$elm$core$List$foldl,
					keepContact,
					_Utils_Tuple2(edges, withAnchor),
					A3($author$project$CellNetwork$adjacent, false, grid, index));
				var nextEdges = _v1.a;
				var nextPixels = _v1.b;
				return _Utils_Tuple3(
					A2($elm$core$Set$insert, id, anchors),
					nextEdges,
					nextPixels);
			}
		});
	var _v0 = A3(
		$elm$core$List$foldl,
		mark,
		_Utils_Tuple3(
			$elm$core$Set$empty,
			$elm$core$Set$empty,
			A2(
				$elm$core$Array$repeat,
				$elm$core$Array$length(grid.g),
				-1)),
		$elm$core$Array$toIndexedList(grid.g));
	var _protected = _v0.c;
	return _Utils_update(
		grid,
		{g: _protected});
};
var $author$project$CellNetwork$seed = F2(
	function (step, map) {
		var rows = $elm$core$Basics$ceiling(map.bl / step);
		var dy = map.bl / rows;
		var columns = $elm$core$Basics$ceiling(map.bx / step);
		var dx = map.bx / columns;
		var region = F2(
			function (r, owners) {
				var ys = A2(
					$elm$core$List$map,
					function ($) {
						return $.a;
					},
					r.a3);
				var xs = A2(
					$elm$core$List$map,
					function ($) {
						return $.c;
					},
					r.a3);
				var low = function (values) {
					return A2(
						$elm$core$Maybe$withDefault,
						0,
						$elm$core$List$minimum(values));
				};
				var x0 = A2(
					$elm$core$Basics$max,
					0,
					$elm$core$Basics$floor(
						low(xs) / dx));
				var y0 = A2(
					$elm$core$Basics$max,
					0,
					$elm$core$Basics$floor(
						low(ys) / dy));
				var high = function (values) {
					return A2(
						$elm$core$Maybe$withDefault,
						0,
						$elm$core$List$maximum(values));
				};
				var x1 = A2(
					$elm$core$Basics$min,
					columns - 1,
					$elm$core$Basics$floor(
						high(xs) / dx));
				var row = F2(
					function (y, acc) {
						return A3(
							$elm$core$List$foldl,
							F2(
								function (x, current) {
									return A2(
										$author$project$CellNetwork$contains,
										{c: (x + 0.5) * dx, a: (y + 0.5) * dy},
										r.a3) ? A3($elm$core$Array$set, (y * columns) + x, r.f, current) : current;
								}),
							acc,
							A2($elm$core$List$range, x0, x1));
					});
				var y1 = A2(
					$elm$core$Basics$min,
					rows - 1,
					$elm$core$Basics$floor(
						high(ys) / dy));
				return A3(
					$elm$core$List$foldl,
					row,
					owners,
					A2($elm$core$List$range, y0, y1));
			});
		return {
			e: columns,
			A: dx,
			B: dy,
			g: A3(
				$elm$core$List$foldl,
				region,
				A2($elm$core$Array$repeat, columns * rows, -1),
				map.m),
			ab: rows
		};
	});
var $author$project$CellNetwork$seedValid = F2(
	function (map, grid) {
		var pixelsByRegion = A3(
			$elm$core$List$foldl,
			F2(
				function (_v2, groups) {
					var i = _v2.a;
					var id = _v2.b;
					return (id < 0) ? groups : A3(
						$elm$core$Dict$update,
						id,
						function (old) {
							return $elm$core$Maybe$Just(
								A2(
									$elm$core$List$cons,
									i,
									A2($elm$core$Maybe$withDefault, _List_Nil, old)));
						},
						groups);
				}),
			$elm$core$Dict$empty,
			$elm$core$Array$toIndexedList(grid.g));
		var flood = F4(
			function (id, front, back, seen) {
				flood:
				while (true) {
					if (!front.b) {
						if ($elm$core$List$isEmpty(back)) {
							return seen;
						} else {
							var $temp$id = id,
								$temp$front = $elm$core$List$reverse(back),
								$temp$back = _List_Nil,
								$temp$seen = seen;
							id = $temp$id;
							front = $temp$front;
							back = $temp$back;
							seen = $temp$seen;
							continue flood;
						}
					} else {
						var i = front.a;
						var rest = front.b;
						var next = A2(
							$elm$core$List$filter,
							function (n) {
								return _Utils_eq(
									A2($author$project$CellNetwork$owner, grid, n),
									id) && (!A2($elm$core$Set$member, n, seen));
							},
							A3($author$project$CellNetwork$adjacent, false, grid, i));
						var $temp$id = id,
							$temp$front = rest,
							$temp$back = A3($elm$core$List$foldl, $elm$core$List$cons, back, next),
							$temp$seen = A3($elm$core$List$foldl, $elm$core$Set$insert, seen, next);
						id = $temp$id;
						front = $temp$front;
						back = $temp$back;
						seen = $temp$seen;
						continue flood;
					}
				}
			});
		var contacts = $author$project$CellNetwork$adjacency(grid);
		var valid = function (r) {
			var pixels = A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				A2($elm$core$Dict$get, r.f, pixelsByRegion));
			return function (matching) {
				return matching && function () {
					if (!pixels.b) {
						return false;
					} else {
						var first = pixels.a;
						return _Utils_eq(
							$elm$core$Set$size(
								A4(
									flood,
									r.f,
									_List_fromArray(
										[first]),
									_List_Nil,
									$elm$core$Set$singleton(first))),
							$elm$core$List$length(pixels));
					}
				}();
			}(
				_Utils_eq(
					$elm$core$Set$fromList(r.I),
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Set$empty,
						A2($elm$core$Dict$get, r.f, contacts))));
		};
		return A2($elm$core$List$all, valid, map.m);
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $author$project$CellNetwork$smoothVertices = F2(
	function (grid, connections) {
		var relax = function (positions) {
			var smooth = F2(
				function (vertex, neighbors) {
					var y = (vertex / (grid.e + 1)) | 0;
					var x = A2($elm$core$Basics$modBy, grid.e + 1, vertex);
					var origin = A2($author$project$CellNetwork$vertexPoint, grid, vertex);
					var p = A2(
						$elm$core$Maybe$withDefault,
						origin,
						A2($elm$core$Dict$get, vertex, positions));
					var _v2 = $elm$core$Set$toList(neighbors);
					if ((_v2.b && _v2.b.b) && (!_v2.b.b.b)) {
						var a = _v2.a;
						var _v3 = _v2.b;
						var b = _v3.a;
						if ((!x) || (_Utils_eq(x, grid.e) || ((!y) || _Utils_eq(y, grid.ab)))) {
							return origin;
						} else {
							var pb = A2(
								$elm$core$Maybe$withDefault,
								A2($author$project$CellNetwork$vertexPoint, grid, b),
								A2($elm$core$Dict$get, b, positions));
							var pa = A2(
								$elm$core$Maybe$withDefault,
								A2($author$project$CellNetwork$vertexPoint, grid, a),
								A2($elm$core$Dict$get, a, positions));
							return {
								c: A3($elm$core$Basics$clamp, origin.c - (2 * grid.A), origin.c + (2 * grid.A), (p.c * 0.5) + ((pa.c + pb.c) * 0.25)),
								a: A3($elm$core$Basics$clamp, origin.a - (2 * grid.B), origin.a + (2 * grid.B), (p.a * 0.5) + ((pa.a + pb.a) * 0.25))
							};
						}
					} else {
						return origin;
					}
				});
			return A2($elm$core$Dict$map, smooth, connections);
		};
		var originals = A2(
			$elm$core$Dict$map,
			F2(
				function (key, _v1) {
					return A2($author$project$CellNetwork$vertexPoint, grid, key);
				}),
			connections);
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, positions) {
					return relax(positions);
				}),
			originals,
			A2($elm$core$List$range, 1, 24));
	});
var $author$project$CellNetwork$trace = function (edges) {
	var walk = F5(
		function (start, previous, current, remaining, points) {
			walk:
			while (true) {
				if (_Utils_eq(current, start) && (!$elm$core$List$isEmpty(points))) {
					return _Utils_Tuple2(
						$elm$core$List$reverse(points),
						remaining);
				} else {
					var _v0 = A2($elm$core$Dict$get, current, remaining);
					if (_v0.$ === 1) {
						return _Utils_Tuple2(
							$elm$core$List$reverse(points),
							remaining);
					} else {
						var outgoing = _v0.a;
						var direction = F2(
							function (a, b) {
								return _Utils_eq(b, a + 1) ? 0 : ((_Utils_cmp(b, a) > 0) ? 1 : (_Utils_eq(b, a - 1) ? 2 : 3));
							});
						var incoming = A2(direction, previous, current);
						var priority = function (destination) {
							var _v1 = A2(
								$elm$core$Basics$modBy,
								4,
								A2(direction, current, destination) - incoming);
							switch (_v1) {
								case 1:
									return 0;
								case 0:
									return 1;
								case 3:
									return 2;
								default:
									return 3;
							}
						};
						var next = A2(
							$elm$core$Maybe$withDefault,
							start,
							$elm$core$List$head(
								A2($elm$core$List$sortBy, priority, outgoing)));
						var rest = A2(
							$elm$core$List$filter,
							$elm$core$Basics$neq(next),
							outgoing);
						var updated = $elm$core$List$isEmpty(rest) ? A2($elm$core$Dict$remove, current, remaining) : A3($elm$core$Dict$insert, current, rest, remaining);
						var $temp$start = start,
							$temp$previous = current,
							$temp$current = next,
							$temp$remaining = updated,
							$temp$points = A2($elm$core$List$cons, current, points);
						start = $temp$start;
						previous = $temp$previous;
						current = $temp$current;
						remaining = $temp$remaining;
						points = $temp$points;
						continue walk;
					}
				}
			}
		});
	var _v2 = $elm$core$List$head(
		$elm$core$Dict$toList(edges));
	if (_v2.$ === 1) {
		return _List_Nil;
	} else {
		var _v3 = _v2.a;
		var start = _v3.a;
		var _v4 = A5(walk, start, start - 1, start, edges, _List_Nil);
		var contour = _v4.a;
		var remaining = _v4.b;
		return A2(
			$elm$core$List$cons,
			contour,
			$author$project$CellNetwork$trace(remaining));
	}
};
var $author$project$CellNetwork$expand = function (map) {
	var choose = function (steps) {
		choose:
		while (true) {
			if (steps.b) {
				var step = steps.a;
				var rest = steps.b;
				var candidate = A2(
					$author$project$CellNetwork$prepare,
					map,
					A2($author$project$CellNetwork$seed, step, map));
				if (A2($author$project$CellNetwork$seedValid, map, candidate) || $elm$core$List$isEmpty(rest)) {
					return candidate;
				} else {
					var $temp$steps = rest;
					steps = $temp$steps;
					continue choose;
				}
			} else {
				return A2($author$project$CellNetwork$seed, 1, map);
			}
		}
	};
	var seeded = choose(
		_List_fromArray(
			[
				A2(
				$elm$core$Basics$max,
				2,
				$elm$core$Basics$sqrt((map.bx * map.bl) / 35000)),
				2,
				1,
				0.5
			]));
	var guarded = $author$project$CellNetwork$protectSeeds(seeded);
	var _v1 = $author$project$CellNetwork$coalesce(map);
	var contracted = _v1.a;
	var aliases = _v1.b;
	var initial = _Utils_update(
		seeded,
		{
			g: A2(
				$elm$core$Array$map,
				function (id) {
					return A2(
						$elm$core$Maybe$withDefault,
						-1,
						A2($elm$core$Dict$get, id, aliases));
				},
				seeded.g)
		});
	var frontier = A2(
		$elm$core$List$map,
		$elm$core$Tuple$first,
		A2(
			$elm$core$List$filter,
			function (_v5) {
				var i = _v5.a;
				var id = _v5.b;
				return (id >= 0) && A2(
					$elm$core$List$any,
					function (n) {
						return A2($author$project$CellNetwork$owner, initial, n) < 0;
					},
					A3($author$project$CellNetwork$adjacent, false, initial, i));
			},
			$elm$core$Array$toIndexedList(initial.g)));
	var allowed = $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			function (r) {
				return $elm$core$Set$fromList(
					A2($elm$core$List$cons, r.f, r.I));
			},
			contracted.m));
	var speeds = $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			function (r) {
				return (!_Utils_eq(r.U, $elm$core$Maybe$Nothing)) ? 0.72 : ((!_Utils_eq(r.bm, $elm$core$Maybe$Nothing)) ? 1.4 : ((r.cg !== '') ? 1.2 : 1));
			},
			contracted.m));
	var grown = _Utils_update(
		initial,
		{
			g: A5($author$project$CellNetwork$grow, allowed, speeds, initial, frontier, initial.g)
		});
	var _v2 = A3(
		$author$project$CellNetwork$fillPacking,
		contracted,
		A2(
			$elm$core$Array$map,
			function (id) {
				return A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm$core$Dict$get, id, aliases));
			},
			guarded.g),
		grown);
	var filled = _v2.a;
	var extended = _v2.b;
	var _v3 = A4($author$project$CellNetwork$territories, map, guarded, extended, filled);
	var grid = _v3.a;
	var packed = _v3.b;
	var preserved = _v3.c;
	var boundaries = A3(
		$elm$core$List$foldl,
		$author$project$CellNetwork$boundary(grid),
		$elm$core$Dict$empty,
		$elm$core$Array$toIndexedList(grid.g));
	var rawConnections = $author$project$CellNetwork$boundaryConnections(boundaries);
	var _v4 = A3(
		$author$project$CellNetwork$collapseJunctions,
		grid,
		A2($author$project$CellNetwork$smoothVertices, grid, rawConnections),
		rawConnections);
	var vertices = _v4.a;
	var connections = _v4.b;
	var centers = $author$project$CellNetwork$labelCenters(grid);
	var contacts = $author$project$CellNetwork$adjacency(grid);
	var cell = function (region) {
		var stats = A2($elm$core$Dict$get, region.f, centers);
		var loops = $author$project$CellNetwork$trace(
			A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Dict$empty,
				A2($elm$core$Dict$get, region.f, boundaries)));
		var contours = A2(
			$elm$core$List$map,
			A3($author$project$CellNetwork$curveContour, grid, connections, vertices),
			loops);
		return {
			bC: $elm$core$Basics$abs(
				$elm$core$List$sum(
					A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$List$map(
								function (v) {
									return A2(
										$elm$core$Maybe$withDefault,
										A2($author$project$CellNetwork$vertexPoint, grid, v),
										A2($elm$core$Dict$get, v, vertices));
								}),
							$author$project$CellNetwork$contourArea),
						loops))),
			af: A2(
				$author$project$CellNetwork$interiorCenter,
				A2(
					$elm$core$Maybe$withDefault,
					region.af,
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.cG;
						},
						stats)),
				contours),
			bG: contours,
			f: region.f,
			I: $elm$core$Set$toList(
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Set$empty,
					A2($elm$core$Dict$get, region.f, contacts))),
			bS: A4($author$project$CellNetwork$curvedOutline, grid, connections, vertices, loops)
		};
	};
	var cells = A2($elm$core$List$map, cell, packed.m);
	return {
		b5: cells,
		cb: $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.bC;
				},
				cells)) / (map.bx * map.bl),
		a1: _Utils_update(
			packed,
			{
				m: A3(
					$elm$core$List$map2,
					F2(
						function (region, grownCell) {
							return _Utils_update(
								region,
								{
									af: grownCell.af,
									a3: A2(
										$elm$core$Maybe$withDefault,
										_List_Nil,
										$elm$core$List$head(grownCell.bG))
								});
						}),
					packed.m,
					cells)
			}),
		cI: preserved,
		cV: A2($elm$core$Basics$max, grid.A, grid.B)
	};
};
var $author$project$CellNetwork$path = function (cell) {
	return cell.bS;
};
var $author$project$GenerativeTiling$shoelace = function (poly) {
	if (!poly.b) {
		return 0;
	} else {
		var first = poly.a;
		return function (s) {
			return s / 2;
		}(
			$elm$core$List$sum(
				A3(
					$elm$core$List$map2,
					F2(
						function (a, b) {
							return (a.c * b.a) - (b.c * a.a);
						}),
					poly,
					_Utils_ap(
						A2($elm$core$List$drop, 1, poly),
						_List_fromArray(
							[first])))));
	}
};
var $author$project$GenerativeTiling$generateOrganic = F2(
	function (seed, ast) {
		var map = A2($author$project$ConstraintMap$buildOrganic, seed, ast);
		var network = $author$project$CellNetwork$expand(map);
		var largest = function (cell) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$head(
					A2(
						$elm$core$List$sortBy,
						A2(
							$elm$core$Basics$composeR,
							$author$project$GenerativeTiling$shoelace,
							A2($elm$core$Basics$composeR, $elm$core$Basics$abs, $elm$core$Basics$negate)),
						cell.bG)));
		};
		var tiles = A2(
			$elm$core$List$map,
			function (cell) {
				return {
					bC: cell.bC,
					q: -1,
					r: cell.af,
					f: cell.f,
					I: cell.I,
					a3: largest(cell),
					u: cell.af
				};
			},
			network.b5);
		return {
			dD: $elm$core$Maybe$Just(network.a1),
			dE: network.cI,
			cb: network.cb,
			bl: map.bl,
			ef: $elm$core$Dict$fromList(
				A2(
					$elm$core$List$map,
					function (cell) {
						return _Utils_Tuple2(
							cell.f,
							$author$project$CellNetwork$path(cell));
					},
					network.b5)),
			ei: false,
			ac: seed,
			aQ: tiles,
			bx: map.bx
		};
	});
var $author$project$GenerativeTiling$coloredFromColors = F4(
	function (tiling, colors, changed, status) {
		var map = A2(
			$elm$core$Maybe$withDefault,
			{bl: tiling.bl, bs: -1, m: _List_Nil, bx: tiling.bx},
			tiling.dD);
		var tileView = function (tile) {
			var region = $elm$core$List$head(
				A2($elm$core$List$drop, tile.f, map.m));
			var note = A2(
				$elm$core$Maybe$withDefault,
				'',
				A2(
					$elm$core$Maybe$map,
					function (r) {
						return (r.cg !== '') ? r.cg : ((!_Utils_eq(r.U, $elm$core$Maybe$Nothing)) ? 'Fixed palette clue' : 'Three-color constraint region');
					},
					region));
			var input = A2(
				$elm$core$Maybe$andThen,
				function ($) {
					return $.bm;
				},
				region);
			var constant = A2(
				$elm$core$Maybe$andThen,
				function ($) {
					return $.U;
				},
				region);
			var color = A2(
				$elm$core$Maybe$withDefault,
				-1,
				A2($elm$core$Array$get, tile.f, colors));
			var value = (color < 0) ? '?' : $elm$core$String$fromInt(color);
			var label = function () {
				if (!input.$) {
					var name = input.a;
					return name + ('=' + value);
				} else {
					if (!constant.$) {
						var c = constant.a;
						return (c === 2) ? 'n' : $elm$core$String$fromInt(c);
					} else {
						return _Utils_eq(tile.f, map.bs) ? ('OUT=' + value) : '';
					}
				}
			}();
			return {aq: color, aw: label, bo: note, cY: tile, c$: color, c0: input};
		};
		return {
			aZ: changed,
			b7: $elm$core$Maybe$Nothing,
			cv: _List_Nil,
			ey: status,
			aQ: A2($elm$core$List$map, tileView, tiling.aQ),
			aG: tiling
		};
	});
var $author$project$GenerativeTiling$solveColors = F3(
	function (adjacency, fixed, tiles) {
		var _v0 = A3($author$project$LabLogic$solve, 200000, adjacency, fixed);
		if (!_v0.$) {
			var assignment = _v0.a;
			return assignment;
		} else {
			return A3(
				$elm$core$Dict$foldl,
				$elm$core$Array$set,
				A2(
					$elm$core$Array$repeat,
					$elm$core$List$length(tiles),
					-1),
				fixed);
		}
	});
var $author$project$GenerativeTiling$graphColor = F3(
	function (previous, tiling, assignment) {
		var map = A2(
			$elm$core$Maybe$withDefault,
			{bl: tiling.bl, bs: -1, m: _List_Nil, bx: tiling.bx},
			tiling.dD);
		var fixed = A2($author$project$ConstraintMap$fixedInputs, assignment, map);
		var adjacency = A2(
			$elm$core$List$map,
			function ($) {
				return $.I;
			},
			tiling.aQ);
		var colors = A3($author$project$GenerativeTiling$solveColors, adjacency, fixed, tiling.aQ);
		return A4(
			$author$project$GenerativeTiling$coloredFromColors,
			tiling,
			colors,
			_List_Nil,
			A2(
				$elm$core$List$any,
				$elm$core$Basics$gt(0),
				$elm$core$Array$toList(colors)) ? 'Coloring search could not complete.' : 'Settled. Shared-border constraints derive OUT from the inputs.');
	});
var $elm$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2($elm$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});
var $elm$core$Set$diff = F2(
	function (_v0, _v1) {
		var dict1 = _v0;
		var dict2 = _v1;
		return A2($elm$core$Dict$diff, dict1, dict2);
	});
var $elm$core$Set$filter = F2(
	function (isGood, _v0) {
		var dict = _v0;
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (key, _v1) {
					return isGood(key);
				}),
			dict);
	});
var $elm$core$Set$foldl = F3(
	function (func, initialState, _v0) {
		var dict = _v0;
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$isEmpty(dict);
};
var $author$project$SignalPropagation$Impossible = {$: 1};
var $author$project$SignalPropagation$Limit = {$: 2};
var $author$project$SignalPropagation$Solved = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$SignalPropagation$search = F4(
	function (adjacency, previous, colors, budget) {
		if (budget <= 0) {
			return _Utils_Tuple2($author$project$SignalPropagation$Limit, 0);
		} else {
			var _try = F3(
				function (id, candidates, remaining) {
					_try:
					while (true) {
						if (!candidates.b) {
							return _Utils_Tuple2($author$project$SignalPropagation$Impossible, remaining);
						} else {
							var c = candidates.a;
							var rest = candidates.b;
							var updated = A3($elm$core$Array$set, id, c, colors);
							var _v1 = A4($author$project$SignalPropagation$search, adjacency, previous, updated, remaining);
							var result = _v1.a;
							var left = _v1.b;
							switch (result.$) {
								case 0:
									var _final = result.a;
									var decisions = result.b;
									return _Utils_Tuple2(
										A2(
											$author$project$SignalPropagation$Solved,
											_final,
											A2(
												$elm$core$List$cons,
												_Utils_Tuple2(updated, id),
												decisions)),
										left);
								case 1:
									var $temp$id = id,
										$temp$candidates = rest,
										$temp$remaining = left;
									id = $temp$id;
									candidates = $temp$candidates;
									remaining = $temp$remaining;
									continue _try;
								default:
									return _Utils_Tuple2($author$project$SignalPropagation$Limit, left);
							}
						}
					}
				});
			var available = F2(
				function (id, neighbors) {
					return A2(
						$elm$core$List$sortBy,
						function (c) {
							return _Utils_eq(
								A2($elm$core$Array$get, id, previous),
								$elm$core$Maybe$Just(c)) ? 0 : (c + 1);
						},
						A2(
							$elm$core$List$filter,
							function (c) {
								return A2(
									$elm$core$List$all,
									function (n) {
										return !_Utils_eq(
											A2($elm$core$Array$get, n, colors),
											$elm$core$Maybe$Just(c));
									},
									neighbors);
							},
							_List_fromArray(
								[0, 1, 2])));
				});
			var choices = A2(
				$elm$core$List$sortBy,
				A2($elm$core$Basics$composeR, $elm$core$Tuple$second, $elm$core$List$length),
				A2(
					$elm$core$List$filter,
					function (_v5) {
						var id = _v5.a;
						return _Utils_eq(
							A2($elm$core$Array$get, id, colors),
							$elm$core$Maybe$Just(-1));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (id, neighbors) {
								return _Utils_Tuple2(
									id,
									A2(available, id, neighbors));
							}),
						adjacency)));
			var _v3 = $elm$core$List$head(choices);
			if (_v3.$ === 1) {
				return A2(
					$elm$core$List$all,
					$elm$core$Basics$identity,
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (id, ns) {
								return A2(
									$elm$core$List$all,
									function (n) {
										return !_Utils_eq(
											A2($elm$core$Array$get, n, colors),
											A2($elm$core$Array$get, id, colors));
									},
									ns);
							}),
						adjacency)) ? _Utils_Tuple2(
					A2($author$project$SignalPropagation$Solved, colors, _List_Nil),
					budget - 1) : _Utils_Tuple2($author$project$SignalPropagation$Impossible, budget - 1);
			} else {
				var _v4 = _v3.a;
				var id = _v4.a;
				var candidates = _v4.b;
				return A3(_try, id, candidates, budget - 1);
			}
		}
	});
var $author$project$SignalPropagation$repair = F3(
	function (adjacency, fixed, previous) {
		var unresolved = $elm$core$Set$fromList(
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2(
					$elm$core$List$filter,
					function (_v6) {
						var c = _v6.b;
						return c < 0;
					},
					$elm$core$Array$toIndexedList(previous))));
		var pinned = A3($elm$core$Dict$foldl, $elm$core$Array$set, previous, fixed);
		var neighbors = function (id) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$head(
					A2($elm$core$List$drop, id, adjacency)));
		};
		var finish = function (colors) {
			return {aZ: _List_Nil, dC: colors, ey: 'Settled. Shared-border constraints derive OUT from the inputs.'};
		};
		var editable = function (ids) {
			return A2(
				$elm$core$Set$filter,
				function (id) {
					return !A2($elm$core$Dict$member, id, fixed);
				},
				ids);
		};
		var color = F2(
			function (id, colors) {
				return A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm$core$Array$get, id, colors));
			});
		var frame = F3(
			function (status, before, after) {
				return {
					aZ: A2(
						$elm$core$List$map,
						$elm$core$Tuple$first,
						A2(
							$elm$core$List$filter,
							function (_v5) {
								var id = _v5.a;
								var c = _v5.b;
								return !_Utils_eq(
									A2(color, id, before),
									c);
							},
							$elm$core$Array$toIndexedList(after))),
					dC: after,
					ey: status
				};
			});
		var searchFrames = F2(
			function (start, decisions) {
				var advance = F2(
					function (_v3, _v4) {
						var colors = _v3.a;
						var id = _v3.b;
						var old = _v4.a;
						var frames = _v4.b;
						return _Utils_Tuple2(
							colors,
							_Utils_ap(
								frames,
								_List_fromArray(
									[
										A3(frame, 'Propagating — resolving a tile from its neighbors.', old, colors)
									])));
					});
				return A3(
					$elm$core$List$foldl,
					advance,
					_Utils_Tuple2(start, _List_Nil),
					decisions).b;
			});
		var roots = A2(
			$elm$core$List$map,
			$elm$core$Tuple$first,
			A2(
				$elm$core$List$filter,
				function (_v2) {
					var id = _v2.a;
					var c = _v2.b;
					return !_Utils_eq(
						A2(color, id, previous),
						c);
				},
				$elm$core$Dict$toList(fixed)));
		var conflicts = $elm$core$Set$fromList(
			A2(
				$elm$core$List$concatMap,
				function (id) {
					return A2(
						$elm$core$List$filter,
						function (n) {
							return _Utils_eq(
								A2(color, n, pinned),
								A2(color, id, pinned));
						},
						neighbors(id));
				},
				roots));
		var first = editable(conflicts);
		var initialActive = A2(
			$elm$core$Set$union,
			unresolved,
			A2(
				$elm$core$Set$union,
				$elm$core$Set$fromList(roots),
				first));
		var clear = F2(
			function (ids, colors) {
				return A3(
					$elm$core$Set$foldl,
					function (id) {
						return A2($elm$core$Array$set, id, -1);
					},
					colors,
					ids);
			});
		var expand = F4(
			function (active, frontier, partial, frames) {
				expand:
				while (true) {
					var _v0 = A4($author$project$SignalPropagation$search, adjacency, previous, partial, 100000);
					var result = _v0.a;
					switch (result.$) {
						case 0:
							var colors = result.a;
							var decisions = result.b;
							return _Utils_ap(
								frames,
								_Utils_ap(
									A2(searchFrames, partial, decisions),
									_List_fromArray(
										[
											finish(colors)
										])));
						case 2:
							return _Utils_ap(
								frames,
								_List_fromArray(
									[
										{aZ: _List_Nil, dC: partial, ey: 'Repair budget reached. Some tiles remain unresolved; try a simpler formula.'}
									]));
						default:
							var next = function (ids) {
								return A2($elm$core$Set$diff, ids, active);
							}(
								editable(
									$elm$core$Set$fromList(
										A2(
											$elm$core$List$concatMap,
											neighbors,
											$elm$core$Set$toList(frontier)))));
							var cleared = A2(clear, next, partial);
							if ($elm$core$Set$isEmpty(next)) {
								return _Utils_ap(
									frames,
									_List_fromArray(
										[
											{aZ: _List_Nil, dC: partial, ey: 'No local repair exists for these input pins.'}
										]));
							} else {
								var $temp$active = A2($elm$core$Set$union, active, next),
									$temp$frontier = next,
									$temp$partial = cleared,
									$temp$frames = _Utils_ap(
									frames,
									_List_fromArray(
										[
											A3(frame, 'Propagating — the unresolved wave crosses shared borders.', partial, cleared)
										]));
								active = $temp$active;
								frontier = $temp$frontier;
								partial = $temp$partial;
								frames = $temp$frames;
								continue expand;
							}
					}
				}
			});
		var silent = A2(
			clear,
			$elm$core$Set$fromList(roots),
			previous);
		var released = A2(clear, first, silent);
		var injected = A3($elm$core$Dict$foldl, $elm$core$Array$set, released, fixed);
		var initialFrames = $elm$core$List$isEmpty(roots) ? _List_Nil : _Utils_ap(
			_List_fromArray(
				[
					A3(frame, 'Propagating — an input signal changed.', previous, silent)
				]),
			_Utils_ap(
				$elm$core$Set$isEmpty(first) ? _List_Nil : _List_fromArray(
					[
						A3(frame, 'Propagating — releasing conflicting neighbors.', silent, released)
					]),
				_List_fromArray(
					[
						A3(frame, 'Propagating — applying the new input pins.', released, injected)
					])));
		return ($elm$core$List$isEmpty(roots) && $elm$core$Set$isEmpty(unresolved)) ? _List_fromArray(
			[
				finish(previous)
			]) : A4(expand, initialActive, initialActive, injected, initialFrames);
	});
var $author$project$GenerativeTiling$propagateConstraints = F3(
	function (previous, tiling, assignment) {
		if (!previous.$) {
			var prior = previous.a;
			if (_Utils_eq(prior.aG, tiling)) {
				var _v1 = tiling.dD;
				if (!_v1.$) {
					var map = _v1.a;
					return A2(
						$elm$core$List$map,
						function (frame) {
							return A4($author$project$GenerativeTiling$coloredFromColors, tiling, frame.dC, frame.aZ, frame.ey);
						},
						A3(
							$author$project$SignalPropagation$repair,
							A2(
								$elm$core$List$map,
								function ($) {
									return $.I;
								},
								tiling.aQ),
							A2($author$project$ConstraintMap$fixedInputs, assignment, map),
							$elm$core$Array$fromList(
								A2(
									$elm$core$List$map,
									function ($) {
										return $.aq;
									},
									prior.aQ))));
				} else {
					return _List_fromArray(
						[
							A3($author$project$GenerativeTiling$graphColor, $elm$core$Maybe$Nothing, tiling, assignment)
						]);
				}
			} else {
				return _List_fromArray(
					[
						A3($author$project$GenerativeTiling$graphColor, $elm$core$Maybe$Nothing, tiling, assignment)
					]);
			}
		} else {
			return _List_fromArray(
				[
					A3($author$project$GenerativeTiling$graphColor, $elm$core$Maybe$Nothing, tiling, assignment)
				]);
		}
	});
var $author$project$GenerativeTiling$propagate = F5(
	function (previous, tiling, row, variables, source) {
		return A3($author$project$GenerativeTiling$propagateConstraints, previous, tiling, row.bD);
	});
var $author$project$FormulaMosaic$paintRow = F2(
	function (index, model) {
		var _v0 = model.at;
		if (_v0.$ === 1) {
			return model;
		} else {
			var formula = _v0.a;
			var nextIndex = A3(
				$elm$core$Basics$clamp,
				0,
				$elm$core$List$length(formula.am) - 1,
				index);
			var row = $elm$core$List$head(
				A2($elm$core$List$drop, nextIndex, formula.am));
			if (row.$ === 1) {
				return model;
			} else {
				var r = row.a;
				var frames = A5($author$project$GenerativeTiling$propagate, model.O, model.aG, r, formula.aS, formula.F);
				var organicFrames = frames;
				return _Utils_update(
					model,
					{
						O: $elm$core$List$head(frames),
						Z: $elm$core$List$head(organicFrames),
						aC: A2($elm$core$List$drop, 1, organicFrames),
						aD: A2($elm$core$List$drop, 1, frames),
						aF: nextIndex
					});
			}
		}
	});
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {b9: col, dG: contextStack, cJ: problem, aF: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.aF, s.b9, x, s.i));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.b),
			s.d) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _v0 = thunk(0);
		var parse = _v0;
		return parse(s);
	};
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $author$project$FormulaParser$And = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $author$project$FormulaParser$Or = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$backtrackable = function (_v0) {
	var parse = _v0;
	return function (s0) {
		var _v1 = parse(s0);
		if (_v1.$ === 1) {
			var x = _v1.b;
			return A2($elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _v1.b;
			var s1 = _v1.c;
			return A3($elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var $elm$parser$Parser$backtrackable = $elm$parser$Parser$Advanced$backtrackable;
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.b);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.d, offset) < 0,
					0,
					{b9: col, i: s0.i, j: s0.j, d: offset, aF: row, b: s0.b});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.d, s.aF, s.b9, s);
	};
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.d, s.aF, s.b9, s.b);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{b9: newCol, i: s.i, j: s.j, d: newOffset, aF: newRow, b: s.b});
	};
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $elm$parser$Parser$ExpectingVariable = {$: 7};
var $elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {b9: col, i: context, j: indent, d: offset, aF: row, b: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$variable = function (i) {
	return function (s) {
		var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.ex, s.d, s.b);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.cf));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.d_, s.d + 1, s.aF + 1, 1, s.b, s.j, s.i) : A7($elm$parser$Parser$Advanced$varHelp, i.d_, firstOffset, s.aF, s.b9 + 1, s.b, s.j, s.i);
			var name = A3($elm$core$String$slice, s.d, s1.d, s.b);
			return A2($elm$core$Set$member, name, i.ej) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.cf)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{cf: $elm$parser$Parser$ExpectingVariable, d_: i.d_, ej: i.ej, ex: i.ex});
};
var $author$project$FormulaParser$variable = $elm$parser$Parser$variable(
	{d_: $elm$core$Char$isAlpha, ej: $elm$core$Set$empty, ex: $elm$core$Char$isAlpha});
function $author$project$FormulaParser$cyclic$andExpr() {
	return $elm$parser$Parser$lazy(
		function (_v4) {
			return A2(
				$elm$parser$Parser$andThen,
				function (left) {
					return $elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$backtrackable(
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										A2(
											$elm$parser$Parser$ignorer,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed(
													$author$project$FormulaParser$And(left)),
												$elm$parser$Parser$spaces),
											$elm$parser$Parser$symbol('&')),
										$elm$parser$Parser$spaces),
									$elm$parser$Parser$lazy(
										function (_v5) {
											return $author$project$FormulaParser$cyclic$andExpr();
										}))),
								$elm$parser$Parser$succeed(left)
							]));
				},
				$author$project$FormulaParser$cyclic$notExpr());
		});
}
function $author$project$FormulaParser$cyclic$notExpr() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($author$project$FormulaParser$Not),
						$elm$parser$Parser$symbol('!')),
					$elm$parser$Parser$spaces),
				$elm$parser$Parser$lazy(
					function (_v3) {
						return $author$project$FormulaParser$cyclic$notExpr();
					})),
				$author$project$FormulaParser$cyclic$atom()
			]));
}
function $author$project$FormulaParser$cyclic$atom() {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$keeper,
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('(')),
					$elm$parser$Parser$spaces),
				A2(
					$elm$parser$Parser$ignorer,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$lazy(
							function (_v2) {
								return $author$project$FormulaParser$cyclic$orExpr();
							}),
						$elm$parser$Parser$spaces),
					$elm$parser$Parser$symbol(')'))),
				A2($elm$parser$Parser$map, $author$project$FormulaParser$Var, $author$project$FormulaParser$variable)
			]));
}
function $author$project$FormulaParser$cyclic$orExpr() {
	return $elm$parser$Parser$lazy(
		function (_v0) {
			return A2(
				$elm$parser$Parser$andThen,
				function (left) {
					return $elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								$elm$parser$Parser$backtrackable(
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										A2(
											$elm$parser$Parser$ignorer,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed(
													$author$project$FormulaParser$Or(left)),
												$elm$parser$Parser$spaces),
											$elm$parser$Parser$symbol('|')),
										$elm$parser$Parser$spaces),
									$elm$parser$Parser$lazy(
										function (_v1) {
											return $author$project$FormulaParser$cyclic$orExpr();
										}))),
								$elm$parser$Parser$succeed(left)
							]));
				},
				$author$project$FormulaParser$cyclic$andExpr());
		});
}
var $author$project$FormulaParser$andExpr = $author$project$FormulaParser$cyclic$andExpr();
$author$project$FormulaParser$cyclic$andExpr = function () {
	return $author$project$FormulaParser$andExpr;
};
var $author$project$FormulaParser$notExpr = $author$project$FormulaParser$cyclic$notExpr();
$author$project$FormulaParser$cyclic$notExpr = function () {
	return $author$project$FormulaParser$notExpr;
};
var $author$project$FormulaParser$atom = $author$project$FormulaParser$cyclic$atom();
$author$project$FormulaParser$cyclic$atom = function () {
	return $author$project$FormulaParser$atom;
};
var $author$project$FormulaParser$orExpr = $author$project$FormulaParser$cyclic$orExpr();
$author$project$FormulaParser$cyclic$orExpr = function () {
	return $author$project$FormulaParser$orExpr;
};
var $author$project$FormulaParser$exprParser = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$spaces),
	A2(
		$elm$parser$Parser$ignorer,
		A2(
			$elm$parser$Parser$ignorer,
			$elm$parser$Parser$lazy(
				function (_v0) {
					return $author$project$FormulaParser$orExpr;
				}),
			$elm$parser$Parser$spaces),
		$elm$parser$Parser$end));
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {b9: col, cJ: problem, aF: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.aF, p.b9, p.cJ);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{b9: 1, i: _List_Nil, j: 1, d: 0, aF: 1, b: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$FormulaParser$parse = function (input) {
	return A2($elm$parser$Parser$run, $author$project$FormulaParser$exprParser, input);
};
var $author$project$Generated$DefaultTiling$tiling = {
	dD: $elm$core$Maybe$Just(
		{
			bl: 275,
			bs: 15,
			m: _List_fromArray(
				[
					{
					af: {c: 31, a: 30.88768115942029},
					U: $elm$core$Maybe$Just(1),
					cg: '',
					f: 0,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[1]),
					a3: _List_Nil
				},
					{
					af: {c: 25, a: 86.68478260869566},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 1,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[0, 2, 10]),
					a3: _List_Nil
				},
					{
					af: {c: 89, a: 68.75},
					U: $elm$core$Maybe$Nothing,
					cg: 'a',
					f: 2,
					bm: $elm$core$Maybe$Just('a'),
					I: _List_fromArray(
						[1, 3, 7, 10]),
					a3: _List_Nil
				},
					{
					af: {c: 189, a: 24.90942028985507},
					U: $elm$core$Maybe$Just(2),
					cg: '',
					f: 3,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[2, 4]),
					a3: _List_Nil
				},
					{
					af: {c: 237, a: 62.77173913043478},
					U: $elm$core$Maybe$Nothing,
					cg: 'b',
					f: 4,
					bm: $elm$core$Maybe$Just('b'),
					I: _List_fromArray(
						[3, 5, 8]),
					a3: _List_Nil
				},
					{
					af: {c: 283, a: 86.68478260869566},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 5,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[4, 6, 9]),
					a3: _List_Nil
				},
					{
					af: {c: 285, a: 30.88768115942029},
					U: $elm$core$Maybe$Just(1),
					cg: '',
					f: 6,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[5]),
					a3: _List_Nil
				},
					{
					af: {c: 129, a: 106.6123188405797},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 7,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[2, 8, 11]),
					a3: _List_Nil
				},
					{
					af: {c: 187, a: 104.6195652173913},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 8,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[4, 7, 11]),
					a3: _List_Nil
				},
					{
					af: {c: 245, a: 134.51086956521738},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 9,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[5, 11, 13]),
					a3: _List_Nil
				},
					{
					af: {c: 53, a: 132.51811594202897},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 10,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[1, 2, 11, 12]),
					a3: _List_Nil
				},
					{
					af: {c: 151, a: 152.44565217391303},
					U: $elm$core$Maybe$Nothing,
					cg: '',
					f: 11,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[7, 8, 9, 10, 14, 15, 16]),
					a3: _List_Nil
				},
					{
					af: {c: 43, a: 198.27898550724638},
					U: $elm$core$Maybe$Just(0),
					cg: '',
					f: 12,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[10, 16]),
					a3: _List_Nil
				},
					{
					af: {c: 297, a: 198.27898550724638},
					U: $elm$core$Maybe$Just(0),
					cg: '',
					f: 13,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[9, 14]),
					a3: _List_Nil
				},
					{
					af: {c: 227, a: 230.16304347826087},
					U: $elm$core$Maybe$Just(2),
					cg: '',
					f: 14,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[11, 13, 15]),
					a3: _List_Nil
				},
					{
					af: {c: 141, a: 224.18478260869566},
					U: $elm$core$Maybe$Nothing,
					cg: '!((a & b))',
					f: 15,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[11, 14, 16]),
					a3: _List_Nil
				},
					{
					af: {c: 93, a: 204.2572463768116},
					U: $elm$core$Maybe$Just(2),
					cg: '',
					f: 16,
					bm: $elm$core$Maybe$Nothing,
					I: _List_fromArray(
						[11, 12, 15]),
					a3: _List_Nil
				}
				]),
			bx: 340
		}),
	dE: true,
	cb: 1.0000000000000002,
	bl: 275,
	ef: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(0, 'M 0 0 L 2 0 L 4 0 L 6 0 L 8 0 L 10 0 L 12 0 L 14 0 L 16 0 L 18 0 L 20 0 L 22 0 L 24 0 L 26 0 L 28 0 L 30 0 L 32 0 L 34 0 L 36 0 L 38 0 L 40 0 L 42 0 L 44 0 L 46 0 L 48 0 L 50 0 L 52 0 L 52.273193951502364 0.7241726932494597 Q 52.54638790300472 1.4483453864989193 52.83079086235689 2.161349684245854 L 52.83079086235689 2.161349684245854 Q 53.115193821709056 2.8743539819927886 53.42025368751656 3.5667762171483446 L 53.42025368751656 3.5667762171483446 Q 53.72531355332407 4.259198452303901 54.057345332985335 4.9247464979309274 L 54.057345332985335 4.9247464979309274 Q 54.38937711264659 5.590294543557955 54.75081619476789 6.226541834914615 L 54.75081619476789 6.226541834914615 Q 55.112255276889194 6.862789126271275 55.50156517760886 7.47126658014191 L 55.50156517760886 7.47126658014191 Q 55.89087507832853 8.079744034012545 56.302995343018154 8.665493768904378 L 56.302995343018154 8.665493768904378 Q 56.71511560770777 9.25124350379621 57.14229554139911 9.821988122959446 L 57.14229554139911 9.821988122959446 Q 57.569475475090435 10.392732742122682 58.00235842675713 10.957794931662985 L 58.00235842675713 10.957794931662985 Q 58.43524137842382 11.522857121203288 58.86407336887919 12.091955160159495 L 58.86407336887919 12.091955160159495 Q 59.292905359334554 12.661053199115702 59.70871308949152 13.243126158666158 L 59.70871308949152 13.243126158666158 Q 60.12452081964848 13.825199118216613 60.520064460225726 14.427453543605068 L 60.520064460225726 14.427453543605068 Q 60.91560810080296 15.029707968993522 61.28591160505388 15.657076637381625 L 61.28591160505388 15.657076637381625 Q 61.656215109304796 16.28444530576973 61.998541347535664 16.939576137846835 L 61.998541347535664 16.939576137846835 Q 62.34086758576653 17.594706969923937 62.65413540469903 18.278457238378834 L 62.65413540469903 18.278457238378834 Q 62.96740322363154 18.962207506833735 63.25120794197258 19.674439334297595 L 63.25120794197258 19.674439334297595 Q 63.53501266031361 20.386671161761456 63.78855674468221 21.126995964201704 L 63.78855674468221 21.126995964201704 Q 64.04210082905081 21.86732076664195 64.26340106199721 22.635412828417067 L 64.26340106199721 22.635412828417067 Q 64.48470129494362 23.403504890192185 64.67036378852296 24.1987677824961 L 64.67036378852296 24.1987677824961 Q 64.8560262821023 24.994030674800015 65.00168228560229 25.814734073517577 L 65.00168228560229 25.814734073517577 Q 65.14733828910227 26.635437472235143 65.24859578396837 27.47779406789951 L 65.24859578396837 27.47779406789951 Q 65.34985327883449 28.320150663563872 65.40345122762608 29.17794742986893 L 65.40345122762608 29.17794742986893 Q 65.45704917641767 30.03574419617399 65.46186160640025 30.90093084579216 L 65.46186160640025 30.90093084579216 Q 65.46667403638281 31.76611749541033 65.42427714359991 32.630256170459496 L 65.42427714359991 32.630256170459496 Q 65.38188025081699 33.494394845508666 65.29651040196887 34.35037273936011 L 65.29651040196887 34.35037273936011 Q 65.21114055312074 35.20635063321156 65.08900913975323 36.049574440873926 L 65.08900913975323 36.049574440873926 Q 64.96687772638572 36.89279824853629 64.81497790553387 37.72135634725959 L 64.81497790553387 37.72135634725959 Q 64.66307808468201 38.549914445982886 64.48779655742692 39.36374214682779 L 64.48779655742692 39.36374214682779 Q 64.31251503017182 40.1775698476727 64.11846420239125 40.97713739734063 L 64.11846420239125 40.97713739734063 Q 63.92441337461068 41.77670494700855 63.71383843619452 42.561891940357086 L 63.71383843619452 42.561891940357086 Q 63.503263497778356 43.34707893370563 63.27616267225686 44.116681833956704 L 63.27616267225686 44.116681833956704 Q 63.04906184673537 44.88628473420778 62.803901489592796 45.638228961309736 L 62.803901489592796 45.638228961309736 Q 62.55874113245022 46.39017318841169 62.29347494267045 47.122198526412674 L 62.29347494267045 47.122198526412674 Q 62.02820875289068 47.854223864413655 61.74125481222115 48.56467453801514 L 61.74125481222115 48.56467453801514 Q 61.454300871551624 49.275125211616626 61.145143932838735 49.96346254544467 L 61.145143932838735 49.96346254544467 Q 60.83598699412585 50.651799879272716 60.50512888222461 51.318516818847726 L 60.50512888222461 51.318516818847726 Q 60.17427077032337 51.98523375842274 59.822395935805886 52.63101055743377 L 59.822395935805886 52.63101055743377 Q 59.47052110128841 53.2767873564448 59.09702848009248 53.9010247688546 L 59.09702848009248 53.9010247688546 Q 58.723535858896554 54.52526218126439 58.32494946163226 55.12449674782201 L 58.32494946163226 55.12449674782201 Q 57.92636306436796 55.72373131437963 57.495374234759765 56.29068084985086 L 57.495374234759765 56.29068084985086 Q 57.06438540515156 56.85763038532208 56.590191135022636 57.38153102057545 L 56.590191135022636 57.38153102057545 Q 56.11599686489371 57.90543165582882 55.586133781830654 58.37386516589382 L 55.586133781830654 58.37386516589382 Q 55.0562706987676 58.842298675958816 54.45948974057504 59.24405669095299 L 54.45948974057504 59.24405669095299 Q 53.86270878238247 59.64581470594717 53.19192133119668 59.9738339222784 L 53.19192133119668 59.9738339222784 Q 52.521133880010886 60.301853138609644 51.77536752077405 60.55516288460353 L 51.77536752077405 60.55516288460353 Q 51.02960116153721 60.80847263059742 50.21429438428126 60.99248428034425 L 50.21429438428126 60.99248428034425 Q 49.39898760702532 61.17649593009108 48.524630412922434 61.30163453072382 L 48.524630412922434 61.30163453072382 Q 47.65027321881956 61.42677313135655 46.73002416343568 61.5060632830338 L 46.73002416343568 61.5060632830338 Q 45.8097751080518 61.58535343471105 44.85697051595865 61.6318383074167 L 44.85697051595865 61.6318383074167 Q 43.904165923865506 61.678323180122355 42.93050847137964 61.70304444578663 L 42.93050847137964 61.70304444578663 Q 41.956851018893765 61.7277657114509 40.971664766660425 61.73861787655381 L 40.971664766660425 61.73861787655381 Q 39.98647851442708 61.74947004165672 38.99697962273885 61.7508272846275 L 38.99697962273885 61.7508272846275 Q 38.00748073105063 61.752184527598274 37.01970902282734 61.74499013417858 L 37.01970902282734 61.74499013417858 Q 36.031937314604065 61.737795740758884 35.05186322635899 61.71985984080925 L 35.05186322635899 61.71985984080925 Q 34.07178913811392 61.70192394085962 33.10610620517631 61.66839904227806 L 33.10610620517631 61.66839904227806 Q 32.1404232722387 61.6348741436965 31.19661848925725 61.579092010624514 L 31.19661848925725 61.579092010624514 Q 30.252813706275802 61.52330987755253 29.338293542496576 61.438198539997046 L 29.338293542496576 61.438198539997046 Q 28.42377337871735 61.35308720244157 27.54414333230447 61.23316801589321 L 27.54414333230447 61.23316801589321 Q 26.664513285891587 61.11324882934486 25.821518885692978 60.95681529670222 L 25.821518885692978 60.95681529670222 Q 24.97852448549437 60.800381764059566 24.168493655502054 60.611101497795374 L 24.168493655502054 60.611101497795374 Q 23.35846282550974 60.42182123153118 22.572117945246067 60.20894032367895 L 22.572117945246067 60.20894032367895 Q 21.785773064982394 59.99605941582672 21.009878311241707 59.77276615860579 L 21.009878311241707 59.77276615860579 Q 20.23398355750102 59.54947290138486 19.454563210478156 59.329692451549306 L 19.454563210478156 59.329692451549306 Q 18.675142863455292 59.10991200171376 17.88127718543265 58.90452454335227 L 17.88127718543265 58.90452454335227 Q 17.08741150741001 58.69913708499078 16.27426925252456 58.51295636070019 L 16.27426925252456 58.51295636070019 Q 15.461126997639113 58.32677563640959 14.631132351218714 58.15738624425635 L 14.631132351218714 58.15738624425635 Q 13.801137704798315 57.98799685210311 12.962894652994688 57.826825979806 L 12.962894652994688 57.826825979806 Q 12.124651601191061 57.665655107508904 11.29011311042504 57.50079309649679 L 11.29011311042504 57.50079309649679 Q 10.455574619659018 57.335931085484674 9.636549747823913 57.15561166430588 L 9.636549747823913 57.15561166430588 Q 8.81752487598881 56.975292243127086 8.022721855835243 56.77083873059894 L 8.022721855835243 56.77083873059894 Q 7.2279188356816775 56.56638521807079 6.461339886732613 56.33380989546569 L 6.461339886732613 56.33380989546569 Q 5.694760937783549 56.10123457286059 4.955624736174325 55.841315933159635 L 4.955624736174325 55.841315933159635 Q 4.2164885345651015 55.58139729345868 3.5002693472636395 55.2986446721105 L 3.5002693472636395 55.2986446721105 Q 2.7840501599621774 55.01589205076232 2.08392889773922 54.717099830151135 L 2.08392889773922 54.717099830151135 Q 1.3838076355162627 54.41830760953995 0.6919038177581314 54.11132771781345 L 0 53.80434782608695 L 0 51.81159420289855 L 0 49.81884057971014 L 0 47.826086956521735 L 0 45.833333333333336 L 0 43.84057971014493 L 0 41.84782608695652 L 0 39.85507246376812 L 0 37.86231884057971 L 0 35.869565217391305 L 0 33.8768115942029 L 0 31.884057971014492 L 0 29.891304347826086 L 0 27.89855072463768 L 0 25.905797101449274 L 0 23.913043478260867 L 0 21.920289855072465 L 0 19.92753623188406 L 0 17.934782608695652 L 0 15.942028985507246 L 0 13.94927536231884 L 0 11.956521739130434 L 0 9.96376811594203 L 0 7.971014492753623 L 0 5.978260869565217 L 0 3.9855072463768115 L 0 1.9927536231884058 Z'),
				_Utils_Tuple2(1, 'M 52 0 L 54 0 L 54.36318582748078 0.6345068747927077 Q 54.72637165496155 1.2690137495854155 55.09565496627418 1.8974452328789888 L 55.09565496627418 1.8974452328789888 Q 55.46493827758681 2.525876716172562 55.84553193034024 3.1430388375233047 L 55.84553193034024 3.1430388375233047 Q 56.22612558309368 3.760200958874047 56.62150007938 4.362635790472821 L 56.62150007938 4.362635790472821 Q 57.016874575666314 4.965070622071593 57.428027223136986 5.551784469700113 L 57.428027223136986 5.551784469700113 Q 57.83917987060766 6.138498317328632 58.264208819713446 6.711386139769594 L 58.264208819713446 6.711386139769594 Q 58.689237768819225 7.2842739622105555 59.123400407470086 7.848061188070037 L 59.123400407470086 7.848061188070037 Q 59.55756304612095 8.411848413929519 59.99389217362714 8.973476999275858 L 59.99389217362714 8.973476999275858 Q 60.43022130113333 9.535105584622197 60.860599856032735 10.102663171784636 L 60.860599856032735 10.102663171784636 Q 61.290978410932134 10.670220758947075 61.70741582000601 11.251668905780939 L 61.70741582000601 11.251668905780939 Q 62.12385322907989 11.833117052614805 62.519632800385196 12.435147755579232 L 62.519632800385196 12.435147755579232 Q 62.91541237169049 13.037178458543659 63.28581343525201 13.664493567781607 L 63.28581343525201 13.664493567781607 Q 63.656214498813526 14.291808677019555 63.998637254212916 14.946991520610577 L 63.998637254212916 14.946991520610577 Q 64.3410600096123 15.602174364201602 64.65455809946435 16.286142630269737 L 64.65455809946435 16.286142630269737 Q 64.9680561893164 16.97011089633787 65.25246865301645 17.682945670429373 L 65.25246865301645 17.682945670429373 Q 65.5368811167165 18.395780444520874 65.79189719477628 19.137571396816348 L 65.79189719477628 19.137571396816348 Q 66.04691327283608 19.87936234911182 66.27143411022911 20.650663260853577 L 66.27143411022911 20.650663260853577 Q 66.49595494762215 21.421964172595338 66.68798931025405 22.223575835461638 L 66.68798931025405 22.223575835461638 Q 66.88002367288595 23.025187498327938 67.03710046634912 23.857270305964985 L 67.03710046634912 23.857270305964985 Q 67.19417725981228 24.68935311360203 67.31400477750086 25.55021244927536 L 67.31400477750086 25.55021244927536 Q 67.43383229518945 26.41107178494869 67.51484514505897 27.29618412297197 L 67.51484514505897 27.29618412297197 Q 67.5958579949285 28.18129646099525 67.63743642118726 29.083115896757853 L 67.63743642118726 29.083115896757853 Q 67.67901484744604 29.984935332520454 67.68143289033935 30.893726570290475 L 67.68143289033935 30.893726570290475 Q 67.68385093323266 31.802517808060493 67.64819334494135 32.708027845582336 L 67.64819334494135 32.708027845582336 Q 67.61253575665003 33.613537883104186 67.54076706506093 34.506941938907 L 67.54076706506093 34.506941938907 Q 67.46899837347183 35.40034599470981 67.36412329726474 36.275758458437515 L 67.36412329726474 36.275758458437515 Q 67.25924822105766 37.15117092216522 67.12529330281617 38.006175496425115 L 67.12529330281617 38.006175496425115 Q 66.9913383845747 38.861180070685 66.83291136373185 39.69624234190378 L 66.83291136373185 39.69624234190378 Q 66.674484342889 40.53130461312257 66.49593024082031 41.34839632491705 L 66.49593024082031 41.34839632491705 Q 66.31737613875164 42.16548803671152 66.12184504016636 42.96654566055871 L 66.12184504016636 42.96654566055871 Q 65.92631394158107 43.7676032844059 65.71516061231517 44.55342804585523 L 65.71516061231517 44.55342804585523 Q 65.50400728304928 45.339252807304554 65.27679956232109 46.10918365518809 L 65.27679956232109 46.10918365518809 Q 65.04959184159291 46.87911450307162 64.8047460832818 47.631459942063174 L 64.8047460832818 47.631459942063174 Q 64.5599003249707 48.38380538105473 64.29576571906065 49.11678377685526 L 64.29576571906065 49.11678377685526 Q 64.03163111315061 49.849762172655794 63.7477800944249 50.562616385655694 L 63.7477800944249 50.562616385655694 Q 63.46392907569919 51.275470598655595 63.162425685527325 51.96941726792146 L 63.162425685527325 51.96941726792146 Q 62.86092229535545 52.66336393718732 62.54736287951495 53.34204362651394 L 62.54736287951495 53.34204362651394 Q 62.23380346367445 54.02072331584056 61.91794327981839 54.68986388029687 L 61.91794327981839 54.68986388029687 Q 61.602083095962335 55.359004444753175 61.29790033396796 56.02518237803743 L 61.29790033396796 56.02518237803743 Q 60.99371757197359 56.69136031132169 60.71881158733311 57.3600744650731 L 60.71881158733311 57.3600744650731 Q 60.44390560269262 58.0287886188245 60.21813998144754 58.70245369688735 L 60.21813998144754 58.70245369688735 Q 59.99237436020247 59.37611877495021 59.83567344925581 60.052849319518245 L 59.83567344925581 60.052849319518245 Q 59.67897253830914 60.729579864086276 59.6082740712492 61.40356710212306 L 59.6082740712492 61.40356710212306 Q 59.53757560418926 62.07755434015985 59.56324941163184 62.7413382653139 L 59.56324941163184 62.7413382653139 Q 59.58892321907442 63.40512219046796 59.71144533118637 64.05323437179676 L 59.71144533118637 64.05323437179676 Q 59.83396744329833 64.70134655312556 60.0420201387197 65.33399202972785 L 60.0420201387197 65.33399202972785 Q 60.25007283414107 65.96663750633016 60.52116407475745 66.59176805585649 L 60.52116407475745 66.59176805585649 Q 60.79225531537382 67.21689860538282 61.09624432755392 67.84951880462799 L 61.09624432755392 67.84951880462799 Q 61.400233339734015 68.48213900387316 61.70503546990776 69.14085830205266 L 61.70503546990776 69.14085830205266 Q 62.00983760008151 69.79957760023215 62.287614157714245 70.50169431635666 L 62.287614157714245 70.50169431635666 Q 62.565390715346986 71.20381103248116 62.797262461672396 71.96087665369654 L 62.797262461672396 71.96087665369654 Q 63.02913420799781 72.71794227491195 63.207072483561944 73.53343898533205 L 63.207072483561944 73.53343898533205 Q 63.38501075912609 74.34893569575215 63.510732477810485 75.21863145219362 L 63.510732477810485 75.21863145219362 Q 63.63645419649488 76.0883272086351 63.71825431728604 77.002694650768 L 63.71825431728604 77.002694650768 Q 63.8000544380772 77.91706209290092 63.84903258433505 78.86447549003407 L 63.84903258433505 78.86447549003407 Q 63.89801073059291 79.8118888871672 63.9249613125197 80.78136592428169 L 63.9249613125197 80.78136592428169 Q 63.951911894446496 81.75084296139616 63.9655143115716 82.73365467834581 L 63.9655143115716 82.73365467834581 Q 63.97911672869671 83.71646639529547 63.98539838788343 84.7065816235814 L 63.98539838788343 84.7065816235814 Q 63.99168004707015 85.69669685186732 63.99432626305328 86.6904365125614 L 63.99432626305328 86.6904365125614 Q 63.996972479036415 87.68417617325551 63.99798564084074 88.67954340692029 L 63.99798564084074 88.67954340692029 Q 63.99899880264506 89.67491064058507 63.99934982048137 90.67093769401616 L 63.99934982048137 90.67093769401616 Q 63.99970083831767 91.66696474744725 63.99981030747417 92.66323248513443 L 63.99981030747417 92.66323248513443 Q 63.99991977663067 93.6595002228216 63.99995031275269 94.65584660880945 L 63.99995031275269 94.65584660880945 Q 63.9999808488747 95.6521929947973 63.99998840934634 96.6485622733049 L 63.99998840934634 96.6485622733049 Q 63.999995969817974 97.6449315518125 63.999997615610916 98.64130672357643 L 63.999997615610916 98.64130672357643 Q 63.99999926140386 99.63768189534036 63.99999957266736 100.63405839679882 L 63.99999957266736 100.63405839679882 Q 63.99999988393086 101.63043489825728 63.99999993430264 102.62681165966221 L 63.999999984674425 103.62318842106714 L 63.99999999834655 105.61594203063297 L 63.999999999860385 107.60869565231302 L 64 109.60144927536231 L 63.041048972170245 109.64234951937252 Q 62.08209794434049 109.68324976338273 61.131113657820094 109.73208788369755 L 61.131113657820094 109.73208788369755 Q 60.18012937129969 109.78092600401237 59.24347048864373 109.84403762455443 L 59.24347048864373 109.84403762455443 Q 58.30681160598777 109.90714924509649 57.38780125613774 109.98784545448505 L 57.38780125613774 109.98784545448505 Q 56.468790906287715 110.06854166387362 55.56676972434547 110.16616548621377 L 55.56676972434547 110.16616548621377 Q 54.664748542403224 110.26378930855392 53.77497989736356 110.37362127454702 L 53.77497989736356 110.37362127454702 Q 52.88521125232389 110.4834532405401 51.9998580293148 110.59768463065785 L 51.9998580293148 110.59768463065785 Q 51.11450480630571 110.71191602077562 50.22451188620149 110.82152452429496 L 50.22451188620149 110.82152452429496 Q 49.33451896609727 110.9311330278143 48.431818323604425 111.02807985141744 L 48.431818323604425 111.02807985141744 Q 47.52911768111158 111.12502667502059 46.60839512479873 111.20401688159293 L 46.60839512479873 111.20401688159293 Q 45.68767256848589 111.28300708816528 44.747129907374564 111.34224900191305 L 44.747129907374564 111.34224900191305 Q 43.80658724626324 111.40149091566083 42.84759217076087 111.44234727159144 L 42.84759217076087 111.44234727159144 Q 41.8885970952585 111.48320362752204 40.91456685924545 111.50907929816121 L 40.91456685924545 111.50907929816121 Q 39.9405366232324 111.53495496880038 38.955615838190305 111.54997954892148 L 38.955615838190305 111.54997954892148 Q 37.97069505314821 111.56500412904259 36.9787058857888 111.57298593692724 L 36.9787058857888 111.57298593692724 Q 35.98671671842939 111.58096774481189 34.99060075847177 111.58483771224542 L 34.99060075847177 111.58483771224542 Q 33.99448479851415 111.58870767967895 32.996198345590074 111.59041501825097 L 32.996198345590074 111.59041501825097 Q 31.997911892665996 111.59212235682298 30.9985973114963 111.59280529225174 L 30.9985973114963 111.59280529225174 Q 29.999282730326605 111.5934882276805 28.999530242681992 111.59373484325198 L 28.999530242681992 111.59373484325198 Q 27.99977775503738 111.59398145882348 26.9998580293148 111.59406144225207 L 26.9998580293148 111.59406144225207 Q 25.999938303592224 111.59414142568066 24.999961540883056 111.59416457877842 L 24.999961540883056 111.59416457877842 Q 23.99998477817389 111.59418773187616 22.99999073645359 111.5941936685679 L 22.99999073645359 111.5941936685679 Q 21.99999669473329 111.59419960525963 20.999998035346223 111.59420094101527 L 20.999998035346223 111.59420094101527 Q 19.999999375959156 111.59420227677091 18.999999637542167 111.59420253740615 L 17.99999989912518 111.5942027980414 L 15.999999986319516 111.59420288491981 L 13.999999998486167 111.59420289704238 L 11.999999999868741 111.59420289841994 L 9.999999999991637 111.59420289854239 L 7.999999999999652 111.59420289855038 L 5.999999999999993 111.59420289855072 L 4 111.59420289855072 L 2 111.59420289855072 L 0 111.59420289855072 L 0 109.60144927536231 L 0 107.6086956521739 L 0 105.6159420289855 L 0 103.6231884057971 L 0 101.63043478260869 L 0 99.63768115942028 L 0 97.64492753623188 L 0 95.65217391304347 L 0 93.65942028985508 L 0 91.66666666666667 L 0 89.67391304347827 L 0 87.68115942028986 L 0 85.68840579710145 L 0 83.69565217391305 L 0 81.70289855072464 L 0 79.71014492753623 L 0 77.71739130434783 L 0 75.72463768115942 L 0 73.73188405797102 L 0 71.73913043478261 L 0 69.7463768115942 L 0 67.7536231884058 L 0 65.76086956521739 L 0 63.768115942028984 L 0 61.77536231884058 L 0 59.78260869565217 L 0 57.789855072463766 L 0 55.79710144927536 L 0 53.80434782608695 L 0.6919038177581314 54.11132771781345 Q 1.3838076355162627 54.41830760953995 2.08392889773922 54.717099830151135 L 2.08392889773922 54.717099830151135 Q 2.7840501599621774 55.01589205076232 3.5002693472636395 55.2986446721105 L 3.5002693472636395 55.2986446721105 Q 4.2164885345651015 55.58139729345868 4.955624736174325 55.841315933159635 L 4.955624736174325 55.841315933159635 Q 5.694760937783549 56.10123457286059 6.461339886732613 56.33380989546569 L 6.461339886732613 56.33380989546569 Q 7.2279188356816775 56.56638521807079 8.022721855835243 56.77083873059894 L 8.022721855835243 56.77083873059894 Q 8.81752487598881 56.975292243127086 9.636549747823913 57.15561166430588 L 9.636549747823913 57.15561166430588 Q 10.455574619659018 57.335931085484674 11.29011311042504 57.50079309649679 L 11.29011311042504 57.50079309649679 Q 12.124651601191061 57.665655107508904 12.962894652994688 57.826825979806 L 12.962894652994688 57.826825979806 Q 13.801137704798315 57.98799685210311 14.631132351218714 58.15738624425635 L 14.631132351218714 58.15738624425635 Q 15.461126997639113 58.32677563640959 16.27426925252456 58.51295636070019 L 16.27426925252456 58.51295636070019 Q 17.08741150741001 58.69913708499078 17.88127718543265 58.90452454335227 L 17.88127718543265 58.90452454335227 Q 18.675142863455292 59.10991200171376 19.454563210478156 59.329692451549306 L 19.454563210478156 59.329692451549306 Q 20.23398355750102 59.54947290138486 21.009878311241707 59.77276615860579 L 21.009878311241707 59.77276615860579 Q 21.785773064982394 59.99605941582672 22.572117945246067 60.20894032367895 L 22.572117945246067 60.20894032367895 Q 23.35846282550974 60.42182123153118 24.168493655502054 60.611101497795374 L 24.168493655502054 60.611101497795374 Q 24.97852448549437 60.800381764059566 25.821518885692978 60.95681529670222 L 25.821518885692978 60.95681529670222 Q 26.664513285891587 61.11324882934486 27.54414333230447 61.23316801589321 L 27.54414333230447 61.23316801589321 Q 28.42377337871735 61.35308720244157 29.338293542496576 61.438198539997046 L 29.338293542496576 61.438198539997046 Q 30.252813706275802 61.52330987755253 31.19661848925725 61.579092010624514 L 31.19661848925725 61.579092010624514 Q 32.1404232722387 61.6348741436965 33.10610620517631 61.66839904227806 L 33.10610620517631 61.66839904227806 Q 34.07178913811392 61.70192394085962 35.05186322635899 61.71985984080925 L 35.05186322635899 61.71985984080925 Q 36.031937314604065 61.737795740758884 37.01970902282734 61.74499013417858 L 37.01970902282734 61.74499013417858 Q 38.00748073105063 61.752184527598274 38.99697962273885 61.7508272846275 L 38.99697962273885 61.7508272846275 Q 39.98647851442708 61.74947004165672 40.971664766660425 61.73861787655381 L 40.971664766660425 61.73861787655381 Q 41.956851018893765 61.7277657114509 42.93050847137964 61.70304444578663 L 42.93050847137964 61.70304444578663 Q 43.904165923865506 61.678323180122355 44.85697051595865 61.6318383074167 L 44.85697051595865 61.6318383074167 Q 45.8097751080518 61.58535343471105 46.73002416343568 61.5060632830338 L 46.73002416343568 61.5060632830338 Q 47.65027321881956 61.42677313135655 48.524630412922434 61.30163453072382 L 48.524630412922434 61.30163453072382 Q 49.39898760702532 61.17649593009108 50.21429438428126 60.99248428034425 L 50.21429438428126 60.99248428034425 Q 51.02960116153721 60.80847263059742 51.77536752077405 60.55516288460353 L 51.77536752077405 60.55516288460353 Q 52.521133880010886 60.301853138609644 53.19192133119668 59.9738339222784 L 53.19192133119668 59.9738339222784 Q 53.86270878238247 59.64581470594717 54.45948974057504 59.24405669095299 L 54.45948974057504 59.24405669095299 Q 55.0562706987676 58.842298675958816 55.586133781830654 58.37386516589382 L 55.586133781830654 58.37386516589382 Q 56.11599686489371 57.90543165582882 56.590191135022636 57.38153102057545 L 56.590191135022636 57.38153102057545 Q 57.06438540515156 56.85763038532208 57.495374234759765 56.29068084985086 L 57.495374234759765 56.29068084985086 Q 57.92636306436796 55.72373131437963 58.32494946163226 55.12449674782201 L 58.32494946163226 55.12449674782201 Q 58.723535858896554 54.52526218126439 59.09702848009248 53.9010247688546 L 59.09702848009248 53.9010247688546 Q 59.47052110128841 53.2767873564448 59.822395935805886 52.63101055743377 L 59.822395935805886 52.63101055743377 Q 60.17427077032337 51.98523375842274 60.50512888222461 51.318516818847726 L 60.50512888222461 51.318516818847726 Q 60.83598699412585 50.651799879272716 61.145143932838735 49.96346254544467 L 61.145143932838735 49.96346254544467 Q 61.454300871551624 49.275125211616626 61.74125481222115 48.56467453801514 L 61.74125481222115 48.56467453801514 Q 62.02820875289068 47.854223864413655 62.29347494267045 47.122198526412674 L 62.29347494267045 47.122198526412674 Q 62.55874113245022 46.39017318841169 62.803901489592796 45.638228961309736 L 62.803901489592796 45.638228961309736 Q 63.04906184673537 44.88628473420778 63.27616267225686 44.116681833956704 L 63.27616267225686 44.116681833956704 Q 63.503263497778356 43.34707893370563 63.71383843619452 42.561891940357086 L 63.71383843619452 42.561891940357086 Q 63.92441337461068 41.77670494700855 64.11846420239125 40.97713739734063 L 64.11846420239125 40.97713739734063 Q 64.31251503017182 40.1775698476727 64.48779655742692 39.36374214682779 L 64.48779655742692 39.36374214682779 Q 64.66307808468201 38.549914445982886 64.81497790553387 37.72135634725959 L 64.81497790553387 37.72135634725959 Q 64.96687772638572 36.89279824853629 65.08900913975323 36.049574440873926 L 65.08900913975323 36.049574440873926 Q 65.21114055312074 35.20635063321156 65.29651040196887 34.35037273936011 L 65.29651040196887 34.35037273936011 Q 65.38188025081699 33.494394845508666 65.42427714359991 32.630256170459496 L 65.42427714359991 32.630256170459496 Q 65.46667403638281 31.76611749541033 65.46186160640025 30.90093084579216 L 65.46186160640025 30.90093084579216 Q 65.45704917641767 30.03574419617399 65.40345122762608 29.17794742986893 L 65.40345122762608 29.17794742986893 Q 65.34985327883449 28.320150663563872 65.24859578396837 27.47779406789951 L 65.24859578396837 27.47779406789951 Q 65.14733828910227 26.635437472235143 65.00168228560229 25.814734073517577 L 65.00168228560229 25.814734073517577 Q 64.8560262821023 24.994030674800015 64.67036378852296 24.1987677824961 L 64.67036378852296 24.1987677824961 Q 64.48470129494362 23.403504890192185 64.26340106199721 22.635412828417067 L 64.26340106199721 22.635412828417067 Q 64.04210082905081 21.86732076664195 63.78855674468221 21.126995964201704 L 63.78855674468221 21.126995964201704 Q 63.53501266031361 20.386671161761456 63.25120794197258 19.674439334297595 L 63.25120794197258 19.674439334297595 Q 62.96740322363154 18.962207506833735 62.65413540469903 18.278457238378834 L 62.65413540469903 18.278457238378834 Q 62.34086758576653 17.594706969923937 61.998541347535664 16.939576137846835 L 61.998541347535664 16.939576137846835 Q 61.656215109304796 16.28444530576973 61.28591160505388 15.657076637381625 L 61.28591160505388 15.657076637381625 Q 60.91560810080296 15.029707968993522 60.520064460225726 14.427453543605068 L 60.520064460225726 14.427453543605068 Q 60.12452081964848 13.825199118216613 59.70871308949152 13.243126158666158 L 59.70871308949152 13.243126158666158 Q 59.292905359334554 12.661053199115702 58.86407336887919 12.091955160159495 L 58.86407336887919 12.091955160159495 Q 58.43524137842382 11.522857121203288 58.00235842675713 10.957794931662985 L 58.00235842675713 10.957794931662985 Q 57.569475475090435 10.392732742122682 57.14229554139911 9.821988122959446 L 57.14229554139911 9.821988122959446 Q 56.71511560770777 9.25124350379621 56.302995343018154 8.665493768904378 L 56.302995343018154 8.665493768904378 Q 55.89087507832853 8.079744034012545 55.50156517760886 7.47126658014191 L 55.50156517760886 7.47126658014191 Q 55.112255276889194 6.862789126271275 54.75081619476789 6.226541834914615 L 54.75081619476789 6.226541834914615 Q 54.38937711264659 5.590294543557955 54.057345332985335 4.9247464979309274 L 54.057345332985335 4.9247464979309274 Q 53.72531355332407 4.259198452303901 53.42025368751656 3.5667762171483446 L 53.42025368751656 3.5667762171483446 Q 53.115193821709056 2.8743539819927886 52.83079086235689 2.161349684245854 L 52.83079086235689 2.161349684245854 Q 52.54638790300472 1.4483453864989193 52.273193951502364 0.7241726932494597 Z'),
				_Utils_Tuple2(2, 'M 54 0 L 56 0 L 58 0 L 60 0 L 62 0 L 64 0 L 66 0 L 68 0 L 70 0 L 72 0 L 74 0 L 76 0 L 78 0 L 80 0 L 82 0 L 84 0 L 86 0 L 88 0 L 90 0 L 92 0 L 94 0 L 96 0 L 98 0 L 100 0 L 102 0 L 104 0 L 106 0 L 108 0 L 110 0 L 112 0 L 114 0 L 116 0 L 118 0 L 120 0 L 122 0 L 124 0 L 126 0 L 128 0 L 130 0 L 132 0 L 134 0 L 136 0 L 138 0 L 140 0 L 142 0 L 144 0 L 146 0 L 148 0 L 150 0 L 152 0 L 154 0 L 156 0 L 158 0 L 160 0 L 162 0 L 164 0 L 163.99999233864952 0.996369178002253 Q 163.99998467729907 1.992738356004506 163.99995951895164 2.989090100404701 L 163.99995951895164 2.989090100404701 Q 163.9999343606042 3.985441844804896 163.9998464310596 4.981731045439842 L 163.9998464310596 4.981731045439842 Q 163.99975850151506 5.978020246074789 163.99948013480684 6.974119699535791 L 163.99948013480684 6.974119699535791 Q 163.9992017680986 7.970219152996794 163.9984052260915 8.965802308605682 L 163.9984052260915 8.965802308605682 Q 163.99760868408444 9.961385464214569 163.99553650211038 10.955697601740402 L 163.99553650211038 10.955697601740402 Q 163.9934643201363 11.950009739266235 163.9885362264269 12.941476312563047 L 163.9885362264269 12.941476312563047 Q 163.98360813271753 13.93294288585986 163.97283969939548 14.918590280194762 L 163.97283969939548 14.918590280194762 Q 163.9620712660734 15.904237674529663 163.94035041102566 16.878972329826293 L 163.94035041102566 16.878972329826293 Q 163.91862955597793 17.853706985122923 163.87800732471402 18.809608747450568 L 163.87800732471402 18.809608747450568 Q 163.83738509345014 19.765510509778217 163.7666485249228 20.691407044760027 L 163.7666485249228 20.691407044760027 Q 163.69591195639543 21.61730357974184 163.58075343355927 22.498939109524635 L 163.58075343355927 22.498939109524635 Q 163.4655949107231 23.380574639307433 163.28961248121792 24.201606638894653 L 163.28961248121792 24.201606638894653 Q 163.11363005171273 25.022638638481872 162.86017324874865 25.76647696886186 L 162.86017324874865 25.76647696886186 Q 162.60671644578454 26.510315299241846 162.26129309636872 27.16252029529494 L 162.26129309636872 27.16252029529494 Q 161.91586974695292 27.814725291348033 161.46857033820112 28.36542334422215 L 161.46857033820112 28.36542334422215 Q 161.02127092944934 28.916121397096266 160.46857033820112 29.361800155816354 L 160.46857033820112 29.361800155816354 Q 159.91586974695292 29.80747891453644 159.26129309636872 30.15165073007755 L 159.26129309636872 30.15165073007755 Q 158.60671644578454 30.49582254561866 157.86017324874865 30.748361026832875 L 157.86017324874865 30.748361026832875 Q 157.11363005171273 31.00089950804709 156.28961248121792 31.176244320054074 L 156.28961248121792 31.176244320054074 Q 155.4655949107231 31.351589132061058 154.58075343355927 31.46633041387247 L 154.58075343355927 31.46633041387247 Q 153.69591195639546 31.581071695683878 152.76664852492297 31.651551972296442 L 152.76664852492297 31.651551972296442 Q 151.8373850934505 31.722032248909006 150.87800732471857 31.762507298179727 L 150.87800732471857 31.762507298179727 Q 149.91862955598663 31.802982347450452 148.94035041109998 31.824624503813414 L 148.94035041109998 31.824624503813414 Q 147.96207126621337 31.846266660176376 146.97283970029218 31.85699607818968 L 146.97283970029218 31.85699607818968 Q 145.983608134371 31.867725496202986 144.9885362349166 31.87263574131184 L 144.9885362349166 31.87263574131184 Q 143.99346433546222 31.877545986420692 142.99553656781208 31.87961071068233 L 142.99553656781208 31.87961071068233 Q 141.99760880016194 31.881675434943965 140.998405653494 31.882469401126244 L 140.998405653494 31.882469401126244 Q 139.999202506826 31.88326336730852 138.99948252001846 31.883542365960423 L 138.99948252001846 31.883542365960423 Q 137.9997625332109 31.88382136461233 136.99985802931045 31.883916514711494 L 136.99985802931045 31.883916514711494 Q 135.99995352540998 31.884011664810657 135.00000926347644 31.884067200927593 L 135.00000926347644 31.884067200927593 Q 134.00006500154288 31.884122737044528 133.00018239362885 31.88423970379685 L 133.00018239362885 31.88423970379685 Q 132.0002997857148 31.88435667054917 131.00065980545287 31.884715385867914 L 131.00065980545287 31.884715385867914 Q 130.00101982519098 31.88507410118666 129.00206410292714 31.886114595307838 L 129.00206410292714 31.886114595307838 Q 128.00310838066332 31.88715508942902 127.00586575733689 31.889902475607407 L 127.00586575733689 31.889902475607407 Q 126.00862313401046 31.89264986178579 125.01526338989021 31.899266058767417 L 125.01526338989021 31.899266058767417 Q 124.02190364576995 31.905882255749038 123.03654984952574 31.920475393549182 L 123.03654984952574 31.920475393549182 Q 122.05119605328153 31.93506853134933 121.0809028510502 31.964667695792407 L 121.0809028510502 31.964667695792407 Q 120.11060964881887 31.994266860235488 119.16622320923273 32.04967892223371 L 119.16622320923273 32.04967892223371 Q 118.22183676964659 32.105090984231936 117.31826473634099 32.20116957410464 L 117.31826473634099 32.20116957410464 Q 116.4146927030354 32.29724816397734 115.57005957305759 32.45205210904908 L 115.57005957305759 32.45205210904908 Q 114.72542644307977 32.606856054120804 113.95879382525584 32.83937788867256 L 113.95879382525584 32.83937788867256 Q 113.1921612074319 33.071899723224305 112.51996638222266 33.39851709759708 L 112.51996638222266 33.39851709759708 Q 111.84777155701343 33.72513447196986 111.27972183698857 34.15551909291889 L 111.27972183698857 34.15551909291889 Q 110.71167211696371 34.585903713867914 110.24724377681912 35.11953160340376 L 110.24724377681912 35.11953160340376 Q 109.78281543667453 35.6531594929396 109.40949875848928 36.277557056334075 L 109.40949875848928 36.277557056334075 Q 109.03618208030403 36.90195461972854 108.73014797565102 37.59334467301943 L 108.73014797565102 37.59334467301943 Q 108.42411387099801 38.284734726310326 108.15326170174322 39.01101927736181 L 108.15326170174322 39.01101927736181 Q 107.88240953248842 39.73730382841329 107.61112346505595 40.46266282223897 L 107.61112346505595 40.46266282223897 Q 107.33983739762348 41.188021816064655 107.03448080353864 41.878067856317614 L 107.03448080353864 41.878067856317614 Q 106.7291242094538 42.56811389657058 106.36336841393498 43.194564895932224 L 106.36336841393498 43.194564895932224 Q 105.99761261841616 43.82101589529387 105.55695485044549 44.365096371302734 L 105.55695485044549 44.365096371302734 Q 105.11629708247482 44.9091768473116 104.60133901143263 45.36326260859876 L 104.60133901143263 45.36326260859876 Q 104.08638094039046 45.81734836988592 103.5144798222209 46.1846482405692 L 103.5144798222209 46.1846482405692 Q 102.94257870405136 46.551948111252486 102.34721922699754 46.84430263409425 L 102.34721922699754 46.84430263409425 Q 101.7518597499437 47.13665715693601 101.17783669504627 47.370886286620404 L 101.17783669504627 47.370886286620404 Q 100.60381364014881 47.6051154163048 100.09422361649933 47.79873484906929 L 100.09422361649933 47.79873484906929 Q 99.58463359284985 47.99235428183378 99.15858863635209 48.159744708922545 L 99.15858863635209 48.159744708922545 Q 98.73254367985433 48.327135136011314 98.36627183992717 48.477187952362186 L 98.36627183992717 48.477187952362186 Q 98 48.62724076871305 98 48.763032685054235 L 98 48.763032685054235 Q 98 48.89882460139542 98.43017910280187 49.019139058186234 L 98.43017910280187 49.019139058186234 Q 98.86035820560373 49.13945351497705 99.368343303072 49.24130458992719 L 99.368343303072 49.24130458992719 Q 99.87632840054026 49.34315566487733 100.50534485385113 49.42420920288554 L 100.50534485385113 49.42420920288554 Q 101.134361307162 49.505262740893755 101.88533084472195 49.56529804854448 L 101.88533084472195 49.56529804854448 Q 102.63630038228192 49.6253333561952 103.48440627126574 49.66646702062773 L 103.48440627126574 49.66646702062773 Q 104.33251216024956 49.70760068506026 105.24716691227846 49.73356391639985 L 105.24716691227846 49.73356391639985 Q 106.16182166430737 49.75952714773945 107.11746239324424 49.7745765269149 L 107.11746239324424 49.7745765269149 Q 108.0731031221811 49.78962590609035 109.05181527833983 49.797613961495415 L 109.05181527833983 49.797613961495415 Q 110.03052743449857 49.80560201690047 111.02112958402503 49.809473370340314 L 111.02112958402503 49.809473370340314 Q 112.0117317335515 49.81334472378016 113.00793034756501 49.81505232980272 L 113.00793034756501 49.81505232980272 Q 114.00412896157852 49.816759935825274 115.00272631742891 49.8174429154474 L 115.00272631742891 49.8174429154474 Q 116.00132367327929 49.81812589506953 117.00085392211022 49.818372516767695 L 117.00085392211022 49.818372516767695 Q 118.00038417094117 49.81861913846586 119.00024220095145 49.818699122587404 L 119.00024220095145 49.818699122587404 Q 120.00010023096172 49.81877910670894 121.0000617719064 49.81880225986809 L 121.0000617719064 49.81880225986809 Q 122.00002331285108 49.81882541302724 123.00001404930867 49.81883134972297 L 123.00001404930867 49.81883134972297 Q 124.00000478576628 49.81883728641869 125.00000282111267 49.818838622174496 L 125.00000282111267 49.818838622174496 Q 126.00000085645907 49.81883995793031 127.00000049400123 49.81884021856556 L 128.0000001315434 49.818840479200816 L 130.0000000169881 49.81884056607923 L 132.00000000179378 49.818840578201794 L 134.0000000001487 49.81884057957936 L 136.0000000000091 49.818840579701806 L 138.00000000000034 49.81884057970979 L 140 49.818840579710134 L 142 49.81884057971014 L 144 49.81884057971014 L 146 49.81884057971014 L 148 49.81884057971014 L 150 49.81884057971014 L 152 49.81884057971014 L 154 49.81884057971014 L 156 49.81884057971014 L 157 49.81884057971014 Q 158 49.81884057971014 159.5 50.31702898550724 L 161 50.815217391304344 L 161 50.815217391304344 L 160.27544039113516 52.086036621602055 Q 159.55088078227033 53.356855851899766 159.3435723802136 54.14667537883601 L 159.3435723802136 54.14667537883601 Q 159.13626397815688 54.93649490577226 158.9595833029365 55.75683118952005 L 158.9595833029365 55.75683118952005 Q 158.7829026277161 56.57716747326784 158.64381080565929 57.43495641868223 L 158.64381080565929 57.43495641868223 Q 158.50471898360246 58.292745364096625 158.40321297097242 59.18798393846887 L 158.40321297097242 59.18798393846887 Q 158.30170695834238 60.08322251284111 158.2319747187299 61.010119737864926 L 158.2319747187299 61.010119737864926 Q 158.16224247911742 61.93701696288874 158.1145518661619 62.885875953603325 L 158.1145518661619 62.885875953603325 Q 158.06686125320635 63.83473494431791 158.02911873300013 64.79350598396753 L 158.02911873300013 64.79350598396753 Q 157.99137621279394 65.75227702361715 157.94974965254954 66.7071780958374 L 157.94974965254954 66.7071780958374 Q 157.90812309230512 67.66207916805766 157.8468240596605 68.5973790449516 L 157.8468240596605 68.5973790449516 Q 157.78552502701586 69.53267892184552 157.68641973467885 70.43030951824885 L 157.68641973467885 70.43030951824885 Q 157.58731444234184 71.32794011465218 157.4302181074195 72.16778978094334 L 157.4302181074195 72.16778978094334 Q 157.27312177249718 73.00763944723451 157.0373544790535 73.76910319470912 L 157.0373544790535 73.76910319470912 Q 156.80158718560983 74.53056694218373 156.46875076800328 75.19531326522066 L 156.46875076800328 75.19531326522066 Q 156.13591435039672 75.8600595882576 155.69316840618293 76.41529460760981 L 155.69316840618293 76.41529460760981 Q 155.25042246196915 76.970529626962 154.69313191171977 77.41163505696716 L 154.69313191171977 77.41163505696716 Q 154.1358413614704 77.8527404869723 153.46857266531276 78.18426624261234 L 153.46857266531276 78.18426624261234 Q 152.80130396915513 78.51579199825238 152.0367431707858 78.75037815929744 L 152.0367431707858 78.75037815929744 Q 151.27218237241647 78.98496432034248 150.4283457264726 79.1405618651448 L 150.4283457264726 79.1405618651448 Q 149.58450908052873 79.29615940994711 148.6812154001851 79.39251534438733 L 148.6812154001851 79.39251534438733 Q 147.77792171984146 79.48887127882755 146.8336231646194 79.54437090677658 L 146.8336231646194 79.54437090677658 Q 145.88932460939736 79.59987053472562 144.919056296963 79.62949449878556 L 144.919056296963 79.62949449878556 Q 143.9487879845286 79.6591184628455 142.9634404579503 79.67371784759541 L 142.9634404579503 79.67371784759541 Q 141.97809293137203 79.68831723234531 140.98473457290987 79.69493480996456 L 140.98473457290987 79.69493480996456 Q 139.99137621444774 79.7015523875838 138.99413382203073 79.70430000383497 L 138.99413382203073 79.70430000383497 Q 137.99689142961373 79.70704762008614 136.99793553371813 79.70808794120467 L 136.99793553371813 79.70808794120467 Q 135.99897963782254 79.70912826232319 134.99933858467966 79.70948590864822 L 134.99933858467966 79.70948590864822 Q 133.99969753153678 79.70984355497325 132.99981030665145 79.70995592148242 L 132.99981030665145 79.70995592148242 Q 131.9999230817661 79.7100682879916 130.99996154088305 79.71010660776392 L 130 79.71014492753623 L 129.00003845911695 79.71018324730855 Q 128.0000769182339 79.71022156708086 127.00018969334856 79.71033393359005 L 127.00018969334856 79.71033393359005 Q 126.00030246846322 79.71044630009922 125.00066141532034 79.71080394642425 L 125.00066141532034 79.71080394642425 Q 124.00102036217746 79.71116159274928 123.00206446628187 79.7122019138678 L 123.00206446628187 79.7122019138678 Q 122.00310857038627 79.71324223498632 121.00586617796927 79.7159898512375 L 121.00586617796927 79.7159898512375 Q 120.00862378555226 79.71873746748867 119.0152654270903 79.72535504510807 L 119.0152654270903 79.72535504510807 Q 118.02190706862834 79.7319726227275 117.03655954205405 79.74657200748138 L 117.03655954205405 79.74657200748138 Q 116.05121201547976 79.76117139223527 115.08094370310666 79.79079535635627 L 115.08094370310666 79.79079535635627 Q 114.11067539073355 79.82041932047727 113.1663768361986 79.87591894911093 L 113.1663768361986 79.87591894911093 Q 112.22207828166364 79.93141857774458 111.3187846073377 80.02777451818069 L 111.3187846073377 80.02777451818069 Q 110.41549093301177 80.1241304586168 109.57165432990816 80.27972804610414 L 109.57165432990816 80.27972804610414 Q 108.72781772680455 80.43532563359149 107.96325718317799 80.66991204845633 L 107.96325718317799 80.66991204845633 Q 107.19869663955143 80.90449846332118 106.53142923356933 81.23602550446219 L 106.53142923356933 81.23602550446219 Q 105.86416182758721 81.56755254560319 105.30687692359712 82.00866360141016 L 105.30687692359712 82.00866360141016 Q 104.74959201960701 82.44977465721713 104.3068676600507 83.00503118302154 L 104.3068676600507 83.00503118302154 Q 103.86414330049439 83.56028770882594 103.5313795462522 84.22510643195417 L 103.5313795462522 84.22510643195417 Q 103.19861579201 84.88992515508241 102.96306516271784 85.65160478169348 L 102.96306516271784 85.65160478169348 Q 102.72751453342566 86.41328440830455 102.57099249485233 87.25370629016084 L 102.57099249485233 87.25370629016084 Q 102.41447045627899 88.09412817201712 102.31672007618103 88.99310877155719 L 102.31672007618103 88.99310877155719 Q 102.21896969608306 89.89208937109726 102.16051064980981 90.83021894455686 L 102.16051064980981 90.83021894455686 Q 102.10205160353655 91.76834851801647 102.06567827512853 92.72848378862443 L 102.06567827512853 92.72848378862443 Q 102.02930494672053 93.6886190592324 102 94.65579710144927 L 102 94.65579710144927 Q 101.97069505327948 95.62297514366614 101.93432172487165 96.58311041427427 L 101.93432172487165 96.58311041427427 Q 101.89794839646382 97.54324568488241 101.83948935019474 98.48137525834619 L 101.83948935019474 98.48137525834619 Q 101.78103030392566 99.41950483180997 101.68327992389332 100.31848543141544 L 101.68327992389332 100.31848543141544 Q 101.58552954386099 101.2174660310209 101.42900750604457 102.05788791363136 L 101.42900750604457 102.05788791363136 Q 101.27248546822815 102.89830979624182 101.03693484577623 103.65998942966834 L 101.03693484577623 103.65998942966834 Q 100.8013842233243 104.42166906309487 100.46862051951952 105.08648783647779 L 100.46862051951952 105.08648783647779 Q 100.13585681571473 105.7513066098607 99.69313276817884 106.30656344655502 L 99.69313276817884 106.30656344655502 Q 99.25040872064295 106.86182028324933 98.6931254692862 107.30293298570184 L 98.6931254692862 107.30293298570184 Q 98.13584221792945 107.74404568815436 97.4685824228604 108.07558031263265 L 97.4685824228604 108.07558031263265 Q 96.80132262779134 108.40711493711095 96.03679293236867 108.64173208841083 L 96.03679293236867 108.64173208841083 Q 95.272263236946 108.87634923971072 94.4285377563237 109.0320575470617 L 94.4285377563237 109.0320575470617 Q 93.58481227570141 109.18776585441266 92.68187723621216 109.28447913028387 L 92.68187723621216 109.28447913028387 Q 91.77894219672291 109.3811924061551 90.83568769585479 109.43773230565243 L 90.83568769585479 109.43773230565243 Q 89.89243319498667 109.49427220514977 88.92492248335212 109.5266437787023 L 88.92492248335212 109.5266437787023 Q 87.95741177171757 109.55901535225483 86.47870588585879 110.07842071960567 L 85 110.59782608695653 L 85 110.59782608695653 L 83.5 110.09963768115942 Q 82 109.60144927536231 81 109.60144927536231 L 80 109.60144927536231 L 78 109.60144927536231 L 76 109.60144927536231 L 74 109.60144927536231 L 72 109.60144927536231 L 70 109.60144927536231 L 68 109.60144927536231 L 66 109.60144927536231 L 64 109.60144927536231 L 63.999999999860385 107.60869565231302 L 63.99999999834655 105.61594203063297 L 63.999999984674425 103.62318842106714 L 63.99999993430264 102.62681165966221 Q 63.99999988393086 101.63043489825728 63.99999957266736 100.63405839679882 L 63.99999957266736 100.63405839679882 Q 63.99999926140386 99.63768189534036 63.999997615610916 98.64130672357643 L 63.999997615610916 98.64130672357643 Q 63.999995969817974 97.6449315518125 63.99998840934634 96.6485622733049 L 63.99998840934634 96.6485622733049 Q 63.9999808488747 95.6521929947973 63.99995031275269 94.65584660880945 L 63.99995031275269 94.65584660880945 Q 63.99991977663067 93.6595002228216 63.99981030747417 92.66323248513443 L 63.99981030747417 92.66323248513443 Q 63.99970083831767 91.66696474744725 63.99934982048137 90.67093769401616 L 63.99934982048137 90.67093769401616 Q 63.99899880264506 89.67491064058507 63.99798564084074 88.67954340692029 L 63.99798564084074 88.67954340692029 Q 63.996972479036415 87.68417617325551 63.99432626305328 86.6904365125614 L 63.99432626305328 86.6904365125614 Q 63.99168004707015 85.69669685186732 63.98539838788343 84.7065816235814 L 63.98539838788343 84.7065816235814 Q 63.97911672869671 83.71646639529547 63.9655143115716 82.73365467834581 L 63.9655143115716 82.73365467834581 Q 63.951911894446496 81.75084296139616 63.9249613125197 80.78136592428169 L 63.9249613125197 80.78136592428169 Q 63.89801073059291 79.8118888871672 63.84903258433505 78.86447549003407 L 63.84903258433505 78.86447549003407 Q 63.8000544380772 77.91706209290092 63.71825431728604 77.002694650768 L 63.71825431728604 77.002694650768 Q 63.63645419649488 76.0883272086351 63.510732477810485 75.21863145219362 L 63.510732477810485 75.21863145219362 Q 63.38501075912609 74.34893569575215 63.207072483561944 73.53343898533205 L 63.207072483561944 73.53343898533205 Q 63.02913420799781 72.71794227491195 62.797262461672396 71.96087665369654 L 62.797262461672396 71.96087665369654 Q 62.565390715346986 71.20381103248116 62.287614157714245 70.50169431635666 L 62.287614157714245 70.50169431635666 Q 62.00983760008151 69.79957760023215 61.70503546990776 69.14085830205266 L 61.70503546990776 69.14085830205266 Q 61.400233339734015 68.48213900387316 61.09624432755392 67.84951880462799 L 61.09624432755392 67.84951880462799 Q 60.79225531537382 67.21689860538282 60.52116407475745 66.59176805585649 L 60.52116407475745 66.59176805585649 Q 60.25007283414107 65.96663750633016 60.0420201387197 65.33399202972785 L 60.0420201387197 65.33399202972785 Q 59.83396744329833 64.70134655312556 59.71144533118637 64.05323437179676 L 59.71144533118637 64.05323437179676 Q 59.58892321907442 63.40512219046796 59.56324941163184 62.7413382653139 L 59.56324941163184 62.7413382653139 Q 59.53757560418926 62.07755434015985 59.6082740712492 61.40356710212306 L 59.6082740712492 61.40356710212306 Q 59.67897253830914 60.729579864086276 59.83567344925581 60.052849319518245 L 59.83567344925581 60.052849319518245 Q 59.99237436020247 59.37611877495021 60.21813998144754 58.70245369688735 L 60.21813998144754 58.70245369688735 Q 60.44390560269262 58.0287886188245 60.71881158733311 57.3600744650731 L 60.71881158733311 57.3600744650731 Q 60.99371757197359 56.69136031132169 61.29790033396796 56.02518237803743 L 61.29790033396796 56.02518237803743 Q 61.602083095962335 55.359004444753175 61.91794327981839 54.68986388029687 L 61.91794327981839 54.68986388029687 Q 62.23380346367445 54.02072331584056 62.54736287951495 53.34204362651394 L 62.54736287951495 53.34204362651394 Q 62.86092229535545 52.66336393718732 63.162425685527325 51.96941726792146 L 63.162425685527325 51.96941726792146 Q 63.46392907569919 51.275470598655595 63.7477800944249 50.562616385655694 L 63.7477800944249 50.562616385655694 Q 64.03163111315061 49.849762172655794 64.29576571906065 49.11678377685526 L 64.29576571906065 49.11678377685526 Q 64.5599003249707 48.38380538105473 64.8047460832818 47.631459942063174 L 64.8047460832818 47.631459942063174 Q 65.04959184159291 46.87911450307162 65.27679956232109 46.10918365518809 L 65.27679956232109 46.10918365518809 Q 65.50400728304928 45.339252807304554 65.71516061231517 44.55342804585523 L 65.71516061231517 44.55342804585523 Q 65.92631394158107 43.7676032844059 66.12184504016636 42.96654566055871 L 66.12184504016636 42.96654566055871 Q 66.31737613875164 42.16548803671152 66.49593024082031 41.34839632491705 L 66.49593024082031 41.34839632491705 Q 66.674484342889 40.53130461312257 66.83291136373185 39.69624234190378 L 66.83291136373185 39.69624234190378 Q 66.9913383845747 38.861180070685 67.12529330281617 38.006175496425115 L 67.12529330281617 38.006175496425115 Q 67.25924822105766 37.15117092216522 67.36412329726474 36.275758458437515 L 67.36412329726474 36.275758458437515 Q 67.46899837347183 35.40034599470981 67.54076706506093 34.506941938907 L 67.54076706506093 34.506941938907 Q 67.61253575665003 33.613537883104186 67.64819334494135 32.708027845582336 L 67.64819334494135 32.708027845582336 Q 67.68385093323266 31.802517808060493 67.68143289033935 30.893726570290475 L 67.68143289033935 30.893726570290475 Q 67.67901484744604 29.984935332520454 67.63743642118726 29.083115896757853 L 67.63743642118726 29.083115896757853 Q 67.5958579949285 28.18129646099525 67.51484514505897 27.29618412297197 L 67.51484514505897 27.29618412297197 Q 67.43383229518945 26.41107178494869 67.31400477750086 25.55021244927536 L 67.31400477750086 25.55021244927536 Q 67.19417725981228 24.68935311360203 67.03710046634912 23.857270305964985 L 67.03710046634912 23.857270305964985 Q 66.88002367288595 23.025187498327938 66.68798931025405 22.223575835461638 L 66.68798931025405 22.223575835461638 Q 66.49595494762215 21.421964172595338 66.27143411022911 20.650663260853577 L 66.27143411022911 20.650663260853577 Q 66.04691327283608 19.87936234911182 65.79189719477628 19.137571396816348 L 65.79189719477628 19.137571396816348 Q 65.5368811167165 18.395780444520874 65.25246865301645 17.682945670429373 L 65.25246865301645 17.682945670429373 Q 64.9680561893164 16.97011089633787 64.65455809946435 16.286142630269737 L 64.65455809946435 16.286142630269737 Q 64.3410600096123 15.602174364201602 63.998637254212916 14.946991520610577 L 63.998637254212916 14.946991520610577 Q 63.656214498813526 14.291808677019555 63.28581343525201 13.664493567781607 L 63.28581343525201 13.664493567781607 Q 62.91541237169049 13.037178458543659 62.519632800385196 12.435147755579232 L 62.519632800385196 12.435147755579232 Q 62.12385322907989 11.833117052614805 61.70741582000601 11.251668905780939 L 61.70741582000601 11.251668905780939 Q 61.290978410932134 10.670220758947075 60.860599856032735 10.102663171784636 L 60.860599856032735 10.102663171784636 Q 60.43022130113333 9.535105584622197 59.99389217362714 8.973476999275858 L 59.99389217362714 8.973476999275858 Q 59.55756304612095 8.411848413929519 59.123400407470086 7.848061188070037 L 59.123400407470086 7.848061188070037 Q 58.689237768819225 7.2842739622105555 58.264208819713446 6.711386139769594 L 58.264208819713446 6.711386139769594 Q 57.83917987060766 6.138498317328632 57.428027223136986 5.551784469700113 L 57.428027223136986 5.551784469700113 Q 57.016874575666314 4.965070622071593 56.62150007938 4.362635790472821 L 56.62150007938 4.362635790472821 Q 56.22612558309368 3.760200958874047 55.84553193034024 3.1430388375233047 L 55.84553193034024 3.1430388375233047 Q 55.46493827758681 2.525876716172562 55.09565496627418 1.8974452328789888 L 55.09565496627418 1.8974452328789888 Q 54.72637165496155 1.2690137495854155 54.36318582748078 0.6345068747927077 Z'),
				_Utils_Tuple2(3, 'M 164 0 L 166 0 L 168 0 L 170 0 L 172 0 L 174 0 L 176 0 L 178 0 L 180 0 L 182 0 L 184 0 L 186 0 L 188 0 L 190 0 L 192 0 L 194 0 L 196 0 L 198 0 L 200 0 L 202 0 L 204 0 L 206 0 L 208 0 L 210 0 L 212 0 L 214 0 L 216 0 L 218 0 L 220 0 L 222 0 L 222.30773920003853 0.6897526086572657 Q 222.61547840007705 1.3795052173145315 222.91456686684262 2.0778772160082735 L 222.91456686684262 2.0778772160082735 Q 223.21365533360816 2.7762492147020152 223.49546886701285 3.4918335564183596 L 223.49546886701285 3.4918335564183596 Q 223.77728240041753 4.207417898134704 224.0335753557295 4.948430352081075 L 224.0335753557295 4.948430352081075 Q 224.28986831104152 5.689442806027445 224.51356471477106 6.462933708108182 L 224.51356471477106 6.462933708108182 Q 224.73726111850058 7.236424610188919 224.9234947997494 8.047242500240655 L 224.9234947997494 8.047242500240655 Q 225.1097284809982 8.85806039029239 225.25672301246993 9.707975259166227 L 225.25672301246993 9.707975259166227 Q 225.40371754394164 10.557890128040064 225.51309495655633 11.445285820484473 L 225.51309495655633 11.445285820484473 Q 225.62247236917102 12.332681512928882 225.69880247525623 13.25300476316233 L 225.69880247525623 13.25300476316233 Q 225.77513258134147 14.173328013395778 225.8248569005048 15.120160565894002 L 225.8248569005048 15.120160565894002 Q 225.87458121966813 16.066993118392226 225.9046881762248 17.03337143482587 L 225.9046881762248 17.03337143482587 Q 225.93479513278146 17.999749751259515 225.95166785638082 18.97931167901976 L 225.95166785638082 18.97931167901976 Q 225.96854057998019 19.95887360678 225.97725271935042 20.94655467805176 L 225.97725271935042 20.94655467805176 Q 225.98596485872065 21.93423574932352 225.9900715647874 22.926459261350722 L 225.9900715647874 22.926459261350722 Q 225.99417827085412 23.918682773377927 225.99586231642223 24.913160201291134 L 225.99586231642223 24.913160201291134 Q 225.99754636199037 25.907637629204345 225.9978966455491 26.90295075551291 L 225.9978966455491 26.90295075551291 Q 225.99824692910784 27.898263881821478 225.99745638973454 28.893347826788172 L 225.99745638973454 28.893347826788172 Q 225.99666585036124 29.888431771754863 225.99398987059618 30.881979648663844 L 225.99398987059618 30.881979648663844 Q 225.99131389083112 31.875527525572828 225.9846957496153 32.86526334587984 L 225.9846957496153 32.86526334587984 Q 225.97807760839947 33.85499916618684 225.96343113697753 34.83677061290021 L 225.96343113697753 34.83677061290021 Q 225.9487846655556 35.81854205961357 225.91905432462897 36.78529356526586 L 225.91905432462897 36.78529356526586 Q 225.88932398370235 37.75204507091816 225.8336228004463 38.69292199248929 L 225.8336228004463 38.69292199248929 Q 225.77792161719026 39.633798914060414 225.6812153344179 40.53381974096391 L 225.6812153344179 40.53381974096391 Q 225.58450905164557 41.43384056786739 225.42834565399627 42.27461977909351 L 225.42834565399627 42.27461977909351 Q 225.27218225634698 43.11539899031963 225.03674275022757 43.877189336105374 L 225.03674275022757 43.877189336105374 Q 224.80130324410817 44.638979681891115 224.46857033813131 45.303829141393166 L 224.46857033813131 45.303829141393166 Q 224.13583743215446 45.96867860089521 223.69312068351522 46.5239427100329 L 223.69312068351522 46.5239427100329 Q 223.25040393487598 47.07920681917059 222.6931206835194 47.52031952162294 L 222.6931206835194 47.52031952162294 Q 222.13583743216282 47.96143222407529 221.46857033820112 48.29295957610621 L 221.46857033820112 48.29295957610621 Q 220.80130324423945 48.62448692813713 220.03674275105033 48.859073393256644 L 220.03674275105033 48.859073393256644 Q 219.27218225786118 49.09365985837616 218.4283456615978 49.24925745267896 L 218.4283456615978 49.24925745267896 Q 217.58450906533443 49.404855046981766 216.6812153917654 49.50121098817204 L 216.6812153917654 49.50121098817204 Q 215.77792171819635 49.597566929362316 214.83362316372688 49.6530665580612 L 214.83362316372688 49.6530665580612 Q 213.8893246092574 49.70856618676007 212.91905629688426 49.73819015088107 L 212.91905629688426 49.73819015088107 Q 211.94878798451117 49.767814115002054 210.96344045787143 49.78241349969072 L 210.96344045787143 49.78241349969072 Q 209.97809293123169 49.797012884379384 208.98473457201283 49.80363046124464 L 208.98473457201283 49.80363046124464 Q 207.99137621279394 49.81024803810989 206.99413381353668 49.8129956475456 L 206.99413381353668 49.8129956475456 Q 205.99689141427945 49.81574325698131 204.99793546794643 49.81678352784517 L 204.99793546794643 49.81678352784517 Q 203.99897952161342 49.81782379870903 202.9993381564501 49.81818113414414 L 202.9993381564501 49.81818113414414 Q 201.99969679128682 49.81853846957926 200.99980791376814 49.81864918944288 L 200.99980791376814 49.81864918944288 Q 199.99991903624945 49.81875990930651 198.99994988445332 49.818790645741544 L 198.99994988445332 49.818790645741544 Q 197.9999807326572 49.81882138217658 196.99998834357027 49.81882896551386 L 196.99998834357027 49.81882896551386 Q 195.99999595448332 49.81883654885114 194.99999760711668 49.818838195496696 L 194.99999760711668 49.818838195496696 Q 193.99999925975004 49.818839842142246 192.99999957177045 49.818840153032156 L 192.99999957177045 49.818840153032156 Q 191.99999988379088 49.81884046392207 190.9999999342283 49.81884051417674 L 189.9999999846657 49.818840564431405 L 187.9999999983462 49.81884057806232 L 185.99999999986002 49.81884057957067 L 183.99999999999127 49.81884057970145 L 181.99999999999966 49.818840579709786 L 180 49.818840579710134 L 178 49.81884057971014 L 176 49.81884057971014 L 174 49.81884057971014 L 172 49.81884057971014 L 170 49.81884057971014 L 168 49.81884057971014 L 166 49.81884057971014 L 165 49.81884057971014 Q 164 49.81884057971014 162.5 50.31702898550724 L 161 50.815217391304344 L 161 50.815217391304344 L 159.5 50.31702898550724 Q 158 49.81884057971014 157 49.81884057971014 L 156 49.81884057971014 L 154 49.81884057971014 L 152 49.81884057971014 L 150 49.81884057971014 L 148 49.81884057971014 L 146 49.81884057971014 L 144 49.81884057971014 L 142 49.81884057971014 L 140 49.818840579710134 L 138.00000000000034 49.81884057970979 L 136.0000000000091 49.818840579701806 L 134.0000000001487 49.81884057957936 L 132.00000000179378 49.818840578201794 L 130.0000000169881 49.81884056607923 L 128.0000001315434 49.818840479200816 L 127.00000049400123 49.81884021856556 Q 126.00000085645907 49.81883995793031 125.00000282111267 49.818838622174496 L 125.00000282111267 49.818838622174496 Q 124.00000478576628 49.81883728641869 123.00001404930867 49.81883134972297 L 123.00001404930867 49.81883134972297 Q 122.00002331285108 49.81882541302724 121.0000617719064 49.81880225986809 L 121.0000617719064 49.81880225986809 Q 120.00010023096172 49.81877910670894 119.00024220095145 49.818699122587404 L 119.00024220095145 49.818699122587404 Q 118.00038417094117 49.81861913846586 117.00085392211022 49.818372516767695 L 117.00085392211022 49.818372516767695 Q 116.00132367327929 49.81812589506953 115.00272631742891 49.8174429154474 L 115.00272631742891 49.8174429154474 Q 114.00412896157852 49.816759935825274 113.00793034756501 49.81505232980272 L 113.00793034756501 49.81505232980272 Q 112.0117317335515 49.81334472378016 111.02112958402503 49.809473370340314 L 111.02112958402503 49.809473370340314 Q 110.03052743449857 49.80560201690047 109.05181527833983 49.797613961495415 L 109.05181527833983 49.797613961495415 Q 108.0731031221811 49.78962590609035 107.11746239324424 49.7745765269149 L 107.11746239324424 49.7745765269149 Q 106.16182166430737 49.75952714773945 105.24716691227846 49.73356391639985 L 105.24716691227846 49.73356391639985 Q 104.33251216024956 49.70760068506026 103.48440627126574 49.66646702062773 L 103.48440627126574 49.66646702062773 Q 102.63630038228192 49.6253333561952 101.88533084472195 49.56529804854448 L 101.88533084472195 49.56529804854448 Q 101.134361307162 49.505262740893755 100.50534485385113 49.42420920288554 L 100.50534485385113 49.42420920288554 Q 99.87632840054026 49.34315566487733 99.368343303072 49.24130458992719 L 99.368343303072 49.24130458992719 Q 98.86035820560373 49.13945351497705 98.43017910280187 49.019139058186234 L 98.43017910280187 49.019139058186234 Q 98 48.89882460139542 98 48.763032685054235 L 98 48.763032685054235 Q 98 48.62724076871305 98.36627183992717 48.477187952362186 L 98.36627183992717 48.477187952362186 Q 98.73254367985433 48.327135136011314 99.15858863635209 48.159744708922545 L 99.15858863635209 48.159744708922545 Q 99.58463359284985 47.99235428183378 100.09422361649933 47.79873484906929 L 100.09422361649933 47.79873484906929 Q 100.60381364014881 47.6051154163048 101.17783669504627 47.370886286620404 L 101.17783669504627 47.370886286620404 Q 101.7518597499437 47.13665715693601 102.34721922699754 46.84430263409425 L 102.34721922699754 46.84430263409425 Q 102.94257870405136 46.551948111252486 103.5144798222209 46.1846482405692 L 103.5144798222209 46.1846482405692 Q 104.08638094039046 45.81734836988592 104.60133901143263 45.36326260859876 L 104.60133901143263 45.36326260859876 Q 105.11629708247482 44.9091768473116 105.55695485044549 44.365096371302734 L 105.55695485044549 44.365096371302734 Q 105.99761261841616 43.82101589529387 106.36336841393498 43.194564895932224 L 106.36336841393498 43.194564895932224 Q 106.7291242094538 42.56811389657058 107.03448080353864 41.878067856317614 L 107.03448080353864 41.878067856317614 Q 107.33983739762348 41.188021816064655 107.61112346505595 40.46266282223897 L 107.61112346505595 40.46266282223897 Q 107.88240953248842 39.73730382841329 108.15326170174322 39.01101927736181 L 108.15326170174322 39.01101927736181 Q 108.42411387099801 38.284734726310326 108.73014797565102 37.59334467301943 L 108.73014797565102 37.59334467301943 Q 109.03618208030403 36.90195461972854 109.40949875848928 36.277557056334075 L 109.40949875848928 36.277557056334075 Q 109.78281543667453 35.6531594929396 110.24724377681912 35.11953160340376 L 110.24724377681912 35.11953160340376 Q 110.71167211696371 34.585903713867914 111.27972183698857 34.15551909291889 L 111.27972183698857 34.15551909291889 Q 111.84777155701343 33.72513447196986 112.51996638222266 33.39851709759708 L 112.51996638222266 33.39851709759708 Q 113.1921612074319 33.071899723224305 113.95879382525584 32.83937788867256 L 113.95879382525584 32.83937788867256 Q 114.72542644307977 32.606856054120804 115.57005957305759 32.45205210904908 L 115.57005957305759 32.45205210904908 Q 116.4146927030354 32.29724816397734 117.31826473634099 32.20116957410464 L 117.31826473634099 32.20116957410464 Q 118.22183676964659 32.105090984231936 119.16622320923273 32.04967892223371 L 119.16622320923273 32.04967892223371 Q 120.11060964881887 31.994266860235488 121.0809028510502 31.964667695792407 L 121.0809028510502 31.964667695792407 Q 122.05119605328153 31.93506853134933 123.03654984952574 31.920475393549182 L 123.03654984952574 31.920475393549182 Q 124.02190364576995 31.905882255749038 125.01526338989021 31.899266058767417 L 125.01526338989021 31.899266058767417 Q 126.00862313401046 31.89264986178579 127.00586575733689 31.889902475607407 L 127.00586575733689 31.889902475607407 Q 128.00310838066332 31.88715508942902 129.00206410292714 31.886114595307838 L 129.00206410292714 31.886114595307838 Q 130.00101982519098 31.88507410118666 131.00065980545287 31.884715385867914 L 131.00065980545287 31.884715385867914 Q 132.0002997857148 31.88435667054917 133.00018239362885 31.88423970379685 L 133.00018239362885 31.88423970379685 Q 134.00006500154288 31.884122737044528 135.00000926347644 31.884067200927593 L 135.00000926347644 31.884067200927593 Q 135.99995352540998 31.884011664810657 136.99985802931045 31.883916514711494 L 136.99985802931045 31.883916514711494 Q 137.9997625332109 31.88382136461233 138.99948252001846 31.883542365960423 L 138.99948252001846 31.883542365960423 Q 139.999202506826 31.88326336730852 140.998405653494 31.882469401126244 L 140.998405653494 31.882469401126244 Q 141.99760880016194 31.881675434943965 142.99553656781208 31.87961071068233 L 142.99553656781208 31.87961071068233 Q 143.99346433546222 31.877545986420692 144.9885362349166 31.87263574131184 L 144.9885362349166 31.87263574131184 Q 145.983608134371 31.867725496202986 146.97283970029218 31.85699607818968 L 146.97283970029218 31.85699607818968 Q 147.96207126621337 31.846266660176376 148.94035041109998 31.824624503813414 L 148.94035041109998 31.824624503813414 Q 149.91862955598663 31.802982347450452 150.87800732471857 31.762507298179727 L 150.87800732471857 31.762507298179727 Q 151.8373850934505 31.722032248909006 152.76664852492297 31.651551972296442 L 152.76664852492297 31.651551972296442 Q 153.69591195639546 31.581071695683878 154.58075343355927 31.46633041387247 L 154.58075343355927 31.46633041387247 Q 155.4655949107231 31.351589132061058 156.28961248121792 31.176244320054074 L 156.28961248121792 31.176244320054074 Q 157.11363005171273 31.00089950804709 157.86017324874865 30.748361026832875 L 157.86017324874865 30.748361026832875 Q 158.60671644578454 30.49582254561866 159.26129309636872 30.15165073007755 L 159.26129309636872 30.15165073007755 Q 159.91586974695292 29.80747891453644 160.46857033820112 29.361800155816354 L 160.46857033820112 29.361800155816354 Q 161.02127092944934 28.916121397096266 161.46857033820112 28.36542334422215 L 161.46857033820112 28.36542334422215 Q 161.91586974695292 27.814725291348033 162.26129309636872 27.16252029529494 L 162.26129309636872 27.16252029529494 Q 162.60671644578454 26.510315299241846 162.86017324874865 25.76647696886186 L 162.86017324874865 25.76647696886186 Q 163.11363005171273 25.022638638481872 163.28961248121792 24.201606638894653 L 163.28961248121792 24.201606638894653 Q 163.4655949107231 23.380574639307433 163.58075343355927 22.498939109524635 L 163.58075343355927 22.498939109524635 Q 163.69591195639543 21.61730357974184 163.7666485249228 20.691407044760027 L 163.7666485249228 20.691407044760027 Q 163.83738509345014 19.765510509778217 163.87800732471402 18.809608747450568 L 163.87800732471402 18.809608747450568 Q 163.91862955597793 17.853706985122923 163.94035041102566 16.878972329826293 L 163.94035041102566 16.878972329826293 Q 163.9620712660734 15.904237674529663 163.97283969939548 14.918590280194762 L 163.97283969939548 14.918590280194762 Q 163.98360813271753 13.93294288585986 163.9885362264269 12.941476312563047 L 163.9885362264269 12.941476312563047 Q 163.9934643201363 11.950009739266235 163.99553650211038 10.955697601740402 L 163.99553650211038 10.955697601740402 Q 163.99760868408444 9.961385464214569 163.9984052260915 8.965802308605682 L 163.9984052260915 8.965802308605682 Q 163.9992017680986 7.970219152996794 163.99948013480684 6.974119699535791 L 163.99948013480684 6.974119699535791 Q 163.99975850151506 5.978020246074789 163.9998464310596 4.981731045439842 L 163.9998464310596 4.981731045439842 Q 163.9999343606042 3.985441844804896 163.99995951895164 2.989090100404701 L 163.99995951895164 2.989090100404701 Q 163.99998467729907 1.992738356004506 163.99999233864952 0.996369178002253 Z'),
				_Utils_Tuple2(4, 'M 222 0 L 224 0 L 226 0 L 228 0 L 230 0 L 232 0 L 234 0 L 236 0 L 238 0 L 240 0 L 242 0 L 244 0 L 246 0 L 248 0 L 250 0 L 252 0 L 254 0 L 256 0 L 258 0 L 260 0 L 262 0 L 264 0 L 263.63681447769943 0.6345071788671621 Q 263.2736289553988 1.2690143577343242 262.9043469907824 1.8974471828448216 L 262.9043469907824 1.8974471828448216 Q 262.5350650261661 2.525880007955319 262.15447733238364 3.143048066686575 L 262.15447733238364 3.143048066686575 Q 261.7738896386012 3.7602161254178315 261.37853837966713 4.362674110175579 L 261.37853837966713 4.362674110175579 Q 260.9831871207331 4.9651320949333275 260.5721147475439 5.551925925994431 L 260.5721147475439 5.551925925994431 Q 260.1610423743546 6.138719757055535 259.73626093760436 6.711854195068157 L 259.73626093760436 6.711854195068157 Q 259.31147950085415 7.284988633080779 258.8780022810336 7.849458794369006 L 258.8780022810336 7.849458794369006 Q 258.4445250612131 8.413928955657234 258.00990948078265 8.977264879575424 L 258.00990948078265 8.977264879575424 Q 257.57529390035216 9.540600803493614 257.1487993854913 10.112028358085425 L 257.1487993854913 10.112028358085425 Q 256.7223048706304 10.683455912677234 256.3138782941395 11.272885867330697 L 256.3138782941395 11.272885867330697 Q 255.90545171764865 11.86231582198416 255.5247513606674 12.479371104323672 L 255.5247513606674 12.479371104323672 Q 255.14405100368617 13.096426386663184 254.7996196986583 13.749617159851292 L 254.7996196986583 13.749617159851292 Q 254.4551883936304 14.4028079330394 254.15377052452752 15.09884708374533 L 254.15377052452752 15.09884708374533 Q 253.85235265542462 15.794886234451262 253.59831168045338 16.538096116192946 L 253.59831168045338 16.538096116192946 Q 253.34427070548213 17.281305997934627 253.13913456352958 18.07312942496184 L 253.13913456352958 18.07312942496184 Q 252.93399842157703 18.864952851989056 252.77627682780033 19.703683610071664 L 252.77627682780033 19.703683610071664 Q 252.61855523402363 20.54241436815427 252.50402289986565 21.42329598657387 L 252.50402289986565 21.42329598657387 Q 252.38949056570766 22.304177604993473 252.31204024093006 23.21992320294123 L 252.31204024093006 23.21992320294123 Q 252.23458991615246 24.135668800888986 252.18755530469247 25.07727883092403 L 252.18755530469247 25.07727883092403 Q 252.1405206932325 26.018888860959073 252.11815954711733 26.97651673790928 L 252.11815954711733 26.97651673790928 Q 252.09579840100213 27.934144614859484 252.0945216759753 28.89778746867651 L 252.0945216759753 28.89778746867651 Q 252.09324495094847 29.861430322493533 252.11222713066033 30.82139188099562 L 252.11222713066033 30.82139188099562 Q 252.13120931037218 31.781353439497707 252.17219557158296 32.72861026010953 L 252.17219557158296 32.72861026010953 Q 252.21318183279374 33.675867080721346 252.27955861301402 34.60252055675994 L 252.27955861301402 34.60252055675994 Q 252.3459353932343 35.52917403279854 252.44137583076582 36.42904126722733 L 252.44137583076582 36.42904126722733 Q 252.53681626829734 37.32890850165612 252.66396319096438 38.198093416297226 L 252.66396319096438 38.198093416297226 Q 252.79111011363142 39.06727833093832 252.95073661697378 39.904444170452905 L 252.95073661697378 39.904444170452905 Q 253.11036312031615 40.741610009967495 253.30123592575615 41.54775813639711 L 253.30123592575615 41.54775813639711 Q 253.49210873119614 42.35390626282671 253.71146238240456 43.131709028389096 L 253.71146238240456 43.131709028389096 Q 253.93081603361298 43.90951179395148 254.1750953187273 44.66247716165361 L 254.1750953187273 44.66247716165361 Q 254.41937460384162 45.415442529355744 254.68485493031997 46.14724219747743 L 254.68485493031997 46.14724219747743 Q 254.95033525679833 46.87904186559912 255.23338518260664 47.59318793454056 L 255.23338518260664 47.59318793454056 Q 255.51643510841495 48.307334003482 255.81340515190726 49.00716353987161 L 255.81340515190726 49.00716353987161 Q 256.11037519539957 49.70699307626122 256.41722555483074 50.39577220171049 L 256.41722555483074 50.39577220171049 Q 256.7240759142619 51.084551327159765 257.03584462932656 51.76550847235936 L 257.03584462932656 51.76550847235936 Q 257.3476133443913 52.44646561755896 257.65776578989085 53.12265911238741 L 257.65776578989085 53.12265911238741 Q 257.96791823539036 53.79885260721587 258.2676466028496 54.472883473190464 L 258.2676466028496 54.472883473190464 Q 258.5673749703088 55.146914339165065 258.8450869373043 55.820572612031214 L 258.8450869373043 55.820572612031214 Q 259.1227989042998 56.494230884897355 259.36424888436454 57.168232047174754 L 259.36424888436454 57.168232047174754 Q 259.6056988644293 57.84223320945215 259.79526469329267 58.51626707075775 L 259.79526469329267 58.51626707075775 Q 259.98483052215596 59.190300932063344 260.108145241957 59.86361388511173 L 260.108145241957 59.86361388511173 Q 260.231459961758 60.53692683816013 260.2789836999219 61.20949105118905 L 260.2789836999219 61.20949105118905 Q 260.32650743808586 61.88205526421796 260.29693842560124 62.55603443873734 L 260.29693842560124 62.55603443873734 Q 260.2673694131166 63.230013613256716 260.16947092526857 63.91088173336648 L 260.16947092526857 63.91088173336648 Q 260.0715724374205 64.59174985347624 259.9233524666064 65.28833609277498 L 259.9233524666064 65.28833609277498 Q 259.7751324957922 65.98492233207371 259.60030656360607 66.70801813421124 L 259.60030656360607 66.70801813421124 Q 259.4254806314199 67.43111393634877 259.248310663491 68.19096631952385 L 259.248310663491 68.19096631952385 Q 259.0711406955621 68.95081870269895 258.9114455633442 69.75445251187239 L 258.9114455633442 69.75445251187239 Q 258.7517504311263 70.55808632104583 258.6217369506537 71.40754440140975 L 258.6217369506537 71.40754440140975 Q 258.49172347018117 72.25700248177365 258.3953987542293 73.14915845373807 L 258.3953987542293 73.14915845373807 Q 258.29907403827735 74.04131442570247 258.2338929148895 74.96916894976428 L 258.2338929148895 74.96916894976428 Q 258.16871179150166 75.89702347382611 258.12836412681384 76.8517861082223 L 258.12836412681384 76.8517861082223 Q 258.08801646212595 77.80654874261849 258.06514908137 78.77963583475827 L 258.06514908137 78.77963583475827 Q 258.042281700614 79.75272292689803 258.0303573264929 80.73705591812615 L 258.0303573264929 80.73705591812615 Q 258.01843295237177 81.72138890935426 258.0125002299864 82.71180766509018 L 258.0125002299864 82.71180766509018 Q 258.00656750760106 83.7022264208261 258.00313048997054 84.69516670736783 L 258.00313048997054 84.69516670736783 Q 257.99969347234 85.68810699390959 257.99600428717747 86.68080530331233 L 257.99600428717747 86.68080530331233 Q 257.9923151020149 87.67350361271505 257.98534593763236 88.66293598787391 L 257.98534593763236 88.66293598787391 Q 257.9783767732498 89.65236836303275 257.96362083881996 90.63404261672679 L 257.96362083881996 90.63404261672679 Q 257.9488649043901 91.61571687042084 257.91910407771326 92.58244067228979 L 257.91910407771326 92.58244067228979 Q 257.8893432510364 93.54916447415874 257.8336348192595 94.49003469474228 L 257.8336348192595 94.49003469474228 Q 257.77792638748264 95.43090491532581 257.6812201107936 96.330925835169 L 257.6812201107936 96.330925835169 Q 257.5845138341046 97.23094675501218 257.4283577292646 98.07173324474697 L 257.4283577292646 98.07173324474697 Q 257.2722016244246 98.91251973448175 257.0367928656999 99.67434071763614 L 257.0367928656999 99.67434071763614 Q 256.8013841069752 100.43616170079054 256.46876200462316 101.10112156257745 L 256.46876200462316 101.10112156257745 Q 256.1361399022711 101.76608142436436 255.69378013507847 102.3217012215456 L 255.69378013507847 102.3217012215456 Q 255.25142036788583 102.87732101872683 254.69517355921758 103.31946640864071 L 254.69517355921758 103.31946640864071 Q 254.13892675054933 103.76161179855458 253.47438640912233 104.09585602358203 L 253.47438640912233 104.09585602358203 Q 252.80984606769533 104.43010024860946 252.05181609280584 104.67119357073042 L 252.05181609280584 104.67119357073042 Q 251.2937861179163 104.9122868928514 250.46424336017668 105.08212653640793 L 250.46424336017668 105.08212653640793 Q 249.63470060243708 105.25196617996446 248.7600945628321 105.37690581441603 L 248.7600945628321 105.37690581441603 Q 247.88548852322714 105.50184544886761 246.99413381361103 105.61009709689505 L 246.99413381361103 105.61009709689505 Q 246.10277910399492 105.71834874492248 245.22257547802857 105.83771107412267 L 245.22257547802857 105.83771107412267 Q 244.34237185206223 105.95707340332285 243.4985352626391 106.11267100444113 L 243.4985352626391 106.11267100444113 Q 242.654698673216 106.2682686055594 241.8670481836185 106.47984873367784 L 241.8670481836185 106.47984873367784 Q 241.079397694021 106.69142886179627 240.35918706729197 106.97020450545395 L 240.35918706729197 106.97020450545395 Q 239.63897644056294 107.24898014911162 238.98603256907558 107.59477882788326 L 238.98603256907558 107.59477882788326 Q 238.3330886975882 107.94057750665492 237.73457479095808 108.3406089402662 L 237.73457479095808 108.3406089402662 Q 237.13606088432795 108.74064037387747 236.06803044216397 109.669233230417 L 235 110.59782608695653 L 235 110.59782608695653 L 233.5212941141412 110.07842071960567 Q 232.0425882282824 109.55901535225483 231.07507751664787 109.5266437787023 L 231.07507751664787 109.5266437787023 Q 230.10756680501333 109.49427220514977 229.1643123041452 109.43773230565243 L 229.1643123041452 109.43773230565243 Q 228.2210578032771 109.3811924061551 227.31812276378784 109.28447913028387 L 227.31812276378784 109.28447913028387 Q 226.4151877242986 109.18776585441266 225.5714622436763 109.0320575470617 L 225.5714622436763 109.0320575470617 Q 224.727736763054 108.87634923971072 223.96320706763132 108.64173208841083 L 223.96320706763132 108.64173208841083 Q 223.19867737220864 108.40711493711095 222.5314175771396 108.07558031263265 L 222.5314175771396 108.07558031263265 Q 221.86415778207055 107.74404568815436 221.3068745307138 107.30293298570184 L 221.3068745307138 107.30293298570184 Q 220.74959127935705 106.86182028324933 220.30686723182117 106.30656344655502 L 220.30686723182117 106.30656344655502 Q 219.8641431842853 105.7513066098607 219.5313794804805 105.08648783647779 L 219.5313794804805 105.08648783647779 Q 219.1986157766757 104.42166906309487 218.96306515422378 103.65998942966834 L 218.96306515422378 103.65998942966834 Q 218.72751453177185 102.89830979624182 218.57099249395543 102.05788791363136 L 218.57099249395543 102.05788791363136 Q 218.41447045613904 101.2174660310209 218.31672007610686 100.31848543141527 L 218.31672007610686 100.31848543141527 Q 218.21896969607468 99.41950483180963 218.16051064980962 98.48137525834186 L 218.16051064980962 98.48137525834186 Q 218.10205160354457 97.54324568487408 218.06567827519817 96.58311041420473 L 218.06567827519817 96.58311041420473 Q 218.02930494685177 95.62297514353536 218.00000000082252 94.65579710062971 L 218.00000000082252 94.65579710062971 Q 217.9706950547933 93.68861905772405 217.93432173246862 92.7284837810548 L 217.93432173246862 92.7284837810548 Q 217.89794841014395 91.76834850438556 217.83948940746785 90.83021888748674 L 217.83948940746785 90.83021888748674 Q 217.78103040479175 89.89208927058792 217.68328028627678 88.99310841041259 L 217.68328028627678 88.99310841041259 Q 217.58553016776185 88.09412755023727 217.42900946980143 87.25370433262535 L 217.42900946980143 87.25370433262535 Q 217.27248877184104 86.41328111501343 217.03694410082858 85.65159555171063 L 217.03694410082858 85.65159555171063 Q 216.80139942981612 84.88990998840782 216.46865891286492 84.22506811218166 L 216.46865891286492 84.22506811218166 Q 216.13591839591373 83.5602262359555 215.69327431063886 83.00488972671852 L 215.69327431063886 83.00488972671852 Q 215.25063022536398 82.44955321748152 214.6935928337909 82.00819554604166 L 214.6935928337909 82.00819554604166 Q 214.1365554422178 81.56683787460182 213.46997345576128 81.2346278973393 L 213.46997345576128 81.2346278973393 Q 212.80339146930476 80.90241792007676 212.0405444788989 80.66612416051737 L 212.0405444788989 80.66612416051737 Q 211.27769748849306 80.429830400958 210.43774496972028 80.27036280190913 L 210.43774496972028 80.27036280190913 Q 209.5977924509475 80.11089520286026 208.7025098769285 80.00655718784299 L 208.7025098769285 80.00655718784299 Q 207.80722730290947 79.90221917282571 206.87800934754253 79.8316935848761 L 206.87800934754253 79.8316935848761 Q 205.9487913921756 79.7611679969265 205.00449906365196 79.70566216483954 L 205.00449906365196 79.70566216483954 Q 204.06020673512833 79.65015633275257 203.11588871095125 79.59467610321886 L 203.11588871095125 79.59467610321886 Q 202.1715706867742 79.53919587368513 201.2377558996926 79.47325046226283 L 201.2377558996926 79.47325046226283 Q 200.30394111261097 79.40730505084053 199.38624691277442 79.32529746009796 L 199.38624691277442 79.32529746009796 Q 198.46855271293788 79.24328986935538 197.56766186087836 79.14453981253061 L 197.56766186087836 79.14453981253061 Q 196.66677100881884 79.04578975570584 195.77909804525694 78.93386970128384 L 195.77909804525694 78.93386970128384 Q 194.89142508169505 78.82194964686182 194.01075378673636 78.70305329220108 L 194.01075378673636 78.70305329220108 Q 193.1300824917777 78.58415693754033 192.2500750765393 78.4645991085206 L 192.2500750765393 78.4645991085206 Q 191.37006766130094 78.34504127950088 190.4870408442075 78.22849191247441 L 190.4870408442075 78.22849191247441 Q 189.60401402711406 78.11194254544795 188.71906754211074 77.99730589101284 L 188.71906754211074 77.99730589101284 Q 187.83412105710744 77.88266923657773 186.95380010271148 77.76342381070414 L 186.95380010271148 77.76342381070414 Q 186.07347914831553 77.64417838483055 185.20863071558338 77.50951649715424 L 185.20863071558338 77.50951649715424 Q 184.34378228285124 77.37485460947792 183.50690771982295 77.21232020669815 L 183.50690771982295 77.21232020669815 Q 182.67003315679463 77.04978580391838 181.87197176956172 76.84857885279176 L 181.87197176956172 76.84857885279176 Q 181.07391038232882 76.64737190166514 180.32091314116656 76.40126408035943 L 180.32091314116656 76.40126408035943 Q 179.56791590000427 76.15515625905371 178.86002080311712 75.8641097070391 L 178.86002080311712 75.8641097070391 Q 178.15212570622998 75.5730631550245 177.4832954743687 75.24309327735004 L 177.4832954743687 75.24309327735004 Q 176.81446524250742 74.91312339967558 176.17436372965273 74.55452889255616 L 176.17436372965273 74.55452889255616 Q 175.53426221679803 74.19593438543676 174.91104740975257 73.8205143562248 L 174.91104740975257 73.8205143562248 Q 174.2878326027071 73.44509432701287 173.6711173579901 73.06319828461133 L 173.6711173579901 73.06319828461133 Q 173.0544021132731 72.6813022422098 172.43764093063174 72.29945197129086 L 172.43764093063174 72.29945197129086 Q 171.82087974799038 71.91760170037193 171.20277854824414 71.53708659142342 L 171.20277854824414 71.53708659142342 Q 170.5846773484979 71.15657148247492 169.96958293866618 70.77306047777827 L 169.96958293866618 70.77306047777827 Q 169.35448852883445 70.38954947308162 168.7519100264038 69.99356790847447 L 168.7519100264038 69.99356790847447 Q 168.14933152397316 69.59758634386733 167.57274034759192 69.17571161018923 L 167.57274034759192 69.17571161018923 Q 166.99614917121067 68.75383687651112 166.4611254206723 68.29054532360553 L 166.4611254206723 68.29054532360553 Q 165.9261016701339 67.82725377069994 165.44792412016346 67.30732198172123 L 165.44792412016346 67.30732198172123 Q 164.969746570193 66.7873901927425 164.5607331851028 66.19854483368383 L 164.5607331851028 66.19854483368383 Q 164.15171980001261 65.60969947462513 163.81889703652257 64.9449395469431 L 163.81889703652257 64.9449395469431 Q 163.48607427303253 64.28017961926108 163.22985460665006 63.53909414192477 L 163.22985460665006 63.53909414192477 Q 162.9736349402676 62.798008664588465 162.78795329682015 61.986640736864 L 162.78795329682015 61.986640736864 Q 162.60227165337272 61.17527280913953 162.4761290172944 60.30458159508712 L 162.4761290172944 60.30458159508712 Q 162.34998638121607 59.433890381034715 162.26982417500005 58.51738533288038 L 162.26982417500005 58.51738533288038 Q 162.18966196878404 57.600880284726045 162.1417189635322 56.6522727718429 L 162.1417189635322 56.6522727718429 Q 162.0937759582804 55.70366525895976 162.0656779631781 54.73528463813776 L 162.0656779631781 54.73528463813776 Q 162.03757996807582 53.76690401731577 161.5187899840379 52.291060704310055 L 161 50.815217391304344 L 161 50.815217391304344 L 162.5 50.31702898550724 Q 164 49.81884057971014 165 49.81884057971014 L 166 49.81884057971014 L 168 49.81884057971014 L 170 49.81884057971014 L 172 49.81884057971014 L 174 49.81884057971014 L 176 49.81884057971014 L 178 49.81884057971014 L 180 49.818840579710134 L 181.99999999999966 49.818840579709786 L 183.99999999999127 49.81884057970145 L 185.99999999986002 49.81884057957067 L 187.9999999983462 49.81884057806232 L 189.9999999846657 49.818840564431405 L 190.9999999342283 49.81884051417674 Q 191.99999988379088 49.81884046392207 192.99999957177045 49.818840153032156 L 192.99999957177045 49.818840153032156 Q 193.99999925975004 49.818839842142246 194.99999760711668 49.818838195496696 L 194.99999760711668 49.818838195496696 Q 195.99999595448332 49.81883654885114 196.99998834357027 49.81882896551386 L 196.99998834357027 49.81882896551386 Q 197.9999807326572 49.81882138217658 198.99994988445332 49.818790645741544 L 198.99994988445332 49.818790645741544 Q 199.99991903624945 49.81875990930651 200.99980791376814 49.81864918944288 L 200.99980791376814 49.81864918944288 Q 201.99969679128682 49.81853846957926 202.9993381564501 49.81818113414414 L 202.9993381564501 49.81818113414414 Q 203.99897952161342 49.81782379870903 204.99793546794643 49.81678352784517 L 204.99793546794643 49.81678352784517 Q 205.99689141427945 49.81574325698131 206.99413381353668 49.8129956475456 L 206.99413381353668 49.8129956475456 Q 207.99137621279394 49.81024803810989 208.98473457201283 49.80363046124464 L 208.98473457201283 49.80363046124464 Q 209.97809293123169 49.797012884379384 210.96344045787143 49.78241349969072 L 210.96344045787143 49.78241349969072 Q 211.94878798451117 49.767814115002054 212.91905629688426 49.73819015088107 L 212.91905629688426 49.73819015088107 Q 213.8893246092574 49.70856618676007 214.83362316372688 49.6530665580612 L 214.83362316372688 49.6530665580612 Q 215.77792171819635 49.597566929362316 216.6812153917654 49.50121098817204 L 216.6812153917654 49.50121098817204 Q 217.58450906533443 49.404855046981766 218.4283456615978 49.24925745267896 L 218.4283456615978 49.24925745267896 Q 219.27218225786118 49.09365985837616 220.03674275105033 48.859073393256644 L 220.03674275105033 48.859073393256644 Q 220.80130324423945 48.62448692813713 221.46857033820112 48.29295957610621 L 221.46857033820112 48.29295957610621 Q 222.13583743216282 47.96143222407529 222.6931206835194 47.52031952162294 L 222.6931206835194 47.52031952162294 Q 223.25040393487598 47.07920681917059 223.69312068351522 46.5239427100329 L 223.69312068351522 46.5239427100329 Q 224.13583743215446 45.96867860089521 224.46857033813131 45.303829141393166 L 224.46857033813131 45.303829141393166 Q 224.80130324410817 44.638979681891115 225.03674275022757 43.877189336105374 L 225.03674275022757 43.877189336105374 Q 225.27218225634698 43.11539899031963 225.42834565399627 42.27461977909351 L 225.42834565399627 42.27461977909351 Q 225.58450905164557 41.43384056786739 225.6812153344179 40.53381974096391 L 225.6812153344179 40.53381974096391 Q 225.77792161719026 39.633798914060414 225.8336228004463 38.69292199248929 L 225.8336228004463 38.69292199248929 Q 225.88932398370235 37.75204507091816 225.91905432462897 36.78529356526586 L 225.91905432462897 36.78529356526586 Q 225.9487846655556 35.81854205961357 225.96343113697753 34.83677061290021 L 225.96343113697753 34.83677061290021 Q 225.97807760839947 33.85499916618684 225.9846957496153 32.86526334587984 L 225.9846957496153 32.86526334587984 Q 225.99131389083112 31.875527525572828 225.99398987059618 30.881979648663844 L 225.99398987059618 30.881979648663844 Q 225.99666585036124 29.888431771754863 225.99745638973454 28.893347826788172 L 225.99745638973454 28.893347826788172 Q 225.99824692910784 27.898263881821478 225.9978966455491 26.90295075551291 L 225.9978966455491 26.90295075551291 Q 225.99754636199037 25.907637629204345 225.99586231642223 24.913160201291134 L 225.99586231642223 24.913160201291134 Q 225.99417827085412 23.918682773377927 225.9900715647874 22.926459261350722 L 225.9900715647874 22.926459261350722 Q 225.98596485872065 21.93423574932352 225.97725271935042 20.94655467805176 L 225.97725271935042 20.94655467805176 Q 225.96854057998019 19.95887360678 225.95166785638082 18.97931167901976 L 225.95166785638082 18.97931167901976 Q 225.93479513278146 17.999749751259515 225.9046881762248 17.03337143482587 L 225.9046881762248 17.03337143482587 Q 225.87458121966813 16.066993118392226 225.8248569005048 15.120160565894002 L 225.8248569005048 15.120160565894002 Q 225.77513258134147 14.173328013395778 225.69880247525623 13.25300476316233 L 225.69880247525623 13.25300476316233 Q 225.62247236917102 12.332681512928882 225.51309495655633 11.445285820484473 L 225.51309495655633 11.445285820484473 Q 225.40371754394164 10.557890128040064 225.25672301246993 9.707975259166227 L 225.25672301246993 9.707975259166227 Q 225.1097284809982 8.85806039029239 224.9234947997494 8.047242500240655 L 224.9234947997494 8.047242500240655 Q 224.73726111850058 7.236424610188919 224.51356471477106 6.462933708108182 L 224.51356471477106 6.462933708108182 Q 224.28986831104152 5.689442806027445 224.0335753557295 4.948430352081075 L 224.0335753557295 4.948430352081075 Q 223.77728240041753 4.207417898134704 223.49546886701285 3.4918335564183596 L 223.49546886701285 3.4918335564183596 Q 223.21365533360816 2.7762492147020152 222.91456686684262 2.0778772160082735 L 222.91456686684262 2.0778772160082735 Q 222.61547840007705 1.3795052173145315 222.30773920003853 0.6897526086572657 Z'),
				_Utils_Tuple2(5, 'M 264 0 L 266 0 L 265.72680609817814 0.7241727427499522 Q 265.4536121963563 1.4483454854999045 265.1692094992784 2.1613500445708684 L 265.1692094992784 2.1613500445708684 Q 264.88480680220056 2.874354603641832 264.57974827706744 3.5667781746142526 L 264.57974827706744 3.5667781746142526 Q 264.27468975193426 4.259201745586673 263.9426639305567 4.9247557279094245 L 263.9426639305567 4.9247557279094245 Q 263.61063810917915 5.590309710232176 263.2492222643489 6.226580154686756 L 263.2492222643489 6.226580154686756 Q 262.8878064195186 6.862850599141336 262.4985767930764 7.471408036440566 L 262.4985767930764 7.471408036440566 Q 262.1093471666341 8.079965473739797 261.6974744142999 8.665961824203116 L 261.6974744142999 8.665961824203116 Q 261.28560166196564 9.251958174666434 260.8591071471048 9.823385729258245 L 260.8591071471048 9.823385729258245 Q 260.43261263224394 10.394813283850056 260.0014432276568 10.96158281195839 L 260.0014432276568 10.96158281195839 Q 259.57027382306967 11.528352340066723 259.14532587271015 12.101320346395234 L 259.14532587271015 12.101320346395234 Q 258.7203779223506 12.674288352723742 258.3125810254028 13.264343119469892 L 258.3125810254028 13.264343119469892 Q 257.90478412845493 13.85439788621604 257.52431970754037 14.471676885660322 L 257.52431970754037 14.471676885660322 Q 257.1438552866258 15.088955885104607 256.7995215778536 15.742200180631617 L 256.7995215778536 15.742200180631617 Q 256.45518786908144 16.395444476158627 256.15386673042434 17.091431402846133 L 256.15386673042434 17.091431402846133 Q 255.85254559176724 17.787418329533644 255.59873593519603 18.530409169976796 L 255.59873593519603 18.530409169976796 Q 255.34492627862483 19.273400010419948 255.1404023239881 20.06461606495676 L 255.1404023239881 20.06461606495676 Q 254.93587836935137 20.85583211949357 254.77964521935107 21.693080337237525 L 254.77964521935107 21.693080337237525 Q 254.62341206935076 22.53032855498148 254.51215401840753 23.407947839154595 L 254.51215401840753 23.407947839154595 Q 254.4008959674643 24.285567123327713 254.32997294894437 25.194809076686248 L 254.32997294894437 25.194809076686248 Q 254.25904993042445 26.104051030044786 254.22383779129808 27.033881424160818 L 254.22383779129808 27.033881424160818 Q 254.18862565217174 27.963711818276852 254.1857650852022 28.90190977047577 L 254.1857650852022 28.90190977047577 Q 254.1829045182327 29.840107722674684 254.21098209578457 30.774502630089785 L 254.21098209578457 30.774502630089785 Q 254.2390596733364 31.70889753750489 254.29845375544141 32.62859361355072 L 254.29845375544141 32.62859361355072 Q 254.35784783754644 33.548289689596544 254.4498421497375 34.44472327101532 L 254.4498421497375 34.44472327101532 Q 254.54183646192854 35.341156852434096 254.66743713286726 36.20880101719888 L 254.66743713286726 36.20880101719888 Q 254.793037803806 37.076445181963656 254.9520362870094 37.912984654994744 L 254.9520362870094 37.912984654994744 Q 255.11103477021283 38.74952412802584 255.30167930012226 39.55544151271904 L 255.30167930012226 39.55544151271904 Q 255.49232383003167 40.36135889741225 255.71161103773846 41.13908029353574 L 255.71161103773846 41.13908029353574 Q 255.93089824544523 41.91680168965923 256.1751935193952 42.66972151539633 L 256.1751935193952 42.66972151539633 Q 256.41948879334507 43.42264134113344 256.68510369758144 44.1543536596853 L 256.68510369758144 44.1543536596853 Q 256.95071860181775 44.886065978237156 257.234229370932 45.5999565498921 L 257.234229370932 45.5999565498921 Q 257.51774014004616 46.31384712154705 257.8160817676473 47.012962730810145 L 257.8160817676473 47.012962730810145 Q 258.1144233952484 47.712078340073234 258.4249642436407 48.39903936427538 L 258.4249642436407 48.39903936427538 Q 258.735505092033 49.08600038847752 259.056314407759 49.762730224808415 L 259.056314407759 49.762730224808415 Q 259.37712372348494 50.43946006113931 259.7075262287714 51.10663147659553 L 259.7075262287714 51.10663147659553 Q 260.0379287340579 51.773802892051755 260.37928366170024 52.43006156909726 L 260.37928366170024 52.43006156909726 Q 260.72063858934257 53.086320246142776 261.07714204871036 53.72748527756179 L 261.07714204871036 53.72748527756179 Q 261.43364550807814 54.368650308980804 261.8128507867439 54.98719577407796 L 261.8128507867439 54.98719577407796 Q 262.1920560654097 55.60574123917512 262.6047599368137 56.19090948324719 L 262.6047599368137 56.19090948324719 Q 263.0174638082177 56.77607772731926 263.4766799930357 57.31490218085207 L 263.4766799930357 57.31490218085207 Q 263.9358961778537 57.853726634384884 264.45488600243584 58.33299401931211 L 264.45488600243584 58.33299401931211 Q 264.973875827018 58.81226140423934 265.5635930654783 59.22105763403431 L 265.5635930654783 59.22105763403431 Q 266.1533103039386 59.62985386382929 266.8199723092799 59.96198411213055 L 266.8199723092799 59.96198411213055 Q 267.48663431462114 60.294114360431806 268.2302317830913 60.54958789728219 L 268.2302317830913 60.54958789728219 Q 268.9738292515615 60.80506143413257 269.78811415794854 60.99010364697156 L 269.78811415794854 60.99010364697156 Q 270.6023990643356 61.175145859810556 271.47634293525937 61.30074526378144 L 271.47634293525937 61.30074526378144 Q 272.35028680618314 61.42634466775231 273.27045485667617 61.5058873710654 L 273.27045485667617 61.5058873710654 Q 274.1906229071692 61.58543007437849 275.14364121198344 61.63224154603098 L 275.14364121198344 61.63224154603098 Q 276.0966595167977 61.67905301768347 277.07106538344544 61.70455441866851 L 277.07106538344544 61.70455441866851 Q 278.0454712500932 61.730055819653536 279.03261394478255 61.74286654052466 L 279.03261394478255 61.74286654052466 Q 280.0197566394719 61.75567726139579 281.0138239170862 61.76158848841052 L 281.0138239170862 61.76158848841052 Q 282.0078911947005 61.767499715425245 283.00538710825145 61.769994729097306 L 283.00538710825145 61.769994729097306 Q 284.0028830218024 61.77248974276936 285.00192058911307 61.77344868838371 L 285.00192058911307 61.77344868838371 Q 286.00095815642374 61.77440763399806 287.00062302115236 61.77474155501123 L 287.00062302115236 61.77474155501123 Q 288.000287885881 61.7750754760244 289.00018276533797 61.775180215695855 L 289.00018276533797 61.775180215695855 Q 290.000077644795 61.77528495536731 291.00004814329134 61.77531434998143 L 291.00004814329134 61.77531434998143 Q 292.00001864178773 61.77534374459554 293.00001129314916 61.77535106660862 L 293.00001129314916 61.77535106660862 Q 294.0000039445106 61.775358388621704 295.00000233553584 61.77535999176682 L 295.00000233553584 61.77535999176682 Q 296.0000007265611 61.775361594911935 297.000000420628 61.775361899736566 L 297.000000420628 61.775361899736566 Q 298.0000001146949 61.775362204561205 299.00000006494895 61.77536225412692 L 300.000000015203 61.77536230369264 L 302.0000000016454 61.77536231720109 L 304.0000000001396 61.775362318701454 L 306.0000000000087 61.775362318831895 L 308.00000000000034 61.77536231884022 L 310 61.77536231884057 L 312 61.77536231884058 L 314 61.77536231884058 L 316 61.77536231884058 L 318 61.77536231884058 L 320 61.77536231884058 L 322 61.77536231884058 L 324 61.77536231884058 L 326 61.77536231884058 L 328 61.77536231884058 L 330 61.77536231884058 L 332 61.77536231884058 L 334 61.77536231884058 L 336 61.77536231884058 L 338 61.77536231884058 L 340 61.77536231884058 L 340 63.768115942028984 L 340 65.76086956521739 L 340 67.7536231884058 L 340 69.7463768115942 L 340 71.73913043478261 L 340 73.73188405797102 L 340 75.72463768115942 L 340 77.71739130434783 L 340 79.71014492753623 L 340 81.70289855072464 L 340 83.69565217391305 L 340 85.68840579710145 L 340 87.68115942028986 L 340 89.67391304347827 L 340 91.66666666666667 L 340 93.65942028985508 L 340 95.65217391304347 L 340 97.64492753623188 L 340 99.63768115942028 L 340 101.63043478260869 L 340 103.6231884057971 L 340 105.6159420289855 L 340 107.6086956521739 L 340 109.60144927536231 L 340 111.59420289855072 L 338 111.59420289855072 L 336 111.59420289855072 L 334 111.59420289855072 L 332 111.59420289855072 L 330 111.59420289855072 L 328 111.59420289855072 L 326 111.59420289855072 L 324 111.59420289855072 L 322 111.59420289855072 L 320 111.59420289855072 L 318 111.59420289855072 L 316 111.59420289855072 L 314 111.59420289855072 L 312.00000000000034 111.59420289855038 L 310.00000000000836 111.59420289854239 L 308.0000000001313 111.59420289841994 L 306.00000000151385 111.59420289704238 L 304.0000000136805 111.59420288491981 L 302.0000001008748 111.5942027980414 L 301.0000003624578 111.59420253740615 Q 300.0000006240408 111.59420227677091 299.00000196465373 111.59420094101527 L 299.00000196465373 111.59420094101527 Q 298.0000033052667 111.59419960525963 297.0000092635464 111.5941936685679 L 297.0000092635464 111.5941936685679 Q 296.0000152218261 111.59418773187616 295.00003845911715 111.59416457877823 L 295.00003845911715 111.59416457877823 Q 294.0000616964081 111.5941414256803 293.0001419706896 111.59406144224772 L 293.0001419706896 111.59406144224772 Q 292.000222244971 111.59398145881514 291.0004697573878 111.59373484318242 L 291.0004697573878 111.59373484318242 Q 290.0007172698047 111.5934882275497 289.00140268932626 111.59280529143217 L 289.00140268932626 111.59280529143217 Q 288.00208810884783 111.59212235531466 287.00380166200694 111.59041501068151 L 287.00380166200694 111.59041501068151 Q 286.005515215166 111.58870766604838 285.00939929880155 111.58483765517963 L 285.00939929880155 111.58483765517963 Q 284.01328338243707 111.58096764431087 283.0212944765992 111.57298557585221 L 283.0212944765992 111.57298557585221 Q 282.0293055707614 111.56500350739354 281.0443861256409 111.54997759220558 L 281.0443861256409 111.54997759220558 Q 280.0594666805205 111.53495167701763 279.08544239670397 111.50907007574818 L 279.08544239670397 111.50907007574818 Q 278.11141811288746 111.48318847447875 277.15244623108276 111.4423090088936 L 277.15244623108276 111.4423090088936 Q 276.19347434927806 111.40142954330844 275.2530117009226 111.34210790682855 L 275.2530117009226 111.34210790682855 Q 274.3125490525672 111.28278627034865 273.39207266868823 111.20355078464941 L 273.39207266868823 111.20355078464941 Q 272.47159628480927 111.12431529895017 271.5695751089544 111.02669148267529 L 271.5695751089544 111.02669148267529 Q 270.66755393309944 110.92906766640041 269.77925136643876 110.81777502090739 L 269.77925136643876 110.81777502090739 Q 268.89094879977813 110.70648237541437 268.0093996048043 110.58846126261969 L 268.0093996048043 110.58846126261969 Q 267.12785040983044 110.47044014982502 266.2458464317108 110.35287433339693 L 266.2458464317108 110.35287433339693 Q 265.3638424535911 110.23530851696884 264.476221068962 110.12334903075606 L 264.476221068962 110.12334903075606 Q 263.58859968433296 110.01138954454326 262.6938690441847 109.90654842288166 L 262.6938690441847 109.90654842288166 Q 261.7991384040364 109.80170730122006 260.8996819771329 109.70169065480036 L 260.8996819771329 109.70169065480036 Q 260.00022555022935 109.60167400838066 259.10094097907074 109.50182859503977 L 259.10094097907074 109.50182859503977 Q 258.2016564079121 109.40198318169888 257.30761092501507 109.2978247348268 L 257.30761092501507 109.2978247348268 Q 256.41356544211806 109.19366628795471 255.52773187702675 109.0834881435502 L 255.52773187702675 109.0834881435502 Q 254.64189831193545 108.97330999914568 253.7640245402046 108.85985942321292 L 253.7640245402046 108.85985942321292 Q 252.88615076847373 108.74640884728015 252.01329756871837 108.63705221035232 L 252.01329756871837 108.63705221035232 Q 251.14044436896302 108.5276955734245 250.26893456358326 108.43313475899602 L 250.26893456358326 108.43313475899602 Q 249.3974247582035 108.33857394456754 248.52525763578626 108.27069549359956 L 248.52525763578626 108.27069549359956 Q 247.653090513369 108.20281704263158 246.78163118289115 108.17241834080257 L 246.78163118289115 108.17241834080257 Q 245.91017185241327 108.14201963897355 245.04425145384835 108.15695829828555 L 245.04425145384835 108.15695829828555 Q 244.17833105528345 108.17189695759754 243.32462827174356 108.23585887430507 L 243.32462827174356 108.23585887430507 Q 242.4709254882037 108.29982079101259 241.63527975879637 108.4116564057132 L 241.63527975879637 108.4116564057132 Q 240.79963402938904 108.52349202041381 239.98440301659605 108.67704649312726 L 239.98440301659605 108.67704649312726 Q 239.16917200380306 108.83060096584072 238.3717111232745 109.01507623877039 L 238.3717111232745 109.01507623877039 Q 237.57425024274596 109.19955151170007 236.28712512137298 109.8986887993283 L 235 110.59782608695653 L 236.06803044216397 109.669233230417 Q 237.13606088432795 108.74064037387747 237.73457479095808 108.3406089402662 L 237.73457479095808 108.3406089402662 Q 238.3330886975882 107.94057750665492 238.98603256907558 107.59477882788326 L 238.98603256907558 107.59477882788326 Q 239.63897644056294 107.24898014911162 240.35918706729197 106.97020450545395 L 240.35918706729197 106.97020450545395 Q 241.079397694021 106.69142886179627 241.8670481836185 106.47984873367784 L 241.8670481836185 106.47984873367784 Q 242.654698673216 106.2682686055594 243.4985352626391 106.11267100444113 L 243.4985352626391 106.11267100444113 Q 244.34237185206223 105.95707340332285 245.22257547802857 105.83771107412267 L 245.22257547802857 105.83771107412267 Q 246.10277910399492 105.71834874492248 246.99413381361103 105.61009709689505 L 246.99413381361103 105.61009709689505 Q 247.88548852322714 105.50184544886761 248.7600945628321 105.37690581441603 L 248.7600945628321 105.37690581441603 Q 249.63470060243708 105.25196617996446 250.46424336017668 105.08212653640793 L 250.46424336017668 105.08212653640793 Q 251.2937861179163 104.9122868928514 252.05181609280584 104.67119357073042 L 252.05181609280584 104.67119357073042 Q 252.80984606769533 104.43010024860946 253.47438640912233 104.09585602358203 L 253.47438640912233 104.09585602358203 Q 254.13892675054933 103.76161179855458 254.69517355921758 103.31946640864071 L 254.69517355921758 103.31946640864071 Q 255.25142036788583 102.87732101872683 255.69378013507847 102.3217012215456 L 255.69378013507847 102.3217012215456 Q 256.1361399022711 101.76608142436436 256.46876200462316 101.10112156257745 L 256.46876200462316 101.10112156257745 Q 256.8013841069752 100.43616170079054 257.0367928656999 99.67434071763614 L 257.0367928656999 99.67434071763614 Q 257.2722016244246 98.91251973448175 257.4283577292646 98.07173324474697 L 257.4283577292646 98.07173324474697 Q 257.5845138341046 97.23094675501218 257.6812201107936 96.330925835169 L 257.6812201107936 96.330925835169 Q 257.77792638748264 95.43090491532581 257.8336348192595 94.49003469474228 L 257.8336348192595 94.49003469474228 Q 257.8893432510364 93.54916447415874 257.91910407771326 92.58244067228979 L 257.91910407771326 92.58244067228979 Q 257.9488649043901 91.61571687042084 257.96362083881996 90.63404261672679 L 257.96362083881996 90.63404261672679 Q 257.9783767732498 89.65236836303275 257.98534593763236 88.66293598787391 L 257.98534593763236 88.66293598787391 Q 257.9923151020149 87.67350361271505 257.99600428717747 86.68080530331233 L 257.99600428717747 86.68080530331233 Q 257.99969347234 85.68810699390959 258.00313048997054 84.69516670736783 L 258.00313048997054 84.69516670736783 Q 258.00656750760106 83.7022264208261 258.0125002299864 82.71180766509018 L 258.0125002299864 82.71180766509018 Q 258.01843295237177 81.72138890935426 258.0303573264929 80.73705591812615 L 258.0303573264929 80.73705591812615 Q 258.042281700614 79.75272292689803 258.06514908137 78.77963583475827 L 258.06514908137 78.77963583475827 Q 258.08801646212595 77.80654874261849 258.12836412681384 76.8517861082223 L 258.12836412681384 76.8517861082223 Q 258.16871179150166 75.89702347382611 258.2338929148895 74.96916894976428 L 258.2338929148895 74.96916894976428 Q 258.29907403827735 74.04131442570247 258.3953987542293 73.14915845373807 L 258.3953987542293 73.14915845373807 Q 258.49172347018117 72.25700248177365 258.6217369506537 71.40754440140975 L 258.6217369506537 71.40754440140975 Q 258.7517504311263 70.55808632104583 258.9114455633442 69.75445251187239 L 258.9114455633442 69.75445251187239 Q 259.0711406955621 68.95081870269895 259.248310663491 68.19096631952385 L 259.248310663491 68.19096631952385 Q 259.4254806314199 67.43111393634877 259.60030656360607 66.70801813421124 L 259.60030656360607 66.70801813421124 Q 259.7751324957922 65.98492233207371 259.9233524666064 65.28833609277498 L 259.9233524666064 65.28833609277498 Q 260.0715724374205 64.59174985347624 260.16947092526857 63.91088173336648 L 260.16947092526857 63.91088173336648 Q 260.2673694131166 63.230013613256716 260.29693842560124 62.55603443873734 L 260.29693842560124 62.55603443873734 Q 260.32650743808586 61.88205526421796 260.2789836999219 61.20949105118905 L 260.2789836999219 61.20949105118905 Q 260.231459961758 60.53692683816013 260.108145241957 59.86361388511173 L 260.108145241957 59.86361388511173 Q 259.98483052215596 59.190300932063344 259.79526469329267 58.51626707075775 L 259.79526469329267 58.51626707075775 Q 259.6056988644293 57.84223320945215 259.36424888436454 57.168232047174754 L 259.36424888436454 57.168232047174754 Q 259.1227989042998 56.494230884897355 258.8450869373043 55.820572612031214 L 258.8450869373043 55.820572612031214 Q 258.5673749703088 55.146914339165065 258.2676466028496 54.472883473190464 L 258.2676466028496 54.472883473190464 Q 257.96791823539036 53.79885260721587 257.65776578989085 53.12265911238741 L 257.65776578989085 53.12265911238741 Q 257.3476133443913 52.44646561755896 257.03584462932656 51.76550847235936 L 257.03584462932656 51.76550847235936 Q 256.7240759142619 51.084551327159765 256.41722555483074 50.39577220171049 L 256.41722555483074 50.39577220171049 Q 256.11037519539957 49.70699307626122 255.81340515190726 49.00716353987161 L 255.81340515190726 49.00716353987161 Q 255.51643510841495 48.307334003482 255.23338518260664 47.59318793454056 L 255.23338518260664 47.59318793454056 Q 254.95033525679833 46.87904186559912 254.68485493031997 46.14724219747743 L 254.68485493031997 46.14724219747743 Q 254.41937460384162 45.415442529355744 254.1750953187273 44.66247716165361 L 254.1750953187273 44.66247716165361 Q 253.93081603361298 43.90951179395148 253.71146238240456 43.131709028389096 L 253.71146238240456 43.131709028389096 Q 253.49210873119614 42.35390626282671 253.30123592575615 41.54775813639711 L 253.30123592575615 41.54775813639711 Q 253.11036312031615 40.741610009967495 252.95073661697378 39.904444170452905 L 252.95073661697378 39.904444170452905 Q 252.79111011363142 39.06727833093832 252.66396319096438 38.198093416297226 L 252.66396319096438 38.198093416297226 Q 252.53681626829734 37.32890850165612 252.44137583076582 36.42904126722733 L 252.44137583076582 36.42904126722733 Q 252.3459353932343 35.52917403279854 252.27955861301402 34.60252055675994 L 252.27955861301402 34.60252055675994 Q 252.21318183279374 33.675867080721346 252.17219557158296 32.72861026010953 L 252.17219557158296 32.72861026010953 Q 252.13120931037218 31.781353439497707 252.11222713066033 30.82139188099562 L 252.11222713066033 30.82139188099562 Q 252.09324495094847 29.861430322493533 252.0945216759753 28.89778746867651 L 252.0945216759753 28.89778746867651 Q 252.09579840100213 27.934144614859484 252.11815954711733 26.97651673790928 L 252.11815954711733 26.97651673790928 Q 252.1405206932325 26.018888860959073 252.18755530469247 25.07727883092403 L 252.18755530469247 25.07727883092403 Q 252.23458991615246 24.135668800888986 252.31204024093006 23.21992320294123 L 252.31204024093006 23.21992320294123 Q 252.38949056570766 22.304177604993473 252.50402289986565 21.42329598657387 L 252.50402289986565 21.42329598657387 Q 252.61855523402363 20.54241436815427 252.77627682780033 19.703683610071664 L 252.77627682780033 19.703683610071664 Q 252.93399842157703 18.864952851989056 253.13913456352958 18.07312942496184 L 253.13913456352958 18.07312942496184 Q 253.34427070548213 17.281305997934627 253.59831168045338 16.538096116192946 L 253.59831168045338 16.538096116192946 Q 253.85235265542462 15.794886234451262 254.15377052452752 15.09884708374533 L 254.15377052452752 15.09884708374533 Q 254.4551883936304 14.4028079330394 254.7996196986583 13.749617159851292 L 254.7996196986583 13.749617159851292 Q 255.14405100368617 13.096426386663184 255.5247513606674 12.479371104323672 L 255.5247513606674 12.479371104323672 Q 255.90545171764865 11.86231582198416 256.3138782941395 11.272885867330697 L 256.3138782941395 11.272885867330697 Q 256.7223048706304 10.683455912677234 257.1487993854913 10.112028358085425 L 257.1487993854913 10.112028358085425 Q 257.57529390035216 9.540600803493614 258.00990948078265 8.977264879575424 L 258.00990948078265 8.977264879575424 Q 258.4445250612131 8.413928955657234 258.8780022810336 7.849458794369006 L 258.8780022810336 7.849458794369006 Q 259.31147950085415 7.284988633080779 259.73626093760436 6.711854195068157 L 259.73626093760436 6.711854195068157 Q 260.1610423743546 6.138719757055535 260.5721147475439 5.551925925994431 L 260.5721147475439 5.551925925994431 Q 260.9831871207331 4.9651320949333275 261.37853837966713 4.362674110175579 L 261.37853837966713 4.362674110175579 Q 261.7738896386012 3.7602161254178315 262.15447733238364 3.143048066686575 L 262.15447733238364 3.143048066686575 Q 262.5350650261661 2.525880007955319 262.9043469907824 1.8974471828448216 L 262.9043469907824 1.8974471828448216 Q 263.2736289553988 1.2690143577343242 263.63681447769943 0.6345071788671621 Z'),
				_Utils_Tuple2(6, 'M 266 0 L 268 0 L 270 0 L 272 0 L 274 0 L 276 0 L 278 0 L 280 0 L 282 0 L 284 0 L 286 0 L 288 0 L 290 0 L 292 0 L 294 0 L 296 0 L 298 0 L 300 0 L 302 0 L 304 0 L 306 0 L 308 0 L 310 0 L 312 0 L 314 0 L 316 0 L 318 0 L 320 0 L 322 0 L 324 0 L 326 0 L 328 0 L 330 0 L 332 0 L 334 0 L 336 0 L 338 0 L 340 0 L 340 1.9927536231884058 L 340 3.9855072463768115 L 340 5.978260869565217 L 340 7.971014492753623 L 340 9.96376811594203 L 340 11.956521739130434 L 340 13.94927536231884 L 340 15.942028985507246 L 340 17.934782608695652 L 340 19.92753623188406 L 340 21.920289855072465 L 340 23.913043478260867 L 340 25.905797101449274 L 340 27.89855072463768 L 340 29.891304347826086 L 340 31.884057971014492 L 340 33.8768115942029 L 340 35.869565217391305 L 340 37.86231884057971 L 340 39.85507246376812 L 340 41.84782608695652 L 340 43.84057971014493 L 340 45.833333333333336 L 340 47.826086956521735 L 340 49.81884057971014 L 340 51.81159420289855 L 340 53.80434782608695 L 340 55.79710144927536 L 340 57.789855072463766 L 340 59.78260869565217 L 340 61.77536231884058 L 338 61.77536231884058 L 336 61.77536231884058 L 334 61.77536231884058 L 332 61.77536231884058 L 330 61.77536231884058 L 328 61.77536231884058 L 326 61.77536231884058 L 324 61.77536231884058 L 322 61.77536231884058 L 320 61.77536231884058 L 318 61.77536231884058 L 316 61.77536231884058 L 314 61.77536231884058 L 312 61.77536231884058 L 310 61.77536231884057 L 308.00000000000034 61.77536231884022 L 306.0000000000087 61.775362318831895 L 304.0000000001396 61.775362318701454 L 302.0000000016454 61.77536231720109 L 300.000000015203 61.77536230369264 L 299.00000006494895 61.77536225412692 Q 298.0000001146949 61.775362204561205 297.000000420628 61.775361899736566 L 297.000000420628 61.775361899736566 Q 296.0000007265611 61.775361594911935 295.00000233553584 61.77535999176682 L 295.00000233553584 61.77535999176682 Q 294.0000039445106 61.775358388621704 293.00001129314916 61.77535106660862 L 293.00001129314916 61.77535106660862 Q 292.00001864178773 61.77534374459554 291.00004814329134 61.77531434998143 L 291.00004814329134 61.77531434998143 Q 290.000077644795 61.77528495536731 289.00018276533797 61.775180215695855 L 289.00018276533797 61.775180215695855 Q 288.000287885881 61.7750754760244 287.00062302115236 61.77474155501123 L 287.00062302115236 61.77474155501123 Q 286.00095815642374 61.77440763399806 285.00192058911307 61.77344868838371 L 285.00192058911307 61.77344868838371 Q 284.0028830218024 61.77248974276936 283.00538710825145 61.769994729097306 L 283.00538710825145 61.769994729097306 Q 282.0078911947005 61.767499715425245 281.0138239170862 61.76158848841052 L 281.0138239170862 61.76158848841052 Q 280.0197566394719 61.75567726139579 279.03261394478255 61.74286654052466 L 279.03261394478255 61.74286654052466 Q 278.0454712500932 61.730055819653536 277.07106538344544 61.70455441866851 L 277.07106538344544 61.70455441866851 Q 276.0966595167977 61.67905301768347 275.14364121198344 61.63224154603098 L 275.14364121198344 61.63224154603098 Q 274.1906229071692 61.58543007437849 273.27045485667617 61.5058873710654 L 273.27045485667617 61.5058873710654 Q 272.35028680618314 61.42634466775231 271.47634293525937 61.30074526378144 L 271.47634293525937 61.30074526378144 Q 270.6023990643356 61.175145859810556 269.78811415794854 60.99010364697156 L 269.78811415794854 60.99010364697156 Q 268.9738292515615 60.80506143413257 268.2302317830913 60.54958789728219 L 268.2302317830913 60.54958789728219 Q 267.48663431462114 60.294114360431806 266.8199723092799 59.96198411213055 L 266.8199723092799 59.96198411213055 Q 266.1533103039386 59.62985386382929 265.5635930654783 59.22105763403431 L 265.5635930654783 59.22105763403431 Q 264.973875827018 58.81226140423934 264.45488600243584 58.33299401931211 L 264.45488600243584 58.33299401931211 Q 263.9358961778537 57.853726634384884 263.4766799930357 57.31490218085207 L 263.4766799930357 57.31490218085207 Q 263.0174638082177 56.77607772731926 262.6047599368137 56.19090948324719 L 262.6047599368137 56.19090948324719 Q 262.1920560654097 55.60574123917512 261.8128507867439 54.98719577407796 L 261.8128507867439 54.98719577407796 Q 261.43364550807814 54.368650308980804 261.07714204871036 53.72748527756179 L 261.07714204871036 53.72748527756179 Q 260.72063858934257 53.086320246142776 260.37928366170024 52.43006156909726 L 260.37928366170024 52.43006156909726 Q 260.0379287340579 51.773802892051755 259.7075262287714 51.10663147659553 L 259.7075262287714 51.10663147659553 Q 259.37712372348494 50.43946006113931 259.056314407759 49.762730224808415 L 259.056314407759 49.762730224808415 Q 258.735505092033 49.08600038847752 258.4249642436407 48.39903936427538 L 258.4249642436407 48.39903936427538 Q 258.1144233952484 47.712078340073234 257.8160817676473 47.012962730810145 L 257.8160817676473 47.012962730810145 Q 257.51774014004616 46.31384712154705 257.234229370932 45.5999565498921 L 257.234229370932 45.5999565498921 Q 256.95071860181775 44.886065978237156 256.68510369758144 44.1543536596853 L 256.68510369758144 44.1543536596853 Q 256.41948879334507 43.42264134113344 256.1751935193952 42.66972151539633 L 256.1751935193952 42.66972151539633 Q 255.93089824544523 41.91680168965923 255.71161103773846 41.13908029353574 L 255.71161103773846 41.13908029353574 Q 255.49232383003167 40.36135889741225 255.30167930012226 39.55544151271904 L 255.30167930012226 39.55544151271904 Q 255.11103477021283 38.74952412802584 254.9520362870094 37.912984654994744 L 254.9520362870094 37.912984654994744 Q 254.793037803806 37.076445181963656 254.66743713286726 36.20880101719888 L 254.66743713286726 36.20880101719888 Q 254.54183646192854 35.341156852434096 254.4498421497375 34.44472327101532 L 254.4498421497375 34.44472327101532 Q 254.35784783754644 33.548289689596544 254.29845375544141 32.62859361355072 L 254.29845375544141 32.62859361355072 Q 254.2390596733364 31.70889753750489 254.21098209578457 30.774502630089785 L 254.21098209578457 30.774502630089785 Q 254.1829045182327 29.840107722674684 254.1857650852022 28.90190977047577 L 254.1857650852022 28.90190977047577 Q 254.18862565217174 27.963711818276852 254.22383779129808 27.033881424160818 L 254.22383779129808 27.033881424160818 Q 254.25904993042445 26.104051030044786 254.32997294894437 25.194809076686248 L 254.32997294894437 25.194809076686248 Q 254.4008959674643 24.285567123327713 254.51215401840753 23.407947839154595 L 254.51215401840753 23.407947839154595 Q 254.62341206935076 22.53032855498148 254.77964521935107 21.693080337237525 L 254.77964521935107 21.693080337237525 Q 254.93587836935137 20.85583211949357 255.1404023239881 20.06461606495676 L 255.1404023239881 20.06461606495676 Q 255.34492627862483 19.273400010419948 255.59873593519603 18.530409169976796 L 255.59873593519603 18.530409169976796 Q 255.85254559176724 17.787418329533644 256.15386673042434 17.091431402846133 L 256.15386673042434 17.091431402846133 Q 256.45518786908144 16.395444476158627 256.7995215778536 15.742200180631617 L 256.7995215778536 15.742200180631617 Q 257.1438552866258 15.088955885104607 257.52431970754037 14.471676885660322 L 257.52431970754037 14.471676885660322 Q 257.90478412845493 13.85439788621604 258.3125810254028 13.264343119469892 L 258.3125810254028 13.264343119469892 Q 258.7203779223506 12.674288352723742 259.14532587271015 12.101320346395234 L 259.14532587271015 12.101320346395234 Q 259.57027382306967 11.528352340066723 260.0014432276568 10.96158281195839 L 260.0014432276568 10.96158281195839 Q 260.43261263224394 10.394813283850056 260.8591071471048 9.823385729258245 L 260.8591071471048 9.823385729258245 Q 261.28560166196564 9.251958174666434 261.6974744142999 8.665961824203116 L 261.6974744142999 8.665961824203116 Q 262.1093471666341 8.079965473739797 262.4985767930764 7.471408036440566 L 262.4985767930764 7.471408036440566 Q 262.8878064195186 6.862850599141336 263.2492222643489 6.226580154686756 L 263.2492222643489 6.226580154686756 Q 263.61063810917915 5.590309710232176 263.9426639305567 4.9247557279094245 L 263.9426639305567 4.9247557279094245 Q 264.27468975193426 4.259201745586673 264.57974827706744 3.5667781746142526 L 264.57974827706744 3.5667781746142526 Q 264.88480680220056 2.874354603641832 265.1692094992784 2.1613500445708684 L 265.1692094992784 2.1613500445708684 Q 265.4536121963563 1.4483454854999045 265.72680609817814 0.7241727427499522 Z'),
				_Utils_Tuple2(7, 'M 159.3435723802136 54.14667537883601 Q 159.55088078227033 53.356855851899766 160.27544039113516 52.086036621602055 L 161 50.815217391304344 L 160.5 52.30978260869565 Q 160 53.80434782608695 160 54.80072463768116 L 160 55.79710144927536 L 160 57.789855072463766 L 160 59.78260869565217 L 160 61.77536231884058 L 160 63.768115942028984 L 160 65.76086956521738 L 160 67.75362318840578 L 160 69.74637681159419 L 160 71.7391304347826 L 160 73.731884057971 L 160 75.72463768115941 L 160 77.71739130434781 L 160 79.71014492753622 L 160 81.70289855072463 L 160 83.69565217391303 L 160 85.68840579710144 L 160 87.68115942028984 L 160 89.67391304347825 L 160 91.66666666666666 L 160 93.65942028985506 L 160 95.65217391304347 L 160 97.64492753623188 L 160 99.63768115942028 L 160 101.63043478260869 L 160 103.6231884057971 L 160 105.6159420289855 L 160 107.6086956521739 L 160 109.60144927536231 L 160 111.59420289855072 L 160 113.58695652173913 L 160 115.57971014492753 L 160 117.57246376811594 L 160 119.56521739130434 L 160 121.55797101449275 L 160 123.55072463768116 L 159.25820256590967 123.32266821745286 Q 158.51640513181934 123.09461179722456 157.78212177368158 122.87317922547282 L 157.78212177368158 122.87317922547282 Q 157.04783841554382 122.6517466537211 156.32749657523635 122.44643476357047 L 156.32749657523635 122.44643476357047 Q 155.60715473492886 122.24112287341983 154.9054822245311 122.06582572763975 L 154.9054822245311 122.06582572763975 Q 154.20380971413334 121.89052858185966 153.52388317048724 121.76292604110311 L 153.52388317048724 121.76292604110311 Q 152.84395662684113 121.63532350034657 152.18772567166928 121.57423696364116 L 152.18772567166928 121.57423696364116 Q 151.5314947164974 121.51315042693574 150.9003753249081 121.53480733833227 L 150.9003753249081 121.53480733833227 Q 150.2692559333188 121.5564642497288 149.66442406007332 121.67103156509363 L 149.66442406007332 121.67103156509363 Q 149.05959218682784 121.78559888045845 148.48182154107522 121.9951571702403 L 148.48182154107522 121.9951571702403 Q 147.9040508953226 122.20471546002216 147.35315619473818 122.50315599533022 L 147.35315619473818 122.50315599533022 Q 146.80226149415375 122.80159653063828 146.27632405803934 123.1761025854181 L 146.27632405803934 123.1761025854181 Q 145.75038662192495 123.55060864019792 145.24497638270861 123.98386823073542 L 145.24497638270861 123.98386823073542 Q 144.73956614349225 124.41712782127294 144.24721759023618 124.88946363363976 L 144.24721759023618 124.88946363363976 Q 143.7548690369801 125.3617994460066 143.26513658029313 125.8528833522154 L 143.26513658029313 125.8528833522154 Q 142.77540412360617 126.34396725842419 142.27581295909982 126.83431745627091 L 142.27581295909982 126.83431745627091 Q 141.77622179459348 127.32466765411763 141.25420609467974 127.79729908845452 L 141.25420609467974 127.79729908845452 Q 140.732190394766 128.2699305227914 140.17765868004778 128.71221262437552 L 140.17765868004778 128.71221262437552 Q 139.62312696532956 129.1544947259596 139.0308162280578 129.55970842962978 L 139.0308162280578 129.55970842962978 Q 138.43850549078604 129.96492213329992 137.80911078259527 130.33265562031593 L 137.80911078259527 130.33265562031593 Q 137.1797160744045 130.70038910733194 136.5191394816019 131.03511853131624 L 136.5191394816019 131.03511853131624 Q 135.85856288879933 131.36984795530051 135.17543204307475 131.6778051774244 L 135.17543204307475 131.6778051774244 Q 134.4923011973502 131.9857623995483 133.7947526044921 132.2711048401339 L 133.7947526044921 132.2711048401339 Q 133.09720401163398 132.5564472807195 132.3903042355617 132.81827321530247 L 132.3903042355617 132.81827321530247 Q 131.68340445948945 133.08009914988543 130.96823174246384 133.31163784226655 L 130.96823174246384 133.31163784226655 Q 130.25305902543826 133.54317653464767 129.5275816244025 133.73357914969947 L 129.5275816244025 133.73357914969947 Q 128.8021042233667 133.92398176475126 128.06311270772179 134.0619839309463 L 128.06311270772179 134.0619839309463 Q 127.32412119207686 134.19998609714133 126.5691269188029 134.27788125381636 L 126.5691269188029 134.27788125381636 Q 125.81413264552893 134.35577641049136 125.04247433936825 134.3720326901663 L 125.04247433936825 134.3720326901663 Q 124.27081603320758 134.38828896984126 123.4838914086996 134.34779514563752 L 123.4838914086996 134.34779514563752 Q 122.69696678419163 134.3073013214338 121.89800167059545 134.21930855038448 L 121.89800167059545 134.21930855038448 Q 121.09903655699927 134.13131577933513 120.29281324487819 134.00613072572352 L 120.29281324487819 134.00613072572352 Q 119.48658993275711 133.88094567211192 118.67920292975214 133.72686915324078 L 118.67920292975214 133.72686915324078 Q 117.87181592674717 133.57279263436962 117.07020631301074 133.39451182956188 L 117.07020631301074 133.39451182956188 Q 116.2685966992743 133.21623102475414 115.47964377953744 133.0150571841769 L 115.47964377953744 133.0150571841769 Q 114.69069085980057 132.81388334359966 113.91997725003571 132.58933614422054 L 113.91997725003571 132.58933614422054 Q 113.14926364027085 132.36478894484142 112.3999676739712 132.1165191851827 L 112.3999676739712 132.1165191851827 Q 111.65067170767156 131.86824942552397 110.92308655279442 131.59736114030102 L 110.92308655279442 131.59736114030102 Q 110.19550139791727 131.3264728550781 109.48739768423454 131.03580600562765 L 109.48739768423454 131.03580600562765 Q 108.7792939705518 130.74513915617717 108.08694705268 130.43864973695872 L 108.08694705268 130.43864973695872 Q 107.3946001348082 130.13216031774027 106.71405584006506 129.81387445535282 L 106.71405584006506 129.81387445535282 Q 106.03351154532191 129.49558859296536 105.36167384445231 129.16861804606242 L 105.36167384445231 129.16861804606242 Q 104.68983614358271 128.84164749915948 104.02514354178751 128.5075555162253 L 104.02514354178751 128.5075555162253 Q 103.36045093999232 128.1734635332911 102.70310346654146 127.83205258965936 L 102.70310346654146 127.83205258965936 Q 102.04575599309061 127.49064164602761 101.39755854196996 127.14011375630952 L 101.39755854196996 127.14011375630952 Q 100.7493610908493 126.78958586659141 100.11327012446537 126.42699534535225 L 100.11327012446537 126.42699534535225 Q 99.47717915808144 126.0644048241131 98.85664933284006 125.6863095414148 L 98.85664933284006 125.6863095414148 Q 98.23611950759869 125.3082142587165 97.63439105850134 124.91138572068743 L 97.63439105850134 124.91138572068743 Q 97.032662609404 124.51455718265835 96.45218407062487 124.0965557267321 L 96.45218407062487 124.0965557267321 Q 95.87170553184572 123.67855427080588 95.31387822926456 123.23798364837769 L 95.31387822926456 123.23798364837769 Q 94.7560509266834 122.79741302594951 94.22136624737415 122.33378363033373 L 94.22136624737415 122.33378363033373 Q 93.6866815680649 121.87015423471794 93.17513579286144 121.38346977160545 L 93.17513579286144 121.38346977160545 Q 92.66359001765798 120.89678530849295 92.17511224355418 120.38711642399491 L 92.17511224355418 120.38711642399491 Q 91.68663446945038 119.87744753949688 91.22125476250045 119.34476427649412 L 91.22125476250045 119.34476427649412 Q 90.75587505555052 118.81208101349134 90.31351027435655 118.25646621214474 L 90.31351027435655 118.25646621214474 Q 89.87114549316257 117.70085141079817 89.45109959236478 117.12299859456408 L 89.45109959236478 117.12299859456408 Q 89.03105369156698 116.54514577833001 88.63148190993128 115.946893024525 L 88.63148190993128 115.946893024525 Q 88.23191012829558 115.34864027071998 87.84949775886872 114.7332902764895 L 87.84949775886872 114.7332902764895 Q 87.46708538944188 114.117940282259 87.09706496126766 113.49024324511373 L 87.09706496126766 113.49024324511373 Q 86.72704453309345 112.86254620796848 85.86352226654672 111.7301861474625 L 85 110.59782608695653 L 85 110.59782608695653 L 86.47870588585879 110.07842071960567 Q 87.95741177171757 109.55901535225483 88.92492248335212 109.5266437787023 L 88.92492248335212 109.5266437787023 Q 89.89243319498667 109.49427220514977 90.83568769585479 109.43773230565243 L 90.83568769585479 109.43773230565243 Q 91.77894219672291 109.3811924061551 92.68187723621216 109.28447913028387 L 92.68187723621216 109.28447913028387 Q 93.58481227570141 109.18776585441266 94.4285377563237 109.0320575470617 L 94.4285377563237 109.0320575470617 Q 95.272263236946 108.87634923971072 96.03679293236867 108.64173208841083 L 96.03679293236867 108.64173208841083 Q 96.80132262779134 108.40711493711095 97.4685824228604 108.07558031263265 L 97.4685824228604 108.07558031263265 Q 98.13584221792945 107.74404568815436 98.6931254692862 107.30293298570184 L 98.6931254692862 107.30293298570184 Q 99.25040872064295 106.86182028324933 99.69313276817884 106.30656344655502 L 99.69313276817884 106.30656344655502 Q 100.13585681571473 105.7513066098607 100.46862051951952 105.08648783647779 L 100.46862051951952 105.08648783647779 Q 100.8013842233243 104.42166906309487 101.03693484577623 103.65998942966834 L 101.03693484577623 103.65998942966834 Q 101.27248546822815 102.89830979624182 101.42900750604457 102.05788791363136 L 101.42900750604457 102.05788791363136 Q 101.58552954386099 101.2174660310209 101.68327992389332 100.31848543141544 L 101.68327992389332 100.31848543141544 Q 101.78103030392566 99.41950483180997 101.83948935019474 98.48137525834619 L 101.83948935019474 98.48137525834619 Q 101.89794839646382 97.54324568488241 101.93432172487165 96.58311041427427 L 101.93432172487165 96.58311041427427 Q 101.97069505327948 95.62297514366614 102 94.65579710144927 L 102 94.65579710144927 Q 102.02930494672053 93.6886190592324 102.06567827512853 92.72848378862443 L 102.06567827512853 92.72848378862443 Q 102.10205160353655 91.76834851801647 102.16051064980981 90.83021894455686 L 102.16051064980981 90.83021894455686 Q 102.21896969608306 89.89208937109726 102.31672007618103 88.99310877155719 L 102.31672007618103 88.99310877155719 Q 102.41447045627899 88.09412817201712 102.57099249485233 87.25370629016084 L 102.57099249485233 87.25370629016084 Q 102.72751453342566 86.41328440830455 102.96306516271784 85.65160478169348 L 102.96306516271784 85.65160478169348 Q 103.19861579201 84.88992515508241 103.5313795462522 84.22510643195417 L 103.5313795462522 84.22510643195417 Q 103.86414330049439 83.56028770882594 104.3068676600507 83.00503118302154 L 104.3068676600507 83.00503118302154 Q 104.74959201960701 82.44977465721713 105.30687692359712 82.00866360141016 L 105.30687692359712 82.00866360141016 Q 105.86416182758721 81.56755254560319 106.53142923356933 81.23602550446219 L 106.53142923356933 81.23602550446219 Q 107.19869663955143 80.90449846332118 107.96325718317799 80.66991204845633 L 107.96325718317799 80.66991204845633 Q 108.72781772680455 80.43532563359149 109.57165432990816 80.27972804610414 L 109.57165432990816 80.27972804610414 Q 110.41549093301177 80.1241304586168 111.3187846073377 80.02777451818069 L 111.3187846073377 80.02777451818069 Q 112.22207828166364 79.93141857774458 113.1663768361986 79.87591894911093 L 113.1663768361986 79.87591894911093 Q 114.11067539073355 79.82041932047727 115.08094370310666 79.79079535635627 L 115.08094370310666 79.79079535635627 Q 116.05121201547976 79.76117139223527 117.03655954205405 79.74657200748138 L 117.03655954205405 79.74657200748138 Q 118.02190706862834 79.7319726227275 119.0152654270903 79.72535504510807 L 119.0152654270903 79.72535504510807 Q 120.00862378555226 79.71873746748867 121.00586617796927 79.7159898512375 L 121.00586617796927 79.7159898512375 Q 122.00310857038627 79.71324223498632 123.00206446628187 79.7122019138678 L 123.00206446628187 79.7122019138678 Q 124.00102036217746 79.71116159274928 125.00066141532034 79.71080394642425 L 125.00066141532034 79.71080394642425 Q 126.00030246846322 79.71044630009922 127.00018969334856 79.71033393359005 L 127.00018969334856 79.71033393359005 Q 128.0000769182339 79.71022156708086 129.00003845911695 79.71018324730855 L 130 79.71014492753623 L 130.99996154088305 79.71010660776392 Q 131.9999230817661 79.7100682879916 132.99981030665145 79.70995592148242 L 132.99981030665145 79.70995592148242 Q 133.99969753153678 79.70984355497325 134.99933858467966 79.70948590864822 L 134.99933858467966 79.70948590864822 Q 135.99897963782254 79.70912826232319 136.99793553371813 79.70808794120467 L 136.99793553371813 79.70808794120467 Q 137.99689142961373 79.70704762008614 138.99413382203073 79.70430000383497 L 138.99413382203073 79.70430000383497 Q 139.99137621444774 79.7015523875838 140.98473457290987 79.69493480996456 L 140.98473457290987 79.69493480996456 Q 141.97809293137203 79.68831723234531 142.9634404579503 79.67371784759541 L 142.9634404579503 79.67371784759541 Q 143.9487879845286 79.6591184628455 144.919056296963 79.62949449878556 L 144.919056296963 79.62949449878556 Q 145.88932460939736 79.59987053472562 146.8336231646194 79.54437090677658 L 146.8336231646194 79.54437090677658 Q 147.77792171984146 79.48887127882755 148.6812154001851 79.39251534438733 L 148.6812154001851 79.39251534438733 Q 149.58450908052873 79.29615940994711 150.4283457264726 79.1405618651448 L 150.4283457264726 79.1405618651448 Q 151.27218237241647 78.98496432034248 152.0367431707858 78.75037815929744 L 152.0367431707858 78.75037815929744 Q 152.80130396915513 78.51579199825238 153.46857266531276 78.18426624261234 L 153.46857266531276 78.18426624261234 Q 154.1358413614704 77.8527404869723 154.69313191171977 77.41163505696716 L 154.69313191171977 77.41163505696716 Q 155.25042246196915 76.970529626962 155.69316840618293 76.41529460760981 L 155.69316840618293 76.41529460760981 Q 156.13591435039672 75.8600595882576 156.46875076800328 75.19531326522066 L 156.46875076800328 75.19531326522066 Q 156.80158718560983 74.53056694218373 157.0373544790535 73.76910319470912 L 157.0373544790535 73.76910319470912 Q 157.27312177249718 73.00763944723451 157.4302181074195 72.16778978094334 L 157.4302181074195 72.16778978094334 Q 157.58731444234184 71.32794011465218 157.68641973467885 70.43030951824885 L 157.68641973467885 70.43030951824885 Q 157.78552502701586 69.53267892184552 157.8468240596605 68.5973790449516 L 157.8468240596605 68.5973790449516 Q 157.90812309230512 67.66207916805766 157.94974965254954 66.7071780958374 L 157.94974965254954 66.7071780958374 Q 157.99137621279394 65.75227702361715 158.02911873300013 64.79350598396753 L 158.02911873300013 64.79350598396753 Q 158.06686125320635 63.83473494431791 158.1145518661619 62.885875953603325 L 158.1145518661619 62.885875953603325 Q 158.16224247911742 61.93701696288874 158.2319747187299 61.010119737864926 L 158.2319747187299 61.010119737864926 Q 158.30170695834238 60.08322251284111 158.40321297097242 59.18798393846887 L 158.40321297097242 59.18798393846887 Q 158.50471898360246 58.292745364096625 158.64381080565929 57.43495641868223 L 158.64381080565929 57.43495641868223 Q 158.7829026277161 56.57716747326784 158.9595833029365 55.75683118952005 L 158.9595833029365 55.75683118952005 Q 159.13626397815688 54.93649490577226 159.3435723802136 54.14667537883601 Z'),
				_Utils_Tuple2(8, 'M 161 50.815217391304344 L 161 50.815217391304344 L 161.5187899840379 52.291060704310055 Q 162.03757996807582 53.76690401731577 162.0656779631781 54.73528463813776 L 162.0656779631781 54.73528463813776 Q 162.0937759582804 55.70366525895976 162.1417189635322 56.6522727718429 L 162.1417189635322 56.6522727718429 Q 162.18966196878404 57.600880284726045 162.26982417500005 58.51738533288038 L 162.26982417500005 58.51738533288038 Q 162.34998638121607 59.433890381034715 162.4761290172944 60.30458159508712 L 162.4761290172944 60.30458159508712 Q 162.60227165337272 61.17527280913953 162.78795329682015 61.986640736864 L 162.78795329682015 61.986640736864 Q 162.9736349402676 62.798008664588465 163.22985460665006 63.53909414192477 L 163.22985460665006 63.53909414192477 Q 163.48607427303253 64.28017961926108 163.81889703652257 64.9449395469431 L 163.81889703652257 64.9449395469431 Q 164.15171980001261 65.60969947462513 164.5607331851028 66.19854483368383 L 164.5607331851028 66.19854483368383 Q 164.969746570193 66.7873901927425 165.44792412016346 67.30732198172123 L 165.44792412016346 67.30732198172123 Q 165.9261016701339 67.82725377069994 166.4611254206723 68.29054532360553 L 166.4611254206723 68.29054532360553 Q 166.99614917121067 68.75383687651112 167.57274034759192 69.17571161018923 L 167.57274034759192 69.17571161018923 Q 168.14933152397316 69.59758634386733 168.7519100264038 69.99356790847447 L 168.7519100264038 69.99356790847447 Q 169.35448852883445 70.38954947308162 169.96958293866618 70.77306047777827 L 169.96958293866618 70.77306047777827 Q 170.5846773484979 71.15657148247492 171.20277854824414 71.53708659142342 L 171.20277854824414 71.53708659142342 Q 171.82087974799038 71.91760170037193 172.43764093063174 72.29945197129086 L 172.43764093063174 72.29945197129086 Q 173.0544021132731 72.6813022422098 173.6711173579901 73.06319828461133 L 173.6711173579901 73.06319828461133 Q 174.2878326027071 73.44509432701287 174.91104740975257 73.8205143562248 L 174.91104740975257 73.8205143562248 Q 175.53426221679803 74.19593438543676 176.17436372965273 74.55452889255616 L 176.17436372965273 74.55452889255616 Q 176.81446524250742 74.91312339967558 177.4832954743687 75.24309327735004 L 177.4832954743687 75.24309327735004 Q 178.15212570622998 75.5730631550245 178.86002080311712 75.8641097070391 L 178.86002080311712 75.8641097070391 Q 179.56791590000427 76.15515625905371 180.32091314116656 76.40126408035943 L 180.32091314116656 76.40126408035943 Q 181.07391038232882 76.64737190166514 181.87197176956172 76.84857885279176 L 181.87197176956172 76.84857885279176 Q 182.67003315679463 77.04978580391838 183.50690771982295 77.21232020669815 L 183.50690771982295 77.21232020669815 Q 184.34378228285124 77.37485460947792 185.20863071558338 77.50951649715424 L 185.20863071558338 77.50951649715424 Q 186.07347914831553 77.64417838483055 186.95380010271148 77.76342381070414 L 186.95380010271148 77.76342381070414 Q 187.83412105710744 77.88266923657773 188.71906754211074 77.99730589101284 L 188.71906754211074 77.99730589101284 Q 189.60401402711406 78.11194254544795 190.4870408442075 78.22849191247441 L 190.4870408442075 78.22849191247441 Q 191.37006766130094 78.34504127950088 192.2500750765393 78.4645991085206 L 192.2500750765393 78.4645991085206 Q 193.1300824917777 78.58415693754033 194.01075378673636 78.70305329220108 L 194.01075378673636 78.70305329220108 Q 194.89142508169505 78.82194964686182 195.77909804525694 78.93386970128384 L 195.77909804525694 78.93386970128384 Q 196.66677100881884 79.04578975570584 197.56766186087836 79.14453981253061 L 197.56766186087836 79.14453981253061 Q 198.46855271293788 79.24328986935538 199.38624691277442 79.32529746009796 L 199.38624691277442 79.32529746009796 Q 200.30394111261097 79.40730505084053 201.2377558996926 79.47325046226283 L 201.2377558996926 79.47325046226283 Q 202.1715706867742 79.53919587368513 203.11588871095125 79.59467610321886 L 203.11588871095125 79.59467610321886 Q 204.06020673512833 79.65015633275257 205.00449906365196 79.70566216483954 L 205.00449906365196 79.70566216483954 Q 205.9487913921756 79.7611679969265 206.87800934754253 79.8316935848761 L 206.87800934754253 79.8316935848761 Q 207.80722730290947 79.90221917282571 208.7025098769285 80.00655718784299 L 208.7025098769285 80.00655718784299 Q 209.5977924509475 80.11089520286026 210.43774496972028 80.27036280190913 L 210.43774496972028 80.27036280190913 Q 211.27769748849306 80.429830400958 212.0405444788989 80.66612416051737 L 212.0405444788989 80.66612416051737 Q 212.80339146930476 80.90241792007676 213.46997345576128 81.2346278973393 L 213.46997345576128 81.2346278973393 Q 214.1365554422178 81.56683787460182 214.6935928337909 82.00819554604166 L 214.6935928337909 82.00819554604166 Q 215.25063022536398 82.44955321748152 215.69327431063886 83.00488972671852 L 215.69327431063886 83.00488972671852 Q 216.13591839591373 83.5602262359555 216.46865891286492 84.22506811218166 L 216.46865891286492 84.22506811218166 Q 216.80139942981612 84.88990998840782 217.03694410082858 85.65159555171063 L 217.03694410082858 85.65159555171063 Q 217.27248877184104 86.41328111501343 217.42900946980143 87.25370433262535 L 217.42900946980143 87.25370433262535 Q 217.58553016776185 88.09412755023727 217.68328028627678 88.99310841041259 L 217.68328028627678 88.99310841041259 Q 217.78103040479175 89.89208927058792 217.83948940746785 90.83021888748674 L 217.83948940746785 90.83021888748674 Q 217.89794841014395 91.76834850438556 217.93432173246862 92.7284837810548 L 217.93432173246862 92.7284837810548 Q 217.9706950547933 93.68861905772405 218.00000000082252 94.65579710062971 L 218.00000000082252 94.65579710062971 Q 218.02930494685177 95.62297514353536 218.06567827519817 96.58311041420473 L 218.06567827519817 96.58311041420473 Q 218.10205160354457 97.54324568487408 218.16051064980962 98.48137525834186 L 218.16051064980962 98.48137525834186 Q 218.21896969607468 99.41950483180963 218.31672007610686 100.31848543141527 L 218.31672007610686 100.31848543141527 Q 218.41447045613904 101.2174660310209 218.57099249395543 102.05788791363136 L 218.57099249395543 102.05788791363136 Q 218.72751453177185 102.89830979624182 218.96306515422378 103.65998942966834 L 218.96306515422378 103.65998942966834 Q 219.1986157766757 104.42166906309487 219.5313794804805 105.08648783647779 L 219.5313794804805 105.08648783647779 Q 219.8641431842853 105.7513066098607 220.30686723182117 106.30656344655502 L 220.30686723182117 106.30656344655502 Q 220.74959127935705 106.86182028324933 221.3068745307138 107.30293298570184 L 221.3068745307138 107.30293298570184 Q 221.86415778207055 107.74404568815436 222.5314175771396 108.07558031263265 L 222.5314175771396 108.07558031263265 Q 223.19867737220864 108.40711493711095 223.96320706763132 108.64173208841083 L 223.96320706763132 108.64173208841083 Q 224.727736763054 108.87634923971072 225.5714622436763 109.0320575470617 L 225.5714622436763 109.0320575470617 Q 226.4151877242986 109.18776585441266 227.31812276378784 109.28447913028387 L 227.31812276378784 109.28447913028387 Q 228.2210578032771 109.3811924061551 229.1643123041452 109.43773230565243 L 229.1643123041452 109.43773230565243 Q 230.10756680501333 109.49427220514977 231.07507751664787 109.5266437787023 L 231.07507751664787 109.5266437787023 Q 232.0425882282824 109.55901535225483 233.5212941141412 110.07842071960567 L 235 110.59782608695653 L 235 110.59782608695653 L 234.136477732766 111.73018614677773 Q 233.272955465532 112.8625462065989 232.9029350319619 113.49024323836784 L 232.9029350319619 113.49024323836784 Q 232.5329145983918 114.11794027013676 232.15050219145095 114.73329022698917 L 232.15050219145095 114.73329022698917 Q 231.7680897845101 115.34864018384157 231.36851778488855 115.94689272045053 L 231.36851778488855 115.94689272045053 Q 230.968945785267 116.54514525705949 230.54889880543928 117.12299699817319 L 230.54889880543928 117.12299699817319 Q 230.12885182561155 117.70084873928688 229.6864824267508 118.25645893969738 L 229.6864824267508 118.25645893969738 Q 229.24411302789008 118.81206914010787 228.77871604192885 119.34473518670445 L 228.77871604192885 119.34473518670445 Q 228.3133190559676 119.87740123330104 227.8247842448734 120.38701328746441 L 227.8247842448734 120.38701328746441 Q 227.33624943377916 120.89662534162778 226.82453642044032 121.38314317254014 L 226.82453642044032 121.38314317254014 Q 226.31282340710146 121.86966100345252 225.77770082068744 122.3328540785835 L 225.77770082068744 122.3328540785835 Q 225.24257823427342 122.79604715371447 224.68372279805476 123.23559336762702 L 224.68372279805476 123.23559336762702 Q 224.12486736183612 123.67513958153958 223.54221829258051 124.09097837123022 L 223.54221829258051 124.09097837123022 Q 222.95956922332493 124.50681716092087 222.35371376370097 124.89953364136002 L 222.35371376370097 124.89953364136002 Q 221.747858304077 125.29225012179919 221.12025901811822 125.6633015577682 L 221.12025901811822 125.6633015577682 Q 220.49265973215944 126.03435299373719 219.84567360447176 126.38608782889469 L 219.84567360447176 126.38608782889469 Q 219.19868747678404 126.7378226640522 218.5354376236554 127.07335268945077 L 218.5354376236554 127.07335268945077 Q 217.8721877705268 127.40888271484934 217.19633106368417 127.73185148752913 L 217.19633106368417 127.73185148752913 Q 216.5204743568415 128.0548202602089 215.8357954911998 128.368998393296 L 215.8357954911998 128.368998393296 Q 215.15111662555807 128.68317652638314 214.46082372206033 128.99175873733412 L 214.46082372206033 128.99175873733412 Q 213.77053081856258 129.3003409482851 213.07626795219647 129.60495794401925 L 213.07626795219647 129.60495794401925 Q 212.38200508583037 129.90957493975338 211.6829050148874 130.20933567384657 L 211.6829050148874 130.20933567384657 Q 210.98380494394448 130.50909640793975 210.27615709782953 130.8002174732639 L 210.27615709782953 130.8002174732639 Q 209.56850925171454 131.09133853858805 208.84654615852742 131.36782851571226 L 208.84654615852742 131.36782851571226 Q 208.1245830653403 131.64431849283648 207.38241385155686 131.89968918344434 L 207.38241385155686 131.89968918344434 Q 206.64024463777346 132.1550598740522 205.87431493078032 132.38437364322198 L 205.87431493078032 132.38437364322198 Q 205.1083852237872 132.61368741239178 204.31943230405034 132.81486125296902 L 204.31943230405034 132.81486125296902 Q 203.53047938431348 133.01603509354626 202.72408586780531 133.18954932856337 L 202.72408586780531 133.18954932856337 Q 201.91769235129715 133.36306356358045 201.10317859577594 133.51003915150247 L 201.10317859577594 133.51003915150247 Q 200.28866484025474 133.65701473942448 199.47681946644366 133.7765981011348 L 199.47681946644366 133.7765981011348 Q 198.66497409263255 133.8961814628451 197.8655531114686 133.98372001802076 L 197.8655531114686 133.98372001802076 Q 197.06613213030465 134.07125857319642 196.28596065886785 134.1184810825254 L 196.28596065886785 134.1184810825254 Q 195.50578918743105 134.16570359185437 194.74784945289332 134.1631161788327 L 194.74784945289332 134.1631161788327 Q 193.98990971835556 134.16052876581105 193.25337064770974 134.101021945088 L 193.25337064770974 134.101021945088 Q 192.51683157706393 134.04151512436493 191.79782632526553 133.92342680801698 L 191.79782632526553 133.92342680801698 Q 191.0788210734671 133.805338491669 190.37185290582312 133.63337804756918 L 190.37185290582312 133.63337804756918 Q 189.66488473817915 133.46141760346933 188.9647644231615 133.24487677540773 L 188.9647644231615 133.24487677540773 Q 188.2646441081439 133.02833594734614 187.56863949337543 132.77736569884485 L 187.56863949337543 132.77736569884485 Q 186.87263487860693 132.52639545034356 186.1821557464662 132.24809685648722 L 186.1821557464662 132.24809685648722 Q 185.49167661432548 131.9697982626309 184.81267277912752 131.66595309809694 L 184.81267277912752 131.66595309809694 Q 184.1336689439296 131.36210793356298 183.47526288160347 131.0295411758143 L 183.47526288160347 131.0295411758143 Q 182.81685681927735 130.69697441806562 182.18849024472405 130.33026533956524 L 182.18849024472405 130.33026533956524 Q 181.56012367017075 129.96355626106484 180.96825084000375 129.5587788778795 L 180.96825084000375 129.5587788778795 Q 180.37637800983677 129.15400149469417 179.82201353325394 128.7118860253102 L 179.82201353325394 128.7118860253102 Q 179.26764905667113 128.26977055592621 178.74569039374782 127.797195951924 L 178.74569039374782 127.797195951924 Q 178.2237317308245 127.32462134792178 177.72415784532947 126.83428836648125 L 177.72415784532947 126.83428836648125 Q 177.22458395983443 126.34395538504072 176.73485612081424 125.85287607976801 L 176.73485612081424 125.85287607976801 Q 176.24512828179405 125.3617967744953 175.7527808075679 124.88946203724888 L 175.7527808075679 124.88946203724888 Q 175.26043333334172 124.41712730000243 174.75502331211123 123.98386792666096 L 174.75502331211123 123.98386792666096 Q 174.24961329088072 123.5506085533195 173.72367589228014 123.17610253591761 L 173.72367589228014 123.17610253591761 Q 173.1977384936796 122.80159651851571 172.64684379848723 122.50315598858015 L 172.64684379848723 122.50315598858015 Q 172.09594910329486 122.20471545864459 171.51817845817206 121.99515716949028 L 171.51817845817206 121.99515716949028 Q 170.94040781304926 121.785598880336 170.33557593986123 121.67103156502841 L 170.33557593986123 121.67103156502841 Q 169.7307440666732 121.55646424972083 169.09962467508774 121.53480733832811 L 169.09962467508774 121.53480733832811 Q 168.46850528350225 121.5131504269354 167.81227432833055 121.57423696364097 L 167.81227432833055 121.57423696364097 Q 167.15604337315887 121.63532350034656 166.47611682951276 121.7629260411031 L 166.47611682951276 121.7629260411031 Q 165.79619028586666 121.89052858185966 165.0945177754689 122.06582572763975 L 165.0945177754689 122.06582572763975 Q 164.39284526507114 122.24112287341983 163.67250342476365 122.44643476357047 L 163.67250342476365 122.44643476357047 Q 162.95216158445618 122.6517466537211 162.21787822631842 122.87317922547282 L 162.21787822631842 122.87317922547282 Q 161.48359486818066 123.09461179722456 160.74179743409033 123.32266821745286 L 160 123.55072463768116 L 160 121.55797101449275 L 160 119.56521739130434 L 160 117.57246376811594 L 160 115.57971014492753 L 160 113.58695652173913 L 160 111.59420289855072 L 160 109.60144927536231 L 160 107.6086956521739 L 160 105.6159420289855 L 160 103.6231884057971 L 160 101.63043478260869 L 160 99.63768115942028 L 160 97.64492753623188 L 160 95.65217391304347 L 160 93.65942028985506 L 160 91.66666666666666 L 160 89.67391304347825 L 160 87.68115942028984 L 160 85.68840579710144 L 160 83.69565217391303 L 160 81.70289855072463 L 160 79.71014492753622 L 160 77.71739130434781 L 160 75.72463768115941 L 160 73.731884057971 L 160 71.7391304347826 L 160 69.74637681159419 L 160 67.75362318840578 L 160 65.76086956521738 L 160 63.768115942028984 L 160 61.77536231884058 L 160 59.78260869565217 L 160 57.789855072463766 L 160 55.79710144927536 L 160 54.80072463768116 Q 160 53.80434782608695 160.5 52.30978260869565 Z'),
				_Utils_Tuple2(9, 'M 238.3717111232745 109.01507623877039 Q 239.16917200380306 108.83060096584072 239.98440301659605 108.67704649312726 L 239.98440301659605 108.67704649312726 Q 240.79963402938904 108.52349202041381 241.63527975879637 108.4116564057132 L 241.63527975879637 108.4116564057132 Q 242.4709254882037 108.29982079101259 243.32462827174356 108.23585887430507 L 243.32462827174356 108.23585887430507 Q 244.17833105528345 108.17189695759754 245.04425145384835 108.15695829828555 L 245.04425145384835 108.15695829828555 Q 245.91017185241327 108.14201963897355 246.78163118289115 108.17241834080257 L 246.78163118289115 108.17241834080257 Q 247.653090513369 108.20281704263158 248.52525763578626 108.27069549359956 L 248.52525763578626 108.27069549359956 Q 249.3974247582035 108.33857394456754 250.26893456358326 108.43313475899602 L 250.26893456358326 108.43313475899602 Q 251.14044436896302 108.5276955734245 252.01329756871837 108.63705221035232 L 252.01329756871837 108.63705221035232 Q 252.88615076847373 108.74640884728015 253.7640245402046 108.85985942321292 L 253.7640245402046 108.85985942321292 Q 254.64189831193545 108.97330999914568 255.52773187702675 109.0834881435502 L 255.52773187702675 109.0834881435502 Q 256.41356544211806 109.19366628795471 257.30761092501507 109.2978247348268 L 257.30761092501507 109.2978247348268 Q 258.2016564079121 109.40198318169888 259.10094097907074 109.50182859503977 L 259.10094097907074 109.50182859503977 Q 260.00022555022935 109.60167400838066 260.8996819771329 109.70169065480036 L 260.8996819771329 109.70169065480036 Q 261.7991384040364 109.80170730122006 262.6938690441847 109.90654842288166 L 262.6938690441847 109.90654842288166 Q 263.58859968433296 110.01138954454326 264.476221068962 110.12334903075606 L 264.476221068962 110.12334903075606 Q 265.3638424535911 110.23530851696884 266.2458464317108 110.35287433339693 L 266.2458464317108 110.35287433339693 Q 267.12785040983044 110.47044014982502 268.0093996048043 110.58846126261969 L 268.0093996048043 110.58846126261969 Q 268.89094879977813 110.70648237541437 269.77925136643876 110.81777502090739 L 269.77925136643876 110.81777502090739 Q 270.66755393309944 110.92906766640041 271.5695751089544 111.02669148267529 L 271.5695751089544 111.02669148267529 Q 272.47159628480927 111.12431529895017 273.39207266868823 111.20355078464941 L 273.39207266868823 111.20355078464941 Q 274.3125490525672 111.28278627034865 275.2530117009226 111.34210790682855 L 275.2530117009226 111.34210790682855 Q 276.19347434927806 111.40142954330844 277.15244623108276 111.4423090088936 L 277.15244623108276 111.4423090088936 Q 278.11141811288746 111.48318847447875 279.08544239670397 111.50907007574818 L 279.08544239670397 111.50907007574818 Q 280.0594666805205 111.53495167701763 281.0443861256409 111.54997759220558 L 281.0443861256409 111.54997759220558 Q 282.0293055707614 111.56500350739354 283.0212944765992 111.57298557585221 L 283.0212944765992 111.57298557585221 Q 284.01328338243707 111.58096764431087 285.00939929880155 111.58483765517963 L 285.00939929880155 111.58483765517963 Q 286.005515215166 111.58870766604838 287.00380166200694 111.59041501068151 L 287.00380166200694 111.59041501068151 Q 288.00208810884783 111.59212235531466 289.00140268932626 111.59280529143217 L 289.00140268932626 111.59280529143217 Q 290.0007172698047 111.5934882275497 291.0004697573878 111.59373484318242 L 291.0004697573878 111.59373484318242 Q 292.000222244971 111.59398145881514 293.0001419706896 111.59406144224772 L 293.0001419706896 111.59406144224772 Q 294.0000616964081 111.5941414256803 295.00003845911715 111.59416457877823 L 295.00003845911715 111.59416457877823 Q 296.0000152218261 111.59418773187616 297.0000092635464 111.5941936685679 L 297.0000092635464 111.5941936685679 Q 298.0000033052667 111.59419960525963 299.00000196465373 111.59420094101527 L 299.00000196465373 111.59420094101527 Q 300.0000006240408 111.59420227677091 301.0000003624578 111.59420253740615 L 302.0000001008748 111.5942027980414 L 304.0000000136805 111.59420288491981 L 306.00000000151385 111.59420289704238 L 308.0000000001313 111.59420289841994 L 310.00000000000836 111.59420289854239 L 312.00000000000034 111.59420289855038 L 314 111.59420289855072 L 316 111.59420289855072 L 318 111.59420289855072 L 320 111.59420289855072 L 322 111.59420289855072 L 324 111.59420289855072 L 326 111.59420289855072 L 328 111.59420289855072 L 330 111.59420289855072 L 332 111.59420289855072 L 334 111.59420289855072 L 336 111.59420289855072 L 338 111.59420289855072 L 340 111.59420289855072 L 340 113.58695652173913 L 340 115.57971014492753 L 340 117.57246376811594 L 340 119.56521739130434 L 340 121.55797101449275 L 340 123.55072463768116 L 340 125.54347826086956 L 340 127.53623188405797 L 340 129.52898550724638 L 340 131.52173913043478 L 340 133.5144927536232 L 340 135.5072463768116 L 340 137.5 L 340 139.4927536231884 L 340 141.4855072463768 L 340 143.47826086956522 L 340 145.47101449275362 L 340 147.46376811594203 L 340 149.45652173913044 L 340 151.44927536231884 L 340 153.44202898550725 L 340 155.43478260869566 L 338 155.43478260869566 L 336 155.43478260869566 L 334 155.43478260869566 L 332 155.43478260869566 L 330 155.43478260869566 L 328 155.43478260869566 L 326 155.43478260869566 L 324 155.43478260869566 L 322 155.43478260869566 L 320 155.43478260869568 L 318.00000000000034 155.434782608696 L 316.00000000000836 155.43478260870398 L 314.0000000001313 155.43478260882642 L 312.00000000151385 155.434782610204 L 310.0000000136805 155.43478262232657 L 308.0000001008748 155.43478270920497 L 307.0000003624578 155.43478296984023 Q 306.0000006240408 155.43478323047546 305.00000196465373 155.4347845662311 L 305.00000196465373 155.4347845662311 Q 304.0000033052667 155.43478590198674 303.0000092635464 155.43479183867848 L 303.0000092635464 155.43479183867848 Q 302.0000152218261 155.4347977753702 301.0000384591169 155.43482092846796 L 301.0000384591169 155.43482092846796 Q 300.0000616964078 155.4348440815657 299.0001419706852 155.4349240649943 L 299.0001419706852 155.4349240649943 Q 298.00022224496263 155.4350040484229 297.000469757318 155.4352506639944 L 297.000469757318 155.4352506639944 Q 296.0007172696734 155.4354972795659 295.00140268850384 155.4361802149948 L 295.00140268850384 155.4361802149948 Q 294.0020881073343 155.43686315042373 293.0038016544141 155.43857048899957 L 293.0038016544141 155.43857048899957 Q 292.00551520149384 155.44027782757541 291.00939924159366 155.4441477950662 L 291.00939924159366 155.4441477950662 Q 290.0132832816935 155.44801776255696 289.0212941149639 155.45599957106916 L 289.0212941149639 155.45599957106916 Q 288.02930494823437 155.46398137958136 287.0443841685845 155.47900596507515 L 287.0443841685845 155.47900596507515 Q 286.0594633889346 155.4940305505689 285.0854331904394 155.51990625858997 L 285.0854331904394 155.51990625858997 Q 284.1114029919442 155.54578196661106 283.1524081344892 155.58663853979894 L 283.1524081344892 155.58663853979894 Q 282.1934132770341 155.62749511298682 281.2528716956441 155.68673810254393 L 281.2528716956441 155.68673810254393 Q 280.31233011425417 155.74598109210106 279.39161218169545 155.82497590567476 L 279.39161218169545 155.82497590567476 Q 278.4708942491367 155.9039707192485 277.5682109293136 156.00093480275808 L 277.5682109293136 156.00093480275808 Q 276.6655276094905 156.0978988862677 275.7755919886473 156.2075644814421 L 275.7755919886473 156.2075644814421 Q 274.88565636780413 156.31723007661648 274.0004717295733 156.43162944069806 L 274.0004717295733 156.43162944069806 Q 273.11528709134245 156.54602880477964 272.2259623547162 156.6563030708223 L 272.2259623547162 156.6563030708223 Q 271.3366376180899 156.76657733686497 270.4356680639623 156.865248976774 L 270.4356680639623 156.865248976774 Q 269.53469850983464 156.96392061668305 268.6179402739825 157.04686078023622 L 268.6179402739825 157.04686078023622 Q 267.7011820381304 157.12980094378935 266.7689034629428 157.1972770011205 L 266.7689034629428 157.1972770011205 Q 265.83662488775514 157.26475305845167 264.89341790677133 157.32134030565982 L 264.89341790677133 157.32134030565982 Q 263.9502109257875 157.37792755286796 263.0039456478533 157.4314675839118 L 263.0039456478533 157.4314675839118 Q 262.0576803699191 157.48500761495563 261.1179022434876 157.54501129333005 L 261.1179022434876 157.54501129333005 Q 260.1781241170561 157.60501497170446 259.2543129005468 157.68092770887813 L 259.2543129005468 157.68092770887813 Q 258.3305016840374 157.7568404460518 257.43054108878147 157.85651738918446 L 257.43054108878147 157.85651738918446 Q 256.5305804935255 157.95619433231712 255.65971337238395 158.08485933842607 L 255.65971337238395 158.08485933842607 Q 254.78884625124238 158.21352434453502 253.94930314596792 158.37339987369995 L 253.94930314596792 158.37339987369995 Q 253.10976004069346 158.53327540286486 252.30109603510692 158.72391815092175 L 252.30109603510692 158.72391815092175 Q 251.4924320295204 158.91456089897866 250.71239801082683 159.13372990209194 L 250.71239801082683 159.13372990209194 Q 249.93236399213328 159.35289890520525 249.17797569071394 159.5976207063273 L 249.17797569071394 159.5976207063273 Q 248.4235873892946 159.84234250744936 247.69204692888474 160.10982936754823 L 247.69204692888474 160.10982936754823 Q 246.96050646847488 160.37731622764707 246.2497799902948 160.66554165699665 L 246.2497799902948 160.66554165699665 Q 245.53905351211472 160.9537670863462 244.8481005728822 161.26169441138626 L 244.8481005728822 161.26169441138626 Q 244.15714763364969 161.5696217364263 243.485904525931 161.89718748054722 L 243.485904525931 161.89718748054722 Q 242.81466141821235 162.22475322466812 242.16387152952205 162.57269808195133 L 242.16387152952205 162.57269808195133 Q 241.51308164083179 162.92064293923454 240.88402201209095 163.29023932364134 L 240.88402201209095 163.29023932364134 Q 240.25496238335015 163.65983570804815 239.6491300800251 164.05257526089454 L 239.6491300800251 164.05257526089454 Q 239.0432977767 164.44531481374094 238.46219479307214 164.86269408730016 L 238.46219479307214 164.86269408730016 Q 237.88109180944429 165.28007336085938 237.32628657776587 165.72365510465806 L 237.32628657776587 165.72365510465806 Q 236.77148134608746 166.16723684845672 236.2450272003565 166.63906695687695 L 236.2450272003565 166.63906695687695 Q 235.71857305462552 167.11089706529717 235.22362983306581 167.61412392787355 L 235.22362983306581 167.61412392787355 Q 234.7286866115061 168.11735079044996 234.26994860571318 168.65665169047514 L 234.26994860571318 168.65665169047514 Q 233.8112105999203 169.1959525905003 233.39466805435757 169.77729606865336 L 233.39466805435757 169.77729606865336 Q 232.97812550879482 170.35863954680644 232.6098790783887 170.98810415419163 L 232.6098790783887 170.98810415419163 Q 232.24163264798256 171.61756876157682 231.92588992714917 172.29934684770296 L 231.92588992714917 172.29934684770296 Q 231.61014720631582 172.98112493382914 231.34697530749676 173.71528336797684 L 231.34697530749676 173.71528336797684 Q 231.0838034086777 174.4494418021245 230.8674779030638 175.23027689616862 L 230.8674779030638 175.23027689616862 Q 230.65115239744983 176.0111119902127 230.46989536400918 176.82688849674827 L 230.46989536400918 176.82688849674827 Q 230.2886383305685 177.6426650032838 230.12617111499117 178.47716324863248 L 230.12617111499117 178.47716324863248 Q 229.96370389941382 179.31166149398115 229.80245864437512 180.14737727247518 L 229.80245864437512 180.14737727247518 Q 229.6412133893364 180.98309305096922 229.46642255724623 181.80531233058952 L 229.46642255724623 181.80531233058952 Q 229.29163172515604 182.62753161020984 229.09505379219368 183.42804272772923 L 229.09505379219368 183.42804272772923 Q 228.89847585923133 184.2285538452486 228.68042995937384 185.00767477836163 L 228.68042995937384 185.00767477836163 Q 228.46238405951635 185.78679571147467 228.23119202975818 186.55281814559243 L 228 187.31884057971016 L 227.76431298159068 186.55729684805277 Q 227.52862596318136 185.79575311639542 227.27465098561387 185.0524310831746 L 227.27465098561387 185.0524310831746 Q 227.0206760080464 184.30910904995378 226.73349117661465 183.59887654503976 L 226.73349117661465 183.59887654503976 Q 226.4463063451829 182.88864404012574 226.11661679342993 182.2207622529231 L 226.11661679342993 182.2207622529231 Q 225.78692724167695 181.55288046572045 225.41160749128264 180.93046355035244 L 225.41160749128264 180.93046355035244 Q 225.03628774088833 180.30804663498446 224.61732265979666 179.7291169150577 L 224.61732265979666 179.7291169150577 Q 224.198357578705 179.1501871951309 223.74090546945527 178.609605057608 L 223.74090546945527 178.609605057608 Q 223.28345336020556 178.06902292008508 222.793960430641 177.5603655129483 L 222.793960430641 177.5603655129483 Q 222.30446750107646 177.0517081058115 221.78951937934426 176.56841366188524 L 221.78951937934426 176.56841366188524 Q 221.27457125761205 176.085119217959 220.7406603826658 175.62071882161925 L 220.7406603826658 175.62071882161925 Q 220.2067495077195 175.1563184252795 219.66066593505602 174.7040466226797 L 219.66066593505602 174.7040466226797 Q 219.11458236239253 174.25177482007993 218.56393452580926 173.8040507442118 L 218.56393452580926 173.8040507442118 Q 218.013286689226 173.35632666834368 217.46677048628572 172.90448592851968 L 217.46677048628572 172.90448592851968 Q 216.92025428334549 172.45264518869567 216.38756073234148 171.98703187900793 L 216.38756073234148 171.98703187900793 Q 215.85486718133748 171.52141856932022 215.346327101465 171.03173930108522 L 215.346327101465 171.03173930108522 Q 214.8377870215925 170.54206003285023 214.36386839693125 170.0178847495739 L 214.36386839693125 170.0178847495739 Q 213.88994977227003 169.49370946629756 213.46060556548298 168.92512126792417 L 213.46060556548298 168.92512126792417 Q 213.03126135869593 168.3565330695508 212.65504780839393 167.73500672793836 L 212.65504780839393 167.73500672793836 Q 212.27883425809196 167.11348038632593 211.96181265959922 166.43297663263087 L 211.96181265959922 166.43297663263087 Q 211.64479106110647 165.75247287893578 211.38945081876525 165.01051169877064 L 211.38945081876525 165.01051169877064 Q 211.13411057642404 164.26855051860548 210.9387249473882 163.46685418899946 L 210.9387249473882 163.46685418899946 Q 210.7433393183524 162.66515785939345 210.60211566874932 161.80950551129783 L 210.60211566874932 161.80950551129783 Q 210.46089201914626 160.9538531632022 210.36499376906517 160.05307673161732 L 210.36499376906517 160.05307673161732 Q 210.26909551898407 159.15230030003244 210.20825767193259 158.21671595503852 L 210.20825767193259 158.21671595503852 Q 210.14741982488107 157.28113161004464 210.11166977296708 156.3209295025555 L 210.11166977296708 156.3209295025555 Q 210.07591972105308 155.36072739506636 210.05696134605546 154.38482489564817 L 210.05696134605546 154.38482489564817 Q 210.03800297105786 153.40892239622997 210.03006779572306 152.42456939696456 L 210.03006779572306 152.42456939696456 Q 210.02213262038825 151.44021639769915 210.02238013819328 150.4533666128388 L 210.02238013819328 150.4533666128388 Q 210.0226276559983 149.46651682797844 210.03132856322202 148.48276681809114 L 210.03132856322202 148.48276681809114 Q 210.04002947044577 147.4990168082038 210.06072485330304 146.5247987168283 L 210.06072485330304 146.5247987168283 Q 210.08142023616034 145.55058062545277 210.1210614035739 144.59424366182748 L 210.1210614035739 144.59424366182748 Q 210.16070257098744 143.6379066982022 210.22955743233746 142.71030764884193 L 210.22955743233746 142.71030764884193 Q 210.29841229368745 141.78270859948168 210.40940841586837 140.89697481629096 L 210.40940841586837 140.89697481629096 Q 210.52040453804926 140.01124103310025 210.68765986793713 139.1815259607288 L 210.68765986793713 139.1815259607288 Q 210.854915197825 138.35181088835736 211.0914913542522 137.59115583297893 L 211.0914913542522 137.59115583297893 Q 211.32806751067943 136.8305007776005 211.64336465981606 136.14827926768362 L 211.64336465981606 136.14827926768362 Q 211.95866180895268 135.46605775776675 212.3561735401832 134.86575250577127 L 212.3561735401832 134.86575250577127 Q 212.75368527141367 134.2654472537758 213.22986387786364 133.7435237760709 L 213.22986387786364 133.7435237760709 Q 213.70604248431357 133.221600298366 214.25071727586175 132.76792482031587 L 214.25071727586175 132.76792482031587 Q 214.7953920674099 132.31424934226573 215.39364024591913 131.91395314343941 L 215.39364024591913 131.91395314343941 Q 215.9918884244284 131.5136569446131 216.62672877826984 131.14982034065875 L 216.62672877826984 131.14982034065875 Q 217.26156913211128 130.7859837367044 217.9165968460438 130.44226135022447 L 217.9165968460438 130.44226135022447 Q 218.57162455997633 130.09853896374455 219.23285203207067 129.76099387253421 L 219.23285203207067 129.76099387253421 Q 219.894079504165 129.42344878132388 220.55069342474602 129.08130685436652 L 220.55069342474602 129.08130685436652 Q 221.20730734532702 128.73916492740918 221.85153591048112 128.3846825195011 L 221.85153591048112 128.3846825195011 Q 222.4957644756352 128.03020011159305 223.12231422927778 127.65810294583834 L 223.12231422927778 127.65810294583834 Q 223.7488639829203 127.28600578008363 224.35433869304785 126.89290992966721 L 224.35433869304785 126.89290992966721 Q 224.95981340317536 126.49981407925081 225.54227569942248 126.08378919326515 L 225.54227569942248 126.08378919326515 Q 226.1247379956696 125.6677643072795 226.6833323510314 125.2279579584552 L 226.6833323510314 125.2279579584552 Q 227.2419267063932 124.78815160963092 227.77641330011173 124.32432484612582 L 227.77641330011173 124.32432484612582 Q 228.31089989383025 123.86049808262072 228.82106494553813 123.37243789863402 L 228.82106494553813 123.37243789863402 Q 229.33122999724603 122.8843777146473 229.81631836269912 122.37133170196466 L 229.81631836269912 122.37133170196466 Q 230.3014067281522 121.85828568928204 230.7598209587123 121.31866218712275 L 230.7598209587123 121.31866218712275 Q 231.21823518927243 120.77903868496347 231.64769585459305 120.21056652178656 L 231.64769585459305 120.21056652178656 Q 232.07715651991367 119.64209435860965 232.47536049605034 119.04247875512263 L 232.47536049605034 119.04247875512263 Q 232.873564472187 118.44286315163559 233.23919975391408 117.81079685625497 L 233.23919975391408 117.81079685625497 Q 233.60483503564114 117.17873056087434 233.93867982448322 116.51498895555392 L 233.93867982448322 116.51498895555392 Q 234.2725246133253 115.8512473502335 234.57829941157593 115.15953745718615 L 234.57829941157593 115.15953745718615 Q 234.88407420982657 114.46782756413879 235.16873777655405 113.75508292953756 L 235.16873777655405 113.75508292953756 Q 235.45340134328154 113.04233829493633 235.22670067164077 111.82008219094644 L 235 110.59782608695653 L 235 110.59782608695653 L 236.28712512137298 109.8986887993283 Q 237.57425024274596 109.19955151170007 238.3717111232745 109.01507623877039 Z'),
				_Utils_Tuple2(10, 'M 51.9998580293148 110.59768463065785 Q 52.88521125232389 110.4834532405401 53.77497989736356 110.37362127454702 L 53.77497989736356 110.37362127454702 Q 54.664748542403224 110.26378930855392 55.56676972434547 110.16616548621377 L 55.56676972434547 110.16616548621377 Q 56.468790906287715 110.06854166387362 57.38780125613774 109.98784545448505 L 57.38780125613774 109.98784545448505 Q 58.30681160598777 109.90714924509649 59.24347048864373 109.84403762455443 L 59.24347048864373 109.84403762455443 Q 60.18012937129969 109.78092600401237 61.131113657820094 109.73208788369755 L 61.131113657820094 109.73208788369755 Q 62.08209794434049 109.68324976338273 63.041048972170245 109.64234951937252 L 64 109.60144927536231 L 66 109.60144927536231 L 68 109.60144927536231 L 70 109.60144927536231 L 72 109.60144927536231 L 74 109.60144927536231 L 76 109.60144927536231 L 78 109.60144927536231 L 80 109.60144927536231 L 81 109.60144927536231 Q 82 109.60144927536231 83.5 110.09963768115942 L 85 110.59782608695653 L 85 110.59782608695653 L 84.77329932829795 111.82008219100749 Q 84.54659865659589 113.04233829505844 84.83126222269338 113.75508293028739 L 84.83126222269338 113.75508293028739 Q 85.11592578879088 114.46782756551634 85.42170058164947 115.1595374639362 L 85.42170058164947 115.1595374639362 Q 85.72747537450809 115.85124736235608 86.06132012583629 116.51498900505442 L 86.06132012583629 116.51498900505442 Q 86.39516487716449 117.17873064775276 86.76079994090574 117.81079716032941 L 86.76079994090574 117.81079716032941 Q 87.12643500464698 118.44286367290607 87.52463790175372 119.04248035151349 L 87.52463790175372 119.04248035151349 Q 87.92284079886045 119.64209703012092 88.3522968465143 120.21057379423392 L 88.3522968465143 120.21057379423392 Q 88.78175289416816 120.77905055834692 89.24014984571717 121.31869127691223 L 89.24014984571717 121.31869127691223 Q 89.69854679726618 121.85833199547753 90.18357812573265 122.37143483849101 L 90.18357812573265 122.37143483849101 Q 90.66860945419913 122.88453768150448 91.17860726782905 123.37276449763408 L 91.17860726782905 123.37276449763408 Q 91.68860508145897 123.86099131376369 92.22265376870257 124.32525439712605 L 92.22265376870257 124.32525439712605 Q 92.75670245594618 124.7895174804884 93.31426868306252 125.23034823245581 L 93.31426868306252 125.23034823245581 Q 93.87183491017888 125.67117898442322 94.45212671346339 126.08936649926656 L 94.45212671346339 126.08936649926656 Q 95.0324185167479 126.50755401410989 95.63376643433466 126.90476170492019 L 95.63376643433466 126.90476170492019 Q 96.23511435192141 127.30196939573048 96.85459572387649 127.68110933309408 L 96.85459572387649 127.68110933309408 Q 97.47407709583156 128.0602492704577 98.10741511734864 128.42558276351133 L 98.10741511734864 128.42558276351133 Q 98.74075313886573 128.79091625656497 99.38233193644989 129.14803883143583 L 99.38233193644989 129.14803883143583 Q 100.02391073403405 129.50516140630668 100.6666860097232 129.86109183813815 L 100.6666860097232 129.86109183813815 Q 101.30946128541234 130.21702226996962 101.9446699735765 130.5804918741539 L 101.9446699735765 130.5804918741539 Q 102.57987866174065 130.94396147833817 103.19670171943287 131.3257500983912 L 103.19670171943287 131.3257500983912 Q 103.81352477712507 131.70753871844423 104.39908251231844 132.12047938084214 L 104.39908251231844 132.12047938084214 Q 104.98464024751182 132.53342004324003 105.52473237964674 132.99166157825053 L 105.52473237964674 132.99166157825053 Q 106.06482451178167 133.44990311326103 106.5455857844851 133.96726054082103 L 106.5455857844851 133.96726054082103 Q 107.02634705718853 134.484617968381 107.43654927608898 135.07227880099828 L 107.43654927608898 135.07227880099828 Q 107.84675149498943 135.65993963361558 108.18006620800725 136.32420939419566 L 108.18006620800725 136.32420939419566 Q 108.51338092102506 136.98847915477575 108.76977748812641 137.7293883723378 L 108.76977748812641 137.7293883723378 Q 109.02617405522776 138.47029758989987 109.2118878075323 139.28163352510367 L 109.2118878075323 139.28163352510367 Q 109.39760155983686 140.09296946030747 109.52365742726828 140.96374712862726 L 109.52365742726828 140.96374712862726 Q 109.6497132946997 141.83452479694705 109.7295452006013 142.75135894866722 L 109.7295452006013 142.75135894866722 Q 109.8093771065029 143.66819310038738 109.8563587955397 144.61775844632533 L 109.8563587955397 144.61775844632533 Q 109.90334048457653 145.56732379226327 109.92893461648458 146.53819920281103 L 109.92893461648458 146.53819920281103 Q 109.95452874839265 147.5090746133588 109.96738604686323 148.49264069738902 L 109.96738604686323 148.49264069738902 Q 109.98024334533382 149.47620678141925 109.98617601797338 150.46667231644085 L 109.98617601797338 150.46667231644085 Q 109.99210869061295 151.45713785146242 109.99461247118617 152.45101934461735 L 109.99461247118617 152.45101934461735 Q 109.9971162517594 153.44490083777225 109.99807707610381 154.44031710123454 L 109.99807707610381 154.44031710123454 Q 109.99903790044823 155.43573336469686 109.99936569247308 156.43176893863733 L 109.99936569247308 156.43176893863733 Q 109.99969348449793 157.42780451257778 109.99976914105113 158.42404722726434 L 109.99976914105113 158.42404722726434 Q 109.99984479760434 159.4202899419509 109.99976939655082 160.41653283645556 L 109.99976939655082 160.41653283645556 Q 109.9996939954973 161.41277573096022 109.9993672878944 162.40881237464856 L 109.9993672878944 162.40881237464856 Q 109.9990405802915 163.4048490183369 109.9980843742437 164.40026988210775 L 109.9980843742437 164.40026988210775 Q 109.9971281681959 165.3956907458786 109.99464166669125 166.3895894553823 L 109.99464166669125 166.3895894553823 Q 109.9921551651866 167.383488164886 109.98627952953746 168.37401053023459 L 109.98627952953746 168.37401053023459 Q 109.98040389388832 169.36453289558318 109.96771383349588 170.34826561175615 L 109.96771383349588 170.34826561175615 Q 109.95502377310342 171.3319983279291 109.92986754767045 172.30331005833432 L 109.92986754767045 172.30331005833432 Q 109.90471132223747 173.2746217887395 109.85875776144994 174.22521153782438 L 109.85875776144994 174.22521153782438 Q 109.81280420066241 175.17580128690926 109.73514278778087 176.09479806754433 L 109.73514278778087 176.09479806754433 Q 109.65748137489933 177.0137948481794 109.53555230063853 177.88868435752065 L 109.53555230063853 177.88868435752065 Q 109.41362322637772 178.7635738668619 109.23497786115269 179.58195257904708 L 109.23497786115269 179.58195257904708 Q 109.05633249592765 180.4003312912323 108.81082650997715 181.15209163131786 L 108.81082650997715 181.15209163131786 Q 108.56532052402665 181.9038519714034 108.24704115199151 182.58310259709305 L 108.24704115199151 182.58310259709305 Q 107.92876177995637 183.26235322278265 107.53701283649087 183.86840047114129 L 107.53701283649087 183.86840047114129 Q 107.14526389302537 184.47444771949995 106.68432626375326 185.0115569656962 L 106.68432626375326 185.0115569656962 Q 106.22338863448114 185.54866621189245 105.70133107744897 186.02487697934228 L 105.70133107744897 186.02487697934228 Q 105.17927352041679 186.5010877467921 104.6064632648922 186.92672970233826 L 104.6064632648922 186.92672970233826 Q 104.03365300936761 187.35237165788442 103.42157984371713 187.73889296022543 L 103.42157984371713 187.73889296022543 Q 102.80950667806664 188.1254142625664 102.17015319198023 188.4847540862122 L 102.17015319198023 188.4847540862122 Q 101.53079970589383 188.84409390985797 100.8763618474023 189.18840401462185 L 100.8763618474023 189.18840401462185 Q 100.22192398891076 189.53271411938573 99.56449700386428 189.87404592776332 L 99.56449700386428 189.87404592776332 Q 98.90707001881779 190.2153777361409 98.25803354351508 190.56506965386467 L 98.25803354351508 190.56506965386467 Q 97.60899706821237 190.9147615715884 96.97810729749487 191.28253444496772 L 96.97810729749487 191.28253444496772 Q 96.34721752677737 191.65030731834702 95.7416387530428 192.04329948219845 L 95.7416387530428 192.04329948219845 Q 95.13605997930824 192.43629164604988 94.55964173870468 192.85833868892678 L 94.55964173870468 192.85833868892678 Q 93.98322349810113 193.28038573180365 93.43627401383416 193.73179476016082 L 93.43627401383416 193.73179476016082 Q 92.8893245295672 194.183203788518 92.36900083440122 194.6611421357258 L 92.36900083440122 194.6611421357258 Q 91.84867713923524 195.1390804829336 91.34993231540153 195.63851951715728 L 91.34993231540153 195.63851951715728 Q 90.85118749156784 196.13795855138096 90.36800898256934 196.6529075007484 L 90.36800898256934 196.6529075007484 Q 89.88483047357082 197.16785645011583 89.4113491074223 197.6924674077577 L 89.4113491074223 197.6924674077577 Q 88.93786774127378 198.21707836539957 88.46893387063689 198.74622034212007 L 88 199.27536231884056 L 87.99997049849237 198.27901490186449 Q 87.99994099698475 197.2826674848884 87.99985802924917 196.28637334042202 L 87.99985802924917 196.28637334042202 Q 87.9997750615136 195.29007919595566 87.99952128431158 194.29395524208087 L 87.99952128431158 194.29395524208087 Q 87.99926750710955 193.29783128820605 87.99855853960185 192.30216087539674 L 87.99855853960185 192.30216087539674 Q 87.99784957209414 191.3064904625874 87.99605435974806 190.31190235894672 L 87.99605435974806 190.31190235894672 Q 87.99425914740198 189.31731425530603 87.9901213683051 188.32506023085546 L 87.9901213683051 188.32506023085546 Q 87.98598358920822 187.33280620640488 87.97726271547947 186.34511867117084 L 87.97726271547947 186.34511867117084 Q 87.96854184175072 185.3574311359368 87.95166257942397 184.3778724299218 L 87.95166257942397 184.3778724299218 Q 87.93478331709721 183.3983137239068 87.90465737845848 182.43195369899973 L 87.90465737845848 182.43195369899973 Q 87.87453143981975 181.46559367409267 87.8247437629323 180.51882414925228 L 87.8247437629323 180.51882414925228 Q 87.77495608604485 179.57205462441186 87.69843384511724 178.65192279924915 L 87.69843384511724 178.65192279924915 Q 87.62191160418962 177.73179097408644 87.51200839915262 176.84491916751097 L 87.51200839915262 176.84491916751097 Q 87.40210519411562 175.95804736093552 87.25380417377355 175.10943424714594 L 87.25380417377355 175.10943424714594 Q 87.10550315343147 174.26082113335633 86.91630243790425 173.4529595274505 L 86.91630243790425 173.4529595274505 Q 86.72710172237703 172.64509792154465 86.4972063441941 171.8777835338646 L 86.4972063441941 171.8777835338646 Q 86.26731096601118 171.11046914618453 85.99902153530633 170.38140970214045 L 85.99902153530633 170.38140970214045 Q 85.73073210460149 169.65235025809636 85.4272595942379 168.9583464187847 L 85.4272595942379 168.9583464187847 Q 85.1237870838743 168.26434257947307 84.78794263906417 167.6025933849904 L 84.78794263906417 167.6025933849904 Q 84.45209819425405 166.94084419050773 84.08528456654642 166.30995197173814 L 84.08528456654642 166.30995197173814 Q 83.7184709388388 165.67905975296858 83.32017614450439 165.07953463862788 L 83.32017614450439 165.07953463862788 Q 82.92188135016997 164.4800095242872 82.48961706441517 163.9143308234994 L 82.48961706441517 163.9143308234994 Q 82.05735277866037 163.3486521227116 81.58686637237702 162.82105705650844 L 81.58686637237702 162.82105705650844 Q 81.11637996609366 162.29346199030525 80.60204754777047 161.80955407377945 L 80.60204754777047 161.80955407377945 Q 80.08771512944729 161.32564615725363 79.52317803710162 160.89176101375747 L 79.52317803710162 160.89176101375747 Q 78.95864094475593 160.45787587026132 78.33779830421196 160.08009226935403 L 78.33779830421196 160.08009226935403 Q 77.716955663668 159.70230866844673 77.03527788063283 159.3851397928477 L 77.03527788063283 159.3851397928477 Q 76.35360009759768 159.06797091724866 75.60946532099345 158.81303274176375 L 75.60946532099345 158.81303274176375 Q 74.86533054438922 158.55809456627884 74.06091077144599 158.36322296323317 L 74.06091077144599 158.36322296323317 Q 73.25649099850276 158.16835136018747 72.39779013968374 158.02756417241656 L 72.39779013968374 158.02756417241656 Q 71.53908928086473 157.88677698464565 70.63505431605165 157.7911596488616 L 70.63505431605165 157.7911596488616 Q 69.73101935123859 157.6955423130775 68.7920301994981 157.63475251861604 L 68.7920301994981 157.63475251861604 Q 67.85304104775761 157.57396272415457 66.88931783363438 157.5378173759078 L 66.88931783363438 157.5378173759078 Q 65.92559461951114 157.50167202766102 64.94603383208118 157.48130687020898 L 64.94603383208118 157.48130687020898 Q 63.96647304465121 157.46094171275695 62.97818798524487 157.4492692176002 L 62.97818798524487 157.4492692176002 Q 61.989902925838535 157.4375967224435 60.99844404766176 157.42908654671382 L 60.99844404766176 157.42908654671382 Q 60.006985169484985 157.42057637098415 59.01698190776084 157.41061585277453 L 59.01698190776084 157.41061585277453 Q 58.02697864603669 157.4006553345649 57.042829817623826 157.3848615947589 L 57.042829817623826 157.3848615947589 Q 56.058680989210956 157.36906785495285 55.08492288711969 157.34292103638438 L 55.08492288711969 157.34292103638438 Q 54.111164785028414 157.31677421781592 53.1522561668478 157.2758317178147 L 53.1522561668478 157.2758317178147 Q 52.193347548667184 157.2348892178135 51.25282924822669 157.17562303165818 L 51.25282924822669 157.17562303165818 Q 50.3123109477862 157.11635684550288 49.391593276871916 157.0373617712327 L 49.391593276871916 157.0373617712327 Q 48.47087560595764 156.9583666969625 47.56817039009066 156.8614244301633 L 47.56817039009066 156.8614244301633 Q 46.66546517422368 156.7644821633641 45.775449284556586 156.65489654618457 L 45.775449284556586 156.65489654618457 Q 44.88543339488949 156.54531092900504 43.99999994189544 156.4311594781839 L 43.99999994189544 156.4311594781839 Q 43.114566488901396 156.31700802736276 42.22455033765129 156.2074226708185 L 42.22455033765129 156.2074226708185 Q 41.33453418640118 156.09783731427422 40.431827586323934 156.00089642667 L 40.431827586323934 156.00089642667 Q 39.52912098624668 155.90395553906583 38.60839708938252 155.82496666818773 L 38.60839708938252 155.82496666818773 Q 37.68767319251836 155.74597779730962 36.747130269828034 155.6867361441931 L 36.747130269828034 155.6867361441931 Q 35.806587347137715 155.62749449107656 34.847592228038344 155.586638178585 L 34.847592228038344 155.586638178585 Q 33.888597108938974 155.54578186609342 32.914566866842605 155.51990620151554 L 32.914566866842605 155.51990620151554 Q 31.94053662474623 155.49403053693766 30.95561583901285 155.47900595750534 L 30.95561583901285 155.47900595750534 Q 29.97069505327947 155.46398137807302 28.978705885858613 155.4559995702496 L 28.978705885858613 155.4559995702496 Q 27.986716718437755 155.44801776242616 26.990600758476127 155.44414779499664 L 26.990600758476127 155.44414779499664 Q 25.9944847985145 155.4402778275671 24.99619834559025 155.43857048899525 L 24.99619834559025 155.43857048899525 Q 23.997911892666004 155.4368631504234 22.998597311496304 155.43618021499464 L 22.998597311496304 155.43618021499464 Q 21.999282730326605 155.43549727956588 20.999530242681992 155.4352506639944 L 20.999530242681992 155.4352506639944 Q 19.99977775503738 155.4350040484229 18.9998580293148 155.4349240649943 L 18.9998580293148 155.4349240649943 Q 17.999938303592224 155.4348440815657 16.999961540883056 155.43482092846796 L 16.999961540883056 155.43482092846796 Q 15.99998477817389 155.4347977753702 14.99999073645359 155.43479183867848 L 14.99999073645359 155.43479183867848 Q 13.99999669473329 155.43478590198674 12.999998035346223 155.4347845662311 L 12.999998035346223 155.4347845662311 Q 11.999999375959156 155.43478323047546 10.999999637542167 155.43478296984023 L 9.999999899125179 155.43478270920497 L 7.999999986319516 155.43478262232657 L 5.999999998486167 155.434782610204 L 3.9999999998687414 155.43478260882642 L 1.999999999991644 155.43478260870398 L 0 155.43478260869566 L 0 153.44202898550725 L 0 151.44927536231884 L 0 149.45652173913044 L 0 147.46376811594203 L 0 145.47101449275362 L 0 143.47826086956522 L 0 141.4855072463768 L 0 139.4927536231884 L 0 137.5 L 0 135.5072463768116 L 0 133.5144927536232 L 0 131.52173913043478 L 0 129.52898550724638 L 0 127.53623188405797 L 0 125.54347826086956 L 0 123.55072463768116 L 0 121.55797101449275 L 0 119.56521739130434 L 0 117.57246376811594 L 0 115.57971014492753 L 0 113.58695652173913 L 0 111.59420289855072 L 2 111.59420289855072 L 4 111.59420289855072 L 5.999999999999993 111.59420289855072 L 7.999999999999652 111.59420289855038 L 9.999999999991637 111.59420289854239 L 11.999999999868741 111.59420289841994 L 13.999999998486167 111.59420289704238 L 15.999999986319516 111.59420288491981 L 17.99999989912518 111.5942027980414 L 18.999999637542167 111.59420253740615 Q 19.999999375959156 111.59420227677091 20.999998035346223 111.59420094101527 L 20.999998035346223 111.59420094101527 Q 21.99999669473329 111.59419960525963 22.99999073645359 111.5941936685679 L 22.99999073645359 111.5941936685679 Q 23.99998477817389 111.59418773187616 24.999961540883056 111.59416457877842 L 24.999961540883056 111.59416457877842 Q 25.999938303592224 111.59414142568066 26.9998580293148 111.59406144225207 L 26.9998580293148 111.59406144225207 Q 27.99977775503738 111.59398145882348 28.999530242681992 111.59373484325198 L 28.999530242681992 111.59373484325198 Q 29.999282730326605 111.5934882276805 30.9985973114963 111.59280529225174 L 30.9985973114963 111.59280529225174 Q 31.997911892665996 111.59212235682298 32.996198345590074 111.59041501825097 L 32.996198345590074 111.59041501825097 Q 33.99448479851415 111.58870767967895 34.99060075847177 111.58483771224542 L 34.99060075847177 111.58483771224542 Q 35.98671671842939 111.58096774481189 36.9787058857888 111.57298593692724 L 36.9787058857888 111.57298593692724 Q 37.97069505314821 111.56500412904259 38.955615838190305 111.54997954892148 L 38.955615838190305 111.54997954892148 Q 39.9405366232324 111.53495496880038 40.91456685924545 111.50907929816121 L 40.91456685924545 111.50907929816121 Q 41.8885970952585 111.48320362752204 42.84759217076087 111.44234727159144 L 42.84759217076087 111.44234727159144 Q 43.80658724626324 111.40149091566083 44.747129907374564 111.34224900191305 L 44.747129907374564 111.34224900191305 Q 45.68767256848589 111.28300708816528 46.60839512479873 111.20401688159293 L 46.60839512479873 111.20401688159293 Q 47.52911768111158 111.12502667502059 48.431818323604425 111.02807985141744 L 48.431818323604425 111.02807985141744 Q 49.33451896609727 110.9311330278143 50.22451188620149 110.82152452429496 L 50.22451188620149 110.82152452429496 Q 51.11450480630571 110.71191602077562 51.9998580293148 110.59768463065785 Z'),
				_Utils_Tuple2(11, 'M 85 110.59782608695653 L 85 110.59782608695653 L 85.86352226654672 111.7301861474625 Q 86.72704453309345 112.86254620796848 87.09706496126766 113.49024324511373 L 87.09706496126766 113.49024324511373 Q 87.46708538944188 114.117940282259 87.84949775886872 114.7332902764895 L 87.84949775886872 114.7332902764895 Q 88.23191012829558 115.34864027071998 88.63148190993128 115.946893024525 L 88.63148190993128 115.946893024525 Q 89.03105369156698 116.54514577833001 89.45109959236478 117.12299859456408 L 89.45109959236478 117.12299859456408 Q 89.87114549316257 117.70085141079817 90.31351027435655 118.25646621214474 L 90.31351027435655 118.25646621214474 Q 90.75587505555052 118.81208101349134 91.22125476250045 119.34476427649412 L 91.22125476250045 119.34476427649412 Q 91.68663446945038 119.87744753949688 92.17511224355418 120.38711642399491 L 92.17511224355418 120.38711642399491 Q 92.66359001765798 120.89678530849295 93.17513579286144 121.38346977160545 L 93.17513579286144 121.38346977160545 Q 93.6866815680649 121.87015423471794 94.22136624737415 122.33378363033373 L 94.22136624737415 122.33378363033373 Q 94.7560509266834 122.79741302594951 95.31387822926456 123.23798364837769 L 95.31387822926456 123.23798364837769 Q 95.87170553184572 123.67855427080588 96.45218407062487 124.0965557267321 L 96.45218407062487 124.0965557267321 Q 97.032662609404 124.51455718265835 97.63439105850134 124.91138572068743 L 97.63439105850134 124.91138572068743 Q 98.23611950759869 125.3082142587165 98.85664933284006 125.6863095414148 L 98.85664933284006 125.6863095414148 Q 99.47717915808144 126.0644048241131 100.11327012446537 126.42699534535225 L 100.11327012446537 126.42699534535225 Q 100.7493610908493 126.78958586659141 101.39755854196996 127.14011375630952 L 101.39755854196996 127.14011375630952 Q 102.04575599309061 127.49064164602761 102.70310346654146 127.83205258965936 L 102.70310346654146 127.83205258965936 Q 103.36045093999232 128.1734635332911 104.02514354178751 128.5075555162253 L 104.02514354178751 128.5075555162253 Q 104.68983614358271 128.84164749915948 105.36167384445231 129.16861804606242 L 105.36167384445231 129.16861804606242 Q 106.03351154532191 129.49558859296536 106.71405584006506 129.81387445535282 L 106.71405584006506 129.81387445535282 Q 107.3946001348082 130.13216031774027 108.08694705268 130.43864973695872 L 108.08694705268 130.43864973695872 Q 108.7792939705518 130.74513915617717 109.48739768423454 131.03580600562765 L 109.48739768423454 131.03580600562765 Q 110.19550139791727 131.3264728550781 110.92308655279442 131.59736114030102 L 110.92308655279442 131.59736114030102 Q 111.65067170767156 131.86824942552397 112.3999676739712 132.1165191851827 L 112.3999676739712 132.1165191851827 Q 113.14926364027085 132.36478894484142 113.91997725003571 132.58933614422054 L 113.91997725003571 132.58933614422054 Q 114.69069085980057 132.81388334359966 115.47964377953744 133.0150571841769 L 115.47964377953744 133.0150571841769 Q 116.2685966992743 133.21623102475414 117.07020631301074 133.39451182956188 L 117.07020631301074 133.39451182956188 Q 117.87181592674717 133.57279263436962 118.67920292975214 133.72686915324078 L 118.67920292975214 133.72686915324078 Q 119.48658993275711 133.88094567211192 120.29281324487819 134.00613072572352 L 120.29281324487819 134.00613072572352 Q 121.09903655699927 134.13131577933513 121.89800167059545 134.21930855038448 L 121.89800167059545 134.21930855038448 Q 122.69696678419163 134.3073013214338 123.4838914086996 134.34779514563752 L 123.4838914086996 134.34779514563752 Q 124.27081603320758 134.38828896984126 125.04247433936825 134.3720326901663 L 125.04247433936825 134.3720326901663 Q 125.81413264552893 134.35577641049136 126.5691269188029 134.27788125381636 L 126.5691269188029 134.27788125381636 Q 127.32412119207686 134.19998609714133 128.06311270772179 134.0619839309463 L 128.06311270772179 134.0619839309463 Q 128.8021042233667 133.92398176475126 129.5275816244025 133.73357914969947 L 129.5275816244025 133.73357914969947 Q 130.25305902543826 133.54317653464767 130.96823174246384 133.31163784226655 L 130.96823174246384 133.31163784226655 Q 131.68340445948945 133.08009914988543 132.3903042355617 132.81827321530247 L 132.3903042355617 132.81827321530247 Q 133.09720401163398 132.5564472807195 133.7947526044921 132.2711048401339 L 133.7947526044921 132.2711048401339 Q 134.4923011973502 131.9857623995483 135.17543204307475 131.6778051774244 L 135.17543204307475 131.6778051774244 Q 135.85856288879933 131.36984795530051 136.5191394816019 131.03511853131624 L 136.5191394816019 131.03511853131624 Q 137.1797160744045 130.70038910733194 137.80911078259527 130.33265562031593 L 137.80911078259527 130.33265562031593 Q 138.43850549078604 129.96492213329992 139.0308162280578 129.55970842962978 L 139.0308162280578 129.55970842962978 Q 139.62312696532956 129.1544947259596 140.17765868004778 128.71221262437552 L 140.17765868004778 128.71221262437552 Q 140.732190394766 128.2699305227914 141.25420609467974 127.79729908845452 L 141.25420609467974 127.79729908845452 Q 141.77622179459348 127.32466765411763 142.27581295909982 126.83431745627091 L 142.27581295909982 126.83431745627091 Q 142.77540412360617 126.34396725842419 143.26513658029313 125.8528833522154 L 143.26513658029313 125.8528833522154 Q 143.7548690369801 125.3617994460066 144.24721759023618 124.88946363363976 L 144.24721759023618 124.88946363363976 Q 144.73956614349225 124.41712782127294 145.24497638270861 123.98386823073542 L 145.24497638270861 123.98386823073542 Q 145.75038662192495 123.55060864019792 146.27632405803934 123.1761025854181 L 146.27632405803934 123.1761025854181 Q 146.80226149415375 122.80159653063828 147.35315619473818 122.50315599533022 L 147.35315619473818 122.50315599533022 Q 147.9040508953226 122.20471546002216 148.48182154107522 121.9951571702403 L 148.48182154107522 121.9951571702403 Q 149.05959218682784 121.78559888045845 149.66442406007332 121.67103156509363 L 149.66442406007332 121.67103156509363 Q 150.2692559333188 121.5564642497288 150.9003753249081 121.53480733833227 L 150.9003753249081 121.53480733833227 Q 151.5314947164974 121.51315042693574 152.18772567166928 121.57423696364116 L 152.18772567166928 121.57423696364116 Q 152.84395662684113 121.63532350034657 153.52388317048724 121.76292604110311 L 153.52388317048724 121.76292604110311 Q 154.20380971413334 121.89052858185966 154.9054822245311 122.06582572763975 L 154.9054822245311 122.06582572763975 Q 155.60715473492886 122.24112287341983 156.32749657523635 122.44643476357047 L 156.32749657523635 122.44643476357047 Q 157.04783841554382 122.6517466537211 157.78212177368158 122.87317922547282 L 157.78212177368158 122.87317922547282 Q 158.51640513181934 123.09461179722456 159.25820256590967 123.32266821745286 L 160 123.55072463768116 L 160.74179743409033 123.32266821745286 Q 161.48359486818066 123.09461179722456 162.21787822631842 122.87317922547282 L 162.21787822631842 122.87317922547282 Q 162.95216158445618 122.6517466537211 163.67250342476365 122.44643476357047 L 163.67250342476365 122.44643476357047 Q 164.39284526507114 122.24112287341983 165.0945177754689 122.06582572763975 L 165.0945177754689 122.06582572763975 Q 165.79619028586666 121.89052858185966 166.47611682951276 121.7629260411031 L 166.47611682951276 121.7629260411031 Q 167.15604337315887 121.63532350034656 167.81227432833055 121.57423696364097 L 167.81227432833055 121.57423696364097 Q 168.46850528350225 121.5131504269354 169.09962467508774 121.53480733832811 L 169.09962467508774 121.53480733832811 Q 169.7307440666732 121.55646424972083 170.33557593986123 121.67103156502841 L 170.33557593986123 121.67103156502841 Q 170.94040781304926 121.785598880336 171.51817845817206 121.99515716949028 L 171.51817845817206 121.99515716949028 Q 172.09594910329486 122.20471545864459 172.64684379848723 122.50315598858015 L 172.64684379848723 122.50315598858015 Q 173.1977384936796 122.80159651851571 173.72367589228014 123.17610253591761 L 173.72367589228014 123.17610253591761 Q 174.24961329088072 123.5506085533195 174.75502331211123 123.98386792666096 L 174.75502331211123 123.98386792666096 Q 175.26043333334172 124.41712730000243 175.7527808075679 124.88946203724888 L 175.7527808075679 124.88946203724888 Q 176.24512828179405 125.3617967744953 176.73485612081424 125.85287607976801 L 176.73485612081424 125.85287607976801 Q 177.22458395983443 126.34395538504072 177.72415784532947 126.83428836648125 L 177.72415784532947 126.83428836648125 Q 178.2237317308245 127.32462134792178 178.74569039374782 127.797195951924 L 178.74569039374782 127.797195951924 Q 179.26764905667113 128.26977055592621 179.82201353325394 128.7118860253102 L 179.82201353325394 128.7118860253102 Q 180.37637800983677 129.15400149469417 180.96825084000375 129.5587788778795 L 180.96825084000375 129.5587788778795 Q 181.56012367017075 129.96355626106484 182.18849024472405 130.33026533956524 L 182.18849024472405 130.33026533956524 Q 182.81685681927735 130.69697441806562 183.47526288160347 131.0295411758143 L 183.47526288160347 131.0295411758143 Q 184.1336689439296 131.36210793356298 184.81267277912752 131.66595309809694 L 184.81267277912752 131.66595309809694 Q 185.49167661432548 131.9697982626309 186.1821557464662 132.24809685648722 L 186.1821557464662 132.24809685648722 Q 186.87263487860693 132.52639545034356 187.56863949337543 132.77736569884485 L 187.56863949337543 132.77736569884485 Q 188.2646441081439 133.02833594734614 188.9647644231615 133.24487677540773 L 188.9647644231615 133.24487677540773 Q 189.66488473817915 133.46141760346933 190.37185290582312 133.63337804756918 L 190.37185290582312 133.63337804756918 Q 191.0788210734671 133.805338491669 191.79782632526553 133.92342680801698 L 191.79782632526553 133.92342680801698 Q 192.51683157706393 134.04151512436493 193.25337064770974 134.101021945088 L 193.25337064770974 134.101021945088 Q 193.98990971835556 134.16052876581105 194.74784945289332 134.1631161788327 L 194.74784945289332 134.1631161788327 Q 195.50578918743105 134.16570359185437 196.28596065886785 134.1184810825254 L 196.28596065886785 134.1184810825254 Q 197.06613213030465 134.07125857319642 197.8655531114686 133.98372001802076 L 197.8655531114686 133.98372001802076 Q 198.66497409263255 133.8961814628451 199.47681946644366 133.7765981011348 L 199.47681946644366 133.7765981011348 Q 200.28866484025474 133.65701473942448 201.10317859577594 133.51003915150247 L 201.10317859577594 133.51003915150247 Q 201.91769235129715 133.36306356358045 202.72408586780531 133.18954932856337 L 202.72408586780531 133.18954932856337 Q 203.53047938431348 133.01603509354626 204.31943230405034 132.81486125296902 L 204.31943230405034 132.81486125296902 Q 205.1083852237872 132.61368741239178 205.87431493078032 132.38437364322198 L 205.87431493078032 132.38437364322198 Q 206.64024463777346 132.1550598740522 207.38241385155686 131.89968918344434 L 207.38241385155686 131.89968918344434 Q 208.1245830653403 131.64431849283648 208.84654615852742 131.36782851571226 L 208.84654615852742 131.36782851571226 Q 209.56850925171454 131.09133853858805 210.27615709782953 130.8002174732639 L 210.27615709782953 130.8002174732639 Q 210.98380494394448 130.50909640793975 211.6829050148874 130.20933567384657 L 211.6829050148874 130.20933567384657 Q 212.38200508583037 129.90957493975338 213.07626795219647 129.60495794401925 L 213.07626795219647 129.60495794401925 Q 213.77053081856258 129.3003409482851 214.46082372206033 128.99175873733412 L 214.46082372206033 128.99175873733412 Q 215.15111662555807 128.68317652638314 215.8357954911998 128.368998393296 L 215.8357954911998 128.368998393296 Q 216.5204743568415 128.0548202602089 217.19633106368417 127.73185148752913 L 217.19633106368417 127.73185148752913 Q 217.8721877705268 127.40888271484934 218.5354376236554 127.07335268945077 L 218.5354376236554 127.07335268945077 Q 219.19868747678404 126.7378226640522 219.84567360447176 126.38608782889469 L 219.84567360447176 126.38608782889469 Q 220.49265973215944 126.03435299373719 221.12025901811822 125.6633015577682 L 221.12025901811822 125.6633015577682 Q 221.747858304077 125.29225012179919 222.35371376370097 124.89953364136002 L 222.35371376370097 124.89953364136002 Q 222.95956922332493 124.50681716092087 223.54221829258051 124.09097837123022 L 223.54221829258051 124.09097837123022 Q 224.12486736183612 123.67513958153958 224.68372279805476 123.23559336762702 L 224.68372279805476 123.23559336762702 Q 225.24257823427342 122.79604715371447 225.77770082068744 122.3328540785835 L 225.77770082068744 122.3328540785835 Q 226.31282340710146 121.86966100345252 226.82453642044032 121.38314317254014 L 226.82453642044032 121.38314317254014 Q 227.33624943377916 120.89662534162778 227.8247842448734 120.38701328746441 L 227.8247842448734 120.38701328746441 Q 228.3133190559676 119.87740123330104 228.77871604192885 119.34473518670445 L 228.77871604192885 119.34473518670445 Q 229.24411302789008 118.81206914010787 229.6864824267508 118.25645893969738 L 229.6864824267508 118.25645893969738 Q 230.12885182561155 117.70084873928688 230.54889880543928 117.12299699817319 L 230.54889880543928 117.12299699817319 Q 230.968945785267 116.54514525705949 231.36851778488855 115.94689272045053 L 231.36851778488855 115.94689272045053 Q 231.7680897845101 115.34864018384157 232.15050219145095 114.73329022698917 L 232.15050219145095 114.73329022698917 Q 232.5329145983918 114.11794027013676 232.9029350319619 113.49024323836784 L 232.9029350319619 113.49024323836784 Q 233.272955465532 112.8625462065989 234.136477732766 111.73018614677773 L 235 110.59782608695653 L 235 110.59782608695653 L 235.22670067164077 111.82008219094644 Q 235.45340134328154 113.04233829493633 235.16873777655405 113.75508292953756 L 235.16873777655405 113.75508292953756 Q 234.88407420982657 114.46782756413879 234.57829941157593 115.15953745718615 L 234.57829941157593 115.15953745718615 Q 234.2725246133253 115.8512473502335 233.93867982448322 116.51498895555392 L 233.93867982448322 116.51498895555392 Q 233.60483503564114 117.17873056087434 233.23919975391408 117.81079685625497 L 233.23919975391408 117.81079685625497 Q 232.873564472187 118.44286315163559 232.47536049605034 119.04247875512263 L 232.47536049605034 119.04247875512263 Q 232.07715651991367 119.64209435860965 231.64769585459305 120.21056652178656 L 231.64769585459305 120.21056652178656 Q 231.21823518927243 120.77903868496347 230.7598209587123 121.31866218712275 L 230.7598209587123 121.31866218712275 Q 230.3014067281522 121.85828568928204 229.81631836269912 122.37133170196466 L 229.81631836269912 122.37133170196466 Q 229.33122999724603 122.8843777146473 228.82106494553813 123.37243789863402 L 228.82106494553813 123.37243789863402 Q 228.31089989383025 123.86049808262072 227.77641330011173 124.32432484612582 L 227.77641330011173 124.32432484612582 Q 227.2419267063932 124.78815160963092 226.6833323510314 125.2279579584552 L 226.6833323510314 125.2279579584552 Q 226.1247379956696 125.6677643072795 225.54227569942248 126.08378919326515 L 225.54227569942248 126.08378919326515 Q 224.95981340317536 126.49981407925081 224.35433869304785 126.89290992966721 L 224.35433869304785 126.89290992966721 Q 223.7488639829203 127.28600578008363 223.12231422927778 127.65810294583834 L 223.12231422927778 127.65810294583834 Q 222.4957644756352 128.03020011159305 221.85153591048112 128.3846825195011 L 221.85153591048112 128.3846825195011 Q 221.20730734532702 128.73916492740918 220.55069342474602 129.08130685436652 L 220.55069342474602 129.08130685436652 Q 219.894079504165 129.42344878132388 219.23285203207067 129.76099387253421 L 219.23285203207067 129.76099387253421 Q 218.57162455997633 130.09853896374455 217.9165968460438 130.44226135022447 L 217.9165968460438 130.44226135022447 Q 217.26156913211128 130.7859837367044 216.62672877826984 131.14982034065875 L 216.62672877826984 131.14982034065875 Q 215.9918884244284 131.5136569446131 215.39364024591913 131.91395314343941 L 215.39364024591913 131.91395314343941 Q 214.7953920674099 132.31424934226573 214.25071727586175 132.76792482031587 L 214.25071727586175 132.76792482031587 Q 213.70604248431357 133.221600298366 213.22986387786364 133.7435237760709 L 213.22986387786364 133.7435237760709 Q 212.75368527141367 134.2654472537758 212.3561735401832 134.86575250577127 L 212.3561735401832 134.86575250577127 Q 211.95866180895268 135.46605775776675 211.64336465981606 136.14827926768362 L 211.64336465981606 136.14827926768362 Q 211.32806751067943 136.8305007776005 211.0914913542522 137.59115583297893 L 211.0914913542522 137.59115583297893 Q 210.854915197825 138.35181088835736 210.68765986793713 139.1815259607288 L 210.68765986793713 139.1815259607288 Q 210.52040453804926 140.01124103310025 210.40940841586837 140.89697481629096 L 210.40940841586837 140.89697481629096 Q 210.29841229368745 141.78270859948168 210.22955743233746 142.71030764884193 L 210.22955743233746 142.71030764884193 Q 210.16070257098744 143.6379066982022 210.1210614035739 144.59424366182748 L 210.1210614035739 144.59424366182748 Q 210.08142023616034 145.55058062545277 210.06072485330304 146.5247987168283 L 210.06072485330304 146.5247987168283 Q 210.04002947044577 147.4990168082038 210.03132856322202 148.48276681809114 L 210.03132856322202 148.48276681809114 Q 210.0226276559983 149.46651682797844 210.02238013819328 150.4533666128388 L 210.02238013819328 150.4533666128388 Q 210.02213262038825 151.44021639769915 210.03006779572306 152.42456939696456 L 210.03006779572306 152.42456939696456 Q 210.03800297105786 153.40892239622997 210.05696134605546 154.38482489564817 L 210.05696134605546 154.38482489564817 Q 210.07591972105308 155.36072739506636 210.11166977296708 156.3209295025555 L 210.11166977296708 156.3209295025555 Q 210.14741982488107 157.28113161004464 210.20825767193259 158.21671595503852 L 210.20825767193259 158.21671595503852 Q 210.26909551898407 159.15230030003244 210.36499376906517 160.05307673161732 L 210.36499376906517 160.05307673161732 Q 210.46089201914626 160.9538531632022 210.60211566874932 161.80950551129783 L 210.60211566874932 161.80950551129783 Q 210.7433393183524 162.66515785939345 210.9387249473882 163.46685418899946 L 210.9387249473882 163.46685418899946 Q 211.13411057642404 164.26855051860548 211.38945081876525 165.01051169877064 L 211.38945081876525 165.01051169877064 Q 211.64479106110647 165.75247287893578 211.96181265959922 166.43297663263087 L 211.96181265959922 166.43297663263087 Q 212.27883425809196 167.11348038632593 212.65504780839393 167.73500672793836 L 212.65504780839393 167.73500672793836 Q 213.03126135869593 168.3565330695508 213.46060556548298 168.92512126792417 L 213.46060556548298 168.92512126792417 Q 213.88994977227003 169.49370946629756 214.36386839693125 170.0178847495739 L 214.36386839693125 170.0178847495739 Q 214.8377870215925 170.54206003285023 215.346327101465 171.03173930108522 L 215.346327101465 171.03173930108522 Q 215.85486718133748 171.52141856932022 216.38756073234148 171.98703187900793 L 216.38756073234148 171.98703187900793 Q 216.92025428334549 172.45264518869567 217.46677048628572 172.90448592851968 L 217.46677048628572 172.90448592851968 Q 218.013286689226 173.35632666834368 218.56393452580926 173.8040507442118 L 218.56393452580926 173.8040507442118 Q 219.11458236239253 174.25177482007993 219.66066593505602 174.7040466226797 L 219.66066593505602 174.7040466226797 Q 220.2067495077195 175.1563184252795 220.7406603826658 175.62071882161925 L 220.7406603826658 175.62071882161925 Q 221.27457125761205 176.085119217959 221.78951937934426 176.56841366188524 L 221.78951937934426 176.56841366188524 Q 222.30446750107646 177.0517081058115 222.793960430641 177.5603655129483 L 222.793960430641 177.5603655129483 Q 223.28345336020556 178.06902292008508 223.74090546945527 178.609605057608 L 223.74090546945527 178.609605057608 Q 224.198357578705 179.1501871951309 224.61732265979666 179.7291169150577 L 224.61732265979666 179.7291169150577 Q 225.03628774088833 180.30804663498446 225.41160749128264 180.93046355035244 L 225.41160749128264 180.93046355035244 Q 225.78692724167695 181.55288046572045 226.11661679342993 182.2207622529231 L 226.11661679342993 182.2207622529231 Q 226.4463063451829 182.88864404012574 226.73349117661465 183.59887654503976 L 226.73349117661465 183.59887654503976 Q 227.0206760080464 184.30910904995378 227.27465098561387 185.0524310831746 L 227.27465098561387 185.0524310831746 Q 227.52862596318136 185.79575311639542 227.76431298159068 186.55729684805277 L 228 187.31884057971016 L 227.53976263626788 186.78103360516786 Q 227.07952527253576 186.2432266306256 226.61827305307025 185.7064308348032 L 226.61827305307025 185.7064308348032 Q 226.15702083360475 185.16963503898077 225.69326649911443 184.63533229254904 L 225.69326649911443 184.63533229254904 Q 225.22951216462408 184.1010295461173 224.761089425651 183.57137828965938 L 224.761089425651 183.57137828965938 Q 224.29266668667788 183.04172703320143 223.81688492764002 182.51940813369202 L 223.81688492764002 182.51940813369202 Q 223.34110316860216 181.99708923418262 222.85516313668597 181.48489180221503 L 222.85516313668597 181.48489180221503 Q 222.36922310476982 180.97269437024747 221.87072037071647 180.4730141233803 L 221.87072037071647 180.4730141233803 Q 221.37221763666315 179.97333387651312 220.8596270493398 179.48769043996936 L 220.8596270493398 179.48769043996936 Q 220.34703646201646 179.00204700342562 219.82016261946285 178.53063507118736 L 219.82016261946285 178.53063507118736 Q 219.29328877690926 178.0592231389491 218.75366919236754 177.60051076847435 L 218.75366919236754 177.60051076847435 Q 218.2140496078258 177.14179839799962 217.66520843441958 176.69227420483554 L 217.66520843441958 176.69227420483554 Q 217.11636726101335 176.24275001167143 216.5637424395774 175.79699575766742 L 216.5637424395774 175.79699575766742 Q 216.01111761814144 175.3512415036634 215.4615160278256 174.90247497227517 L 215.4615160278256 174.90247497227517 Q 214.9119144375098 174.45370844088694 214.37247573415624 173.99481584459068 L 214.37247573415624 173.99481584459068 Q 213.8330370308027 173.53592324829438 213.30981528199558 173.06087245453372 L 213.30981528199558 173.06087245453372 Q 212.78659353318847 172.58582166077306 212.28293592195027 172.09127761400785 L 212.28293592195027 172.09127761400785 Q 211.77927831071207 171.59673356724264 211.29423105556856 171.0836465933313 L 211.29423105556856 171.0836465933313 Q 210.80918380042505 170.57055961941998 210.3362636131157 170.04538951769564 L 210.3362636131157 170.04538951769564 Q 209.86334342580633 169.52021941597127 209.39015833631714 168.99531326863632 L 209.39015833631714 168.99531326863632 Q 208.91697324682798 168.4704071213014 208.42619327216255 167.9630321950596 L 208.42619327216255 167.9630321950596 Q 207.93541329749712 167.45565726881784 207.40729367586172 166.9854872101183 L 207.40729367586172 166.9854872101183 Q 206.87917405422633 166.51531715141874 206.29522898850598 166.10077285534322 L 206.29522898850598 166.10077285534322 Q 205.71128392278567 165.6862285592677 205.05808483646507 165.3406987156634 L 205.05808483646507 165.3406987156634 Q 204.40488575014444 164.99516887205908 203.67672216392668 164.72437555390687 L 203.67672216392668 164.72437555390687 Q 202.94855857770892 164.45358223575465 202.14807345272945 164.25499652739967 L 202.14807345272945 164.25499652739967 Q 201.34758832774997 164.05641081904471 200.4843259989479 163.9208218727012 L 200.4843259989479 163.9208218727012 Q 199.62106367014582 163.7852329263577 198.70870188447412 163.69977196557176 L 198.70870188447412 163.69977196557176 Q 197.79634009880243 163.6143110047858 196.84978508654115 163.5658434995993 L 196.84978508654115 163.5658434995993 Q 195.90323007427986 163.51737599441282 194.93658105487106 163.49531562938515 L 194.93658105487106 163.49531562938515 Q 193.96993203546228 163.47325526435748 192.99573827238106 163.4713075516731 L 192.99573827238106 163.4713075516731 Q 192.02154450929982 163.46935983898874 191.05111517940674 163.48613052322963 L 191.05111517940674 163.48613052322963 Q 190.08068584951366 163.5029012074705 189.1247645563446 163.54149736498977 L 189.1247645563446 163.54149736498977 Q 188.16884326317555 163.580093522509 187.2378813870598 163.64685003262105 L 187.2378813870598 163.64685003262105 Q 186.30691951094403 163.71360654273312 185.4104914787181 163.81610098579114 L 185.4104914787181 163.81610098579114 Q 184.51406344649217 163.91859542884913 183.65954800522894 164.06333418966778 L 183.65954800522894 164.06333418966778 Q 182.80503256396568 164.20807295048644 181.99628512010355 164.39857162322613 L 181.99628512010355 164.39857162322613 Q 181.18753767624142 164.5890702959658 180.42455417232128 164.82521295821448 L 180.42455417232128 164.82521295821448 Q 179.66157066840117 165.0613556204632 178.94182410573853 165.34059036574996 L 178.94182410573853 165.34059036574996 Q 178.22207754307587 165.6198251110367 177.5433345261502 165.93991749914045 L 177.5433345261502 165.93991749914045 Q 176.86459150922457 166.26000988724417 176.22803220516522 166.62213366868255 L 176.22803220516522 166.62213366868255 Q 175.59147290110587 166.98425745012094 175.00348191698902 167.3947736660917 L 175.00348191698902 167.3947736660917 Q 174.41549093287213 167.80528988206248 173.88695701929015 168.27504775651448 L 173.88695701929015 168.27504775651448 Q 173.3584231057082 168.74480563096645 172.90160180578312 169.28601629214222 L 172.90160180578312 169.28601629214222 Q 172.44478050585806 169.82722695331802 172.06903834558983 170.44922298927432 L 172.06903834558983 170.44922298927432 Q 171.69329618532163 171.07121902523062 171.40161193949876 171.77696841797925 L 171.40161193949876 171.77696841797925 Q 171.1099276936759 172.48271781072788 170.8975765818302 173.26751289856276 L 170.8975765818302 173.26751289856276 Q 170.6852254699845 174.05230798639764 170.54094933472692 174.90493140235475 L 170.54094933472692 174.90493140235475 Q 170.39667319946938 175.7575548183119 170.3055336616291 176.66312230778266 L 170.3055336616291 176.66312230778266 Q 170.21439412378888 177.56868979725343 170.1609808268633 178.51184683836016 L 170.1609808268633 178.51184683836016 Q 170.1075675299377 179.45500387946691 170.07841174085576 180.42233053889615 L 170.07841174085576 180.42233053889615 Q 170.0492559517738 181.38965719832538 170.03389451027198 182.3707282258145 L 170.03389451027198 182.3707282258145 Q 170.01853306877018 183.35179925330362 170.0092665343851 184.3389431049127 L 170 185.32608695652175 L 169.20978132150265 185.53011818693693 Q 168.4195626430053 185.7341494173521 167.61779627369873 185.9229145794628 L 167.61779627369873 185.9229145794628 Q 166.81602990439217 186.11167974157348 165.99427193397673 186.27173752351217 L 165.99427193397673 186.27173752351217 Q 165.1725139635613 186.43179530545086 164.32770877887413 186.55275718899912 L 164.32770877887413 186.55275718899912 Q 163.48290359418695 186.6737190725474 162.6182567674005 186.74858538017094 L 162.6182567674005 186.74858538017094 Q 161.75360994061407 186.8234516877945 160.8778487111967 186.84819552277503 L 160.8778487111967 186.84819552277503 Q 160.0020874817793 186.87293935775557 159.12735329618545 186.84580364563345 L 159.12735329618545 186.84580364563345 Q 158.25261911059155 186.81866793351134 157.39160285326983 186.73967901925542 L 157.39160285326983 186.73967901925542 Q 156.53058659594814 186.6606901049995 155.69368847677617 186.53164301040096 L 155.69368847677617 186.53164301040096 Q 154.8567903576042 186.4025959158024 154.0500067499657 186.22740908146045 L 154.0500067499657 186.22740908146045 Q 153.24322314232714 186.0522222471185 152.46716710207102 185.83732293141392 L 152.46716710207102 185.83732293141392 Q 151.6911110618149 185.62242361570935 150.94118726749196 185.37682864852064 L 150.94118726749196 185.37682864852064 Q 150.19126347316904 185.1312336813319 149.45870778910296 184.8661732152297 L 149.45870778910296 184.8661732152297 Q 148.72615210503687 184.60111274912754 147.9995302435089 184.3292420904527 L 147.9995302435089 184.3292420904527 Q 147.2729083819809 184.05737143177788 146.53974755944495 183.79170801973683 L 146.53974755944495 183.79170801973683 Q 145.80658673690897 183.52604460769578 145.0549726770817 183.27876549916112 L 145.0549726770817 183.27876549916112 Q 144.30335861725447 183.03148639062647 143.52342476284844 182.81272331094567 L 143.52342476284844 182.81272331094567 Q 142.74349090844237 182.59396023126487 141.92869919241787 182.41079430480033 L 141.92869919241787 182.41079430480033 Q 141.11390747639336 182.2276283783358 140.26193661900848 182.08356316902518 L 140.26193661900848 182.08356316902518 Q 139.4099657616236 181.93949795971457 138.52300433038533 181.8346579627963 L 138.52300433038533 181.8346579627963 Q 137.63604289914707 181.72981796587806 136.72038985330718 181.66191217289835 L 136.72038985330718 181.66191217289835 Q 135.8047368074673 181.59400637991865 134.869788172048 181.55977993966232 L 134.869788172048 181.55977993966232 Q 133.93483953662871 181.525553499406 132.99167768221298 181.52220121452234 L 132.99167768221298 181.52220121452234 Q 132.04851582779727 181.5188489296387 131.10836102367682 181.54485349223287 L 131.10836102367682 181.54485349223287 Q 130.1682062195564 181.57085805482706 129.24097682302641 181.62598920399049 L 129.24097682302641 181.62598920399049 Q 128.31374742649643 181.68112035315391 127.40697165854347 181.76576177685874 L 127.40697165854347 181.76576177685874 Q 126.5001958905905 181.85040320056356 125.61851849939407 181.96471978875059 L 125.61851849939407 181.96471978875059 Q 124.73684110819762 182.07903637693764 123.88228041437569 182.22253603078434 L 123.88228041437569 182.22253603078434 Q 123.02771972055373 182.36603568463102 122.20058623885942 182.53777068356695 L 122.20058623885942 182.53777068356695 Q 121.3734527571651 182.70950568250288 120.57352051745147 182.90868590910878 L 120.57352051745147 182.90868590910878 Q 119.77358827773783 183.1078661357147 119.00093404581244 183.33434135839474 L 119.00093404581244 183.33434135839474 Q 118.22827981388707 183.56081658107482 117.48335731437002 183.81495792733114 L 117.48335731437002 183.81495792733114 Q 116.73843481485298 184.06909927358743 116.02138755152757 184.3510241355453 L 116.02138755152757 184.3510241355453 Q 115.30434028820216 184.63294899750312 114.61399969288952 184.9414859251773 L 114.61399969288952 184.9414859251773 Q 113.92365909757689 185.25002285285143 113.25682458346273 185.58198113041072 L 113.25682458346273 185.58198113041072 Q 112.58999006934859 185.91393940797005 111.94137118585675 186.2640473923603 L 111.94137118585675 186.2640473923603 Q 111.29275230236493 186.61415537675057 110.65557466752195 186.9756631667429 L 110.65557466752195 186.9756631667429 Q 110.01839703267896 187.33717095673518 109.38541804484713 187.70286218250493 L 109.38541804484713 187.70286218250493 Q 108.7524390570153 188.06855340827465 108.11710371807382 188.43189682055322 L 108.11710371807382 188.43189682055322 Q 107.48176837913235 188.79524023283182 106.83934461335332 189.15152090098644 L 106.83934461335332 189.15152090098644 Q 106.19692084757428 189.50780156914104 105.54549971250395 189.85511746716878 L 105.54549971250395 189.85511746716878 Q 104.89407857743365 190.20243336519655 104.23524882187812 190.54236748556696 L 104.23524882187812 190.54236748556696 Q 103.5764190663226 190.88230160593736 102.91533845044874 191.21999302128046 L 102.91533845044874 191.21999302128046 Q 102.25425783457489 191.55768443662353 101.5988919852305 191.90106991282022 L 101.5988919852305 191.90106991282022 Q 100.94352613588612 192.24445538901693 100.30304348713625 192.60267014116835 L 100.30304348713625 192.60267014116835 Q 99.66256083838638 192.96088489331976 99.04516279999706 193.34210061593907 L 99.04516279999706 193.34210061593907 Q 98.42776476160772 193.7233163385584 97.83846158579524 194.13252513077424 L 97.83846158579524 194.13252513077424 Q 97.24915840998275 194.54173392299006 96.68809125889884 194.979076435497 L 96.68809125889884 194.979076435497 Q 96.12702410781492 195.41641894800398 95.58885625135153 195.8765777866727 L 95.58885625135153 195.8765777866727 Q 95.05068839488813 196.33673662534142 94.52534419744407 196.8096726604968 L 94 197.28260869565216 L 93.49999997019768 197.56553192244604 Q 92.99999994039536 197.84845514923992 92.49999997019768 198.1004316727301 L 92.49999997019768 198.1004316727301 Q 92 198.35240819622032 91.50000002980232 198.55041748695263 L 91.50000002980232 198.55041748695263 Q 91.00000005960464 198.74842677768493 90.50000002980232 198.88354284661926 L 90.50000002980232 198.88354284661926 Q 90 199.0186589155536 89.49999997019768 199.09880799592813 L 89.49999997019768 199.09880799592813 Q 88.99999994039536 199.17895707630265 88.49999997019768 199.2271596975716 L 88 199.27536231884056 L 88.46893387063689 198.74622034212007 Q 88.93786774127378 198.21707836539957 89.4113491074223 197.6924674077577 L 89.4113491074223 197.6924674077577 Q 89.88483047357082 197.16785645011583 90.36800898256934 196.6529075007484 L 90.36800898256934 196.6529075007484 Q 90.85118749156784 196.13795855138096 91.34993231540153 195.63851951715728 L 91.34993231540153 195.63851951715728 Q 91.84867713923524 195.1390804829336 92.36900083440122 194.6611421357258 L 92.36900083440122 194.6611421357258 Q 92.8893245295672 194.183203788518 93.43627401383416 193.73179476016082 L 93.43627401383416 193.73179476016082 Q 93.98322349810113 193.28038573180365 94.55964173870468 192.85833868892678 L 94.55964173870468 192.85833868892678 Q 95.13605997930824 192.43629164604988 95.7416387530428 192.04329948219845 L 95.7416387530428 192.04329948219845 Q 96.34721752677737 191.65030731834702 96.97810729749487 191.28253444496772 L 96.97810729749487 191.28253444496772 Q 97.60899706821237 190.9147615715884 98.25803354351508 190.56506965386467 L 98.25803354351508 190.56506965386467 Q 98.90707001881779 190.2153777361409 99.56449700386428 189.87404592776332 L 99.56449700386428 189.87404592776332 Q 100.22192398891076 189.53271411938573 100.8763618474023 189.18840401462185 L 100.8763618474023 189.18840401462185 Q 101.53079970589383 188.84409390985797 102.17015319198023 188.4847540862122 L 102.17015319198023 188.4847540862122 Q 102.80950667806664 188.1254142625664 103.42157984371713 187.73889296022543 L 103.42157984371713 187.73889296022543 Q 104.03365300936761 187.35237165788442 104.6064632648922 186.92672970233826 L 104.6064632648922 186.92672970233826 Q 105.17927352041679 186.5010877467921 105.70133107744897 186.02487697934228 L 105.70133107744897 186.02487697934228 Q 106.22338863448114 185.54866621189245 106.68432626375326 185.0115569656962 L 106.68432626375326 185.0115569656962 Q 107.14526389302537 184.47444771949995 107.53701283649087 183.86840047114129 L 107.53701283649087 183.86840047114129 Q 107.92876177995637 183.26235322278265 108.24704115199151 182.58310259709305 L 108.24704115199151 182.58310259709305 Q 108.56532052402665 181.9038519714034 108.81082650997715 181.15209163131786 L 108.81082650997715 181.15209163131786 Q 109.05633249592765 180.4003312912323 109.23497786115269 179.58195257904708 L 109.23497786115269 179.58195257904708 Q 109.41362322637772 178.7635738668619 109.53555230063853 177.88868435752065 L 109.53555230063853 177.88868435752065 Q 109.65748137489933 177.0137948481794 109.73514278778087 176.09479806754433 L 109.73514278778087 176.09479806754433 Q 109.81280420066241 175.17580128690926 109.85875776144994 174.22521153782438 L 109.85875776144994 174.22521153782438 Q 109.90471132223747 173.2746217887395 109.92986754767045 172.30331005833432 L 109.92986754767045 172.30331005833432 Q 109.95502377310342 171.3319983279291 109.96771383349588 170.34826561175615 L 109.96771383349588 170.34826561175615 Q 109.98040389388832 169.36453289558318 109.98627952953746 168.37401053023459 L 109.98627952953746 168.37401053023459 Q 109.9921551651866 167.383488164886 109.99464166669125 166.3895894553823 L 109.99464166669125 166.3895894553823 Q 109.9971281681959 165.3956907458786 109.9980843742437 164.40026988210775 L 109.9980843742437 164.40026988210775 Q 109.9990405802915 163.4048490183369 109.9993672878944 162.40881237464856 L 109.9993672878944 162.40881237464856 Q 109.9996939954973 161.41277573096022 109.99976939655082 160.41653283645556 L 109.99976939655082 160.41653283645556 Q 109.99984479760434 159.4202899419509 109.99976914105113 158.42404722726434 L 109.99976914105113 158.42404722726434 Q 109.99969348449793 157.42780451257778 109.99936569247308 156.43176893863733 L 109.99936569247308 156.43176893863733 Q 109.99903790044823 155.43573336469686 109.99807707610381 154.44031710123454 L 109.99807707610381 154.44031710123454 Q 109.9971162517594 153.44490083777225 109.99461247118617 152.45101934461735 L 109.99461247118617 152.45101934461735 Q 109.99210869061295 151.45713785146242 109.98617601797338 150.46667231644085 L 109.98617601797338 150.46667231644085 Q 109.98024334533382 149.47620678141925 109.96738604686323 148.49264069738902 L 109.96738604686323 148.49264069738902 Q 109.95452874839265 147.5090746133588 109.92893461648458 146.53819920281103 L 109.92893461648458 146.53819920281103 Q 109.90334048457653 145.56732379226327 109.8563587955397 144.61775844632533 L 109.8563587955397 144.61775844632533 Q 109.8093771065029 143.66819310038738 109.7295452006013 142.75135894866722 L 109.7295452006013 142.75135894866722 Q 109.6497132946997 141.83452479694705 109.52365742726828 140.96374712862726 L 109.52365742726828 140.96374712862726 Q 109.39760155983686 140.09296946030747 109.2118878075323 139.28163352510367 L 109.2118878075323 139.28163352510367 Q 109.02617405522776 138.47029758989987 108.76977748812641 137.7293883723378 L 108.76977748812641 137.7293883723378 Q 108.51338092102506 136.98847915477575 108.18006620800725 136.32420939419566 L 108.18006620800725 136.32420939419566 Q 107.84675149498943 135.65993963361558 107.43654927608898 135.07227880099828 L 107.43654927608898 135.07227880099828 Q 107.02634705718853 134.484617968381 106.5455857844851 133.96726054082103 L 106.5455857844851 133.96726054082103 Q 106.06482451178167 133.44990311326103 105.52473237964674 132.99166157825053 L 105.52473237964674 132.99166157825053 Q 104.98464024751182 132.53342004324003 104.39908251231844 132.12047938084214 L 104.39908251231844 132.12047938084214 Q 103.81352477712507 131.70753871844423 103.19670171943287 131.3257500983912 L 103.19670171943287 131.3257500983912 Q 102.57987866174065 130.94396147833817 101.9446699735765 130.5804918741539 L 101.9446699735765 130.5804918741539 Q 101.30946128541234 130.21702226996962 100.6666860097232 129.86109183813815 L 100.6666860097232 129.86109183813815 Q 100.02391073403405 129.50516140630668 99.38233193644989 129.14803883143583 L 99.38233193644989 129.14803883143583 Q 98.74075313886573 128.79091625656497 98.10741511734864 128.42558276351133 L 98.10741511734864 128.42558276351133 Q 97.47407709583156 128.0602492704577 96.85459572387649 127.68110933309408 L 96.85459572387649 127.68110933309408 Q 96.23511435192141 127.30196939573048 95.63376643433466 126.90476170492019 L 95.63376643433466 126.90476170492019 Q 95.0324185167479 126.50755401410989 94.45212671346339 126.08936649926656 L 94.45212671346339 126.08936649926656 Q 93.87183491017888 125.67117898442322 93.31426868306252 125.23034823245581 L 93.31426868306252 125.23034823245581 Q 92.75670245594618 124.7895174804884 92.22265376870257 124.32525439712605 L 92.22265376870257 124.32525439712605 Q 91.68860508145897 123.86099131376369 91.17860726782905 123.37276449763408 L 91.17860726782905 123.37276449763408 Q 90.66860945419913 122.88453768150448 90.18357812573265 122.37143483849101 L 90.18357812573265 122.37143483849101 Q 89.69854679726618 121.85833199547753 89.24014984571717 121.31869127691223 L 89.24014984571717 121.31869127691223 Q 88.78175289416816 120.77905055834692 88.3522968465143 120.21057379423392 L 88.3522968465143 120.21057379423392 Q 87.92284079886045 119.64209703012092 87.52463790175372 119.04248035151349 L 87.52463790175372 119.04248035151349 Q 87.12643500464698 118.44286367290607 86.76079994090574 117.81079716032941 L 86.76079994090574 117.81079716032941 Q 86.39516487716449 117.17873064775276 86.06132012583629 116.51498900505442 L 86.06132012583629 116.51498900505442 Q 85.72747537450809 115.85124736235608 85.42170058164947 115.1595374639362 L 85.42170058164947 115.1595374639362 Q 85.11592578879088 114.46782756551634 84.83126222269338 113.75508293028739 L 84.83126222269338 113.75508293028739 Q 84.54659865659589 113.04233829505844 84.77329932829795 111.82008219100749 Z'),
				_Utils_Tuple2(12, 'M 0 155.43478260869566 L 1.999999999991644 155.43478260870398 L 3.9999999998687414 155.43478260882642 L 5.999999998486167 155.434782610204 L 7.999999986319516 155.43478262232657 L 9.999999899125179 155.43478270920497 L 10.999999637542167 155.43478296984023 Q 11.999999375959156 155.43478323047546 12.999998035346223 155.4347845662311 L 12.999998035346223 155.4347845662311 Q 13.99999669473329 155.43478590198674 14.99999073645359 155.43479183867848 L 14.99999073645359 155.43479183867848 Q 15.99998477817389 155.4347977753702 16.999961540883056 155.43482092846796 L 16.999961540883056 155.43482092846796 Q 17.999938303592224 155.4348440815657 18.9998580293148 155.4349240649943 L 18.9998580293148 155.4349240649943 Q 19.99977775503738 155.4350040484229 20.999530242681992 155.4352506639944 L 20.999530242681992 155.4352506639944 Q 21.999282730326605 155.43549727956588 22.998597311496304 155.43618021499464 L 22.998597311496304 155.43618021499464 Q 23.997911892666004 155.4368631504234 24.99619834559025 155.43857048899525 L 24.99619834559025 155.43857048899525 Q 25.9944847985145 155.4402778275671 26.990600758476127 155.44414779499664 L 26.990600758476127 155.44414779499664 Q 27.986716718437755 155.44801776242616 28.978705885858613 155.4559995702496 L 28.978705885858613 155.4559995702496 Q 29.97069505327947 155.46398137807302 30.95561583901285 155.47900595750534 L 30.95561583901285 155.47900595750534 Q 31.94053662474623 155.49403053693766 32.914566866842605 155.51990620151554 L 32.914566866842605 155.51990620151554 Q 33.888597108938974 155.54578186609342 34.847592228038344 155.586638178585 L 34.847592228038344 155.586638178585 Q 35.806587347137715 155.62749449107656 36.747130269828034 155.6867361441931 L 36.747130269828034 155.6867361441931 Q 37.68767319251836 155.74597779730962 38.60839708938252 155.82496666818773 L 38.60839708938252 155.82496666818773 Q 39.52912098624668 155.90395553906583 40.431827586323934 156.00089642667 L 40.431827586323934 156.00089642667 Q 41.33453418640118 156.09783731427422 42.22455033765129 156.2074226708185 L 42.22455033765129 156.2074226708185 Q 43.114566488901396 156.31700802736276 43.99999994189544 156.4311594781839 L 43.99999994189544 156.4311594781839 Q 44.88543339488949 156.54531092900504 45.775449284556586 156.65489654618457 L 45.775449284556586 156.65489654618457 Q 46.66546517422368 156.7644821633641 47.56817039009066 156.8614244301633 L 47.56817039009066 156.8614244301633 Q 48.47087560595764 156.9583666969625 49.391593276871916 157.0373617712327 L 49.391593276871916 157.0373617712327 Q 50.3123109477862 157.11635684550288 51.25282924822669 157.17562303165818 L 51.25282924822669 157.17562303165818 Q 52.193347548667184 157.2348892178135 53.1522561668478 157.2758317178147 L 53.1522561668478 157.2758317178147 Q 54.111164785028414 157.31677421781592 55.08492288711969 157.34292103638438 L 55.08492288711969 157.34292103638438 Q 56.058680989210956 157.36906785495285 57.042829817623826 157.3848615947589 L 57.042829817623826 157.3848615947589 Q 58.02697864603669 157.4006553345649 59.01698190776084 157.41061585277453 L 59.01698190776084 157.41061585277453 Q 60.006985169484985 157.42057637098415 60.99844404766176 157.42908654671382 L 60.99844404766176 157.42908654671382 Q 61.989902925838535 157.4375967224435 62.97818798524487 157.4492692176002 L 62.97818798524487 157.4492692176002 Q 63.96647304465121 157.46094171275695 64.94603383208118 157.48130687020898 L 64.94603383208118 157.48130687020898 Q 65.92559461951114 157.50167202766102 66.88931783363438 157.5378173759078 L 66.88931783363438 157.5378173759078 Q 67.85304104775761 157.57396272415457 68.7920301994981 157.63475251861604 L 68.7920301994981 157.63475251861604 Q 69.73101935123859 157.6955423130775 70.63505431605165 157.7911596488616 L 70.63505431605165 157.7911596488616 Q 71.53908928086473 157.88677698464565 72.39779013968374 158.02756417241656 L 72.39779013968374 158.02756417241656 Q 73.25649099850276 158.16835136018747 74.06091077144599 158.36322296323317 L 74.06091077144599 158.36322296323317 Q 74.86533054438922 158.55809456627884 75.60946532099345 158.81303274176375 L 75.60946532099345 158.81303274176375 Q 76.35360009759768 159.06797091724866 77.03527788063283 159.3851397928477 L 77.03527788063283 159.3851397928477 Q 77.716955663668 159.70230866844673 78.33779830421196 160.08009226935403 L 78.33779830421196 160.08009226935403 Q 78.95864094475593 160.45787587026132 79.52317803710162 160.89176101375747 L 79.52317803710162 160.89176101375747 Q 80.08771512944729 161.32564615725363 80.60204754777047 161.80955407377945 L 80.60204754777047 161.80955407377945 Q 81.11637996609366 162.29346199030525 81.58686637237702 162.82105705650844 L 81.58686637237702 162.82105705650844 Q 82.05735277866037 163.3486521227116 82.48961706441517 163.9143308234994 L 82.48961706441517 163.9143308234994 Q 82.92188135016997 164.4800095242872 83.32017614450439 165.07953463862788 L 83.32017614450439 165.07953463862788 Q 83.7184709388388 165.67905975296858 84.08528456654642 166.30995197173814 L 84.08528456654642 166.30995197173814 Q 84.45209819425405 166.94084419050773 84.78794263906417 167.6025933849904 L 84.78794263906417 167.6025933849904 Q 85.1237870838743 168.26434257947307 85.4272595942379 168.9583464187847 L 85.4272595942379 168.9583464187847 Q 85.73073210460149 169.65235025809636 85.99902153530633 170.38140970214045 L 85.99902153530633 170.38140970214045 Q 86.26731096601118 171.11046914618453 86.4972063441941 171.8777835338646 L 86.4972063441941 171.8777835338646 Q 86.72710172237703 172.64509792154465 86.91630243790425 173.4529595274505 L 86.91630243790425 173.4529595274505 Q 87.10550315343147 174.26082113335633 87.25380417377355 175.10943424714594 L 87.25380417377355 175.10943424714594 Q 87.40210519411562 175.95804736093552 87.51200839915262 176.84491916751097 L 87.51200839915262 176.84491916751097 Q 87.62191160418962 177.73179097408644 87.69843384511724 178.65192279924915 L 87.69843384511724 178.65192279924915 Q 87.77495608604485 179.57205462441186 87.8247437629323 180.51882414925228 L 87.8247437629323 180.51882414925228 Q 87.87453143981975 181.46559367409267 87.90465737845848 182.43195369899973 L 87.90465737845848 182.43195369899973 Q 87.93478331709721 183.3983137239068 87.95166257942397 184.3778724299218 L 87.95166257942397 184.3778724299218 Q 87.96854184175072 185.3574311359368 87.97726271547947 186.34511867117084 L 87.97726271547947 186.34511867117084 Q 87.98598358920822 187.33280620640488 87.9901213683051 188.32506023085546 L 87.9901213683051 188.32506023085546 Q 87.99425914740198 189.31731425530603 87.99605435974806 190.31190235894672 L 87.99605435974806 190.31190235894672 Q 87.99784957209414 191.3064904625874 87.99855853960185 192.30216087539674 L 87.99855853960185 192.30216087539674 Q 87.99926750710955 193.29783128820605 87.99952128431158 194.29395524208087 L 87.99952128431158 194.29395524208087 Q 87.9997750615136 195.29007919595566 87.99985802924917 196.28637334042202 L 87.99985802924917 196.28637334042202 Q 87.99994099698475 197.2826674848884 87.99997049849237 198.27901490186449 L 88 199.27536231884056 L 87.77544965468157 200.048002373324 Q 87.55089930936313 200.82064242780746 87.34362206753073 201.61049300206867 L 87.34362206753073 201.61049300206867 Q 87.13634482569833 202.40034357632985 86.95977532339666 203.22079063019592 L 86.95977532339666 203.22079063019592 Q 86.78320582109498 204.041237684062 86.6444726407151 204.899383971727 L 86.6444726407151 204.899383971727 Q 86.5057394603352 205.75753025939196 86.40527750212908 206.65380910538224 L 86.40527750212908 206.65380910538224 Q 86.30481554392296 207.55008795137252 86.23784090511887 208.47973278589743 L 86.23784090511887 208.47973278589743 Q 86.17086626631479 209.40937762042233 86.12981729414454 210.36485418800635 L 86.12981729414454 210.36485418800635 Q 86.0887683219743 211.32033075559033 86.06567827512853 212.2937011799288 L 86.06567827512853 212.2937011799288 Q 86.04258822828277 213.26707160426724 86.03069335566525 214.25159664060848 L 86.03069335566525 214.25159664060848 Q 86.01879848304775 215.23612167694972 86.01320089593362 216.22692118254253 L 86.01320089593362 216.22692118254253 Q 86.0076033088195 217.21772068813536 86.00520434291344 218.21170722572896 L 86.00520434291344 218.21170722572896 Q 86.00280537700739 219.20569376332259 86.0018724458217 220.20114102391656 L 86.0018724458217 220.20114102391656 Q 86.00093951463602 221.19658828451054 86.00061172800321 222.19263849710467 L 86.00061172800321 222.19263849710467 Q 86.0002839413704 223.18868870969877 86.00018042980214 224.18496238476664 L 86.00018042980214 224.18496238476664 Q 86.00007691823389 225.1812360598345 86.00004772266335 226.1775837816392 L 86.00004772266335 226.1775837816392 Q 86.00001852709282 227.17393150344395 86.00001122820018 228.17030104259078 L 86.00001122820018 228.17030104259078 Q 86.00000392930755 229.1666705817376 86.00000232711162 230.1630457969409 L 86.00000232711162 230.1630457969409 Q 86.00000072491567 231.1594210121442 86.00000041973549 232.15579751966396 L 86.00000041973549 232.15579751966396 Q 86.0000001145553 233.15217402718372 86.00000006487481 234.14855078927744 L 86.00000001519432 235.14492755137115 L 86.00000000164509 237.1376811610594 L 86.00000000013962 239.13043478274778 L 86.00000000000871 241.12318840580576 L 86.00000000000036 243.11594202898584 L 86 245.10869565217394 L 86 247.1014492753623 L 86 249.09420289855072 L 86 251.08695652173913 L 86 253.07971014492753 L 86 255.07246376811594 L 86 257.0652173913044 L 86 259.05797101449275 L 86 261.0507246376811 L 86 263.0434782608695 L 86 265.036231884058 L 86 267.0289855072464 L 86 269.02173913043475 L 86 271.01449275362313 L 86 273.0072463768116 L 86 275 L 84 275 L 82 275 L 80 275 L 78 275 L 76 275 L 74 275 L 72 275 L 70 275 L 68 275 L 66 275 L 64 275 L 62 275 L 60 275 L 58 275 L 56 275 L 54 275 L 52 275 L 50 275 L 48 275 L 46 275 L 44 275 L 42 275 L 40 275 L 38 275 L 36 275 L 34 275 L 32 275 L 30 275 L 28 275 L 26 275 L 24 275 L 22 275 L 20 275 L 18 275 L 16 275 L 14 275 L 12 275 L 10 275 L 8 275 L 6 275 L 4 275 L 2 275 L 0 275 L 0 273.00724637681157 L 0 271.0144927536232 L 0 269.02173913043475 L 0 267.0289855072464 L 0 265.03623188405794 L 0 263.04347826086956 L 0 261.0507246376811 L 0 259.05797101449275 L 0 257.0652173913043 L 0 255.07246376811594 L 0 253.07971014492753 L 0 251.08695652173913 L 0 249.09420289855072 L 0 247.1014492753623 L 0 245.1086956521739 L 0 243.1159420289855 L 0 241.1231884057971 L 0 239.1304347826087 L 0 237.13768115942028 L 0 235.14492753623188 L 0 233.15217391304347 L 0 231.15942028985506 L 0 229.16666666666666 L 0 227.17391304347825 L 0 225.18115942028984 L 0 223.18840579710144 L 0 221.19565217391303 L 0 219.20289855072463 L 0 217.21014492753622 L 0 215.2173913043478 L 0 213.2246376811594 L 0 211.231884057971 L 0 209.2391304347826 L 0 207.2463768115942 L 0 205.25362318840578 L 0 203.26086956521738 L 0 201.26811594202897 L 0 199.27536231884056 L 0 197.28260869565216 L 0 195.28985507246375 L 0 193.29710144927535 L 0 191.30434782608694 L 0 189.31159420289856 L 0 187.31884057971016 L 0 185.32608695652175 L 0 183.33333333333334 L 0 181.34057971014494 L 0 179.34782608695653 L 0 177.35507246376812 L 0 175.36231884057972 L 0 173.3695652173913 L 0 171.3768115942029 L 0 169.3840579710145 L 0 167.3913043478261 L 0 165.3985507246377 L 0 163.40579710144928 L 0 161.41304347826087 L 0 159.42028985507247 L 0 157.42753623188406 Z'),
				_Utils_Tuple2(13, 'M 274.0004717295733 156.43162944069806 Q 274.88565636780413 156.31723007661648 275.7755919886473 156.2075644814421 L 275.7755919886473 156.2075644814421 Q 276.6655276094905 156.0978988862677 277.5682109293136 156.00093480275808 L 277.5682109293136 156.00093480275808 Q 278.4708942491367 155.9039707192485 279.39161218169545 155.82497590567476 L 279.39161218169545 155.82497590567476 Q 280.31233011425417 155.74598109210106 281.2528716956441 155.68673810254393 L 281.2528716956441 155.68673810254393 Q 282.1934132770341 155.62749511298682 283.1524081344892 155.58663853979894 L 283.1524081344892 155.58663853979894 Q 284.1114029919442 155.54578196661106 285.0854331904394 155.51990625858997 L 285.0854331904394 155.51990625858997 Q 286.0594633889346 155.4940305505689 287.0443841685845 155.47900596507515 L 287.0443841685845 155.47900596507515 Q 288.02930494823437 155.46398137958136 289.0212941149639 155.45599957106916 L 289.0212941149639 155.45599957106916 Q 290.0132832816935 155.44801776255696 291.00939924159366 155.4441477950662 L 291.00939924159366 155.4441477950662 Q 292.00551520149384 155.44027782757541 293.0038016544141 155.43857048899957 L 293.0038016544141 155.43857048899957 Q 294.0020881073343 155.43686315042373 295.00140268850384 155.4361802149948 L 295.00140268850384 155.4361802149948 Q 296.0007172696734 155.4354972795659 297.000469757318 155.4352506639944 L 297.000469757318 155.4352506639944 Q 298.00022224496263 155.4350040484229 299.0001419706852 155.4349240649943 L 299.0001419706852 155.4349240649943 Q 300.0000616964078 155.4348440815657 301.0000384591169 155.43482092846796 L 301.0000384591169 155.43482092846796 Q 302.0000152218261 155.4347977753702 303.0000092635464 155.43479183867848 L 303.0000092635464 155.43479183867848 Q 304.0000033052667 155.43478590198674 305.00000196465373 155.4347845662311 L 305.00000196465373 155.4347845662311 Q 306.0000006240408 155.43478323047546 307.0000003624578 155.43478296984023 L 308.0000001008748 155.43478270920497 L 310.0000000136805 155.43478262232657 L 312.00000000151385 155.434782610204 L 314.0000000001313 155.43478260882642 L 316.00000000000836 155.43478260870398 L 318.00000000000034 155.434782608696 L 320 155.43478260869568 L 322 155.43478260869566 L 324 155.43478260869566 L 326 155.43478260869566 L 328 155.43478260869566 L 330 155.43478260869566 L 332 155.43478260869566 L 334 155.43478260869566 L 336 155.43478260869566 L 338 155.43478260869566 L 340 155.43478260869566 L 340 157.42753623188406 L 340 159.42028985507247 L 340 161.41304347826087 L 340 163.40579710144928 L 340 165.3985507246377 L 340 167.3913043478261 L 340 169.3840579710145 L 340 171.3768115942029 L 340 173.3695652173913 L 340 175.36231884057972 L 340 177.35507246376812 L 340 179.34782608695653 L 340 181.34057971014494 L 340 183.33333333333334 L 340 185.32608695652175 L 340 187.31884057971016 L 340 189.31159420289856 L 340 191.30434782608694 L 340 193.29710144927535 L 340 195.28985507246375 L 340 197.28260869565216 L 340 199.27536231884056 L 340 201.26811594202897 L 340 203.26086956521738 L 340 205.25362318840578 L 340 207.2463768115942 L 340 209.2391304347826 L 340 211.231884057971 L 340 213.2246376811594 L 340 215.2173913043478 L 340 217.21014492753622 L 340 219.20289855072463 L 340 221.19565217391303 L 340 223.18840579710144 L 340 225.18115942028984 L 340 227.17391304347825 L 340 229.16666666666666 L 340 231.15942028985506 L 340 233.15217391304347 L 340 235.14492753623188 L 340 237.13768115942028 L 340 239.1304347826087 L 340 241.1231884057971 L 340 243.1159420289855 L 340 245.1086956521739 L 340 247.1014492753623 L 340 249.09420289855072 L 340 251.08695652173913 L 340 253.07971014492753 L 340 255.07246376811594 L 340 257.0652173913043 L 340 259.05797101449275 L 340 261.0507246376811 L 340 263.04347826086956 L 340 265.03623188405794 L 340 267.0289855072464 L 340 269.02173913043475 L 340 271.0144927536232 L 340 273.00724637681157 L 340 275 L 338 275 L 336 275 L 334 275 L 332 275 L 330 275 L 328 275 L 326 275 L 324 275 L 322 275 L 320 275 L 318 275 L 316 275 L 314 275 L 312 275 L 310 275 L 308 275 L 306 275 L 304 275 L 302 275 L 300 275 L 298 275 L 296 275 L 295.998955946333 274.00466345926964 Q 295.997911892666 273.0093269185393 295.99583971075356 272.015014780952 L 295.99583971075356 272.015014780952 Q 295.9937675288411 271.0207026433648 295.9890869474911 270.0289894544925 L 295.9890869474911 270.0289894544925 Q 295.9844063661411 269.0372762656202 295.9744036259269 268.05086595242784 L 295.9744036259269 268.05086595242784 Q 295.9644008857128 267.06445563923546 295.94466432738716 266.0877438766976 L 295.94466432738716 266.0877438766976 Q 295.9249277690616 265.1110321141596 295.88896122922733 264.15049152884956 L 295.88896122922733 264.15049152884956 Q 295.8529946893931 263.1899509435395 295.7922545908374 262.25409415768013 L 295.7922545908374 262.25409415768013 Q 295.7315144922817 261.31823737182077 295.6360911373548 260.4169381783603 L 295.6360911373548 260.4169381783603 Q 295.54066778242793 259.51563898489974 295.40065162979107 258.6587710210415 L 295.40065162979107 258.6587710210415 Q 295.2606354771542 257.8019030571833 295.06791876665443 256.99754470713776 L 295.06791876665443 256.99754470713776 Q 294.8752020561547 256.19318635709226 294.62520228021987 255.44590352514325 L 294.62520228021987 255.44590352514325 Q 294.375202504285 254.69862069319427 294.0679203755552 254.00841266928376 L 294.0679203755552 254.00841266928376 Q 293.76063824682535 253.31820464537327 293.40065928347036 252.68050252552771 L 293.40065928347036 252.68050252552771 Q 293.04068032011537 252.04280040568216 292.63612228915906 251.44951583507702 L 292.63612228915906 251.44951583507702 Q 292.23156425820275 250.85623126447186 291.7923673078475 250.29746010993455 L 291.7923673078475 250.29746010993455 Q 291.3531703574922 249.7386889553972 290.889327105605 249.2044748041979 L 290.889327105605 249.2044748041979 Q 290.42548385371776 248.67026065299856 289.945737213344 248.15189226931304 L 289.945737213344 248.15189226931304 Q 289.4659905729702 247.6335238856275 288.9772627659827 247.12410412809697 L 288.9772627659827 247.12410412809697 Q 288.48853495899516 246.6146843705664 287.99604705401117 246.10901108748885 L 287.99604705401117 246.10901108748885 Q 287.5035591490272 245.60333780441132 287.011386292902 245.09735061395634 L 287.011386292902 245.09735061395634 Q 286.5192134367768 244.59136342350138 286.03094265692545 244.0814882947301 L 286.03094265692545 244.0814882947301 Q 285.5426718770741 243.5716131659588 285.06186400809975 243.05430216584267 L 285.06186400809975 243.05430216584267 Q 284.5810561391254 242.5369911657265 284.1113199773937 242.00864857324905 L 284.1113199773937 242.00864857324905 Q 283.64158381566205 241.48030598077156 283.18622090574104 240.93764221348272 L 283.18622090574104 240.93764221348272 Q 282.73085799582003 240.39497844619387 282.2922065333182 239.83566378020836 L 282.2922065333182 239.83566378020836 Q 281.8535550708164 239.27634911422285 281.4323075924086 238.69969352205666 L 281.4323075924086 238.69969352205666 Q 281.0110601140009 238.12303792989047 280.6058877192234 237.53036549715063 L 280.6058877192234 237.53036549715063 Q 280.2007153244459 236.93769306441078 279.8084503873188 236.3321599401715 L 279.8084503873188 236.3321599401715 Q 279.41618545019173 235.7266268159322 279.0326020558828 235.11244360374 L 279.0326020558828 235.11244360374 Q 278.6490186615739 234.49826039154777 278.2699865738238 233.8795423630379 L 278.2699865738238 233.8795423630379 Q 277.8909544860737 233.26082433452802 277.5135535560525 232.64048105828107 L 277.5135535560525 232.64048105828107 Q 277.1361526260313 232.02013778203408 276.7593246325514 231.39922364510284 L 276.7593246325514 231.39922364510284 Q 276.38249663907146 230.77830950817156 276.0070005876381 230.15606825507078 L 276.0070005876381 230.15606825507078 Q 275.6315045362047 229.53382700197 275.25924232076636 228.90836362967121 L 275.25924232076636 228.90836362967121 Q 274.88698010532806 228.2829002573724 274.5200182518713 227.6521557273021 L 274.5200182518713 227.6521557273021 Q 274.1530563984146 227.0214111972318 273.7927536063715 226.38403173278203 L 273.7927536063715 226.38403173278203 Q 273.4324508143284 225.74665226833224 273.0789806339029 225.10246494810397 L 273.0789806339029 225.10246494810397 Q 272.72551045347745 224.4582776278757 272.37783444100535 223.80831713305625 L 272.37783444100535 223.80831713305625 Q 272.03015842853324 223.1583566382368 271.68630457801066 222.50458782988068 L 271.68630457801066 222.50458782988068 Q 271.342450727488 221.85081902152456 270.99988887751863 221.19576289377665 L 270.99988887751863 221.19576289377665 Q 270.6573270275493 220.54070676602873 270.31330593894876 219.88710458981552 L 270.31330593894876 219.88710458981552 Q 269.96928485034823 219.2335024136023 269.62111389441475 218.58403506897076 L 269.62111389441475 218.58403506897076 Q 269.2729429384813 217.93456772433925 268.9182601127252 217.29158865579916 L 268.9182601127252 217.29158865579916 Q 268.563577286969 216.6486095872591 268.20060444089256 216.0138905027338 L 268.20060444089256 216.0138905027338 Q 267.8376315948162 215.3791714182085 267.4653292250879 214.75374805471313 L 267.4653292250879 214.75374805471313 Q 267.09302685535965 214.12832469121776 266.71102599160656 213.51256468227604 L 266.71102599160656 213.51256468227604 Q 266.32902512785347 212.89680467333434 265.9372980165074 212.2907356719582 L 265.9372980165074 212.2907356719582 Q 265.54557090516124 211.6846666705821 265.1439693528981 211.0884363331631 L 265.1439693528981 211.0884363331631 Q 264.74236780063495 210.4922059957441 264.3302846919431 209.90641923810009 L 264.3302846919431 209.90641923810009 Q 263.91820158325135 209.32063248045608 263.4945815217842 208.74634087503387 L 263.4945815217842 208.74634087503387 Q 263.07096146031705 208.17204926961165 262.63469582051107 207.6103574252154 L 262.63469582051107 207.6103574252154 Q 262.19843018070515 207.04866558081912 261.74894355828974 206.50014681692147 L 261.74894355828974 206.50014681692147 Q 261.29945693587433 205.9516280530238 260.8371852713733 205.41584800859545 L 260.8371852713733 205.41584800859545 Q 260.37491360687227 204.88006796416713 259.901457710867 204.35543162866514 L 259.901457710867 204.35543162866514 Q 259.4280018148618 203.83079529316313 258.94594045868894 203.31473323862517 L 258.94594045868894 203.31473323862517 Q 258.46387910251616 202.7986711840872 257.9763920525494 202.28801516503233 L 257.9763920525494 202.28801516503233 Q 257.48890500258267 201.77735914597744 256.9993769789218 201.26873670578448 L 256.9993769789218 201.26873670578448 Q 256.50984895526096 200.76011426559148 256.02150459389645 200.25031245173363 L 256.02150459389645 200.25031245173363 Q 255.53316023253194 199.7405106378758 255.04862429818832 199.2269141956457 L 255.04862429818832 199.2269141956457 Q 254.56408836384472 198.7133177534156 254.08470714377682 198.19458527341075 L 254.08470714377682 198.19458527341075 Q 253.60532592370896 197.6758527934059 253.1301988681135 197.1528815625681 L 253.1301988681135 197.1528815625681 Q 252.655071812518 196.62991033173026 252.17999296556678 196.10689106691714 L 252.17999296556678 196.10689106691714 Q 251.7049141186156 195.58387180210403 251.22167413828836 195.06898410134312 L 251.22167413828836 195.06898410134312 Q 250.73843415796114 194.55409640058224 250.23501139230368 194.05931835911775 L 250.23501139230368 194.05931835911775 Q 249.73158862664621 193.56454031765324 249.19355315739048 193.10424957144068 L 249.19355315739048 193.10424957144068 Q 248.65551768813475 192.64395882522808 248.06853013206003 192.23244280320108 L 248.06853013206003 192.23244280320108 Q 247.48154257598532 191.82092678117408 246.83435160465484 191.46939604608667 L 246.83435160465484 191.46939604608667 Q 246.1871606333244 191.11786531099926 245.47424289977909 190.8318231976839 L 245.47424289977909 190.8318231976839 Q 244.76132516623375 190.54578108436854 243.98441328489713 190.32350125599015 L 243.98441328489713 190.32350125599015 Q 243.2075014035605 190.1012214276118 242.37564353301593 189.93368850877036 L 242.37564353301593 189.93368850877036 Q 241.54378566247132 189.76615558992893 240.67203772409937 189.6383682096836 L 240.67203772409937 189.6383682096836 Q 239.80028978572744 189.51058082943825 238.9074194116215 189.40383935436262 L 238.9074194116215 189.40383935436262 Q 238.0145490375156 189.297097879287 237.12016049431782 189.19186907269057 L 237.12016049431782 189.19186907269057 Q 236.22577195112007 189.08664026609415 235.3471842356136 188.96566788118213 L 235.3471842356136 188.96566788118213 Q 234.46859652010713 188.84469549627008 233.61783226341248 188.6960004621796 L 233.61783226341248 188.6960004621796 Q 232.7670680067178 188.54730542808915 231.9485039480715 188.36652686333457 L 231.9485039480715 188.36652686333457 Q 231.1299398894252 188.18574829858 230.33935230843633 187.97709462021743 L 230.33935230843633 187.97709462021743 Q 229.54876472744746 187.7684409418549 228.77438236372373 187.54364076078252 L 228 187.31884057971016 L 228.23119202975818 186.55281814559243 Q 228.46238405951635 185.78679571147467 228.68042995937384 185.00767477836163 L 228.68042995937384 185.00767477836163 Q 228.89847585923133 184.2285538452486 229.09505379219368 183.42804272772923 L 229.09505379219368 183.42804272772923 Q 229.29163172515604 182.62753161020984 229.46642255724623 181.80531233058952 L 229.46642255724623 181.80531233058952 Q 229.6412133893364 180.98309305096922 229.80245864437512 180.14737727247518 L 229.80245864437512 180.14737727247518 Q 229.96370389941382 179.31166149398115 230.12617111499117 178.47716324863248 L 230.12617111499117 178.47716324863248 Q 230.2886383305685 177.6426650032838 230.46989536400918 176.82688849674827 L 230.46989536400918 176.82688849674827 Q 230.65115239744983 176.0111119902127 230.8674779030638 175.23027689616862 L 230.8674779030638 175.23027689616862 Q 231.0838034086777 174.4494418021245 231.34697530749676 173.71528336797684 L 231.34697530749676 173.71528336797684 Q 231.61014720631582 172.98112493382914 231.92588992714917 172.29934684770296 L 231.92588992714917 172.29934684770296 Q 232.24163264798256 171.61756876157682 232.6098790783887 170.98810415419163 L 232.6098790783887 170.98810415419163 Q 232.97812550879482 170.35863954680644 233.39466805435757 169.77729606865336 L 233.39466805435757 169.77729606865336 Q 233.8112105999203 169.1959525905003 234.26994860571318 168.65665169047514 L 234.26994860571318 168.65665169047514 Q 234.7286866115061 168.11735079044996 235.22362983306581 167.61412392787355 L 235.22362983306581 167.61412392787355 Q 235.71857305462552 167.11089706529717 236.2450272003565 166.63906695687695 L 236.2450272003565 166.63906695687695 Q 236.77148134608746 166.16723684845672 237.32628657776587 165.72365510465806 L 237.32628657776587 165.72365510465806 Q 237.88109180944429 165.28007336085938 238.46219479307214 164.86269408730016 L 238.46219479307214 164.86269408730016 Q 239.0432977767 164.44531481374094 239.6491300800251 164.05257526089454 L 239.6491300800251 164.05257526089454 Q 240.25496238335015 163.65983570804815 240.88402201209095 163.29023932364134 L 240.88402201209095 163.29023932364134 Q 241.51308164083179 162.92064293923454 242.16387152952205 162.57269808195133 L 242.16387152952205 162.57269808195133 Q 242.81466141821235 162.22475322466812 243.485904525931 161.89718748054722 L 243.485904525931 161.89718748054722 Q 244.15714763364969 161.5696217364263 244.8481005728822 161.26169441138626 L 244.8481005728822 161.26169441138626 Q 245.53905351211472 160.9537670863462 246.2497799902948 160.66554165699665 L 246.2497799902948 160.66554165699665 Q 246.96050646847488 160.37731622764707 247.69204692888474 160.10982936754823 L 247.69204692888474 160.10982936754823 Q 248.4235873892946 159.84234250744936 249.17797569071394 159.5976207063273 L 249.17797569071394 159.5976207063273 Q 249.93236399213328 159.35289890520525 250.71239801082683 159.13372990209194 L 250.71239801082683 159.13372990209194 Q 251.4924320295204 158.91456089897866 252.30109603510692 158.72391815092175 L 252.30109603510692 158.72391815092175 Q 253.10976004069346 158.53327540286486 253.94930314596792 158.37339987369995 L 253.94930314596792 158.37339987369995 Q 254.78884625124238 158.21352434453502 255.65971337238395 158.08485933842607 L 255.65971337238395 158.08485933842607 Q 256.5305804935255 157.95619433231712 257.43054108878147 157.85651738918446 L 257.43054108878147 157.85651738918446 Q 258.3305016840374 157.7568404460518 259.2543129005468 157.68092770887813 L 259.2543129005468 157.68092770887813 Q 260.1781241170561 157.60501497170446 261.1179022434876 157.54501129333005 L 261.1179022434876 157.54501129333005 Q 262.0576803699191 157.48500761495563 263.0039456478533 157.4314675839118 L 263.0039456478533 157.4314675839118 Q 263.9502109257875 157.37792755286796 264.89341790677133 157.32134030565982 L 264.89341790677133 157.32134030565982 Q 265.83662488775514 157.26475305845167 266.7689034629428 157.1972770011205 L 266.7689034629428 157.1972770011205 Q 267.7011820381304 157.12980094378935 268.6179402739825 157.04686078023622 L 268.6179402739825 157.04686078023622 Q 269.53469850983464 156.96392061668305 270.4356680639623 156.865248976774 L 270.4356680639623 156.865248976774 Q 271.3366376180899 156.76657733686497 272.2259623547162 156.6563030708223 L 272.2259623547162 156.6563030708223 Q 273.11528709134245 156.54602880477964 274.0004717295733 156.43162944069806 Z'),
				_Utils_Tuple2(14, 'M 178.94182410573853 165.34059036574996 Q 179.66157066840117 165.0613556204632 180.42455417232128 164.82521295821448 L 180.42455417232128 164.82521295821448 Q 181.18753767624142 164.5890702959658 181.99628512010355 164.39857162322613 L 181.99628512010355 164.39857162322613 Q 182.80503256396568 164.20807295048644 183.65954800522894 164.06333418966778 L 183.65954800522894 164.06333418966778 Q 184.51406344649217 163.91859542884913 185.4104914787181 163.81610098579114 L 185.4104914787181 163.81610098579114 Q 186.30691951094403 163.71360654273312 187.2378813870598 163.64685003262105 L 187.2378813870598 163.64685003262105 Q 188.16884326317555 163.580093522509 189.1247645563446 163.54149736498977 L 189.1247645563446 163.54149736498977 Q 190.08068584951366 163.5029012074705 191.05111517940674 163.48613052322963 L 191.05111517940674 163.48613052322963 Q 192.02154450929982 163.46935983898874 192.99573827238106 163.4713075516731 L 192.99573827238106 163.4713075516731 Q 193.96993203546228 163.47325526435748 194.93658105487106 163.49531562938515 L 194.93658105487106 163.49531562938515 Q 195.90323007427986 163.51737599441282 196.84978508654115 163.5658434995993 L 196.84978508654115 163.5658434995993 Q 197.79634009880243 163.6143110047858 198.70870188447412 163.69977196557176 L 198.70870188447412 163.69977196557176 Q 199.62106367014582 163.7852329263577 200.4843259989479 163.9208218727012 L 200.4843259989479 163.9208218727012 Q 201.34758832774997 164.05641081904471 202.14807345272945 164.25499652739967 L 202.14807345272945 164.25499652739967 Q 202.94855857770892 164.45358223575465 203.67672216392668 164.72437555390687 L 203.67672216392668 164.72437555390687 Q 204.40488575014444 164.99516887205908 205.05808483646507 165.3406987156634 L 205.05808483646507 165.3406987156634 Q 205.71128392278567 165.6862285592677 206.29522898850598 166.10077285534322 L 206.29522898850598 166.10077285534322 Q 206.87917405422633 166.51531715141874 207.40729367586172 166.9854872101183 L 207.40729367586172 166.9854872101183 Q 207.93541329749712 167.45565726881784 208.42619327216255 167.9630321950596 L 208.42619327216255 167.9630321950596 Q 208.91697324682798 168.4704071213014 209.39015833631714 168.99531326863632 L 209.39015833631714 168.99531326863632 Q 209.86334342580633 169.52021941597127 210.3362636131157 170.04538951769564 L 210.3362636131157 170.04538951769564 Q 210.80918380042505 170.57055961941998 211.29423105556856 171.0836465933313 L 211.29423105556856 171.0836465933313 Q 211.77927831071207 171.59673356724264 212.28293592195027 172.09127761400785 L 212.28293592195027 172.09127761400785 Q 212.78659353318847 172.58582166077306 213.30981528199558 173.06087245453372 L 213.30981528199558 173.06087245453372 Q 213.8330370308027 173.53592324829438 214.37247573415624 173.99481584459068 L 214.37247573415624 173.99481584459068 Q 214.9119144375098 174.45370844088694 215.4615160278256 174.90247497227517 L 215.4615160278256 174.90247497227517 Q 216.01111761814144 175.3512415036634 216.5637424395774 175.79699575766742 L 216.5637424395774 175.79699575766742 Q 217.11636726101335 176.24275001167143 217.66520843441958 176.69227420483554 L 217.66520843441958 176.69227420483554 Q 218.2140496078258 177.14179839799962 218.75366919236754 177.60051076847435 L 218.75366919236754 177.60051076847435 Q 219.29328877690926 178.0592231389491 219.82016261946285 178.53063507118736 L 219.82016261946285 178.53063507118736 Q 220.34703646201646 179.00204700342562 220.8596270493398 179.48769043996936 L 220.8596270493398 179.48769043996936 Q 221.37221763666315 179.97333387651312 221.87072037071647 180.4730141233803 L 221.87072037071647 180.4730141233803 Q 222.36922310476982 180.97269437024747 222.85516313668597 181.48489180221503 L 222.85516313668597 181.48489180221503 Q 223.34110316860216 181.99708923418262 223.81688492764002 182.51940813369202 L 223.81688492764002 182.51940813369202 Q 224.29266668667788 183.04172703320143 224.761089425651 183.57137828965938 L 224.761089425651 183.57137828965938 Q 225.22951216462408 184.1010295461173 225.69326649911443 184.63533229254904 L 225.69326649911443 184.63533229254904 Q 226.15702083360475 185.16963503898077 226.61827305307025 185.7064308348032 L 226.61827305307025 185.7064308348032 Q 227.07952527253576 186.2432266306256 227.53976263626788 186.78103360516786 L 228 187.31884057971016 L 228.77438236372373 187.54364076078252 Q 229.54876472744746 187.7684409418549 230.33935230843633 187.97709462021743 L 230.33935230843633 187.97709462021743 Q 231.1299398894252 188.18574829858 231.9485039480715 188.36652686333457 L 231.9485039480715 188.36652686333457 Q 232.7670680067178 188.54730542808915 233.61783226341248 188.6960004621796 L 233.61783226341248 188.6960004621796 Q 234.46859652010713 188.84469549627008 235.3471842356136 188.96566788118213 L 235.3471842356136 188.96566788118213 Q 236.22577195112007 189.08664026609415 237.12016049431782 189.19186907269057 L 237.12016049431782 189.19186907269057 Q 238.0145490375156 189.297097879287 238.9074194116215 189.40383935436262 L 238.9074194116215 189.40383935436262 Q 239.80028978572744 189.51058082943825 240.67203772409937 189.6383682096836 L 240.67203772409937 189.6383682096836 Q 241.54378566247132 189.76615558992893 242.37564353301593 189.93368850877036 L 242.37564353301593 189.93368850877036 Q 243.2075014035605 190.1012214276118 243.98441328489713 190.32350125599015 L 243.98441328489713 190.32350125599015 Q 244.76132516623375 190.54578108436854 245.47424289977909 190.8318231976839 L 245.47424289977909 190.8318231976839 Q 246.1871606333244 191.11786531099926 246.83435160465484 191.46939604608667 L 246.83435160465484 191.46939604608667 Q 247.48154257598532 191.82092678117408 248.06853013206003 192.23244280320108 L 248.06853013206003 192.23244280320108 Q 248.65551768813475 192.64395882522808 249.19355315739048 193.10424957144068 L 249.19355315739048 193.10424957144068 Q 249.73158862664621 193.56454031765324 250.23501139230368 194.05931835911775 L 250.23501139230368 194.05931835911775 Q 250.73843415796114 194.55409640058224 251.22167413828836 195.06898410134312 L 251.22167413828836 195.06898410134312 Q 251.7049141186156 195.58387180210403 252.17999296556678 196.10689106691714 L 252.17999296556678 196.10689106691714 Q 252.655071812518 196.62991033173026 253.1301988681135 197.1528815625681 L 253.1301988681135 197.1528815625681 Q 253.60532592370896 197.6758527934059 254.08470714377682 198.19458527341075 L 254.08470714377682 198.19458527341075 Q 254.56408836384472 198.7133177534156 255.04862429818832 199.2269141956457 L 255.04862429818832 199.2269141956457 Q 255.53316023253194 199.7405106378758 256.02150459389645 200.25031245173363 L 256.02150459389645 200.25031245173363 Q 256.50984895526096 200.76011426559148 256.9993769789218 201.26873670578448 L 256.9993769789218 201.26873670578448 Q 257.48890500258267 201.77735914597744 257.9763920525494 202.28801516503233 L 257.9763920525494 202.28801516503233 Q 258.46387910251616 202.7986711840872 258.94594045868894 203.31473323862517 L 258.94594045868894 203.31473323862517 Q 259.4280018148618 203.83079529316313 259.901457710867 204.35543162866514 L 259.901457710867 204.35543162866514 Q 260.37491360687227 204.88006796416713 260.8371852713733 205.41584800859545 L 260.8371852713733 205.41584800859545 Q 261.29945693587433 205.9516280530238 261.74894355828974 206.50014681692147 L 261.74894355828974 206.50014681692147 Q 262.19843018070515 207.04866558081912 262.63469582051107 207.6103574252154 L 262.63469582051107 207.6103574252154 Q 263.07096146031705 208.17204926961165 263.4945815217842 208.74634087503387 L 263.4945815217842 208.74634087503387 Q 263.91820158325135 209.32063248045608 264.3302846919431 209.90641923810009 L 264.3302846919431 209.90641923810009 Q 264.74236780063495 210.4922059957441 265.1439693528981 211.0884363331631 L 265.1439693528981 211.0884363331631 Q 265.54557090516124 211.6846666705821 265.9372980165074 212.2907356719582 L 265.9372980165074 212.2907356719582 Q 266.32902512785347 212.89680467333434 266.71102599160656 213.51256468227604 L 266.71102599160656 213.51256468227604 Q 267.09302685535965 214.12832469121776 267.4653292250879 214.75374805471313 L 267.4653292250879 214.75374805471313 Q 267.8376315948162 215.3791714182085 268.20060444089256 216.0138905027338 L 268.20060444089256 216.0138905027338 Q 268.563577286969 216.6486095872591 268.9182601127252 217.29158865579916 L 268.9182601127252 217.29158865579916 Q 269.2729429384813 217.93456772433925 269.62111389441475 218.58403506897076 L 269.62111389441475 218.58403506897076 Q 269.96928485034823 219.2335024136023 270.31330593894876 219.88710458981552 L 270.31330593894876 219.88710458981552 Q 270.6573270275493 220.54070676602873 270.99988887751863 221.19576289377665 L 270.99988887751863 221.19576289377665 Q 271.342450727488 221.85081902152456 271.68630457801066 222.50458782988068 L 271.68630457801066 222.50458782988068 Q 272.03015842853324 223.1583566382368 272.37783444100535 223.80831713305625 L 272.37783444100535 223.80831713305625 Q 272.72551045347745 224.4582776278757 273.0789806339029 225.10246494810397 L 273.0789806339029 225.10246494810397 Q 273.4324508143284 225.74665226833224 273.7927536063715 226.38403173278203 L 273.7927536063715 226.38403173278203 Q 274.1530563984146 227.0214111972318 274.5200182518713 227.6521557273021 L 274.5200182518713 227.6521557273021 Q 274.88698010532806 228.2829002573724 275.25924232076636 228.90836362967121 L 275.25924232076636 228.90836362967121 Q 275.6315045362047 229.53382700197 276.0070005876381 230.15606825507078 L 276.0070005876381 230.15606825507078 Q 276.38249663907146 230.77830950817156 276.7593246325514 231.39922364510284 L 276.7593246325514 231.39922364510284 Q 277.1361526260313 232.02013778203408 277.5135535560525 232.64048105828107 L 277.5135535560525 232.64048105828107 Q 277.8909544860737 233.26082433452802 278.2699865738238 233.8795423630379 L 278.2699865738238 233.8795423630379 Q 278.6490186615739 234.49826039154777 279.0326020558828 235.11244360374 L 279.0326020558828 235.11244360374 Q 279.41618545019173 235.7266268159322 279.8084503873188 236.3321599401715 L 279.8084503873188 236.3321599401715 Q 280.2007153244459 236.93769306441078 280.6058877192234 237.53036549715063 L 280.6058877192234 237.53036549715063 Q 281.0110601140009 238.12303792989047 281.4323075924086 238.69969352205666 L 281.4323075924086 238.69969352205666 Q 281.8535550708164 239.27634911422285 282.2922065333182 239.83566378020836 L 282.2922065333182 239.83566378020836 Q 282.73085799582003 240.39497844619387 283.18622090574104 240.93764221348272 L 283.18622090574104 240.93764221348272 Q 283.64158381566205 241.48030598077156 284.1113199773937 242.00864857324905 L 284.1113199773937 242.00864857324905 Q 284.5810561391254 242.5369911657265 285.06186400809975 243.05430216584267 L 285.06186400809975 243.05430216584267 Q 285.5426718770741 243.5716131659588 286.03094265692545 244.0814882947301 L 286.03094265692545 244.0814882947301 Q 286.5192134367768 244.59136342350138 287.011386292902 245.09735061395634 L 287.011386292902 245.09735061395634 Q 287.5035591490272 245.60333780441132 287.99604705401117 246.10901108748885 L 287.99604705401117 246.10901108748885 Q 288.48853495899516 246.6146843705664 288.9772627659827 247.12410412809697 L 288.9772627659827 247.12410412809697 Q 289.4659905729702 247.6335238856275 289.945737213344 248.15189226931304 L 289.945737213344 248.15189226931304 Q 290.42548385371776 248.67026065299856 290.889327105605 249.2044748041979 L 290.889327105605 249.2044748041979 Q 291.3531703574922 249.7386889553972 291.7923673078475 250.29746010993455 L 291.7923673078475 250.29746010993455 Q 292.23156425820275 250.85623126447186 292.63612228915906 251.44951583507702 L 292.63612228915906 251.44951583507702 Q 293.04068032011537 252.04280040568216 293.40065928347036 252.68050252552771 L 293.40065928347036 252.68050252552771 Q 293.76063824682535 253.31820464537327 294.0679203755552 254.00841266928376 L 294.0679203755552 254.00841266928376 Q 294.375202504285 254.69862069319427 294.62520228021987 255.44590352514325 L 294.62520228021987 255.44590352514325 Q 294.8752020561547 256.19318635709226 295.06791876665443 256.99754470713776 L 295.06791876665443 256.99754470713776 Q 295.2606354771542 257.8019030571833 295.40065162979107 258.6587710210415 L 295.40065162979107 258.6587710210415 Q 295.54066778242793 259.51563898489974 295.6360911373548 260.4169381783603 L 295.6360911373548 260.4169381783603 Q 295.7315144922817 261.31823737182077 295.7922545908374 262.25409415768013 L 295.7922545908374 262.25409415768013 Q 295.8529946893931 263.1899509435395 295.88896122922733 264.15049152884956 L 295.88896122922733 264.15049152884956 Q 295.9249277690616 265.1110321141596 295.94466432738716 266.0877438766976 L 295.94466432738716 266.0877438766976 Q 295.9644008857128 267.06445563923546 295.9744036259269 268.05086595242784 L 295.9744036259269 268.05086595242784 Q 295.9844063661411 269.0372762656202 295.9890869474911 270.0289894544925 L 295.9890869474911 270.0289894544925 Q 295.9937675288411 271.0207026433648 295.99583971075356 272.015014780952 L 295.99583971075356 272.015014780952 Q 295.997911892666 273.0093269185393 295.998955946333 274.00466345926964 L 296 275 L 294 275 L 292 275 L 290 275 L 288 275 L 286 275 L 284 275 L 282 275 L 280 275 L 278 275 L 276 275 L 274 275 L 272 275 L 270 275 L 268 275 L 266 275 L 264 275 L 262 275 L 260 275 L 258 275 L 256 275 L 254 275 L 252 275 L 250 275 L 248 275 L 246 275 L 244 275 L 242 275 L 240 275 L 238 275 L 236 275 L 234 275 L 232 275 L 230 275 L 228 275 L 226 275 L 224 275 L 222 275 L 220 275 L 218 275 L 216 275 L 214 275 L 212 275 L 210 275 L 208 275 L 206 275 L 204 275 L 202 275 L 200 275 L 198 275 L 196 275 L 194 275 L 192 275 L 190 275 L 188 275 L 186 275 L 184 275 L 184 273.0072463768116 L 184 271.01449275362313 L 184 269.02173913043475 L 184 267.0289855072464 L 184 265.036231884058 L 184 263.0434782608695 L 184 261.0507246376811 L 184.00000000000034 259.0579710144931 L 184.0000000000087 257.065217391313 L 184.0000000001396 255.0724637682551 L 184.00000000164474 253.07971014656704 L 184.0000000151856 251.08695653688707 L 184.00000006480047 250.09057977485875 Q 184.00000011441534 249.09420301283043 184.0000004188386 248.09782650606485 L 184.0000004188386 248.09782650606485 Q 184.00000072326185 247.1014499992993 184.00000231861773 246.10507479091126 L 184.00000231861773 246.10507479091126 Q 184.00000391397361 245.10869958252323 184.00001116243303 244.1123300936269 L 184.00001116243303 244.1123300936269 Q 184.00001841089244 243.11596060473056 184.00004729450816 242.11961319375035 L 184.00004729450816 242.11961319375035 Q 184.0000761781239 241.12326578277015 184.00017803781572 240.12699375359367 L 184.00017803781572 240.12699375359367 Q 184.00027989750754 239.13072172441719 184.00060008006753 238.1346790883449 L 184.00060008006753 238.1346790883449 Q 184.00092026262752 237.13863645227264 184.00182239604655 236.1432198778592 L 184.00182239604655 236.1432198778592 Q 184.00272452946558 235.14780330344576 184.00501268490657 234.15392717483002 L 184.00501268490657 234.15392717483002 Q 184.00730084034757 233.16005104621428 184.0125414451927 232.1696072294764 L 184.0125414451927 232.1696072294764 Q 184.01778205003785 231.17916341273855 184.0286404791445 230.19567106467804 L 184.0286404791445 230.19567106467804 Q 184.03949890825118 229.21217871661756 184.05986219571784 228.24152517209524 L 184.05986219571784 228.24152517209524 Q 184.0802254831845 227.2708716275729 184.1147438866177 226.32190196724503 L 184.1147438866177 226.32190196724503 Q 184.1492622900509 225.37293230691716 184.20194277831519 224.45752983253155 L 184.20194277831519 224.45752983253155 Q 184.25462326657944 223.54212735814593 184.32639593825797 222.67443385199294 L 184.32639593825797 222.67443385199294 Q 184.39816860993648 221.80674034583996 184.48395033537247 221.00135366002127 L 184.48395033537247 221.00135366002127 Q 184.56973206080846 220.19596697420258 184.65620603609665 219.4652890142811 L 184.65620603609665 219.4652890142811 Q 184.74268001138483 218.73461105435962 184.80833525079697 218.08586935932152 L 184.80833525079697 218.08586935932152 Q 184.87399049020908 217.43712766428342 184.89247469352728 216.8698071353437 L 184.89247469352728 216.8698071353437 Q 184.91095889684544 216.302486606404 184.85743538062243 215.8069128994709 L 184.85743538062243 215.8069128994709 Q 184.80391186439942 215.31133919253782 184.66242869418986 214.86898540563726 L 184.66242869418986 214.86898540563726 Q 184.5209455239803 214.42663161873674 184.2897843860846 214.01243792013975 L 184.2897843860846 214.01243792013975 Q 184.05862324818892 213.59824422154276 183.75098749053905 213.1848495931466 L 183.75098749053905 213.1848495931466 Q 183.44335173288914 212.77145496475043 183.08261305115423 212.33470574188982 L 183.08261305115423 212.33470574188982 Q 182.72187436941934 211.89795651902918 182.33307176873979 211.42243755717817 L 182.33307176873979 211.42243755717817 Q 181.94426916806026 210.94691859532713 181.54535899233 210.42980712075996 L 181.54535899233 210.42980712075996 Q 181.14644881659973 209.9126956461928 180.74298563998218 209.36433296262393 L 180.74298563998218 209.36433296262393 Q 180.33952246336463 208.81597027905508 179.9249224833476 208.25639482414317 L 179.9249224833476 208.25639482414317 Q 179.51032250333054 207.6968193692313 179.07140794165687 207.14892146116256 L 179.07140794165687 207.14892146116256 Q 178.6324933799832 206.6010235530938 178.15781235712666 206.08238845357886 L 178.15781235712666 206.08238845357886 Q 177.68313133427012 205.56375335406392 177.1705434957421 205.0799662806847 L 177.1705434957421 205.0799662806847 Q 176.65795565721407 204.59617920730548 176.11849211965776 204.13796455323313 L 176.11849211965776 204.13796455323313 Q 175.57902858210144 203.67974989916078 175.03571726870223 203.22492215476706 L 175.03571726870223 203.22492215476706 Q 174.49240595530298 202.7700944103733 173.97480094159175 202.28950541158486 L 173.97480094159175 202.28950541158486 Q 173.4571959278805 201.80891641279644 172.99389954246826 201.27417192141712 L 172.99389954246826 201.27417192141712 Q 172.53060315705602 200.73942743003784 172.14255296294803 200.12969802636923 L 172.14255296294803 200.12969802636923 Q 171.75450276884004 199.51996862270065 171.4511445613892 198.8258515027661 L 171.4511445613892 198.8258515027661 Q 171.1477863539384 198.1317343828316 170.92688690713968 197.35545675672262 L 170.92688690713968 197.35545675672262 Q 170.70598746034096 196.57917913061362 170.55642729623744 195.73182061197053 L 170.55642729623744 195.73182061197053 Q 170.40686713213393 194.88446209332741 170.31287996176198 193.9817319203792 L 170.31287996176198 193.9817319203792 Q 170.21889279139003 193.07900174743096 170.16412267567148 192.1371966092375 L 170.16412267567148 192.1371966092375 Q 170.1093525599529 191.19539147104405 170.07962087239162 190.22863862351377 L 170.07962087239162 190.22863862351377 Q 170.04988918483036 189.2618857759835 170.0343053824191 188.28103630374872 L 170.0343053824191 188.28103630374872 Q 170.01872158000782 187.30018683151394 170.0093607900039 186.31313689401784 L 170 185.32608695652175 L 170.0092665343851 184.3389431049127 Q 170.01853306877018 183.35179925330362 170.03389451027198 182.3707282258145 L 170.03389451027198 182.3707282258145 Q 170.0492559517738 181.38965719832538 170.07841174085576 180.42233053889615 L 170.07841174085576 180.42233053889615 Q 170.1075675299377 179.45500387946691 170.1609808268633 178.51184683836016 L 170.1609808268633 178.51184683836016 Q 170.21439412378888 177.56868979725343 170.3055336616291 176.66312230778266 L 170.3055336616291 176.66312230778266 Q 170.39667319946938 175.7575548183119 170.54094933472692 174.90493140235475 L 170.54094933472692 174.90493140235475 Q 170.6852254699845 174.05230798639764 170.8975765818302 173.26751289856276 L 170.8975765818302 173.26751289856276 Q 171.1099276936759 172.48271781072788 171.40161193949876 171.77696841797925 L 171.40161193949876 171.77696841797925 Q 171.69329618532163 171.07121902523062 172.06903834558983 170.44922298927432 L 172.06903834558983 170.44922298927432 Q 172.44478050585806 169.82722695331802 172.90160180578312 169.28601629214222 L 172.90160180578312 169.28601629214222 Q 173.3584231057082 168.74480563096645 173.88695701929015 168.27504775651448 L 173.88695701929015 168.27504775651448 Q 174.41549093287213 167.80528988206248 175.00348191698902 167.3947736660917 L 175.00348191698902 167.3947736660917 Q 175.59147290110587 166.98425745012094 176.22803220516522 166.62213366868255 L 176.22803220516522 166.62213366868255 Q 176.86459150922457 166.26000988724417 177.5433345261502 165.93991749914045 L 177.5433345261502 165.93991749914045 Q 178.22207754307587 165.6198251110367 178.94182410573853 165.34059036574996 Z'),
				_Utils_Tuple2(15, 'M 122.20058623885942 182.53777068356695 Q 123.02771972055373 182.36603568463102 123.88228041437569 182.22253603078434 L 123.88228041437569 182.22253603078434 Q 124.73684110819762 182.07903637693764 125.61851849939407 181.96471978875059 L 125.61851849939407 181.96471978875059 Q 126.5001958905905 181.85040320056356 127.40697165854347 181.76576177685874 L 127.40697165854347 181.76576177685874 Q 128.31374742649643 181.68112035315391 129.24097682302641 181.62598920399049 L 129.24097682302641 181.62598920399049 Q 130.1682062195564 181.57085805482706 131.10836102367682 181.54485349223287 L 131.10836102367682 181.54485349223287 Q 132.04851582779727 181.5188489296387 132.99167768221298 181.52220121452234 L 132.99167768221298 181.52220121452234 Q 133.93483953662871 181.525553499406 134.869788172048 181.55977993966232 L 134.869788172048 181.55977993966232 Q 135.8047368074673 181.59400637991865 136.72038985330718 181.66191217289835 L 136.72038985330718 181.66191217289835 Q 137.63604289914707 181.72981796587806 138.52300433038533 181.8346579627963 L 138.52300433038533 181.8346579627963 Q 139.4099657616236 181.93949795971457 140.26193661900848 182.08356316902518 L 140.26193661900848 182.08356316902518 Q 141.11390747639336 182.2276283783358 141.92869919241787 182.41079430480033 L 141.92869919241787 182.41079430480033 Q 142.74349090844237 182.59396023126487 143.52342476284844 182.81272331094567 L 143.52342476284844 182.81272331094567 Q 144.30335861725447 183.03148639062647 145.0549726770817 183.27876549916112 L 145.0549726770817 183.27876549916112 Q 145.80658673690897 183.52604460769578 146.53974755944495 183.79170801973683 L 146.53974755944495 183.79170801973683 Q 147.2729083819809 184.05737143177788 147.9995302435089 184.3292420904527 L 147.9995302435089 184.3292420904527 Q 148.72615210503687 184.60111274912754 149.45870778910296 184.8661732152297 L 149.45870778910296 184.8661732152297 Q 150.19126347316904 185.1312336813319 150.94118726749196 185.37682864852064 L 150.94118726749196 185.37682864852064 Q 151.6911110618149 185.62242361570935 152.46716710207102 185.83732293141392 L 152.46716710207102 185.83732293141392 Q 153.24322314232714 186.0522222471185 154.0500067499657 186.22740908146045 L 154.0500067499657 186.22740908146045 Q 154.8567903576042 186.4025959158024 155.69368847677617 186.53164301040096 L 155.69368847677617 186.53164301040096 Q 156.53058659594814 186.6606901049995 157.39160285326983 186.73967901925542 L 157.39160285326983 186.73967901925542 Q 158.25261911059155 186.81866793351134 159.12735329618545 186.84580364563345 L 159.12735329618545 186.84580364563345 Q 160.0020874817793 186.87293935775557 160.8778487111967 186.84819552277503 L 160.8778487111967 186.84819552277503 Q 161.75360994061407 186.8234516877945 162.6182567674005 186.74858538017094 L 162.6182567674005 186.74858538017094 Q 163.48290359418695 186.6737190725474 164.32770877887413 186.55275718899912 L 164.32770877887413 186.55275718899912 Q 165.1725139635613 186.43179530545086 165.99427193397673 186.27173752351217 L 165.99427193397673 186.27173752351217 Q 166.81602990439217 186.11167974157348 167.61779627369873 185.9229145794628 L 167.61779627369873 185.9229145794628 Q 168.4195626430053 185.7341494173521 169.20978132150265 185.53011818693693 L 170 185.32608695652175 L 170.0093607900039 186.31313689401784 Q 170.01872158000782 187.30018683151394 170.0343053824191 188.28103630374872 L 170.0343053824191 188.28103630374872 Q 170.04988918483036 189.2618857759835 170.07962087239162 190.22863862351377 L 170.07962087239162 190.22863862351377 Q 170.1093525599529 191.19539147104405 170.16412267567148 192.1371966092375 L 170.16412267567148 192.1371966092375 Q 170.21889279139003 193.07900174743096 170.31287996176198 193.9817319203792 L 170.31287996176198 193.9817319203792 Q 170.40686713213393 194.88446209332741 170.55642729623744 195.73182061197053 L 170.55642729623744 195.73182061197053 Q 170.70598746034096 196.57917913061362 170.92688690713968 197.35545675672262 L 170.92688690713968 197.35545675672262 Q 171.1477863539384 198.1317343828316 171.4511445613892 198.8258515027661 L 171.4511445613892 198.8258515027661 Q 171.75450276884004 199.51996862270065 172.14255296294803 200.12969802636923 L 172.14255296294803 200.12969802636923 Q 172.53060315705602 200.73942743003784 172.99389954246826 201.27417192141712 L 172.99389954246826 201.27417192141712 Q 173.4571959278805 201.80891641279644 173.97480094159175 202.28950541158486 L 173.97480094159175 202.28950541158486 Q 174.49240595530298 202.7700944103733 175.03571726870223 203.22492215476706 L 175.03571726870223 203.22492215476706 Q 175.57902858210144 203.67974989916078 176.11849211965776 204.13796455323313 L 176.11849211965776 204.13796455323313 Q 176.65795565721407 204.59617920730548 177.1705434957421 205.0799662806847 L 177.1705434957421 205.0799662806847 Q 177.68313133427012 205.56375335406392 178.15781235712666 206.08238845357886 L 178.15781235712666 206.08238845357886 Q 178.6324933799832 206.6010235530938 179.07140794165687 207.14892146116256 L 179.07140794165687 207.14892146116256 Q 179.51032250333054 207.6968193692313 179.9249224833476 208.25639482414317 L 179.9249224833476 208.25639482414317 Q 180.33952246336463 208.81597027905508 180.74298563998218 209.36433296262393 L 180.74298563998218 209.36433296262393 Q 181.14644881659973 209.9126956461928 181.54535899233 210.42980712075996 L 181.54535899233 210.42980712075996 Q 181.94426916806026 210.94691859532713 182.33307176873979 211.42243755717817 L 182.33307176873979 211.42243755717817 Q 182.72187436941934 211.89795651902918 183.08261305115423 212.33470574188982 L 183.08261305115423 212.33470574188982 Q 183.44335173288914 212.77145496475043 183.75098749053905 213.1848495931466 L 183.75098749053905 213.1848495931466 Q 184.05862324818892 213.59824422154276 184.2897843860846 214.01243792013975 L 184.2897843860846 214.01243792013975 Q 184.5209455239803 214.42663161873674 184.66242869418986 214.86898540563726 L 184.66242869418986 214.86898540563726 Q 184.80391186439942 215.31133919253782 184.85743538062243 215.8069128994709 L 184.85743538062243 215.8069128994709 Q 184.91095889684544 216.302486606404 184.89247469352728 216.8698071353437 L 184.89247469352728 216.8698071353437 Q 184.87399049020908 217.43712766428342 184.80833525079697 218.08586935932152 L 184.80833525079697 218.08586935932152 Q 184.74268001138483 218.73461105435962 184.65620603609665 219.4652890142811 L 184.65620603609665 219.4652890142811 Q 184.56973206080846 220.19596697420258 184.48395033537247 221.00135366002127 L 184.48395033537247 221.00135366002127 Q 184.39816860993648 221.80674034583996 184.32639593825797 222.67443385199294 L 184.32639593825797 222.67443385199294 Q 184.25462326657944 223.54212735814593 184.20194277831519 224.45752983253155 L 184.20194277831519 224.45752983253155 Q 184.1492622900509 225.37293230691716 184.1147438866177 226.32190196724503 L 184.1147438866177 226.32190196724503 Q 184.0802254831845 227.2708716275729 184.05986219571784 228.24152517209524 L 184.05986219571784 228.24152517209524 Q 184.03949890825118 229.21217871661756 184.0286404791445 230.19567106467804 L 184.0286404791445 230.19567106467804 Q 184.01778205003785 231.17916341273855 184.0125414451927 232.1696072294764 L 184.0125414451927 232.1696072294764 Q 184.00730084034757 233.16005104621428 184.00501268490657 234.15392717483002 L 184.00501268490657 234.15392717483002 Q 184.00272452946558 235.14780330344576 184.00182239604655 236.1432198778592 L 184.00182239604655 236.1432198778592 Q 184.00092026262752 237.13863645227264 184.00060008006753 238.1346790883449 L 184.00060008006753 238.1346790883449 Q 184.00027989750754 239.13072172441719 184.00017803781572 240.12699375359367 L 184.00017803781572 240.12699375359367 Q 184.0000761781239 241.12326578277015 184.00004729450816 242.11961319375035 L 184.00004729450816 242.11961319375035 Q 184.00001841089244 243.11596060473056 184.00001116243303 244.1123300936269 L 184.00001116243303 244.1123300936269 Q 184.00000391397361 245.10869958252323 184.00000231861773 246.10507479091126 L 184.00000231861773 246.10507479091126 Q 184.00000072326185 247.1014499992993 184.0000004188386 248.09782650606485 L 184.0000004188386 248.09782650606485 Q 184.00000011441534 249.09420301283043 184.00000006480047 250.09057977485875 L 184.0000000151856 251.08695653688707 L 184.00000000164474 253.07971014656704 L 184.0000000001396 255.0724637682551 L 184.0000000000087 257.065217391313 L 184.00000000000034 259.0579710144931 L 184 261.0507246376811 L 184 263.0434782608695 L 184 265.036231884058 L 184 267.0289855072464 L 184 269.02173913043475 L 184 271.01449275362313 L 184 273.0072463768116 L 184 275 L 182 275 L 180 275 L 178 275 L 176 275 L 174 275 L 172 275 L 170 275 L 168 275 L 166 275 L 164 275 L 162 275 L 160 275 L 158 275 L 156 275 L 154 275 L 152 275 L 150 275 L 148 275 L 146 275 L 144 275 L 142 275 L 140 275 L 138 275 L 136 275 L 134 275 L 132 275 L 130 275 L 128 275 L 126 275 L 124 275 L 122 275 L 120 275 L 118 275 L 116 275 L 114 275 L 112 275 L 110 275 L 108 275 L 106 275 L 104 275 L 102 275 L 100 275 L 98 275 L 98 273.0072463768116 L 98 271.01449275362313 L 98 269.02173913043475 L 98 267.0289855072464 L 98 265.036231884058 L 98 263.0434782608695 L 98 261.0507246376811 L 98 259.05797101449275 L 98 257.0652173913044 L 98 255.07246376811594 L 98 253.07971014492753 L 98 251.08695652173913 L 98 249.09420289855072 L 98 247.1014492753623 L 98 245.1086956521739 L 98 243.1159420289855 L 97.99999999999964 241.12318840579746 L 97.99999999999127 239.13043478261739 L 97.99999999986002 237.13768115955975 L 97.9999999983462 235.1449275378797 L 97.99999998466606 233.15217392832184 L 97.99999993423283 232.15579716697815 Q 97.9999998837996 231.15942040563445 97.99999957184481 230.16304390486476 L 97.99999957184481 230.16304390486476 Q 97.99999925989002 229.1666674040951 97.99999760801359 228.17029223839228 L 97.99999760801359 228.17029223839228 Q 97.99999595613714 227.17391707268945 97.99998835206432 226.17754783761706 L 97.99998835206432 226.17754783761706 Q 97.99998074799151 225.1811786025447 97.99994995022504 224.18483247713084 L 97.99994995022504 224.18483247713084 Q 97.99991915245856 223.18848635171702 97.99980834199766 222.1922199490965 L 97.99980834199766 222.1922199490965 Q 97.99969753153678 221.19595354647603 97.99934054933344 220.19993242367138 L 97.99934054933344 220.19993242367138 Q 97.9989835671301 219.20391130086676 97.99794712437615 218.20856717679914 L 97.99794712437615 218.20856717679914 Q 97.99691068162221 217.2132230527315 97.99418392908335 216.21956311413797 L 97.99418392908335 216.21956311413797 Q 97.99145717654449 215.22590317554443 97.98492665824467 214.23603322095187 L 97.98492665824467 214.23603322095187 Q 97.97839613994486 213.24616326635928 97.96410230142129 212.26402850401863 L 97.96410230142129 212.26402850401863 Q 97.94980846289772 211.28189374167798 97.92112082893783 210.3141006233409 L 97.92112082893783 210.3141006233409 Q 97.89243319497795 209.34630750500384 97.8394893501902 208.4026827126728 L 97.8394893501902 208.4026827126728 Q 97.78654550540244 207.45905792034176 97.6964808197526 206.5524194730726 L 97.6964808197526 206.5524194730726 Q 97.60641613410274 205.64578102580344 97.46490520372637 204.79040242382337 L 97.46490520372637 204.79040242382337 Q 97.32339427335 203.9350238218433 97.11768645416603 203.1436095112476 L 97.11768645416603 203.1436095112476 Q 96.91197863498206 202.35219520065192 96.63494717447426 201.63184611238975 L 96.63494717447426 201.63184611238975 Q 96.35791571396646 200.91149702412758 96.01190529175418 200.25987697379563 L 96.01190529175418 200.25987697379563 Q 95.66589486954189 199.60825692346367 95.26477502192178 199.01154662670837 L 95.26477502192178 199.01154662670837 Q 94.86365517430167 198.41483632995303 94.43182758715083 197.8487225128026 L 94 197.28260869565216 L 94.52534419744407 196.8096726604968 Q 95.05068839488813 196.33673662534142 95.58885625135153 195.8765777866727 L 95.58885625135153 195.8765777866727 Q 96.12702410781492 195.41641894800398 96.68809125889884 194.979076435497 L 96.68809125889884 194.979076435497 Q 97.24915840998275 194.54173392299006 97.83846158579524 194.13252513077424 L 97.83846158579524 194.13252513077424 Q 98.42776476160772 193.7233163385584 99.04516279999706 193.34210061593907 L 99.04516279999706 193.34210061593907 Q 99.66256083838638 192.96088489331976 100.30304348713625 192.60267014116835 L 100.30304348713625 192.60267014116835 Q 100.94352613588612 192.24445538901693 101.5988919852305 191.90106991282022 L 101.5988919852305 191.90106991282022 Q 102.25425783457489 191.55768443662353 102.91533845044874 191.21999302128046 L 102.91533845044874 191.21999302128046 Q 103.5764190663226 190.88230160593736 104.23524882187812 190.54236748556696 L 104.23524882187812 190.54236748556696 Q 104.89407857743365 190.20243336519655 105.54549971250395 189.85511746716878 L 105.54549971250395 189.85511746716878 Q 106.19692084757428 189.50780156914104 106.83934461335332 189.15152090098644 L 106.83934461335332 189.15152090098644 Q 107.48176837913235 188.79524023283182 108.11710371807382 188.43189682055322 L 108.11710371807382 188.43189682055322 Q 108.7524390570153 188.06855340827465 109.38541804484713 187.70286218250493 L 109.38541804484713 187.70286218250493 Q 110.01839703267896 187.33717095673518 110.65557466752195 186.9756631667429 L 110.65557466752195 186.9756631667429 Q 111.29275230236493 186.61415537675057 111.94137118585675 186.2640473923603 L 111.94137118585675 186.2640473923603 Q 112.58999006934859 185.91393940797005 113.25682458346273 185.58198113041072 L 113.25682458346273 185.58198113041072 Q 113.92365909757689 185.25002285285143 114.61399969288952 184.9414859251773 L 114.61399969288952 184.9414859251773 Q 115.30434028820216 184.63294899750312 116.02138755152757 184.3510241355453 L 116.02138755152757 184.3510241355453 Q 116.73843481485298 184.06909927358743 117.48335731437002 183.81495792733114 L 117.48335731437002 183.81495792733114 Q 118.22827981388707 183.56081658107482 119.00093404581244 183.33434135839474 L 119.00093404581244 183.33434135839474 Q 119.77358827773783 183.1078661357147 120.57352051745147 182.90868590910878 L 120.57352051745147 182.90868590910878 Q 121.3734527571651 182.70950568250288 122.20058623885942 182.53777068356695 Z'),
				_Utils_Tuple2(16, 'M 92.49999997019768 198.1004316727301 Q 92.99999994039536 197.84845514923992 93.49999997019768 197.56553192244604 L 94 197.28260869565216 L 94.43182758715083 197.8487225128026 Q 94.86365517430167 198.41483632995303 95.26477502192178 199.01154662670837 L 95.26477502192178 199.01154662670837 Q 95.66589486954189 199.60825692346367 96.01190529175418 200.25987697379563 L 96.01190529175418 200.25987697379563 Q 96.35791571396646 200.91149702412758 96.63494717447426 201.63184611238975 L 96.63494717447426 201.63184611238975 Q 96.91197863498206 202.35219520065192 97.11768645416603 203.1436095112476 L 97.11768645416603 203.1436095112476 Q 97.32339427335 203.9350238218433 97.46490520372637 204.79040242382337 L 97.46490520372637 204.79040242382337 Q 97.60641613410274 205.64578102580344 97.6964808197526 206.5524194730726 L 97.6964808197526 206.5524194730726 Q 97.78654550540244 207.45905792034176 97.8394893501902 208.4026827126728 L 97.8394893501902 208.4026827126728 Q 97.89243319497795 209.34630750500384 97.92112082893783 210.3141006233409 L 97.92112082893783 210.3141006233409 Q 97.94980846289772 211.28189374167798 97.96410230142129 212.26402850401863 L 97.96410230142129 212.26402850401863 Q 97.97839613994486 213.24616326635928 97.98492665824467 214.23603322095187 L 97.98492665824467 214.23603322095187 Q 97.99145717654449 215.22590317554443 97.99418392908335 216.21956311413797 L 97.99418392908335 216.21956311413797 Q 97.99691068162221 217.2132230527315 97.99794712437615 218.20856717679914 L 97.99794712437615 218.20856717679914 Q 97.9989835671301 219.20391130086676 97.99934054933344 220.19993242367138 L 97.99934054933344 220.19993242367138 Q 97.99969753153678 221.19595354647603 97.99980834199766 222.1922199490965 L 97.99980834199766 222.1922199490965 Q 97.99991915245856 223.18848635171702 97.99994995022504 224.18483247713084 L 97.99994995022504 224.18483247713084 Q 97.99998074799151 225.1811786025447 97.99998835206432 226.17754783761706 L 97.99998835206432 226.17754783761706 Q 97.99999595613714 227.17391707268945 97.99999760801359 228.17029223839228 L 97.99999760801359 228.17029223839228 Q 97.99999925989002 229.1666674040951 97.99999957184481 230.16304390486476 L 97.99999957184481 230.16304390486476 Q 97.9999998837996 231.15942040563445 97.99999993423283 232.15579716697815 L 97.99999998466606 233.15217392832184 L 97.9999999983462 235.1449275378797 L 97.99999999986002 237.13768115955975 L 97.99999999999127 239.13043478261739 L 97.99999999999964 241.12318840579746 L 98 243.1159420289855 L 98 245.1086956521739 L 98 247.1014492753623 L 98 249.09420289855072 L 98 251.08695652173913 L 98 253.07971014492753 L 98 255.07246376811594 L 98 257.0652173913044 L 98 259.05797101449275 L 98 261.0507246376811 L 98 263.0434782608695 L 98 265.036231884058 L 98 267.0289855072464 L 98 269.02173913043475 L 98 271.01449275362313 L 98 273.0072463768116 L 98 275 L 96 275 L 94 275 L 92 275 L 90 275 L 88 275 L 86 275 L 86 273.0072463768116 L 86 271.01449275362313 L 86 269.02173913043475 L 86 267.0289855072464 L 86 265.036231884058 L 86 263.0434782608695 L 86 261.0507246376811 L 86 259.05797101449275 L 86 257.0652173913044 L 86 255.07246376811594 L 86 253.07971014492753 L 86 251.08695652173913 L 86 249.09420289855072 L 86 247.1014492753623 L 86 245.10869565217394 L 86.00000000000036 243.11594202898584 L 86.00000000000871 241.12318840580576 L 86.00000000013962 239.13043478274778 L 86.00000000164509 237.1376811610594 L 86.00000001519432 235.14492755137115 L 86.00000006487481 234.14855078927744 Q 86.0000001145553 233.15217402718372 86.00000041973549 232.15579751966396 L 86.00000041973549 232.15579751966396 Q 86.00000072491567 231.1594210121442 86.00000232711162 230.1630457969409 L 86.00000232711162 230.1630457969409 Q 86.00000392930755 229.1666705817376 86.00001122820018 228.17030104259078 L 86.00001122820018 228.17030104259078 Q 86.00001852709282 227.17393150344395 86.00004772266335 226.1775837816392 L 86.00004772266335 226.1775837816392 Q 86.00007691823389 225.1812360598345 86.00018042980214 224.18496238476664 L 86.00018042980214 224.18496238476664 Q 86.0002839413704 223.18868870969877 86.00061172800321 222.19263849710467 L 86.00061172800321 222.19263849710467 Q 86.00093951463602 221.19658828451054 86.0018724458217 220.20114102391656 L 86.0018724458217 220.20114102391656 Q 86.00280537700739 219.20569376332259 86.00520434291344 218.21170722572896 L 86.00520434291344 218.21170722572896 Q 86.0076033088195 217.21772068813536 86.01320089593362 216.22692118254253 L 86.01320089593362 216.22692118254253 Q 86.01879848304775 215.23612167694972 86.03069335566525 214.25159664060848 L 86.03069335566525 214.25159664060848 Q 86.04258822828277 213.26707160426724 86.06567827512853 212.2937011799288 L 86.06567827512853 212.2937011799288 Q 86.0887683219743 211.32033075559033 86.12981729414454 210.36485418800635 L 86.12981729414454 210.36485418800635 Q 86.17086626631479 209.40937762042233 86.23784090511887 208.47973278589743 L 86.23784090511887 208.47973278589743 Q 86.30481554392296 207.55008795137252 86.40527750212908 206.65380910538224 L 86.40527750212908 206.65380910538224 Q 86.5057394603352 205.75753025939196 86.6444726407151 204.899383971727 L 86.6444726407151 204.899383971727 Q 86.78320582109498 204.041237684062 86.95977532339666 203.22079063019592 L 86.95977532339666 203.22079063019592 Q 87.13634482569833 202.40034357632985 87.34362206753073 201.61049300206867 L 87.34362206753073 201.61049300206867 Q 87.55089930936313 200.82064242780746 87.77544965468157 200.048002373324 L 88 199.27536231884056 L 88.49999997019768 199.2271596975716 Q 88.99999994039536 199.17895707630265 89.49999997019768 199.09880799592813 L 89.49999997019768 199.09880799592813 Q 90 199.0186589155536 90.50000002980232 198.88354284661926 L 90.50000002980232 198.88354284661926 Q 91.00000005960464 198.74842677768493 91.50000002980232 198.55041748695263 L 91.50000002980232 198.55041748695263 Q 92 198.35240819622032 92.49999997019768 198.1004316727301 Z')
			])),
	ei: false,
	ac: 7,
	aQ: _List_fromArray(
		[
			{
			bC: 3639.195551840933,
			q: -1,
			r: {c: 31, a: 30.88768115942029},
			f: 0,
			I: _List_fromArray(
				[1]),
			a3: _List_Nil,
			u: {c: 31, a: 30.88768115942029}
		},
			{
			bC: 3423.2451472767098,
			q: -1,
			r: {c: 25, a: 86.68478260869566},
			f: 1,
			I: _List_fromArray(
				[0, 2, 10]),
			a3: _List_Nil,
			u: {c: 25, a: 86.68478260869566}
		},
			{
			bC: 7926.826870825935,
			q: -1,
			r: {c: 89, a: 68.75},
			f: 2,
			I: _List_fromArray(
				[1, 3, 7, 10]),
			a3: _List_Nil,
			u: {c: 89, a: 68.75}
		},
			{
			bC: 4093.4483958524515,
			q: -1,
			r: {c: 189, a: 24.90942028985507},
			f: 3,
			I: _List_fromArray(
				[2, 4]),
			a3: _List_Nil,
			u: {c: 189, a: 24.90942028985507}
		},
			{
			bC: 5286.803422453972,
			q: -1,
			r: {c: 237, a: 62.77173913043478},
			f: 4,
			I: _List_fromArray(
				[3, 5, 8]),
			a3: _List_Nil,
			u: {c: 237, a: 62.77173913043478}
		},
			{
			bC: 4307.610104917265,
			q: -1,
			r: {c: 283, a: 86.68478260869566},
			f: 5,
			I: _List_fromArray(
				[4, 6, 9]),
			a3: _List_Nil,
			u: {c: 283, a: 86.68478260869566}
		},
			{
			bC: 5029.09507043255,
			q: -1,
			r: {c: 285, a: 30.88768115942029},
			f: 6,
			I: _List_fromArray(
				[5]),
			a3: _List_Nil,
			u: {c: 285, a: 30.88768115942029}
		},
			{
			bC: 3124.196702728401,
			q: -1,
			r: {c: 129, a: 106.6123188405797},
			f: 7,
			I: _List_fromArray(
				[2, 8, 11]),
			a3: _List_Nil,
			u: {c: 129, a: 106.6123188405797}
		},
			{
			bC: 3296.0871744169685,
			q: -1,
			r: {c: 187, a: 104.6195652173913},
			f: 8,
			I: _List_fromArray(
				[4, 7, 11]),
			a3: _List_Nil,
			u: {c: 187, a: 104.6195652173913}
		},
			{
			bC: 6028.828189398782,
			q: -1,
			r: {c: 245, a: 134.51086956521738},
			f: 9,
			I: _List_fromArray(
				[5, 11, 13]),
			a3: _List_Nil,
			u: {c: 245, a: 134.51086956521738}
		},
			{
			bC: 5428.493950044953,
			q: -1,
			r: {c: 53, a: 132.51811594202897},
			f: 10,
			I: _List_fromArray(
				[1, 2, 11, 12]),
			a3: _List_Nil,
			u: {c: 53, a: 132.51811594202897}
		},
			{
			bC: 5124.048322329842,
			q: -1,
			r: {c: 151, a: 152.44565217391303},
			f: 11,
			I: _List_fromArray(
				[7, 8, 9, 10, 14, 15, 16]),
			a3: _List_Nil,
			u: {c: 151, a: 152.44565217391303}
		},
			{
			bC: 10196.150652690698,
			q: -1,
			r: {c: 43, a: 198.27898550724638},
			f: 12,
			I: _List_fromArray(
				[10, 16]),
			a3: _List_Nil,
			u: {c: 43, a: 198.27898550724638}
		},
			{
			bC: 8891.687160710131,
			q: -1,
			r: {c: 297, a: 198.27898550724638},
			f: 13,
			I: _List_fromArray(
				[9, 14]),
			a3: _List_Nil,
			u: {c: 297, a: 198.27898550724638}
		},
			{
			bC: 9333.607249891036,
			q: -1,
			r: {c: 227, a: 230.16304347826087},
			f: 14,
			I: _List_fromArray(
				[11, 13, 15]),
			a3: _List_Nil,
			u: {c: 227, a: 230.16304347826087}
		},
			{
			bC: 7474.27477769134,
			q: -1,
			r: {c: 141, a: 224.18478260869566},
			f: 15,
			I: _List_fromArray(
				[11, 14, 16]),
			a3: _List_Nil,
			u: {c: 141, a: 224.18478260869566}
		},
			{
			bC: 896.4012564980276,
			q: -1,
			r: {c: 93, a: 204.2572463768116},
			f: 16,
			I: _List_fromArray(
				[11, 12, 15]),
			a3: _List_Nil,
			u: {c: 93, a: 204.2572463768116}
		}
		]),
	bx: 340
};
var $author$project$FormulaMosaic$generate = function (model) {
	if ($elm$core$String$length(model.N) > 120) {
		return _Utils_update(
			model,
			{X: 'For this lab, use at most six variables and 120 characters.'});
	} else {
		var _v0 = $author$project$FormulaParser$parse(model.N);
		if (_v0.$ === 1) {
			return _Utils_update(
				model,
				{X: 'Use variable names, !, &, |, and parentheses. For example: !(a & b).'});
		} else {
			var ast = _v0.a;
			var variables = $author$project$FormulaParser$collectVariables(ast);
			if ($elm$core$List$length(variables) > 6) {
				return _Utils_update(
					model,
					{X: 'For this lab, use at most six variables and 120 characters.'});
			} else {
				var tiling = ((model.N === '!(a & b)') && (model.ac === 7)) ? $author$project$Generated$DefaultTiling$tiling : A2($author$project$GenerativeTiling$generateOrganic, model.ac, ast);
				return A2(
					$author$project$FormulaMosaic$paintRow,
					0,
					_Utils_update(
						model,
						{
							X: '',
							at: $elm$core$Maybe$Just(
								{
									b3: ast,
									F: model.N,
									am: $author$project$FormulaParser$buildTruthTable(ast),
									aS: variables
								}),
							aN: tiling,
							aG: tiling
						}));
			}
		}
	}
};
var $author$project$FormulaMosaic$init = $author$project$FormulaMosaic$generate(
	{aX: true, bi: 44, X: '', at: $elm$core$Maybe$Nothing, N: '!(a & b)', O: $elm$core$Maybe$Nothing, Z: $elm$core$Maybe$Nothing, aN: $author$project$Generated$DefaultTiling$tiling, aC: _List_Nil, aD: _List_Nil, aF: 0, ac: 7, aG: $author$project$Generated$DefaultTiling$tiling});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$GenerativeTiling$generateFor = F2(
	function (formula, config) {
		return A2(
			$author$project$GenerativeTiling$generateOrganic,
			config.ac,
			A2(
				$elm$core$Result$withDefault,
				$author$project$FormulaParser$Var('a'),
				$author$project$FormulaParser$parse(formula)));
	});
var $author$project$FormulaMosaic$rebuildTiling = F3(
	function (seed, density, model) {
		var tiling = A2(
			$author$project$GenerativeTiling$generateFor,
			A2(
				$elm$core$Maybe$withDefault,
				model.N,
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.F;
					},
					model.at)),
			{dH: density, bl: 600, ac: seed, bx: 960});
		return A2(
			$author$project$FormulaMosaic$paintRow,
			model.aF,
			_Utils_update(
				model,
				{bi: density, aN: tiling, ac: seed, aG: tiling}));
	});
var $author$project$FormulaMosaic$toggle = F2(
	function (variable, model) {
		var _v0 = model.at;
		if (_v0.$ === 1) {
			return model;
		} else {
			var formula = _v0.a;
			var _v1 = $elm$core$List$head(
				A2($elm$core$List$drop, model.aF, formula.am));
			if (_v1.$ === 1) {
				return model;
			} else {
				var row = _v1.a;
				var assignment = A3(
					$elm$core$Dict$update,
					variable,
					$elm$core$Maybe$map($elm$core$Basics$not),
					row.bD);
				var index = A2(
					$elm$core$Maybe$withDefault,
					0,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$first,
						$elm$core$List$head(
							A2(
								$elm$core$List$filter,
								function (_v2) {
									var r = _v2.b;
									return _Utils_eq(r.bD, assignment);
								},
								A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, formula.am)))));
				return A2($author$project$FormulaMosaic$paintRow, index, model);
			}
		}
	});
var $author$project$FormulaMosaic$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 6:
				return _Utils_update(
					model,
					{
						O: A2(
							$elm$core$Maybe$withDefault,
							model.O,
							A2(
								$elm$core$Maybe$map,
								$elm$core$Maybe$Just,
								$elm$core$List$head(model.aD))),
						Z: A2(
							$elm$core$Maybe$withDefault,
							model.Z,
							A2(
								$elm$core$Maybe$map,
								$elm$core$Maybe$Just,
								$elm$core$List$head(model.aC))),
						aC: A2($elm$core$List$drop, 1, model.aC),
						aD: A2($elm$core$List$drop, 1, model.aD)
					});
			case 7:
				var enabled = msg.a;
				return _Utils_update(
					model,
					{aX: enabled});
			case 0:
				var source = msg.a;
				return $author$project$FormulaMosaic$generate(
					_Utils_update(
						model,
						{X: '', N: source}));
			case 1:
				var source = msg.a;
				return $author$project$FormulaMosaic$generate(
					_Utils_update(
						model,
						{N: source}));
			case 2:
				var index = msg.a;
				return A2($author$project$FormulaMosaic$paintRow, index, model);
			case 3:
				var variable = msg.a;
				return A2($author$project$FormulaMosaic$toggle, variable, model);
			case 4:
				var cell = msg.a;
				return A2(
					$elm$core$Maybe$withDefault,
					model,
					A2(
						$elm$core$Maybe$map,
						function (name) {
							return A2($author$project$FormulaMosaic$toggle, name, model);
						},
						A2(
							$elm$core$Maybe$andThen,
							function ($) {
								return $.c0;
							},
							A2(
								$elm$core$Maybe$andThen,
								function (organic) {
									return $elm$core$List$head(
										A2(
											$elm$core$List$filter,
											function (t) {
												return _Utils_eq(t.cY.f, cell);
											},
											organic.aQ));
								},
								model.Z))));
			case 5:
				var cell = msg.a;
				var _v1 = model.O;
				if (_v1.$ === 1) {
					return model;
				} else {
					var mosaic = _v1.a;
					return A2(
						$elm$core$Maybe$withDefault,
						model,
						A2(
							$elm$core$Maybe$map,
							function (name) {
								return A2($author$project$FormulaMosaic$toggle, name, model);
							},
							A2(
								$elm$core$Maybe$andThen,
								function ($) {
									return $.c0;
								},
								$elm$core$List$head(
									A2(
										$elm$core$List$filter,
										function (t) {
											return _Utils_eq(t.cY.f, cell);
										},
										mosaic.aQ)))));
				}
			case 8:
				return A3($author$project$FormulaMosaic$rebuildTiling, model.ac + 11, model.bi, model);
			default:
				var raw = msg.a;
				var _v2 = $elm$core$String$toInt(raw);
				if (!_v2.$) {
					var n = _v2.a;
					return A3(
						$author$project$FormulaMosaic$rebuildTiling,
						model.ac,
						A3($elm$core$Basics$clamp, 30, 56, n),
						model);
				} else {
					return model;
				}
		}
	});
var $author$project$FormulaMosaic$AnimateSignals = function (a) {
	return {$: 7, a: a};
};
var $author$project$FormulaMosaic$ClickOrganicTile = function (a) {
	return {$: 4, a: a};
};
var $author$project$FormulaMosaic$ClickTile = function (a) {
	return {$: 5, a: a};
};
var $author$project$FormulaMosaic$EditFormula = function (a) {
	return {$: 0, a: a};
};
var $author$project$FormulaMosaic$Example = function (a) {
	return {$: 1, a: a};
};
var $author$project$FormulaMosaic$Reseed = {$: 8};
var $author$project$FormulaMosaic$ToggleInput = function (a) {
	return {$: 3, a: a};
};
var $author$project$FormulaExamples$all = _List_fromArray(
	[
		{E: 'NAND', F: '!(a & b)'},
		{E: 'OR', F: 'a | b'},
		{E: 'AND', F: 'a & b'},
		{E: 'NOR', F: '!(a | b)'},
		{E: 'Exclusive OR', F: '(a | b) & !(a & b)'},
		{E: 'Implication', F: '!a | b'},
		{E: 'Multiplexer', F: '(!s & a) | (s & b)'},
		{E: 'Majority of three', F: '(a & b) | (a & c) | (b & c)'},
		{E: 'Enabled OR', F: '(a | b) & !c'},
		{E: 'Three pairs', F: '(a & b) | (c & d) | (e & f)'},
		{E: 'Always true', F: 'a | !a'},
		{E: 'Contradiction', F: 'a & !a'}
	]);
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $author$project$FormulaMosaic$css = '\n.mosaic-lab { color: #f4efe6; background: #161310; min-height: 100vh; padding: 28px max(16px, calc((100vw - 1100px) / 2)); font: 16px/1.5 system-ui, sans-serif; }\n.mosaic-lab * { box-sizing: border-box; }\n.mosaic-hero { padding: 10px 0 18px; }\n.eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .18em; color: #c9a56a; }\n.mosaic-hero h1 { font-size: clamp(34px, 6vw, 64px); line-height: 1.05; margin: 10px 0 12px; color: #fff8ec; }\n.mosaic-hero p, .hint, .mosaic-foot { color: #cbbda8; }\n.mosaic-hero p { max-width: 640px; }\n.mosaic-lab h2 { font-size: 22px; margin: 0 0 10px; color: #fff8ec; }\n.mosaic-bar, .mosaic-stage, .mosaic-table { background: #211c18; border: 1px solid #3a322b; border-radius: 16px; padding: 22px; margin: 16px 0; }\n.mosaic-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }\n.mosaic-row.wrap { margin-bottom: 16px; }\n.mosaic-lab button { cursor: pointer; padding: 9px 14px; border: 1px solid #5a4c3e; border-radius: 8px; background: #2b241e; color: #fff8ec; font: inherit; }\n.mosaic-lab button:hover { background: #3a3128; }\n.mosaic-lab input:not([type=range]) { min-width: 0; flex: 1; padding: 12px; border: 1px solid #5a4c3e; border-radius: 8px; font: 18px monospace; background: #161310; color: #fff8ec; }\n.mosaic-lab label { font-weight: 700; }\n.mosaic-lab button:focus-visible, .mosaic-lab input:focus-visible, .mosaic-lab g:focus-visible { outline: 3px solid #df9b27; outline-offset: 3px; }\n.mosaic-error { padding: 12px; color: #ffd4cc; background: #4a1f1c; border-radius: 8px; }\n.mosaic-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; margin-bottom: 8px; }\n.mosaic-tools label { display: flex; align-items: center; gap: 10px; font-weight: 650; }\n.mosaic-lab input[type=range] { width: 160px; }\n.mosaic-surface { display: block; width: 100%; aspect-ratio: 8 / 5; border-radius: 12px; background: #120e0c; }\n.mosaic-cell.is-input { cursor: pointer; }\n.mosaic-cell.is-input:focus { outline: none; }\n\n.swatches { display: flex; gap: 12px; margin-left: auto; }\n.swatch-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #cbbda8; }\n.swatch { display: inline-block; width: 14px; height: 14px; border-radius: 50%; }\n.table-scroll { overflow: auto; max-height: 420px; }\n.mosaic-lab table { border-collapse: collapse; width: 100%; text-align: center; }\n.mosaic-lab td, .mosaic-lab th { padding: 8px; border-bottom: 1px solid #3a322b; }\n.mosaic-lab th { background: #2b241e; }\n.selected-row { background: #3a2e18; }\n.mosaic-foot { font-size: 13px; }\nbody { margin: 0; }\n@media (max-width: 760px) { .mosaic-bar, .mosaic-stage, .mosaic-table { padding: 16px; } .swatches { margin-left: 0; } }\n';
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$pointerEvents = _VirtualDom_attribute('pointer-events');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $author$project$GenerativeTiling$px = function (p) {
	return $elm$core$String$fromFloat(p.c) + (' ' + $elm$core$String$fromFloat(p.a));
};
var $author$project$GenerativeTiling$outline = function (points) {
	if (!points.b) {
		return '';
	} else {
		var start = points.a;
		var rest = points.b;
		return 'M ' + ($author$project$GenerativeTiling$px(start) + (' ' + (A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				function (pt) {
					return 'L ' + $author$project$GenerativeTiling$px(pt);
				},
				rest)) + ' Z')));
	}
};
var $author$project$GenerativeTiling$distance = F2(
	function (a, b) {
		var dy = a.a - b.a;
		var dx = a.c - b.c;
		return $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
	});
var $author$project$GenerativeTiling$mix = F3(
	function (t, a, b) {
		return {c: a.c + ((b.c - a.c) * t), a: a.a + ((b.a - a.a) * t)};
	});
var $author$project$GenerativeTiling$near = F2(
	function (a, b) {
		return A2($author$project$GenerativeTiling$distance, a, b) < 0.00001;
	});
var $author$project$GenerativeTiling$pointKey = function (p) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(p.c * 1000000)) + (',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(p.a * 1000000)));
};
var $author$project$GenerativeTiling$wavyPath = F2(
	function (tiling, tile) {
		var segment = function (_v6) {
			var a = _v6.a;
			var p = _v6.b;
			var b = _v6.c;
			return 'Q ' + ($author$project$GenerativeTiling$px(p) + (' ' + $author$project$GenerativeTiling$px(b)));
		};
		var rounded = function (p) {
			return (p.c > 0.001) && ((p.a > 0.001) && ((_Utils_cmp(p.c, tiling.bx - 0.001) < 0) && ((_Utils_cmp(p.a, tiling.bl - 0.001) < 0) && ($elm$core$List$length(
				A2(
					$elm$core$List$filter,
					function (t) {
						return A2(
							$elm$core$List$any,
							function (q) {
								return _Utils_eq(
									$author$project$GenerativeTiling$pointKey(p),
									$author$project$GenerativeTiling$pointKey(q));
							},
							t.a3);
					},
					tiling.aQ)) === 2))));
		};
		var points = tile.a3;
		var edge = F2(
			function (_v4, _v5) {
				var a = _v4.c;
				var b = _v5.a;
				return 'Q ' + ($author$project$GenerativeTiling$px(
					A3($author$project$GenerativeTiling$mix, 0.5, a, b)) + (' ' + $author$project$GenerativeTiling$px(b)));
			});
		var boundaries = A2(
			$elm$core$List$concatMap,
			function (t) {
				return A3(
					$elm$core$List$map2,
					$elm$core$Tuple$pair,
					t.a3,
					_Utils_ap(
						A2($elm$core$List$drop, 1, t.a3),
						A2($elm$core$List$take, 1, t.a3)));
			},
			tiling.aQ);
		var clearance = function (p) {
			var toSegment = function (_v3) {
				var a = _v3.a;
				var b = _v3.b;
				var dy = b.a - a.a;
				var dx = b.c - a.c;
				var t = A3(
					$elm$core$Basics$clamp,
					0,
					1,
					(((p.c - a.c) * dx) + ((p.a - a.a) * dy)) / A2($elm$core$Basics$max, 0.000001, (dx * dx) + (dy * dy)));
				return A2(
					$author$project$GenerativeTiling$distance,
					p,
					A3($author$project$GenerativeTiling$mix, t, a, b));
			};
			return A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$List$minimum(
					A2(
						$elm$core$List$map,
						toSegment,
						A2(
							$elm$core$List$filter,
							function (_v2) {
								var a = _v2.a;
								var b = _v2.b;
								return !(A2($author$project$GenerativeTiling$near, p, a) || A2($author$project$GenerativeTiling$near, p, b));
							},
							boundaries))));
		};
		var corners = A4(
			$elm$core$List$map3,
			F3(
				function (before, p, after) {
					var radius = rounded(p) ? (0.42 * clearance(p)) : 0;
					var cut = function (q) {
						return A3(
							$author$project$GenerativeTiling$mix,
							A2(
								$elm$core$Basics$min,
								0.48,
								radius / A2(
									$elm$core$Basics$max,
									0.000001,
									A2($author$project$GenerativeTiling$distance, p, q))),
							p,
							q);
					};
					return _Utils_Tuple3(
						cut(before),
						p,
						cut(after));
				}),
			_Utils_ap(
				A2(
					$elm$core$List$drop,
					$elm$core$List$length(points) - 1,
					points),
				A2(
					$elm$core$List$take,
					$elm$core$List$length(points) - 1,
					points)),
			points,
			_Utils_ap(
				A2($elm$core$List$drop, 1, points),
				A2($elm$core$List$take, 1, points)));
		if (!corners.b) {
			return '';
		} else {
			var first = corners.a;
			var _v1 = first;
			var start = _v1.a;
			return 'M ' + ($author$project$GenerativeTiling$px(start) + (' ' + (A2(
				$elm$core$String$join,
				' ',
				A3(
					$elm$core$List$map2,
					F2(
						function (current, next) {
							return segment(current) + (' ' + A2(edge, current, next));
						}),
					corners,
					_Utils_ap(
						A2($elm$core$List$drop, 1, corners),
						_List_fromArray(
							[first])))) + ' Z')));
		}
	});
var $author$project$GenerativeTiling$tilePath = F2(
	function (tiling, tile) {
		return A2(
			$elm$core$Maybe$withDefault,
			(!_Utils_eq(tiling.dD, $elm$core$Maybe$Nothing)) ? $author$project$GenerativeTiling$outline(tile.a3) : A2($author$project$GenerativeTiling$wavyPath, tiling, tile),
			A2($elm$core$Dict$get, tile.f, tiling.ef));
	});
var $author$project$GenerativeTiling$interactionOutline = F3(
	function (tiling, changed, tile) {
		return A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d(
					A2($author$project$GenerativeTiling$tilePath, tiling, tile.cY)),
					$elm$svg$Svg$Attributes$class('tile-highlight'),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-highlight',
					$elm$core$String$fromInt(tile.cY.f)),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-changing',
					A2($elm$core$List$member, tile.cY.f, changed) ? 'true' : 'false'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$pointerEvents('none'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round'),
					A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke')
				]),
			_List_Nil);
	});
var $author$project$GenerativeTiling$mapKind = function (tiling) {
	return tiling.ei ? 'tiles' : ((!$elm$core$Dict$isEmpty(tiling.ef)) ? 'organic' : 'graph');
};
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$GenerativeTiling$neighborInspector = function (colored) {
	var scope = '.mosaic-map[data-view=\"' + ($author$project$GenerativeTiling$mapKind(colored.aG) + '\"]');
	var selector = F2(
		function (id, pseudo) {
			return scope + (((pseudo === ':focus-visible') ? ':not(:has(.mosaic-cell:hover))' : '') + (':has(.mosaic-cell[data-region=\"' + ($elm$core$String$fromInt(id) + ('\"]' + (pseudo + ')')))));
		});
	var rules = function (tile) {
		var roots = A2(
			$elm$core$List$map,
			selector(tile.cY.f),
			_List_fromArray(
				[':hover', ':focus-visible']));
		var highlighted = A2(
			$elm$core$List$map,
			function (root) {
				return root + (' .tile-highlight[data-highlight=\"' + ($elm$core$String$fromInt(tile.cY.f) + '\"]'));
			},
			roots);
		return A2($elm$core$String$join, ',', highlighted) + ('{stroke:#fffdf6;stroke-width:3;opacity:1;filter:drop-shadow(0 0 1px #142126)}' + (A2(
			$elm$core$String$join,
			',',
			A2(
				$elm$core$List$map,
				function (root) {
					return root + (' .map-region-info[data-info=\"' + ($elm$core$String$fromInt(tile.cY.f) + '\"]'));
				},
				roots)) + '{display:block}'));
	};
	var info = function (tile) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('map-region-info'),
					$elm$html$Html$Attributes$id(
					$author$project$GenerativeTiling$mapKind(colored.aG) + ('-region-info-' + $elm$core$String$fromInt(tile.cY.f))),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-info',
					$elm$core$String$fromInt(tile.cY.f))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							'Region ' + ($elm$core$String$fromInt(tile.cY.f + 1) + ((tile.aw === '') ? '' : (' · ' + tile.aw))))
						])),
					$elm$html$Html$text(
					' — ' + (tile.bo + ('. Shared-border neighbors: ' + (A2(
						$elm$core$String$join,
						', ',
						A2(
							$elm$core$List$map,
							function (id) {
								return $elm$core$String$fromInt(id + 1);
							},
							tile.cY.I)) + '.'))))
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('map-neighbor-inspector')
			]),
		_List_fromArray(
			[
				A3(
				$elm$html$Html$node,
				'style',
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						$elm$core$String$concat(
							A2($elm$core$List$map, rules, colored.aQ)))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('map-inspector-hint')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Hover or focus a tile to trace its outline and inspect its neighbors.')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('map-region-information')
					]),
				A2($elm$core$List$map, info, colored.aQ))
			]));
};
var $elm$svg$Svg$Attributes$preserveAspectRatio = _VirtualDom_attribute('preserveAspectRatio');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var $elm$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$Attributes$fontWeight = _VirtualDom_attribute('font-weight');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$GraphColoring$colors = $elm$core$Array$fromList(
	_List_fromArray(
		['#bb5961', '#397d68', '#426f9f', '#d2ac58']));
var $author$project$GraphColoring$getColor = function (idx) {
	return A2(
		$elm$core$Maybe$withDefault,
		'#999999',
		A2($elm$core$Array$get, idx, $author$project$GraphColoring$colors));
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $author$project$GenerativeTiling$keyActivate = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'keydown',
		A2(
			$elm$json$Json$Decode$andThen,
			function (key) {
				return ((key === 'Enter') || (key === ' ')) ? $elm$json$Json$Decode$succeed(
					_Utils_Tuple2(msg, true)) : $elm$json$Json$Decode$fail('Not an activation key');
			},
			A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)));
};
var $elm$svg$Svg$Attributes$letterSpacing = _VirtualDom_attribute('letter-spacing');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$title = $elm$svg$Svg$trustedNode('title');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$GenerativeTiling$viewTile = F4(
	function (onTile, tiling, changed, tile) {
		var path = A2($author$project$GenerativeTiling$tilePath, tiling, tile.cY);
		var labeled = tile.aw !== '';
		var labelPoint = tile.cY.r;
		var fill = (tile.aq < 0) ? '#b8c3cc' : $author$project$GraphColoring$getColor(tile.aq);
		var clickable = !_Utils_eq(tile.c0, $elm$core$Maybe$Nothing);
		var attrs = clickable ? _List_fromArray(
			[
				$elm$html$Html$Events$onClick(
				onTile(tile.cY.f)),
				A2($elm$html$Html$Attributes$attribute, 'tabindex', '0'),
				A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
				$author$project$GenerativeTiling$keyActivate(
				onTile(tile.cY.f)),
				$elm$svg$Svg$Attributes$class('mosaic-cell is-input')
			]) : _List_fromArray(
			[
				$elm$svg$Svg$Attributes$class('mosaic-cell'),
				A2($elm$html$Html$Attributes$attribute, 'tabindex', '0')
			]);
		return A2(
			$elm$svg$Svg$g,
			_Utils_ap(
				attrs,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-region',
						$elm$core$String$fromInt(tile.cY.f)),
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-color',
						$elm$core$String$fromInt(tile.aq)),
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-neighbors',
						A2(
							$elm$core$String$join,
							',',
							A2($elm$core$List$map, $elm$core$String$fromInt, tile.cY.I))),
						A2(
						$elm$html$Html$Attributes$attribute,
						'aria-describedby',
						$author$project$GenerativeTiling$mapKind(tiling) + ('-region-info-' + $elm$core$String$fromInt(tile.cY.f))),
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-changing',
						A2($elm$core$List$member, tile.cY.f, changed) ? 'true' : 'false'),
						A2(
						$elm$html$Html$Attributes$attribute,
						'aria-label',
						labeled ? tile.aw : 'Mosaic region')
					])),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$title,
					_List_Nil,
					_List_fromArray(
						[
							$elm$svg$Svg$text(
							'Region ' + ($elm$core$String$fromInt(tile.cY.f + 1) + (' · ' + tile.bo)))
						])),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d(path),
							$elm$svg$Svg$Attributes$fill(fill),
							$elm$svg$Svg$Attributes$fillRule('evenodd'),
							$elm$svg$Svg$Attributes$stroke('#11171c'),
							$elm$svg$Svg$Attributes$strokeWidth('0.7'),
							A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round'),
							$elm$svg$Svg$Attributes$strokeLinecap('round')
						]),
					_List_Nil),
					labeled ? A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromFloat(labelPoint.c)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromFloat(labelPoint.a)),
							$elm$svg$Svg$Attributes$textAnchor('middle'),
							$elm$svg$Svg$Attributes$dominantBaseline('middle'),
							$elm$svg$Svg$Attributes$fontSize(
							($author$project$GenerativeTiling$mapKind(tiling) === 'graph') ? '9' : '15'),
							$elm$svg$Svg$Attributes$fill('#fffdf6'),
							$elm$svg$Svg$Attributes$stroke('#142126'),
							$elm$svg$Svg$Attributes$strokeWidth('1.5'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round'),
							A2($elm$html$Html$Attributes$style, 'paint-order', 'stroke'),
							$elm$svg$Svg$Attributes$fontWeight('700'),
							$elm$svg$Svg$Attributes$letterSpacing('0.04em'),
							$elm$svg$Svg$Attributes$pointerEvents('none')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text(tile.aw)
						])) : $elm$svg$Svg$text('')
				]));
	});
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$GenerativeTiling$paint = F2(
	function (onTile, colored) {
		var w = colored.aG.bx;
		var h = colored.aG.bl;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mosaic-map'),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-view',
					$author$project$GenerativeTiling$mapKind(colored.aG)),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-propagating',
					A2($elm$core$String$startsWith, 'Propagating', colored.ey) ? 'true' : 'false')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$svg,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$viewBox(
							'-12 -12 ' + ($elm$core$String$fromFloat(w + 24) + (' ' + $elm$core$String$fromFloat(h + 24)))),
							$elm$svg$Svg$Attributes$class('mosaic-surface'),
							A2(
							$elm$html$Html$Attributes$style,
							'aspect-ratio',
							$elm$core$String$fromFloat(w + 24) + (' / ' + $elm$core$String$fromFloat(h + 24))),
							A2($elm$html$Html$Attributes$style, 'max-height', '760px'),
							A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Formula map with closed edges; opposite sides do not connect'),
							$elm$svg$Svg$Attributes$preserveAspectRatio('xMidYMid meet')
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$elm$svg$Svg$rect,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$width(
									$elm$core$String$fromFloat(w)),
									$elm$svg$Svg$Attributes$height(
									$elm$core$String$fromFloat(h)),
									$elm$svg$Svg$Attributes$fill('#141e27')
								]),
							_List_Nil),
						_Utils_ap(
							A2(
								$elm$core$List$map,
								A3($author$project$GenerativeTiling$viewTile, onTile, colored.aG, colored.aZ),
								colored.aQ),
							_Utils_ap(
								A2(
									$elm$core$List$map,
									A2($author$project$GenerativeTiling$interactionOutline, colored.aG, colored.aZ),
									colored.aQ),
								_List_fromArray(
									[
										A2(
										$elm$svg$Svg$rect,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$width(
												$elm$core$String$fromFloat(w)),
												$elm$svg$Svg$Attributes$height(
												$elm$core$String$fromFloat(h)),
												$elm$svg$Svg$Attributes$fill('none'),
												$elm$svg$Svg$Attributes$stroke('var(--ink)'),
												$elm$svg$Svg$Attributes$strokeWidth('2.5'),
												$elm$svg$Svg$Attributes$class('mosaic-frame'),
												$elm$svg$Svg$Attributes$pointerEvents('none'),
												A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke')
											]),
										_List_Nil)
									]))))),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('small-note mosaic-boundary-note')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							colored.aG.ei ? 'Original 6 × 5 tile map: every pair of tiles sharing a border must have different colors. Input and OUT clues use formula values. Opposite edges do not connect.' : (($author$project$GenerativeTiling$mapKind(colored.aG) === 'organic') ? 'Cells grow and merge into a fully packed map. Equal pins share territory; neutral and extra cells fill the remaining space. Shared borders preserve the logic, and OUT is forced by the inputs. Pale tiles are unresolved while the signal travels; opposite edges do not connect.' : 'The same nodes and colors before expansion. Every contact represents a three-color constraint.'))
						])),
					$author$project$GenerativeTiling$neighborInspector(colored)
				]));
	});
var $author$project$GenerativeTiling$paintSkeleton = F2(
	function (onTile, colored) {
		var _v0 = colored.aG.dD;
		if (_v0.$ === 1) {
			return $elm$html$Html$text('');
		} else {
			var map = _v0.a;
			var tiles = A2(
				$elm$core$List$map,
				function (r) {
					return {
						bC: $elm$core$Basics$abs(
							$author$project$GenerativeTiling$shoelace(r.a3)),
						q: -1,
						r: r.af,
						f: r.f,
						I: r.I,
						a3: r.a3,
						u: r.af
					};
				},
				map.m);
			var values = A3(
				$elm$core$List$map2,
				F2(
					function (value, tile) {
						return _Utils_update(
							value,
							{cY: tile});
					}),
				colored.aQ,
				tiles);
			var original = colored.aG;
			var tiling = _Utils_update(
				original,
				{ef: $elm$core$Dict$empty, aQ: tiles});
			return A2(
				$author$project$GenerativeTiling$paint,
				onTile,
				_Utils_update(
					colored,
					{aQ: values, aG: tiling}));
		}
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$GenerativeTiling$propagationControls = F4(
	function (animate, pending, onAnimate, onStep) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('lab-actions mosaic-row propagation-controls')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$label,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$type_('checkbox'),
									$elm$html$Html$Attributes$checked(animate),
									$elm$html$Html$Events$onCheck(onAnimate)
								]),
							_List_Nil),
							$elm$html$Html$text(' Animate coloring')
						])),
					A2(
					$elm$html$Html$button,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(onStep),
							$elm$html$Html$Attributes$disabled(!pending)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Step propagation')
						]))
				]));
	});
var $elm$html$Html$section = _VirtualDom_node('section');
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$FormulaMosaic$swatch = F2(
	function (color, name) {
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('swatch-item')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('swatch'),
							A2(
							$elm$html$Html$Attributes$style,
							'background',
							$author$project$GraphColoring$getColor(color))
						]),
					_List_Nil),
					$elm$html$Html$text(name)
				]));
	});
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$FormulaMosaic$SelectRow = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$FormulaMosaic$viewTruthTable = F2(
	function (model, formula) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('table-scroll')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$table,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$thead,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$tr,
									_List_Nil,
									_Utils_ap(
										A2(
											$elm$core$List$map,
											function (name) {
												return A2(
													$elm$html$Html$th,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(name)
														]));
											},
											formula.aS),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$th,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('OUT')
													])),
												A2(
												$elm$html$Html$th,
												_List_Nil,
												_List_fromArray(
													[
														$elm$html$Html$text('View')
													]))
											])))
								])),
							A2(
							$elm$html$Html$tbody,
							_List_Nil,
							A2(
								$elm$core$List$indexedMap,
								F2(
									function (i, row) {
										return A2(
											$elm$html$Html$tr,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$classList(
													_List_fromArray(
														[
															_Utils_Tuple2(
															'selected-row',
															_Utils_eq(i, model.aF))
														]))
												]),
											_Utils_ap(
												A2(
													$elm$core$List$map,
													function (name) {
														return A2(
															$elm$html$Html$td,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text(
																	_Utils_eq(
																		A2($elm$core$Dict$get, name, row.bD),
																		$elm$core$Maybe$Just(true)) ? '1' : '0')
																]));
													},
													formula.aS),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$td,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																row.cQ ? '1' : '0')
															])),
														A2(
														$elm$html$Html$td,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																$elm$html$Html$button,
																_List_fromArray(
																	[
																		$elm$html$Html$Events$onClick(
																		$author$project$FormulaMosaic$SelectRow(i))
																	]),
																_List_fromArray(
																	[
																		$elm$html$Html$text(
																		_Utils_eq(i, model.aF) ? 'Selected' : ('View row ' + $elm$core$String$fromInt(i + 1)))
																	]))
															]))
													])));
									}),
								formula.am))
						]))
				]));
	});
var $author$project$FormulaMosaic$viewPage = F2(
	function (comparison, model) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mosaic-lab')
				]),
			_List_fromArray(
				[
					A3(
					$elm$html$Html$node,
					'style',
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text($author$project$FormulaMosaic$css)
						])),
					A2(
					$elm$html$Html$section,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mosaic-hero')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('eyebrow')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('FORMULA · MOSAIC · COLOR')
								])),
							A2(
							$elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									comparison ? 'One formula, three views' : 'Formula Mosaic')
								])),
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									comparison ? 'Explore the original tiles, an expanded organic cell network, and the graph underneath. All three views share the same inputs.' : 'Send a signal through connected logic tiles. Toggle an input and watch shared-border constraints carry the change toward OUT.')
								]))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mosaic-bar')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$label,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$for('mosaic-formula')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Boolean formula')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mosaic-row')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$input,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$id('mosaic-formula'),
											$elm$html$Html$Attributes$maxlength(120),
											$elm$html$Html$Attributes$value(model.N),
											$elm$html$Html$Events$onInput($author$project$FormulaMosaic$EditFormula),
											$elm$html$Html$Attributes$placeholder('!(a & b)'),
											A2($elm$html$Html$Attributes$attribute, 'spellcheck', 'false')
										]),
									_List_Nil)
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('hint')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Updates as you type. Operators: ! (NOT), & (AND), | (OR). Up to six variables.')
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mosaic-row')
								]),
							A2(
								$elm$core$List$map,
								function (example) {
									return A2(
										$elm$html$Html$button,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$type_('button'),
												$elm$html$Html$Events$onClick(
												$author$project$FormulaMosaic$Example(example.F)),
												$elm$html$Html$Attributes$title(example.F)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(example.E)
											]));
								},
								$author$project$FormulaExamples$all)),
							(model.X === '') ? $elm$html$Html$text('') : A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mosaic-error'),
									A2($elm$html$Html$Attributes$attribute, 'role', 'alert')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(model.X)
								]))
						])),
					function () {
					var _v0 = model.at;
					if (_v0.$ === 1) {
						return $elm$html$Html$text('');
					} else {
						var formula = _v0.a;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$html$Html$section,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mosaic-stage')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mosaic-tools')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													comparison ? 'Three views · one formula' : 'Connected logic-gadget tiles'),
													A2(
													$elm$html$Html$span,
													_List_Nil,
													_List_fromArray(
														[
															$elm$html$Html$text(
															comparison ? ($elm$core$String$fromInt(
																$elm$core$List$length(model.aN.aQ)) + ' graph cells') : ($elm$core$String$fromInt(
																$elm$core$List$length(model.aG.aQ)) + ' tiles'))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('swatches'),
															A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Color meaning')
														]),
													_List_fromArray(
														[
															A2($author$project$FormulaMosaic$swatch, 0, 'false'),
															A2($author$project$FormulaMosaic$swatch, 1, 'true'),
															A2($author$project$FormulaMosaic$swatch, 2, 'neutral')
														]))
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hint')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Input and output colors: red = false, green = true, blue = neutral. Pale tiles are unresolved while the signal travels. Click an input tile to toggle it.')
												])),
											A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('mosaic-row wrap')
												]),
											A2(
												$elm$core$List$map,
												function (name) {
													return A2(
														$elm$html$Html$button,
														_List_fromArray(
															[
																$elm$html$Html$Events$onClick(
																$author$project$FormulaMosaic$ToggleInput(name))
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Toggle ' + name)
															]));
												},
												formula.aS)),
											A4(
											$author$project$GenerativeTiling$propagationControls,
											model.aX,
											$author$project$FormulaMosaic$hasPending(model),
											$author$project$FormulaMosaic$AnimateSignals,
											$author$project$FormulaMosaic$SignalStep),
											comparison ? A2(
											$elm$html$Html$div,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('tile-comparison')
												]),
											_List_fromArray(
												[
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('comparison-panel')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$h2,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text('01 / Logic tiles')
																])),
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('hint')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Shared-border constraints compute OUT from the input pins.')
																])),
															A2(
															$elm$core$Maybe$withDefault,
															$elm$html$Html$text(''),
															A2(
																$elm$core$Maybe$map,
																$author$project$GenerativeTiling$paint($author$project$FormulaMosaic$ClickTile),
																model.O))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('comparison-panel')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$h2,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text('02 / Organic cells')
																])),
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('hint')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('Graph regions grow into tiles; every shared border keeps its constraint.')
																])),
															A2(
															$elm$core$Maybe$withDefault,
															$elm$html$Html$text(''),
															A2(
																$elm$core$Maybe$map,
																$author$project$GenerativeTiling$paint($author$project$FormulaMosaic$ClickOrganicTile),
																model.Z))
														])),
													A2(
													$elm$html$Html$div,
													_List_fromArray(
														[
															$elm$html$Html$Attributes$class('comparison-panel graph-panel')
														]),
													_List_fromArray(
														[
															A2(
															$elm$html$Html$h2,
															_List_Nil,
															_List_fromArray(
																[
																	$elm$html$Html$text('03 / Underlying graph')
																])),
															A2(
															$elm$html$Html$p,
															_List_fromArray(
																[
																	$elm$html$Html$Attributes$class('hint')
																]),
															_List_fromArray(
																[
																	$elm$html$Html$text('The same regions and colors before they expand into cells.')
																])),
															A2(
															$elm$core$Maybe$withDefault,
															$elm$html$Html$text(''),
															A2(
																$elm$core$Maybe$map,
																$author$project$GenerativeTiling$paintSkeleton($author$project$FormulaMosaic$ClickOrganicTile),
																model.Z))
														]))
												])) : A2(
											$elm$core$Maybe$withDefault,
											$elm$html$Html$text(''),
											A2(
												$elm$core$Maybe$map,
												$author$project$GenerativeTiling$paint($author$project$FormulaMosaic$ClickTile),
												model.O)),
											comparison ? A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$FormulaMosaic$Reseed)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Reshape organic tiles')
												])) : $elm$html$Html$text(''),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hint mosaic-status'),
													A2($elm$html$Html$Attributes$attribute, 'role', 'status')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2(
														$elm$core$Maybe$withDefault,
														'',
														A2(
															$elm$core$Maybe$map,
															function ($) {
																return $.ey;
															},
															comparison ? model.Z : model.O)))
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hint')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													'Generated formula: ' + (formula.F + (' · seed ' + ($elm$core$String$fromInt(model.ac) + (' · ' + ($elm$core$String$fromInt(
														$elm$core$List$length(
															comparison ? model.aN.aQ : model.aG.aQ)) + ' regions. A changed input releases conflicting neighbors, then local constraints settle the affected tiles. OUT is derived, never supplied.'))))))
												]))
										])),
									A2(
									$elm$html$Html$section,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('mosaic-table')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$h2,
											_List_Nil,
											_List_fromArray(
												[
													$elm$html$Html$text('Truth table')
												])),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hint')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Select a row to send new inputs through the tiles.')
												])),
											A2($author$project$FormulaMosaic$viewTruthTable, model, formula),
											A2(
											$elm$html$Html$p,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('hint')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													A2(
														$elm$core$List$any,
														function ($) {
															return $.cQ;
														},
														formula.am) ? 'The formula is satisfiable: at least one row is true.' : 'The formula is unsatisfiable: every row is false.')
												]))
										]))
								]));
					}
				}(),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mosaic-foot')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('These tiles encode Boolean gates using three-color constraints. Opposite edges do not connect. Settled neighbors always have different colors; OUT follows from the input pins.')
						]))
				]));
	});
var $author$project$FormulaMosaic$view = $author$project$FormulaMosaic$viewPage(false);
var $author$project$FormulaMosaic$main = $elm$browser$Browser$element(
	{
		dZ: function (_v0) {
			return _Utils_Tuple2($author$project$FormulaMosaic$init, $elm$core$Platform$Cmd$none);
		},
		eC: function (model) {
			return (model.aX && $author$project$FormulaMosaic$hasPending(model)) ? A2(
				$elm$time$Time$every,
				180,
				function (_v1) {
					return $author$project$FormulaMosaic$SignalStep;
				}) : $elm$core$Platform$Sub$none;
		},
		eW: F2(
			function (msg, model) {
				return _Utils_Tuple2(
					A2($author$project$FormulaMosaic$update, msg, model),
					$elm$core$Platform$Cmd$none);
			}),
		eX: $author$project$FormulaMosaic$view
	});
_Platform_export({'FormulaMosaic':{'init':$author$project$FormulaMosaic$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));