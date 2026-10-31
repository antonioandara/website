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
	if (region.ez.a1 === region.ci.a1)
	{
		return 'on line ' + region.ez.a1;
	}
	return 'on lines ' + region.ez.a1 + ' through ' + region.ci.a1;
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
		impl.d$,
		impl.eX,
		impl.eD,
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
		al: func(record.al),
		b$: record.b$,
		bW: record.bW
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
		var message = !tag ? value : tag < 3 ? value.a : value.al;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.b$;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bW) && event.preventDefault(),
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
		impl.d$,
		impl.eX,
		impl.eD,
		function(sendToApp, initialModel) {
			var view = impl.eY;
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
		impl.d$,
		impl.eX,
		impl.eD,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bZ && impl.bZ(sendToApp)
			var view = impl.eY;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.dp);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.eS) && (_VirtualDom_doc.title = title = doc.eS);
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
	var onUrlChange = impl.ee;
	var onUrlRequest = impl.ef;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bZ: function(sendToApp)
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
							&& curr.cP === next.cP
							&& curr.cs === next.cs
							&& curr.cK.a === next.cK.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		d$: function(flags)
		{
			return A3(impl.d$, flags, _Browser_getUrl(), key);
		},
		eY: impl.eY,
		eX: impl.eX,
		eD: impl.eD
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
		? { dV: 'hidden', dz: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dV: 'mozHidden', dz: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dV: 'msHidden', dz: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dV: 'webkitHidden', dz: 'webkitvisibilitychange' }
		: { dV: 'hidden', dz: 'visibilitychange' };
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
		cU: _Browser_getScene(),
		c4: {
			b: _Browser_window.pageXOffset,
			a: _Browser_window.pageYOffset,
			bc: _Browser_doc.documentElement.clientWidth,
			a0: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bc: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		a0: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			cU: {
				bc: node.scrollWidth,
				a0: node.scrollHeight
			},
			c4: {
				b: node.scrollLeft,
				a: node.scrollTop,
				bc: node.clientWidth,
				a0: node.clientHeight
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
			cU: _Browser_getScene(),
			c4: {
				b: x,
				a: y,
				bc: _Browser_doc.documentElement.clientWidth,
				a0: _Browser_doc.documentElement.clientHeight
			},
			dP: {
				b: x + rect.left,
				a: y + rect.top,
				bc: rect.width,
				a0: rect.height
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
var $author$project$FormulaMosaic$SignalTick = {$: 6};
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
		if (!builder.m) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.p),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.p);
		} else {
			var treeLen = builder.m * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.t) : builder.t;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.m);
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
					{t: nodeList, m: (len / $elm$core$Array$branchFactor) | 0, p: tail});
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
		return {cn: fragment, cs: host, cH: path, cK: port_, cP: protocol, cQ: query};
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
		return {cO: processes, c_: taggers};
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
		var processes = _v0.cO;
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
		var _v0 = A2($elm$core$Dict$get, interval, state.c_);
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
	return !($elm$core$List$isEmpty(model.bw) && $elm$core$List$isEmpty(model.bv));
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
				bG: assignment,
				cT: A2($author$project$FormulaParser$evaluate, ast, assignment)
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
				c: -1,
				cJ: {b: 0, a: 0},
				ae: -1
			},
			$elm$core$List$head(
				A2($elm$core$List$drop, id, state.M)));
	});
var $elm$core$Basics$asin = _Basics_asin;
var $elm$core$Basics$atan2 = _Basics_atan2;
var $author$project$FormulaParser$Var = function (a) {
	return {$: 0, a: a};
};
var $author$project$ConstraintMap$addRegion = F3(
	function (info, point, state) {
		var id = $elm$core$List$length(state.aN);
		var anchor = {
			c: $elm$core$List$length(state.M),
			cJ: point,
			ae: id
		};
		return _Utils_Tuple2(
			anchor.c,
			_Utils_update(
				state,
				{
					M: _Utils_ap(
						state.M,
						_List_fromArray(
							[anchor])),
					aN: _Utils_ap(
						state.aN,
						_List_fromArray(
							[info]))
				}));
	});
var $author$project$ConstraintMap$join = F3(
	function (a, b, state) {
		return _Utils_update(
			state,
			{
				at: _Utils_ap(
					state.at,
					_List_fromArray(
						[
							{L: a, _: b}
						]))
			});
	});
var $author$project$ConstraintMap$attach = F3(
	function (existing, point, state) {
		var source = A2($author$project$ConstraintMap$anchorAt, existing, state);
		var anchor = {
			c: $elm$core$List$length(state.M),
			cJ: point,
			ae: source.ae
		};
		return _Utils_Tuple2(
			anchor.c,
			A3(
				$author$project$ConstraintMap$join,
				existing,
				anchor.c,
				_Utils_update(
					state,
					{
						M: _Utils_ap(
							state.M,
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
					return $.a0;
				},
				sizes)));
	var childWidth = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function ($) {
				return $.bc;
			},
			sizes)) + (($elm$core$List$length(sizes) > 1) ? 70 : 0);
	var ownHeight = (gate === 'NOT') ? 125 : (((gate === 'NAND') || (gate === 'NOR')) ? 225 : 180);
	var ownWidth = (gate === 'NOT') ? 150 : 260;
	return (gate === 'INPUT') ? {a0: 0, bc: 110} : {
		a0: (childHeight + ((childHeight > 0) ? 70 : 0)) + ownHeight,
		bc: A2($elm$core$Basics$max, ownWidth, childWidth)
	};
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$ConstraintMap$buildTree = F4(
	function (expr, left, top, state) {
		var size = $author$project$ConstraintMap$measure(expr);
		var bare = {aa: $elm$core$Maybe$Nothing, bl: '', bo: $elm$core$Maybe$Nothing};
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
						return $.a0;
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
								bl: name,
								bo: $elm$core$Maybe$Just(name)
							}),
						terminal,
						state0);
				} else {
					var childSize = $author$project$ConstraintMap$measure(childExpr);
					var childLeft = ($elm$core$List$length(children) === 1) ? (left + ((size.bc - childSize.bc) / 2)) : ((!index) ? left : ((left + size.bc) - childSize.bc));
					var _v14 = A4($author$project$ConstraintMap$buildTree, childExpr, childLeft, (top + childHeight) - childSize.a0, state0);
					var out = _v14.a;
					var subtree = _v14.b;
					var _v15 = A3(
						$author$project$ConstraintMap$attach,
						out,
						{b: terminal.b, a: gateY - 20},
						subtree);
					var bend = _v15.a;
					var routed = _v15.b;
					return A3($author$project$ConstraintMap$attach, bend, terminal, routed);
				}
			});
		var gateX = left + ((size.bc - ((gate === 'NOT') ? 150 : 260)) / 2);
		var position = F2(
			function (dx, dy) {
				return {b: gateX + dx, a: gateY + dy};
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
						bl: $author$project$ConstraintMap$expression(expr)
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
						aa: $elm$core$Maybe$Just(2)
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
								bl: isOutput ? $author$project$ConstraintMap$expression(expr) : ''
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
								aa: $elm$core$Maybe$Just(actual)
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
			A2($elm$core$Basics$pow, a.b - b.b, 2) + A2($elm$core$Basics$pow, a.a - b.a, 2));
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
		var dx = b.b - a.b;
		var t = A3(
			$elm$core$Basics$clamp,
			0,
			1,
			(((p.b - a.b) * dx) + ((p.a - a.a) * dy)) / A2($elm$core$Basics$max, 0.000001, (dx * dx) + (dy * dy)));
		return A2(
			$author$project$ConstraintMap$distance,
			p,
			{b: a.b + (t * dx), a: a.a + (t * dy)});
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$Basics$round = _Basics_round;
var $author$project$ConstraintMap$key = function (p) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(p.b * 1000000)) + (',' + $elm$core$String$fromInt(
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
				return _Utils_eq(edge.L, id) ? edge._ : edge.L;
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
			{M: _List_Nil, at: _List_Nil, aN: _List_Nil});
		var outputAnchor = _v0.a;
		var network = _v0.b;
		var anchors = network.M;
		var incident = function (id) {
			return A2(
				$elm$core$List$filter,
				function (edge) {
					return _Utils_eq(edge.L, id) || _Utils_eq(edge._, id);
				},
				network.at);
		};
		var point = function (id) {
			return A2($author$project$ConstraintMap$anchorAt, id, network).cJ;
		};
		var angle = F2(
			function (id, edge) {
				var b = point(
					A2(other, id, edge));
				var a = point(id);
				return A2($elm$core$Basics$atan2, b.a - a.a, b.b - a.b);
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
					return A2($author$project$ConstraintMap$distance, anchor.cJ, a.cJ);
				},
				A2(
					$elm$core$List$filter,
					function (a) {
						return !_Utils_eq(a.c, anchor.c);
					},
					anchors));
			var lines = A2(
				$elm$core$List$map,
				function (e) {
					return A3(
						$author$project$ConstraintMap$segmentDistance,
						anchor.cJ,
						point(e.L),
						point(e._));
				},
				A2(
					$elm$core$List$filter,
					function (e) {
						return (!_Utils_eq(e.L, anchor.c)) && (!_Utils_eq(e._, anchor.c));
					},
					network.at));
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
						anchor.c,
						clearance(anchor) * (0.91 + (0.08 * $author$project$ConstraintMap$noise((seed * 97) + (anchor.c * 23)))));
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
				radius(edge.L) * A2(
					$elm$core$Basics$min,
					organic ? 0.68 : 0.45,
					$elm$core$Basics$sin(
						A2(
							$elm$core$Basics$min,
							$elm$core$Basics$pi / 2,
							A2(gap, edge.L, edge) / 3))),
				radius(edge._) * A2(
					$elm$core$Basics$min,
					organic ? 0.68 : 0.45,
					$elm$core$Basics$sin(
						A2(
							$elm$core$Basics$min,
							$elm$core$Basics$pi / 2,
							A2(gap, edge._, edge) / 3))));
		};
		var pieces = function (anchor) {
			var sorted = A2(
				$elm$core$List$sortBy,
				angle(anchor.c),
				incident(anchor.c));
			var r = radius(anchor.c);
			var onCircle = function (theta) {
				var radial = organic ? (r * (0.94 + (0.06 * $elm$core$Basics$sin((3 * theta) + (seed + anchor.c))))) : r;
				return {
					b: anchor.cJ.b + (radial * $elm$core$Basics$cos(theta)),
					a: anchor.cJ.a + (radial * $elm$core$Basics$sin(theta))
				};
			};
			var section = F2(
				function (edge, next) {
					var theta = A2(angle, anchor.c, edge);
					var nextTheta = A2(angle, anchor.c, next);
					var nextAlpha = $elm$core$Basics$asin(
						A2(
							$elm$core$Basics$min,
							0.99,
							width(next) / A2($elm$core$Basics$max, 0.000001, r)));
					var half = width(edge);
					var finish = ((_Utils_cmp(nextTheta, theta) < 1) ? (nextTheta + (2 * $elm$core$Basics$pi)) : nextTheta) - nextAlpha;
					var b = point(
						A2(other, anchor.c, edge));
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
					var a = anchor.cJ;
					var mid = {b: (a.b + b.b) / 2, a: (a.a + b.a) / 2};
					var cap = function (sign) {
						return {
							b: mid.b - ((sign * $elm$core$Basics$sin(theta)) * half),
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
								var b = A2($author$project$ConstraintMap$anchorAt, e._, network).ae;
								var a = A2($author$project$ConstraintMap$anchorAt, e.L, network).ae;
								return (_Utils_eq(a, id) && (!_Utils_eq(b, id))) ? $elm$core$Maybe$Just(b) : ((_Utils_eq(b, id) && (!_Utils_eq(a, id))) ? $elm$core$Maybe$Just(a) : $elm$core$Maybe$Nothing);
							},
							network.at));
					var members = A2(
						$elm$core$List$filter,
						function (a) {
							return _Utils_eq(a.ae, id);
						},
						anchors);
					var polygons = A2($elm$core$List$map, pieces, members);
					var center = A2(
						$elm$core$Maybe$withDefault,
						{b: 0, a: 0},
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.cJ;
							},
							$elm$core$List$head(members)));
					return {
						ah: center,
						aa: info.aa,
						bl: info.bl,
						c: id,
						bo: info.bo,
						z: neighbors,
						a4: $author$project$ConstraintMap$union(polygons)
					};
				}),
			network.aN);
		var output = A2($author$project$ConstraintMap$anchorAt, outputAnchor, network).ae;
		return {a0: size.a0 + 50, bu: output, k: regions, bc: size.bc + 50};
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
				return (((x + dx) >= 0) && ((_Utils_cmp(x + dx, grid.e) < 0) && (((y + dy) >= 0) && (_Utils_cmp(y + dy, grid.T) < 0)))) ? $elm$core$Maybe$Just((((y + dy) * grid.e) + x) + dx) : $elm$core$Maybe$Nothing;
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
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$ConstraintMap$fixedInputs = F2(
	function (assignment, map) {
		return $elm$core$Dict$fromList(
			A2(
				$elm$core$List$filterMap,
				function (region) {
					var _v0 = region.aa;
					if (!_v0.$) {
						var color = _v0.a;
						return $elm$core$Maybe$Just(
							_Utils_Tuple2(region.c, color));
					} else {
						return A2(
							$elm$core$Maybe$map,
							function (name) {
								return _Utils_Tuple2(
									region.c,
									_Utils_eq(
										A2($elm$core$Dict$get, name, assignment),
										$elm$core$Maybe$Just(true)) ? 1 : 0);
							},
							region.bo);
					}
				},
				map.k));
	});
var $author$project$LabLogic$Impossible = {$: 1};
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
					{t: nodeList, m: nodeListSize, p: jsArray});
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
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
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
var $author$project$PackingConstraints$initialWithBudget = F2(
	function (budget, map) {
		var solve = function (assignment) {
			var fixed = A2($author$project$ConstraintMap$fixedInputs, assignment, map);
			var _v0 = A3(
				$author$project$LabLogic$solve,
				budget,
				A2(
					$elm$core$List$map,
					function ($) {
						return $.z;
					},
					map.k),
				fixed);
			if (!_v0.$) {
				var colors = _v0.a;
				return $elm$core$Maybe$Just(
					{dE: colors, bK: fixed});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var names = $elm$core$Set$toList(
			$elm$core$Set$fromList(
				A2(
					$elm$core$List$filterMap,
					function ($) {
						return $.bo;
					},
					map.k)));
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
			{a2: map, a5: $elm$core$Set$empty, aW: witnesses}) : $elm$core$Maybe$Nothing;
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
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$remove, key, dict);
	});
var $author$project$CellNetwork$absorbRedundantPacking = F2(
	function (map, grid) {
		var absorb = F2(
			function (region, current) {
				if (region.bl !== 'Packing cell') {
					return current;
				} else {
					var contacts = $author$project$CellNetwork$adjacency(current);
					var ns = $elm$core$Set$toList(
						A2(
							$elm$core$Maybe$withDefault,
							$elm$core$Set$empty,
							A2($elm$core$Dict$get, region.c, contacts)));
					var _try = function (targets) {
						_try:
						while (true) {
							if (!targets.b) {
								return current;
							} else {
								var target = targets.a;
								var rest = targets.b;
								var others = A2(
									$elm$core$List$filter,
									$elm$core$Basics$neq(target),
									ns);
								var candidate = _Utils_update(
									map,
									{
										k: A2(
											$elm$core$List$map,
											function (r) {
												var existing = A2(
													$elm$core$Set$remove,
													region.c,
													A2(
														$elm$core$Maybe$withDefault,
														$elm$core$Set$empty,
														A2($elm$core$Dict$get, r.c, contacts)));
												var neighbors = _Utils_eq(r.c, region.c) ? $elm$core$Set$empty : (_Utils_eq(r.c, target) ? A2(
													$elm$core$Set$union,
													existing,
													$elm$core$Set$fromList(others)) : (A2($elm$core$List$member, r.c, others) ? A2($elm$core$Set$insert, target, existing) : existing));
												return _Utils_update(
													r,
													{
														z: $elm$core$Set$toList(neighbors)
													});
											},
											map.k)
									});
								var _v1 = A2($author$project$PackingConstraints$initialWithBudget, 256, candidate);
								if (!_v1.$) {
									return _Utils_update(
										current,
										{
											g: A2(
												$elm$core$Array$map,
												function (id) {
													return _Utils_eq(id, region.c) ? target : id;
												},
												current.g)
										});
								} else {
									var $temp$targets = rest;
									targets = $temp$targets;
									continue _try;
								}
							}
						}
					};
					return _try(ns);
				}
			});
		return A3($elm$core$List$foldl, absorb, grid, map.k);
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
						_Utils_eq(y, grid.T - 1) || (!_Utils_eq(
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
var $author$project$CellNetwork$coalesce = function (map) {
	var key = function (region) {
		var _v4 = region.aa;
		if (!_v4.$) {
			var c = _v4.a;
			return 'palette:' + $elm$core$String$fromInt(c);
		} else {
			var _v5 = region.bo;
			if (!_v5.$) {
				var name = _v5.a;
				return 'input:' + name;
			} else {
				return 'node:' + $elm$core$String$fromInt(region.c);
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
					A3($elm$core$Dict$insert, region.c, id, aliases));
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
								{c: id})
							])),
					A3($elm$core$Dict$insert, region.c, id, aliases));
			}
		});
	var _v0 = A3(
		$elm$core$List$foldl,
		collect,
		_Utils_Tuple3($elm$core$Dict$empty, _List_Nil, $elm$core$Dict$empty),
		map.k);
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
					alias(r.c),
					id);
			},
			map.k);
	};
	var neighbors = function (region) {
		var otherPalette = function () {
			var _v1 = region.aa;
			if (_v1.$ === 1) {
				return _List_Nil;
			} else {
				var c = _v1.a;
				return A2(
					$elm$core$List$map,
					function ($) {
						return $.c;
					},
					A2(
						$elm$core$List$filter,
						function (r) {
							return (!_Utils_eq(r.aa, $elm$core$Maybe$Nothing)) && (!_Utils_eq(
								r.aa,
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
					return $.z;
				},
				original(region.c)));
		return _Utils_update(
			region,
			{
				z: $elm$core$Set$toList(
					A2(
						$elm$core$Set$remove,
						region.c,
						$elm$core$Set$fromList(
							_Utils_ap(constrained, otherPalette))))
			});
	};
	return _Utils_Tuple2(
		_Utils_update(
			map,
			{
				bu: alias(map.bu),
				k: A2($elm$core$List$map, neighbors, grouped)
			}),
		aliasMap);
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
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
			b: A2($elm$core$Basics$modBy, grid.e + 1, key) * grid.v,
			a: ((key / (grid.e + 1)) | 0) * grid.w
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
							return $.b;
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
						b: A2(anchored, xs, grid.e * grid.v),
						a: A2(anchored, ys, grid.T * grid.w)
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
						return (a.b * b.a) - (b.b * a.a);
					}),
				points,
				_Utils_ap(
					A2($elm$core$List$drop, 1, points),
					A2($elm$core$List$take, 1, points)))));
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$PackingConstraints$validate = function (state) {
	var adjacency = A2(
		$elm$core$List$map,
		function ($) {
			return $.z;
		},
		state.a2.k);
	var search = function (witness) {
		var _v4 = A3($author$project$LabLogic$solve, 64, adjacency, witness.bK);
		if (!_v4.$) {
			var colors = _v4.a;
			return $elm$core$Maybe$Just(
				_Utils_update(
					witness,
					{dE: colors}));
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
			$elm$core$Array$toIndexedList(witness.dE));
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
		var quick = A3($elm$core$List$foldl, fill, witness.dE, unset);
		return A2(
			$elm$core$List$all,
			function (c) {
				return c >= 0;
			},
			$elm$core$Array$toList(quick)) ? ($elm$core$List$isEmpty(
			A2($author$project$LabLogic$conflicts, adjacency, quick)) ? $elm$core$Maybe$Just(
			_Utils_update(
				witness,
				{dE: quick})) : search(witness)) : search(witness);
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
								aW: $elm$core$List$reverse(verified)
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
	return A2(repairAll, state.aW, _List_Nil);
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
				return _Utils_eq(r.c, id) ? _Utils_update(
					r,
					{
						z: $elm$core$Set$toList(
							$elm$core$Set$fromList(
								_Utils_ap(r.z, edges)))
					}) : (A2($elm$core$List$member, r.c, edges) ? _Utils_update(
					r,
					{
						z: $elm$core$Set$toList(
							A2(
								$elm$core$Set$insert,
								id,
								$elm$core$Set$fromList(r.z)))
					}) : r);
			},
			state.a2.k);
		return A2(
			$elm$core$List$all,
			function (n) {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						function (r) {
							return A2($elm$core$List$member, n, r.z);
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, id, state.a2.k))));
			},
			edges) ? $elm$core$Maybe$Just(state) : $author$project$PackingConstraints$validate(
			_Utils_update(
				state,
				{
					a2: function () {
						var map = state.a2;
						return _Utils_update(
							map,
							{k: regions});
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
		if (A2($elm$core$Set$member, key, state.a5)) {
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
							a5: A2($elm$core$Set$insert, key, state.a5)
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
var $author$project$PackingConstraints$initial = $author$project$PackingConstraints$initialWithBudget(200000);
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
			b: (A2($elm$core$Basics$modBy, grid.e, i) + 0.5) * grid.v,
			a: (((i / grid.e) | 0) + 0.5) * grid.w
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
											return $.bJ;
										},
										old)),
								depth) < 0) ? $elm$core$Maybe$Just(
								{
									bJ: depth,
									cJ: point(i)
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
		var map = state.a2;
		var id = $elm$core$List$length(state.a2.k);
		var region = {ah: center, aa: $elm$core$Maybe$Nothing, bl: 'Packing cell', c: id, bo: $elm$core$Maybe$Nothing, z: _List_Nil, a4: _List_Nil};
		var expanded = _Utils_update(
			state,
			{
				a2: _Utils_update(
					map,
					{
						k: _Utils_ap(
							map.k,
							_List_fromArray(
								[region]))
					}),
				aW: A2(
					$elm$core$List$map,
					function (w) {
						return _Utils_update(
							w,
							{
								dE: A2($elm$core$Array$push, -1, w.dE)
							});
					},
					state.aW)
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
							ah: {b: 0, a: 0},
							aa: $elm$core$Maybe$Nothing,
							bl: '',
							c: id,
							bo: $elm$core$Maybe$Nothing,
							z: _List_Nil,
							a4: _List_Nil
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, id, contracted.k)));
					return _Utils_Tuple2(
						marked,
						_Utils_ap(
							regions,
							_List_fromArray(
								[
									_Utils_update(
									info,
									{c: label})
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
							cell(r.c),
							cell(n)) || A2(
							$elm$core$Set$member,
							cell(n),
							A2(
								$elm$core$Maybe$withDefault,
								$elm$core$Set$empty,
								A2(
									$elm$core$Dict$get,
									cell(r.c),
									contacts)));
					},
					r.z);
			},
			source.k);
		var _final = _Utils_update(
			source,
			{
				bu: cell(source.bu),
				k: A2(
					$elm$core$List$map,
					function (r) {
						return _Utils_update(
							r,
							{
								z: $elm$core$Set$toList(
									A2(
										$elm$core$Maybe$withDefault,
										$elm$core$Set$empty,
										A2($elm$core$Dict$get, r.c, contacts)))
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
					return $.c;
				},
				A2(
					$elm$core$List$sortBy,
					function (r) {
						return _Utils_eq(
							r.aa,
							$elm$core$Maybe$Just(2)) ? 0 : 1;
					},
					A2(
						$elm$core$List$filter,
						function (r) {
							return !_Utils_eq(r.aa, $elm$core$Maybe$Nothing);
						},
						map.k)));
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
								A2($elm$core$List$drop, id, state.a2.k));
							var mergeable = A2(
								$elm$core$Maybe$withDefault,
								false,
								A2(
									$elm$core$Maybe$map,
									function (r) {
										return (!_Utils_eq(r.aa, $elm$core$Maybe$Nothing)) || (!_Utils_eq(r.bo, $elm$core$Maybe$Nothing));
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
							graph.a2,
							_Utils_update(
								grid,
								{g: current}));
						var physical = _v2.a;
						var centers = $author$project$CellNetwork$labelCenters(physical);
						var weak = A2(
							$elm$core$Dict$filter,
							F2(
								function (_v5, center) {
									return center.bJ < 5;
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
														A2($elm$core$Basics$min, grid.T - 1, (cy - oy) + radius)));
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
										b: (A2($elm$core$Basics$modBy, grid.e, index) + 0.5) * grid.v,
										a: (((index / grid.e) | 0) + 0.5) * grid.w
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
				finalGraph.a2);
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
								var dy = (((n / grid.e) | 0) - ((index / grid.e) | 0)) * grid.w;
								var dx = (A2($elm$core$Basics$modBy, grid.e, n) - A2($elm$core$Basics$modBy, grid.e, index)) * grid.v;
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
						_Utils_cmp(b.a, p.a) > 0)) && (_Utils_cmp(p.b, (((b.b - a.b) * (p.a - a.a)) / (b.a - a.a)) + a.b) < 0)) ? (!within) : within;
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
				return $.b;
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
				var dx = b.b - a.b;
				var t = (!((dx * dx) + (dy * dy))) ? 0 : A3($elm$core$Basics$clamp, 0, 1, (((p.b - a.b) * dx) + ((p.a - a.a) * dy)) / ((dx * dx) + (dy * dy)));
				return A2($elm$core$Basics$pow, (p.b - a.b) - (t * dx), 2) + A2($elm$core$Basics$pow, (p.a - a.a) - (t * dy), 2);
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
							b: low(xs) + (((x + 0.5) / 21) * (high(xs) - low(xs))),
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
var $author$project$CellNetwork$minimumArea = F2(
	function (width, height) {
		return (width * height) / 800;
	});
var $author$project$CellNetwork$growSmallRegions = F4(
	function (width, height, loops, initial) {
		var target = 1.15 * A2($author$project$CellNetwork$minimumArea, width, height);
		var radius = 5 * $elm$core$Basics$sqrt(target);
		var contours = F2(
			function (positions, ids) {
				return A2(
					$elm$core$List$map,
					$elm$core$List$filterMap(
						function (id) {
							return A2($elm$core$Dict$get, id, positions);
						}),
					ids);
			});
		var area = F2(
			function (positions, ids) {
				return $elm$core$Basics$abs(
					$elm$core$List$sum(
						A2(
							$elm$core$List$map,
							$author$project$CellNetwork$contourArea,
							A2(contours, positions, ids))));
			});
		var enlargeFace = F2(
			function (ids, positions) {
				var polygons = A2(contours, positions, ids);
				var points = $elm$core$List$concat(polygons);
				var mean = function (get) {
					return $elm$core$List$sum(
						A2($elm$core$List$map, get, points)) / A2(
						$elm$core$Basics$max,
						1,
						$elm$core$List$length(points));
				};
				var current = A2(area, positions, ids);
				var strength = A2(
					$elm$core$Basics$min,
					0.2,
					0.03 + (0.1 * ((target / A2($elm$core$Basics$max, 0.000001, current)) - 1)));
				var center = A2(
					$author$project$CellNetwork$interiorCenter,
					{
						b: mean(
							function ($) {
								return $.b;
							}),
						a: mean(
							function ($) {
								return $.a;
							})
					},
					polygons);
				var move = function (p) {
					var dy = p.a - center.a;
					var dx = p.b - center.b;
					var distance = $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
					var boundaryY = A3(
						$elm$core$Basics$clamp,
						0,
						1,
						((dy < 0) ? p.a : (height - p.a)) / radius);
					var boundaryX = A3(
						$elm$core$Basics$clamp,
						0,
						1,
						((dx < 0) ? p.b : (width - p.b)) / radius);
					var amount = strength * A2(
						$elm$core$Basics$pow,
						A2($elm$core$Basics$max, 0, 1 - (distance / radius)),
						2);
					return {b: p.b + ((dx * amount) * boundaryX), a: p.a + ((dy * amount) * boundaryY)};
				};
				return (_Utils_cmp(current, target) > -1) ? positions : A2(
					$elm$core$Dict$map,
					F2(
						function (_v0, p) {
							return move(p);
						}),
					positions);
			});
		var pass = function (positions) {
			return A3(
				$elm$core$List$foldl,
				enlargeFace,
				positions,
				A2(
					$elm$core$List$sortBy,
					area(positions),
					$elm$core$Dict$values(loops)));
		};
		var settle = F2(
			function (budget, positions) {
				settle:
				while (true) {
					if ((budget <= 0) || A2(
						$elm$core$List$all,
						function (ids) {
							return _Utils_cmp(
								A2(area, positions, ids),
								A2($author$project$CellNetwork$minimumArea, width, height)) > -1;
						},
						$elm$core$Dict$values(loops))) {
						return positions;
					} else {
						var $temp$budget = budget - 1,
							$temp$positions = pass(positions);
						budget = $temp$budget;
						positions = $temp$positions;
						continue settle;
					}
				}
			});
		return A2(settle, 200, initial);
	});
var $elm$core$Set$isEmpty = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$isEmpty(dict);
};
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $author$project$CellNetwork$joinRepeatedPacking = F3(
	function (_protected, map, grid) {
		var packing = A2(
			$elm$core$List$filter,
			function (r) {
				return (r.bl === 'Packing cell') && ($elm$core$List$length(r.z) === 2);
			},
			map.k);
		var key = function (r) {
			return A2(
				$elm$core$String$join,
				',',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					$elm$core$List$sort(r.z)));
		};
		var groups = $elm$core$Dict$values(
			A3(
				$elm$core$List$foldl,
				function (r) {
					return A2(
						$elm$core$Dict$update,
						key(r),
						function (old) {
							return $elm$core$Maybe$Just(
								A2(
									$elm$core$List$cons,
									r.c,
									A2($elm$core$Maybe$withDefault, _List_Nil, old)));
						});
				},
				$elm$core$Dict$empty,
				packing));
		var donorSafe = F2(
			function (pixel, owners) {
				var donor = A2($elm$core$Array$get, pixel, owners);
				var required = A2(
					$elm$core$List$filter,
					function (n) {
						return _Utils_eq(
							A2($elm$core$Array$get, n, owners),
							donor);
					},
					A3($author$project$CellNetwork$adjacent, false, grid, pixel));
				var ring = A2(
					$elm$core$List$filter,
					function (n) {
						return _Utils_eq(
							A2($elm$core$Array$get, n, owners),
							donor);
					},
					A3($author$project$CellNetwork$adjacent, true, grid, pixel));
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
					return false;
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
		var aliases = $elm$core$Dict$fromList(
			A2(
				$elm$core$List$concatMap,
				function (ids) {
					return A2(
						$elm$core$List$map,
						function (id) {
							return _Utils_Tuple2(
								id,
								A2(
									$elm$core$Maybe$withDefault,
									id,
									$elm$core$List$minimum(ids)));
						},
						ids);
				},
				groups));
		var allowed = $elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (r) {
					return _Utils_Tuple2(
						A2(
							$elm$core$Maybe$withDefault,
							r.c,
							A2($elm$core$Dict$get, r.c, aliases)),
						r.z);
				},
				packing));
		var bridgePacking = F2(
			function (index, owners) {
				var id = A2(
					$elm$core$Maybe$withDefault,
					-1,
					A2($elm$core$Array$get, index, owners));
				var neighbors = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2($elm$core$Dict$get, id, allowed));
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
				var connect = F2(
					function (other, current) {
						var candidates = A2(
							$elm$core$List$filter,
							function (pixel) {
								return A2(
									$elm$core$List$member,
									pixel,
									A3($author$project$CellNetwork$adjacent, false, grid, other)) && ((!_Utils_eq(
									A2($elm$core$Array$get, pixel, current),
									$elm$core$Maybe$Just(id))) && ((A2($author$project$CellNetwork$owner, _protected, pixel) < 0) && (A2(donorSafe, pixel, current) && A2(
									$elm$core$List$all,
									function (n) {
										return A2(
											$elm$core$List$member,
											A2(
												$elm$core$Maybe$withDefault,
												-1,
												A2($elm$core$Array$get, n, current)),
											A2($elm$core$List$cons, id, neighbors));
									},
									A3($author$project$CellNetwork$adjacent, false, grid, pixel)))));
							},
							A3($author$project$CellNetwork$adjacent, false, grid, index));
						if (A2(
							$elm$core$List$any,
							function (pixel) {
								return _Utils_eq(
									A2($elm$core$Array$get, pixel, current),
									$elm$core$Maybe$Just(id));
							},
							A2(
								$elm$core$List$filter,
								function (pixel) {
									return A2(
										$elm$core$List$member,
										pixel,
										A3($author$project$CellNetwork$adjacent, false, grid, other));
								},
								A3($author$project$CellNetwork$adjacent, false, grid, index)))) {
							return current;
						} else {
							var _v0 = $elm$core$List$head(candidates);
							if (!_v0.$) {
								var pixel = _v0.a;
								return A3($elm$core$Array$set, pixel, id, current);
							} else {
								return current;
							}
						}
					});
				return A2($elm$core$Dict$member, id, allowed) ? A3($elm$core$List$foldl, connect, owners, diagonals) : owners;
			});
		var pass = function (owners) {
			return A3(
				$elm$core$List$foldl,
				bridgePacking,
				owners,
				A2(
					$elm$core$List$range,
					0,
					$elm$core$Array$length(owners) - 1));
		};
		var initial = A2(
			$elm$core$Array$map,
			function (id) {
				return A2(
					$elm$core$Maybe$withDefault,
					id,
					A2($elm$core$Dict$get, id, aliases));
			},
			grid.g);
		return _Utils_update(
			grid,
			{
				g: pass(
					pass(initial))
			});
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$CellNetwork$polygonOutline = function (points) {
	var point = function (p) {
		return $elm$core$String$fromFloat(p.b) + (' ' + $elm$core$String$fromFloat(p.a));
	};
	if (!points.b) {
		return '';
	} else {
		var first = points.a;
		var rest = points.b;
		return 'M ' + (point(first) + ($elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (p) {
					return ' L ' + point(p);
				},
				rest)) + ' Z'));
	}
};
var $author$project$CellNetwork$polygonVertices = F3(
	function (grid, positions, connections) {
		var position = function (id) {
			return A2(
				$elm$core$Maybe$withDefault,
				A2($author$project$CellNetwork$vertexPoint, grid, id),
				A2($elm$core$Dict$get, id, positions));
		};
		var edgeKey = F2(
			function (a, b) {
				return (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
			});
		var originalPoints = F4(
			function (id, a, b, samples) {
				return A2(
					$elm$core$List$cons,
					position(id),
					_Utils_ap(
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							A2(
								$elm$core$Dict$get,
								A2(edgeKey, a, id),
								samples)),
						A2(
							$elm$core$Maybe$withDefault,
							_List_Nil,
							A2(
								$elm$core$Dict$get,
								A2(edgeKey, id, b),
								samples))));
			});
		var cross = F3(
			function (a, b, c) {
				return ((b.b - a.b) * (c.a - a.a)) - ((b.a - a.a) * (c.b - a.b));
			});
		var inside = F4(
			function (a, b, c, p) {
				var signs = _List_fromArray(
					[
						A3(cross, a, b, p),
						A3(cross, b, c, p),
						A3(cross, c, a, p)
					]);
				return A2(
					$elm$core$List$all,
					function (n) {
						return _Utils_cmp(n, -0.000001) > -1;
					},
					signs) || A2(
					$elm$core$List$all,
					function (n) {
						return n <= 0.000001;
					},
					signs);
			});
		var bucketSize = 16 * A2($elm$core$Basics$min, grid.v, grid.w);
		var bucket = function (p) {
			return _Utils_Tuple2(
				$elm$core$Basics$floor(p.b / bucketSize),
				$elm$core$Basics$floor(p.a / bucketSize));
		};
		var buckets = A3(
			$elm$core$Dict$foldl,
			F2(
				function (id, p) {
					return A2(
						$elm$core$Dict$update,
						bucket(p),
						function (old) {
							return $elm$core$Maybe$Just(
								A2(
									$elm$core$List$cons,
									id,
									A2($elm$core$Maybe$withDefault, _List_Nil, old)));
						});
				}),
			$elm$core$Dict$empty,
			positions);
		var removable = F5(
			function (id, aId, bId, active, samples) {
				var p = position(id);
				var b = position(bId);
				var a = position(aId);
				var blocked = function (other) {
					if (_Utils_eq(other, id) || (_Utils_eq(other, aId) || (_Utils_eq(other, bId) || (!A2($elm$core$Dict$member, other, active))))) {
						return false;
					} else {
						var q = position(other);
						return (_Utils_cmp(
							q.b,
							A2(
								$elm$core$Basics$min,
								a.b,
								A2($elm$core$Basics$min, b.b, p.b)) - 0.000001) > -1) && ((_Utils_cmp(
							q.b,
							A2(
								$elm$core$Basics$max,
								a.b,
								A2($elm$core$Basics$max, b.b, p.b)) + 0.000001) < 1) && ((_Utils_cmp(
							q.a,
							A2(
								$elm$core$Basics$min,
								a.a,
								A2($elm$core$Basics$min, b.a, p.a)) - 0.000001) > -1) && ((_Utils_cmp(
							q.a,
							A2(
								$elm$core$Basics$max,
								a.a,
								A2($elm$core$Basics$max, b.a, p.a)) + 0.000001) < 1) && A4(inside, a, p, b, q))));
					}
				};
				var dx = b.b - a.b;
				var dy = b.a - a.a;
				var lengthSquared = (dx * dx) + (dy * dy);
				var deviationSquared = function (q) {
					var t = A3(
						$elm$core$Basics$clamp,
						0,
						1,
						(((q.b - a.b) * dx) + ((q.a - a.a) * dy)) / A2($elm$core$Basics$max, 0.000001, lengthSquared));
					return A2($elm$core$Basics$pow, (q.b - a.b) - (t * dx), 2) + A2($elm$core$Basics$pow, (q.a - a.a) - (t * dy), 2);
				};
				var highX = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$max,
						a.b,
						A2($elm$core$Basics$max, b.b, p.b)) / bucketSize);
				var highY = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$max,
						a.a,
						A2($elm$core$Basics$max, b.a, p.a)) / bucketSize);
				var lowX = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$min,
						a.b,
						A2($elm$core$Basics$min, b.b, p.b)) / bucketSize);
				var lowY = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$min,
						a.a,
						A2($elm$core$Basics$min, b.a, p.a)) / bucketSize);
				var nearby = A2(
					$elm$core$List$concatMap,
					function (x) {
						return A2(
							$elm$core$List$concatMap,
							function (y) {
								return A2(
									$elm$core$Maybe$withDefault,
									_List_Nil,
									A2(
										$elm$core$Dict$get,
										_Utils_Tuple2(x, y),
										buckets));
							},
							A2($elm$core$List$range, lowY, highY));
					},
					A2($elm$core$List$range, lowX, highX));
				return (($elm$core$Basics$abs(
					A3(cross, a, b, p)) < 0.000001) || ((p.b > 0.000001) && ((p.a > 0.000001) && ((_Utils_cmp(p.b, (grid.e * grid.v) - 0.000001) < 0) && (_Utils_cmp(p.a, (grid.T * grid.w) - 0.000001) < 0))))) && ((!A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$elm$core$Set$member(bId),
						A2($elm$core$Dict$get, aId, active)))) && ((lengthSquared > 0.000001) && ((lengthSquared <= 2500) && (A2(
					$elm$core$List$all,
					function (q) {
						return _Utils_cmp(
							deviationSquared(q),
							A2(
								$elm$core$Basics$pow,
								1.5 * A2($elm$core$Basics$min, grid.v, grid.w),
								2)) < 1;
					},
					A4(originalPoints, id, aId, bId, samples)) && (!A2($elm$core$List$any, blocked, nearby))))));
			});
		var simplify = F2(
			function (id, state) {
				var _v0 = A2(
					$elm$core$Maybe$map,
					$elm$core$Set$toList,
					A2($elm$core$Dict$get, id, state.aO));
				if ((((!_v0.$) && _v0.a.b) && _v0.a.b.b) && (!_v0.a.b.b.b)) {
					var _v1 = _v0.a;
					var a = _v1.a;
					var _v2 = _v1.b;
					var b = _v2.a;
					return A5(removable, id, a, b, state.aO, state.a6) ? {
						aO: A3(
							$elm$core$Dict$update,
							b,
							$elm$core$Maybe$map(
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Set$remove(id),
									$elm$core$Set$insert(a))),
							A3(
								$elm$core$Dict$update,
								a,
								$elm$core$Maybe$map(
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Set$remove(id),
										$elm$core$Set$insert(b))),
								A2($elm$core$Dict$remove, id, state.aO))),
						a6: A3(
							$elm$core$Dict$insert,
							A2(edgeKey, a, b),
							A4(originalPoints, id, a, b, state.a6),
							A2(
								$elm$core$Dict$remove,
								A2(edgeKey, id, b),
								A2(
									$elm$core$Dict$remove,
									A2(edgeKey, a, id),
									state.a6)))
					} : state;
				} else {
					return state;
				}
			});
		var pass = function (state) {
			return A3(
				$elm$core$List$foldl,
				simplify,
				state,
				$elm$core$Dict$keys(connections));
		};
		return $elm$core$Set$fromList(
			$elm$core$Dict$keys(
				pass(
					pass(
						pass(
							{aO: connections, a6: $elm$core$Dict$empty}))).aO));
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
					initial.T - 1,
					$elm$core$Basics$floor(r.ah.a / initial.w));
				var x = A3(
					$elm$core$Basics$clamp,
					0,
					initial.e - 1,
					$elm$core$Basics$floor(r.ah.b / initial.v));
				return A3($elm$core$Array$set, (y * initial.e) + x, r.c, owners);
			});
		var reserved = _Utils_update(
			initial,
			{
				g: A3($elm$core$List$foldl, reserve, initial.g, map.k)
			});
		var permitted = function (id) {
			return A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Set$empty,
				A2(
					$elm$core$Maybe$map,
					function (r) {
						return $elm$core$Set$fromList(
							A2($elm$core$List$cons, r.c, r.z));
					},
					$elm$core$List$head(
						A2($elm$core$List$drop, id, map.k))));
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
					A2($elm$core$Dict$get, region.c, originalPixels));
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
									region.c,
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
											A2($elm$core$Dict$get, region.c, originalPixels)))) {
										return current;
									} else {
										var _v3 = A5(
											$author$project$CellNetwork$bridge,
											permitted(region.c),
											current,
											region.c,
											$elm$core$Set$toList(connected),
											function (n) {
												return _Utils_eq(
													A2($author$project$CellNetwork$owner, current, n),
													region.c) && (!A2($elm$core$Set$member, n, connected));
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
		var joinedSeeds = A3($elm$core$List$foldl, connectRegion, clean, map.k);
		var contacts = $author$project$CellNetwork$adjacency(joinedSeeds);
		var joinedPixels = groups(joinedSeeds);
		var join = F2(
			function (region, grid) {
				return A3(
					$elm$core$List$foldl,
					F2(
						function (other, current) {
							if (_Utils_cmp(other, region.c) < 1) {
								return current;
							} else {
								var starts = A2(
									$elm$core$Maybe$withDefault,
									_List_Nil,
									A2($elm$core$Dict$get, region.c, joinedPixels));
								if (A2(
									$elm$core$Set$member,
									other,
									A2(
										$elm$core$Maybe$withDefault,
										$elm$core$Set$empty,
										A2($elm$core$Dict$get, region.c, contacts)))) {
									return current;
								} else {
									var _v1 = A5(
										$author$project$CellNetwork$bridge,
										permitted(region.c),
										current,
										region.c,
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
					region.z);
			});
		return A3($elm$core$List$foldl, join, joinedSeeds, map.k);
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
		var rows = $elm$core$Basics$ceiling(map.a0 / step);
		var dy = map.a0 / rows;
		var columns = $elm$core$Basics$ceiling(map.bc / step);
		var dx = map.bc / columns;
		var region = F2(
			function (r, owners) {
				var ys = A2(
					$elm$core$List$map,
					function ($) {
						return $.a;
					},
					r.a4);
				var xs = A2(
					$elm$core$List$map,
					function ($) {
						return $.b;
					},
					r.a4);
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
										{b: (x + 0.5) * dx, a: (y + 0.5) * dy},
										r.a4) ? A3($elm$core$Array$set, (y * columns) + x, r.c, current) : current;
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
			v: dx,
			w: dy,
			g: A3(
				$elm$core$List$foldl,
				region,
				A2($elm$core$Array$repeat, columns * rows, -1),
				map.k),
			T: rows
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
				A2($elm$core$Dict$get, r.c, pixelsByRegion));
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
									r.c,
									_List_fromArray(
										[first]),
									_List_Nil,
									$elm$core$Set$singleton(first))),
							$elm$core$List$length(pixels));
					}
				}();
			}(
				_Utils_eq(
					$elm$core$Set$fromList(r.z),
					A2(
						$elm$core$Maybe$withDefault,
						$elm$core$Set$empty,
						A2($elm$core$Dict$get, r.c, contacts))));
		};
		return A2($elm$core$List$all, valid, map.k);
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
						if ((!x) || (_Utils_eq(x, grid.e) || ((!y) || _Utils_eq(y, grid.T)))) {
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
								b: A3($elm$core$Basics$clamp, origin.b - (2 * grid.v), origin.b + (2 * grid.v), (p.b * 0.5) + ((pa.b + pb.b) * 0.25)),
								a: A3($elm$core$Basics$clamp, origin.a - (2 * grid.w), origin.a + (2 * grid.w), (p.a * 0.5) + ((pa.a + pb.a) * 0.25))
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
	var faceArea = F2(
		function (positions, loops) {
			return $elm$core$Basics$abs(
				$elm$core$List$sum(
					A2(
						$elm$core$List$map,
						A2(
							$elm$core$Basics$composeR,
							$elm$core$List$filterMap(
								function (v) {
									return A2($elm$core$Dict$get, v, positions);
								}),
							$author$project$CellNetwork$contourArea),
						loops)));
		});
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
				$elm$core$Basics$sqrt((map.bc * map.a0) / 35000)),
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
			function (_v13) {
				var i = _v13.a;
				var id = _v13.b;
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
					A2($elm$core$List$cons, r.c, r.z));
			},
			contracted.k));
	var speeds = $elm$core$Array$fromList(
		A2(
			$elm$core$List$map,
			function (r) {
				return (!_Utils_eq(r.aa, $elm$core$Maybe$Nothing)) ? 0.72 : ((!_Utils_eq(r.bo, $elm$core$Maybe$Nothing)) ? 1.4 : ((r.bl !== '') ? 1.2 : 1));
			},
			contracted.k));
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
	var physicalGrid = _v3.a;
	var physicalMap = _v3.b;
	var _v4 = A4(
		$author$project$CellNetwork$territories,
		map,
		guarded,
		physicalMap,
		A3($author$project$CellNetwork$joinRepeatedPacking, guarded, physicalMap, physicalGrid));
	var joinedGrid = _v4.a;
	var joinedMap = _v4.b;
	var _v5 = A4(
		$author$project$CellNetwork$territories,
		map,
		guarded,
		joinedMap,
		A2($author$project$CellNetwork$absorbRedundantPacking, joinedMap, joinedGrid));
	var grid = _v5.a;
	var packed = _v5.b;
	var preserved = _v5.c;
	var boundaries = A3(
		$elm$core$List$foldl,
		$author$project$CellNetwork$boundary(grid),
		$elm$core$Dict$empty,
		$elm$core$Array$toIndexedList(grid.g));
	var outlines = A2(
		$elm$core$Dict$map,
		F2(
			function (_v12, edges) {
				return $author$project$CellNetwork$trace(edges);
			}),
		boundaries);
	var facetedLoops = function (kept) {
		return A2(
			$elm$core$Dict$map,
			F2(
				function (_v11, loops) {
					return A2(
						$elm$core$List$map,
						$elm$core$List$filter(
							function (v) {
								return A2($elm$core$Set$member, v, kept);
							}),
						loops);
				}),
			outlines);
	};
	var rawConnections = $author$project$CellNetwork$boundaryConnections(boundaries);
	var _v6 = A3(
		$author$project$CellNetwork$collapseJunctions,
		grid,
		A2($author$project$CellNetwork$smoothVertices, grid, rawConnections),
		rawConnections);
	var relaxedVertices = _v6.a;
	var connections = _v6.b;
	var _v7 = A3(
		$author$project$CellNetwork$collapseJunctions,
		grid,
		A2(
			$elm$core$Dict$map,
			F2(
				function (id, _v8) {
					return A2($author$project$CellNetwork$vertexPoint, grid, id);
				}),
			rawConnections),
		rawConnections);
	var rawVertices = _v7.a;
	var rawLinks = _v7.b;
	var centers = $author$project$CellNetwork$labelCenters(grid);
	var contacts = $author$project$CellNetwork$adjacency(grid);
	var relaxedKept = A3($author$project$CellNetwork$polygonVertices, grid, relaxedVertices, connections);
	var relaxedSafe = A2(
		$elm$core$List$all,
		function (loops) {
			return _Utils_cmp(
				A2(faceArea, relaxedVertices, loops),
				grid.v * grid.w) > -1;
		},
		$elm$core$Dict$values(
			facetedLoops(relaxedKept)));
	var _v9 = relaxedSafe ? _Utils_Tuple2(relaxedVertices, connections) : _Utils_Tuple2(rawVertices, rawLinks);
	var baseVertices = _v9.a;
	var baseLinks = _v9.b;
	var vertices = A4($author$project$CellNetwork$growSmallRegions, grid.e * grid.v, grid.T * grid.w, outlines, baseVertices);
	var preserveAreas = F2(
		function (budget, kept) {
			preserveAreas:
			while (true) {
				var undersized = A2(
					$elm$core$Dict$filter,
					F2(
						function (_v10, loops) {
							return _Utils_cmp(
								A2(faceArea, vertices, loops) + 0.000001,
								A2($author$project$CellNetwork$minimumArea, packed.bc, packed.a0)) < 0;
						}),
					facetedLoops(kept));
				var _protected = $elm$core$Set$fromList(
					$elm$core$List$concat(
						A2(
							$elm$core$List$concatMap,
							function (id) {
								return A2(
									$elm$core$Maybe$withDefault,
									_List_Nil,
									A2($elm$core$Dict$get, id, outlines));
							},
							$elm$core$Dict$keys(undersized))));
				if ((budget <= 0) || $elm$core$Set$isEmpty(_protected)) {
					return kept;
				} else {
					var $temp$budget = budget - 1,
						$temp$kept = A2($elm$core$Set$union, kept, _protected);
					budget = $temp$budget;
					kept = $temp$kept;
					continue preserveAreas;
				}
			}
		});
	var retained = A2(
		preserveAreas,
		$elm$core$List$length(packed.k),
		A3($author$project$CellNetwork$polygonVertices, grid, vertices, baseLinks));
	var regionLoops = facetedLoops(retained);
	var cell = function (region) {
		var stats = A2($elm$core$Dict$get, region.c, centers);
		var loops = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Dict$get, region.c, regionLoops));
		var contours = A2(
			$elm$core$List$map,
			$elm$core$List$map(
				function (v) {
					return A2(
						$elm$core$Maybe$withDefault,
						A2($author$project$CellNetwork$vertexPoint, grid, v),
						A2($elm$core$Dict$get, v, vertices));
				}),
			loops);
		return {
			bF: $elm$core$Basics$abs(
				$elm$core$List$sum(
					A2($elm$core$List$map, $author$project$CellNetwork$contourArea, contours))),
			ah: A2(
				$author$project$CellNetwork$interiorCenter,
				A2(
					$elm$core$Maybe$withDefault,
					region.ah,
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.cJ;
						},
						stats)),
				contours),
			bI: contours,
			c: region.c,
			z: $elm$core$Set$toList(
				A2(
					$elm$core$Maybe$withDefault,
					$elm$core$Set$empty,
					A2($elm$core$Dict$get, region.c, contacts))),
			bU: A2(
				$elm$core$String$join,
				' ',
				A2($elm$core$List$map, $author$project$CellNetwork$polygonOutline, contours))
		};
	};
	var cells = A2($elm$core$List$map, cell, packed.k);
	return {
		b9: cells,
		cg: $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.bF;
				},
				cells)) / (map.bc * map.a0),
		a2: _Utils_update(
			packed,
			{
				k: A3(
					$elm$core$List$map2,
					F2(
						function (region, grownCell) {
							return _Utils_update(
								region,
								{
									ah: grownCell.ah,
									a4: A2(
										$elm$core$Maybe$withDefault,
										_List_Nil,
										$elm$core$List$head(grownCell.bI))
								});
						}),
					packed.k,
					cells)
			}),
		cL: preserved,
		cY: A2($elm$core$Basics$max, grid.v, grid.w)
	};
};
var $author$project$CellNetwork$path = function (cell) {
	return cell.bU;
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
							return (a.b * b.a) - (b.b * a.a);
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
						cell.bI)));
		};
		var tiles = A2(
			$elm$core$List$map,
			function (cell) {
				return {
					bF: cell.bF,
					q: -1,
					r: cell.ah,
					c: cell.c,
					z: cell.z,
					a4: largest(cell),
					u: cell.ah
				};
			},
			network.b9);
		return {
			dF: $elm$core$Maybe$Just(network.a2),
			dG: network.cL,
			cg: network.cg,
			a0: map.a0,
			eh: $elm$core$Dict$fromList(
				A2(
					$elm$core$List$map,
					function (cell) {
						return _Utils_Tuple2(
							cell.c,
							$author$project$CellNetwork$path(cell));
					},
					network.b9)),
			ek: false,
			U: seed,
			Y: tiles,
			bc: map.bc
		};
	});
var $author$project$Generated$DefaultTiling$tiling = {
	dF: $elm$core$Maybe$Just(
		{
			a0: 275,
			bu: 15,
			k: _List_fromArray(
				[
					{
					ah: {b: 31, a: 30.88768115942029},
					aa: $elm$core$Maybe$Just(1),
					bl: '',
					c: 0,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[1]),
					a4: _List_Nil
				},
					{
					ah: {b: 25, a: 86.68478260869566},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 1,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[0, 2, 10]),
					a4: _List_Nil
				},
					{
					ah: {b: 89, a: 68.75},
					aa: $elm$core$Maybe$Nothing,
					bl: 'a',
					c: 2,
					bo: $elm$core$Maybe$Just('a'),
					z: _List_fromArray(
						[1, 3, 7, 10]),
					a4: _List_Nil
				},
					{
					ah: {b: 189, a: 24.90942028985507},
					aa: $elm$core$Maybe$Just(2),
					bl: '',
					c: 3,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[2, 4]),
					a4: _List_Nil
				},
					{
					ah: {b: 237, a: 62.77173913043478},
					aa: $elm$core$Maybe$Nothing,
					bl: 'b',
					c: 4,
					bo: $elm$core$Maybe$Just('b'),
					z: _List_fromArray(
						[3, 5, 8]),
					a4: _List_Nil
				},
					{
					ah: {b: 283, a: 86.68478260869566},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 5,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[4, 6, 9]),
					a4: _List_Nil
				},
					{
					ah: {b: 285, a: 30.88768115942029},
					aa: $elm$core$Maybe$Just(1),
					bl: '',
					c: 6,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[5]),
					a4: _List_Nil
				},
					{
					ah: {b: 129, a: 106.6123188405797},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 7,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[2, 8, 11]),
					a4: _List_Nil
				},
					{
					ah: {b: 187, a: 104.6195652173913},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 8,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[4, 7, 11]),
					a4: _List_Nil
				},
					{
					ah: {b: 245, a: 134.51086956521738},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 9,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[5, 11, 13]),
					a4: _List_Nil
				},
					{
					ah: {b: 53, a: 132.51811594202897},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 10,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[1, 2, 11, 12]),
					a4: _List_Nil
				},
					{
					ah: {b: 151, a: 152.44565217391303},
					aa: $elm$core$Maybe$Nothing,
					bl: '',
					c: 11,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[7, 8, 9, 10, 14, 15, 16]),
					a4: _List_Nil
				},
					{
					ah: {b: 43, a: 198.27898550724638},
					aa: $elm$core$Maybe$Just(0),
					bl: '',
					c: 12,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[10, 16]),
					a4: _List_Nil
				},
					{
					ah: {b: 297, a: 198.27898550724638},
					aa: $elm$core$Maybe$Just(0),
					bl: '',
					c: 13,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[9, 14]),
					a4: _List_Nil
				},
					{
					ah: {b: 227, a: 230.16304347826087},
					aa: $elm$core$Maybe$Just(2),
					bl: '',
					c: 14,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[11, 13, 15]),
					a4: _List_Nil
				},
					{
					ah: {b: 141, a: 224.18478260869566},
					aa: $elm$core$Maybe$Nothing,
					bl: '!((a & b))',
					c: 15,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[11, 14, 16]),
					a4: _List_Nil
				},
					{
					ah: {b: 93, a: 204.2572463768116},
					aa: $elm$core$Maybe$Just(2),
					bl: '',
					c: 16,
					bo: $elm$core$Maybe$Nothing,
					z: _List_fromArray(
						[11, 12, 15]),
					a4: _List_Nil
				}
				]),
			bc: 340
		}),
	dG: true,
	cg: 1.0000000000000002,
	a0: 275,
	eh: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(0, 'M 0 0 L 50 0 L 52 0 L 65.46667403638281 31.76611749541033 L 55.0562706987676 58.842298675958816 L 45.8097751080518 61.58535343471105 L 0 53.80434782608695 L 0 49.81884057971014 Z'),
				_Utils_Tuple2(1, 'M 52 0 L 54 0 L 67.67901484744604 29.984935332520454 L 61.400233339734015 68.48213900387316 L 64 109.60144927536231 L 49.33451896609727 110.9311330278143 L 0 111.59420289855072 L 0 103.6231884057971 L 0 53.80434782608695 L 45.8097751080518 61.58535343471105 L 55.0562706987676 58.842298675958816 L 65.46667403638281 31.76611749541033 Z'),
				_Utils_Tuple2(2, 'M 54 0 L 104 0 L 154 0 L 164 0 L 159.91586974695292 29.80747891453644 L 158.60671644578454 30.49582254561866 L 109.78281543667453 35.6531594929396 L 99.87632840054026 49.34315566487733 L 148 49.81884057971014 L 158 49.81884057971014 L 161 50.815217391304344 L 161 50.815217391304344 L 159.55088078227033 53.356855851899766 L 152.80130396915513 78.51579199825238 L 103.86414330049439 83.56028770882594 L 99.25040872064295 106.86182028324933 L 87.95741177171757 109.55901535225483 L 85 110.59782608695653 L 85 110.59782608695653 L 82 109.60144927536231 L 64 109.60144927536231 L 61.400233339734015 68.48213900387316 L 67.67901484744604 29.984935332520454 Z'),
				_Utils_Tuple2(3, 'M 164 0 L 214 0 L 222 0 L 224.80130324410817 44.638979681891115 L 213.8893246092574 49.70856618676007 L 164 49.81884057971014 L 161 50.815217391304344 L 161 50.815217391304344 L 158 49.81884057971014 L 148 49.81884057971014 L 99.87632840054026 49.34315566487733 L 109.78281543667453 35.6531594929396 L 158.60671644578454 30.49582254561866 L 159.91586974695292 29.80747891453644 Z'),
				_Utils_Tuple2(4, 'M 222 0 L 264 0 L 252.1405206932325 26.018888860959073 L 258.7517504311263 70.55808632104583 L 255.25142036788583 102.87732101872683 L 237.13606088432795 108.74064037387747 L 235 110.59782608695653 L 235 110.59782608695653 L 232.0425882282824 109.55901535225483 L 223.19867737220864 108.40711493711095 L 216.80139942981612 84.88990998840782 L 169.35448852883445 70.38954947308162 L 162.03757996807582 53.76690401731577 L 161 50.815217391304344 L 161 50.815217391304344 L 164 49.81884057971014 L 213.8893246092574 49.70856618676007 L 224.80130324410817 44.638979681891115 Z'),
				_Utils_Tuple2(5, 'M 264 0 L 266 0 L 254.1829045182327 29.840107722674684 L 264.973875827018 58.81226140423934 L 314 61.77536231884058 L 340 61.77536231884058 L 340 111.59420289855072 L 336 111.59420289855072 L 286.005515215166 111.58870766604838 L 237.57425024274596 109.19955151170007 L 235 110.59782608695653 L 237.13606088432795 108.74064037387747 L 255.25142036788583 102.87732101872683 L 258.7517504311263 70.55808632104583 L 252.1405206932325 26.018888860959073 Z'),
				_Utils_Tuple2(6, 'M 266 0 L 316 0 L 340 0 L 340 49.81884057971014 L 340 61.77536231884058 L 314 61.77536231884058 L 264.973875827018 58.81226140423934 L 254.1829045182327 29.840107722674684 Z'),
				_Utils_Tuple2(7, 'M 159.55088078227033 53.356855851899766 L 161 50.815217391304344 L 160 53.80434782608695 L 160 103.6231884057971 L 160 123.55072463768116 L 158.51640513181934 123.09461179722456 L 143.7548690369801 125.3617994460066 L 128.8021042233667 133.92398176475126 L 110.19550139791727 131.3264728550781 L 86.72704453309345 112.86254620796848 L 85 110.59782608695653 L 85 110.59782608695653 L 87.95741177171757 109.55901535225483 L 99.25040872064295 106.86182028324933 L 103.86414330049439 83.56028770882594 L 152.80130396915513 78.51579199825238 Z'),
				_Utils_Tuple2(8, 'M 161 50.815217391304344 L 161 50.815217391304344 L 162.03757996807582 53.76690401731577 L 169.35448852883445 70.38954947308162 L 216.80139942981612 84.88990998840782 L 223.19867737220864 108.40711493711095 L 232.0425882282824 109.55901535225483 L 235 110.59782608695653 L 235 110.59782608695653 L 233.272955465532 112.8625462065989 L 215.15111662555807 128.68317652638314 L 195.50578918743105 134.16570359185437 L 175.26043333334172 124.41712730000243 L 160 123.55072463768116 L 160 103.6231884057971 L 160 53.80434782608695 Z'),
				_Utils_Tuple2(9, 'M 286.005515215166 111.58870766604838 L 336 111.59420289855072 L 340 111.59420289855072 L 340 155.43478260869566 L 322 155.43478260869566 L 273.11528709134245 156.54602880477964 L 237.88109180944429 165.28007336085938 L 228 187.31884057971016 L 214.8377870215925 170.54206003285023 L 210.08142023616034 145.55058062545277 L 217.26156913211128 130.7859837367044 L 235.45340134328154 113.04233829493633 L 235 110.59782608695653 L 235 110.59782608695653 L 237.57425024274596 109.19955151170007 Z'),
				_Utils_Tuple2(10, 'M 64 109.60144927536231 L 82 109.60144927536231 L 85 110.59782608695653 L 85 110.59782608695653 L 84.54659865659589 113.04233829505844 L 109.6497132946997 141.83452479694705 L 107.92876177995637 183.26235322278265 L 88 199.27536231884056 L 87.99425914740198 189.31731425530603 L 81.11637996609366 162.29346199030525 L 48.47087560595764 156.9583666969625 L 0 155.43478260869566 L 0 111.59420289855072 L 49.33451896609727 110.9311330278143 Z'),
				_Utils_Tuple2(11, 'M 85 110.59782608695653 L 85 110.59782608695653 L 86.72704453309345 112.86254620796848 L 110.19550139791727 131.3264728550781 L 128.8021042233667 133.92398176475126 L 143.7548690369801 125.3617994460066 L 158.51640513181934 123.09461179722456 L 160 123.55072463768116 L 175.26043333334172 124.41712730000243 L 195.50578918743105 134.16570359185437 L 215.15111662555807 128.68317652638314 L 233.272955465532 112.8625462065989 L 235 110.59782608695653 L 235 110.59782608695653 L 235.45340134328154 113.04233829493633 L 217.26156913211128 130.7859837367044 L 210.08142023616034 145.55058062545277 L 214.8377870215925 170.54206003285023 L 228 187.31884057971016 L 206.87917405422633 166.51531715141874 L 176.86459150922457 166.26000988724417 L 170.0492559517738 181.38965719832538 L 170 185.32608695652175 L 145.80658673690897 183.52604460769578 L 113.92365909757689 185.25002285285143 L 94 197.28260869565216 L 88 199.27536231884056 L 107.92876177995637 183.26235322278265 L 109.6497132946997 141.83452479694705 L 84.54659865659589 113.04233829505844 Z'),
				_Utils_Tuple2(12, 'M 0 155.43478260869566 L 48.47087560595764 156.9583666969625 L 81.11637996609366 162.29346199030525 L 87.99425914740198 189.31731425530603 L 88 199.27536231884056 L 86 249.09420289855072 L 86 275 L 50 275 L 0 275 L 0 255.07246376811594 L 0 205.25362318840578 Z'),
				_Utils_Tuple2(13, 'M 322 155.43478260869566 L 340 155.43478260869566 L 340 205.25362318840578 L 340 255.07246376811594 L 340 275 L 296 275 L 295.7315144922817 261.31823737182077 L 280.2007153244459 236.93769306441078 L 252.655071812518 196.62991033173026 L 228 187.31884057971016 L 237.88109180944429 165.28007336085938 L 273.11528709134245 156.54602880477964 Z'),
				_Utils_Tuple2(14, 'M 206.87917405422633 166.51531715141874 L 228 187.31884057971016 L 252.655071812518 196.62991033173026 L 280.2007153244459 236.93769306441078 L 295.7315144922817 261.31823737182077 L 296 275 L 284 275 L 234 275 L 184 275 L 184 269.02173913043475 L 184.56973206080846 220.19596697420258 L 175.57902858210144 203.67974989916078 L 170 185.32608695652175 L 170.0492559517738 181.38965719832538 L 176.86459150922457 166.26000988724417 Z'),
				_Utils_Tuple2(15, 'M 145.80658673690897 183.52604460769578 L 170 185.32608695652175 L 175.57902858210144 203.67974989916078 L 184.56973206080846 220.19596697420258 L 184 269.02173913043475 L 184 275 L 148 275 L 98 275 L 98 247.1014492753623 L 94 197.28260869565216 L 113.92365909757689 185.25002285285143 Z'),
				_Utils_Tuple2(16, 'M 94 197.28260869565216 L 98 247.1014492753623 L 98 275 L 86 275 L 86 249.09420289855072 L 88 199.27536231884056 Z')
			])),
	ek: false,
	U: 7,
	Y: _List_fromArray(
		[
			{
			bF: 3457.4981135991625,
			q: -1,
			r: {b: 31, a: 30.88768115942029},
			c: 0,
			z: _List_fromArray(
				[1]),
			a4: _List_Nil,
			u: {b: 31, a: 30.88768115942029}
		},
			{
			bF: 3521.2568379613163,
			q: -1,
			r: {b: 25, a: 86.68478260869566},
			c: 1,
			z: _List_fromArray(
				[0, 2, 10]),
			a4: _List_Nil,
			u: {b: 25, a: 86.68478260869566}
		},
			{
			bF: 8004.722761790913,
			q: -1,
			r: {b: 89, a: 68.75},
			c: 2,
			z: _List_fromArray(
				[1, 3, 7, 10]),
			a4: _List_Nil,
			u: {b: 89, a: 68.75}
		},
			{
			bF: 3984.848276995289,
			q: -1,
			r: {b: 189, a: 24.90942028985507},
			c: 3,
			z: _List_fromArray(
				[2, 4]),
			a4: _List_Nil,
			u: {b: 189, a: 24.90942028985507}
		},
			{
			bF: 5303.656568227696,
			q: -1,
			r: {b: 237, a: 62.77173913043478},
			c: 4,
			z: _List_fromArray(
				[3, 5, 8]),
			a4: _List_Nil,
			u: {b: 237, a: 62.77173913043478}
		},
			{
			bF: 4501.018562157181,
			q: -1,
			r: {b: 283, a: 86.68478260869566},
			c: 5,
			z: _List_fromArray(
				[4, 6, 9]),
			a4: _List_Nil,
			u: {b: 283, a: 86.68478260869566}
		},
			{
			bF: 4864.14221225578,
			q: -1,
			r: {b: 285, a: 30.88768115942029},
			c: 6,
			z: _List_fromArray(
				[5]),
			a4: _List_Nil,
			u: {b: 285, a: 30.88768115942029}
		},
			{
			bF: 3060.488717248545,
			q: -1,
			r: {b: 129, a: 106.6123188405797},
			c: 7,
			z: _List_fromArray(
				[2, 8, 11]),
			a4: _List_Nil,
			u: {b: 129, a: 106.6123188405797}
		},
			{
			bF: 3320.8415323379572,
			q: -1,
			r: {b: 187, a: 104.6195652173913},
			c: 8,
			z: _List_fromArray(
				[4, 7, 11]),
			a4: _List_Nil,
			u: {b: 187, a: 104.6195652173913}
		},
			{
			bF: 6127.912618486773,
			q: -1,
			r: {b: 245, a: 134.51086956521738},
			c: 9,
			z: _List_fromArray(
				[5, 11, 13]),
			a4: _List_Nil,
			u: {b: 245, a: 134.51086956521738}
		},
			{
			bF: 5526.100767786803,
			q: -1,
			r: {b: 53, a: 132.51811594202897},
			c: 10,
			z: _List_fromArray(
				[1, 2, 11, 12]),
			a4: _List_Nil,
			u: {b: 53, a: 132.51811594202897}
		},
			{
			bF: 5420.417445819038,
			q: -1,
			r: {b: 151, a: 152.44565217391303},
			c: 11,
			z: _List_fromArray(
				[7, 8, 9, 10, 14, 15, 16]),
			a4: _List_Nil,
			u: {b: 151, a: 152.44565217391303}
		},
			{
			bF: 10106.032696877524,
			q: -1,
			r: {b: 43, a: 198.27898550724638},
			c: 12,
			z: _List_fromArray(
				[10, 16]),
			a4: _List_Nil,
			u: {b: 43, a: 198.27898550724638}
		},
			{
			bF: 8910.699293811333,
			q: -1,
			r: {b: 297, a: 198.27898550724638},
			c: 13,
			z: _List_fromArray(
				[9, 14]),
			a4: _List_Nil,
			u: {b: 297, a: 198.27898550724638}
		},
			{
			bF: 9081.104584560817,
			q: -1,
			r: {b: 227, a: 230.16304347826087},
			c: 14,
			z: _List_fromArray(
				[11, 13, 15]),
			a4: _List_Nil,
			u: {b: 227, a: 230.16304347826087}
		},
			{
			bF: 7536.07060428677,
			q: -1,
			r: {b: 141, a: 224.18478260869566},
			c: 15,
			z: _List_fromArray(
				[11, 14, 16]),
			a4: _List_Nil,
			u: {b: 141, a: 224.18478260869566}
		},
			{
			bF: 773.1884057970983,
			q: -1,
			r: {b: 93, a: 204.2572463768116},
			c: 16,
			z: _List_fromArray(
				[11, 12, 15]),
			a4: _List_Nil,
			u: {b: 93, a: 204.2572463768116}
		}
		]),
	bc: 340
};
var $author$project$Generated$ExampleTilings$get = function (source) {
	switch (source) {
		case '!(a & b)':
			return $elm$core$Maybe$Just($author$project$Generated$DefaultTiling$tiling);
		case 'a | b':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 230,
							bu: 11,
							k: _List_fromArray(
								[
									{
									ah: {b: 31, a: 31},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 0,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1]),
									a4: _List_Nil
								},
									{
									ah: {b: 25, a: 87},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 9]),
									a4: _List_Nil
								},
									{
									ah: {b: 89, a: 69},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 2,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 3, 7]),
									a4: _List_Nil
								},
									{
									ah: {b: 175, a: 25},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 231, a: 69},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 4,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[3, 5, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 281, a: 87},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 6, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 285, a: 31},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5]),
									a4: _List_Nil
								},
									{
									ah: {b: 129, a: 107},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 8, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 187, a: 105},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 7, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 63, a: 133},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 11, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 245, a: 133},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 11, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 129, a: 177},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a | b)',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 8, 9, 10, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 37, a: 191},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9]),
									a4: _List_Nil
								},
									{
									ah: {b: 275, a: 191},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 197, a: 197},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 13]),
									a4: _List_Nil
								}
								]),
							bc: 340
						}),
					dG: true,
					cg: 1.0000000000000002,
					a0: 230,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 50 0 L 54 0 L 65.91109617440898 28.06089590780831 L 59.211761191988366 55.211761191987684 L 49.41848283940295 61.41845239575071 L 0 56 L 0 50 Z'),
								_Utils_Tuple2(1, 'M 54 0 L 56 0 L 67.85280636306958 24.145728626307232 L 61.52260779576596 57.34507115181736 L 65.86107324945067 104.13892675054933 L 82.86393911567207 109.13606088432793 L 85 111 L 82.41521005843589 109.58610109110629 L 47.10128321963706 111.10128322266542 L 0 112 L 0 106 L 0 56 L 49.41848283940295 61.41845239575071 L 59.211761191988366 55.211761191987684 L 65.91109617440898 28.06089590780831 Z'),
								_Utils_Tuple2(2, 'M 56 0 L 106 0 L 150 0 L 145.91586974709293 29.915869747092913 L 109.78281543666617 35.782807345632826 L 99.87632840054026 49.52258532184051 L 148 50 L 156 50 L 159 51 L 159 51 L 157.9999230817661 53.99992308176611 L 155.25040393487632 77.25040393487632 L 152.80130324423945 78.80130324423945 L 103.86414330049439 83.86414330049439 L 99.25040872064295 107.25040872064295 L 87.95741177171757 109.95741177171757 L 85 111 L 85 111 L 82.86393911567207 109.13606088432793 L 65.86107324945067 104.13892675054933 L 61.52260779576596 57.34507115181736 L 67.85280636306958 24.145728626307232 Z'),
								_Utils_Tuple2(3, 'M 150 0 L 200 0 L 222 0 L 224.80130324410817 44.801303244370715 L 211.94878798451117 49.948787984511156 L 162 50 L 159 51 L 159 51 L 156 50 L 148 50 L 99.87632840054026 49.52258532184051 L 109.78281543666617 35.782807345632826 L 145.91586974709293 29.915869747092913 Z'),
								_Utils_Tuple2(4, 'M 222 0 L 264 0 L 252.18670078704693 26.067322908457236 L 259.71960818877085 64.23683516525946 L 253.25349325339408 103.25349325339408 L 237.1354053110623 109.13540531106231 L 235 111 L 235 111 L 232.0425882282824 109.95741177171757 L 223.19867737220864 108.80132262779134 L 216.80139942981612 85.19860057018388 L 169.57437929581917 70.42562070418083 L 160.46601808948748 53.53398191051252 L 159 51 L 159 51 L 162 50 L 211.94878798451117 49.948787984511156 L 224.80130324410817 44.801303244370715 Z'),
								_Utils_Tuple2(5, 'M 264 0 L 266 0 L 254.3838285218393 29.747693201696002 L 265.16847722325815 58.83152277674185 L 313.99969679128685 61.99969679128682 L 335.2504039348763 59.25040393487632 L 337.8893246092574 49.889324609257386 L 338 0 L 340 0 L 340 50 L 340 100 L 340 112 L 336 112 L 286.01328658682894 111.98671341317105 L 237.58478992952035 109.58610110315004 L 235 111 L 237.1354053110623 109.13540531106231 L 253.25349325339408 103.25349325339408 L 259.71960818877085 64.23683516525946 L 252.18670078704693 26.067322908457236 Z'),
								_Utils_Tuple2(6, 'M 266 0 L 316 0 L 338 0 L 337.8893246092574 49.889324609257386 L 335.2504039348763 59.25040393487632 L 313.99969679128685 61.99969679128682 L 265.16847722325815 58.83152277674185 L 254.3838285218393 29.747693201696002 Z'),
								_Utils_Tuple2(7, 'M 159 51 L 159 51 L 160 54 L 160 104 L 160 122 L 144.97938468836293 125.00606803350703 L 134.53069203870447 132.41032970225626 L 107.85896442782065 130.11446898143134 L 86.83813318578794 113.16186681421206 L 85 111 L 85 111 L 87.95741177171757 109.95741177171757 L 99.25040872064295 107.25040872064295 L 103.86414330049439 83.86414330049439 L 152.80130324423945 78.80130324423945 L 155.25040393487632 77.25040393487632 L 157.9999230817661 53.99992308176611 Z'),
								_Utils_Tuple2(8, 'M 159 51 L 160.46601808948748 53.53398191051252 L 169.57437929581917 70.42562070418083 L 216.80139942981612 85.19860057018388 L 223.19867737220864 108.80132262779134 L 232.0425882282824 109.95741177171757 L 235 111 L 235 111 L 233.26534742301038 113.26534742301038 L 208.79600721052338 130.7959755154993 L 195.17425265826222 133.02687242938208 L 177.09286309099335 126.91119634137578 L 160 122 L 160 104 L 160 54 Z'),
								_Utils_Tuple2(9, 'M 82.41521005843589 109.58610109110629 L 85 111 L 85 111 L 84.67498877458398 113.32501122541602 L 104.0081202602469 131.9918731015955 L 109.5962707785463 149.6289298691703 L 89.15309245038276 187.38079091646296 L 92 230 L 90 230 L 89.11384923317135 210.88615076682865 L 81.08707564341432 162.91292435658568 L 48.78320241343091 157.2167975865691 L 0 154 L 0 112 L 47.10128321963706 111.10128322266542 Z'),
								_Utils_Tuple2(10, 'M 286.01328658682894 111.98671341317105 L 336 112 L 340 112 L 340 154 L 320 154 L 270.4498212793891 156.44982127938906 L 237.92003700249637 165.92003700249637 L 230 192 L 230.73854760474939 187.26777961855555 L 216.58599811081928 163.41400191655845 L 210.51838351270354 140.49025220208924 L 235.45002063789997 113.45002063789995 L 235 111 L 235 111 L 237.58478992952035 109.58610110315004 Z'),
								_Utils_Tuple2(11, 'M 85 111 L 85 111 L 86.83813318578794 113.16186681421206 L 107.85896442782065 130.11446898143134 L 134.53069203870447 132.41032970225626 L 144.97938468836293 125.00606803350703 L 160 122 L 177.09286309099335 126.91119634137578 L 195.17425265826222 133.02687242938208 L 208.79600721052338 130.7959755154993 L 233.26534742301038 113.26534742301038 L 235 111 L 235 111 L 235.45002063789997 113.45002063789995 L 210.51838351270354 140.49025220208924 L 216.58599811081928 163.41400191655845 L 230.73854760474939 187.26777961855555 L 230 192 L 216.22213747117007 167.7778625288467 L 177.27711971133337 165.27711971437776 L 166.21999017446961 174.21999017446961 L 164.00000000000034 224.00000000000034 L 164 230 L 142 230 L 92 230 L 89.15309245038276 187.38079091646296 L 109.5962707785463 149.6289298691703 L 104.0081202602469 131.9918731015955 L 84.67498877458398 113.32501122541602 Z'),
								_Utils_Tuple2(12, 'M 0 154 L 48.78320241343091 157.2167975865691 L 81.08707564341432 162.91292435658568 L 89.11384923317135 210.88615076682865 L 90 230 L 50 230 L 0 230 L 0 204 Z'),
								_Utils_Tuple2(13, 'M 320 154 L 340 154 L 340 204 L 340 230 L 332 230 L 282 230 L 232 230 L 230 192 L 237.92003700249637 165.92003700249637 L 270.4498212793891 156.44982127938906 Z'),
								_Utils_Tuple2(14, 'M 216.22213747117007 167.7778625288467 L 230 192 L 232 230 L 214 230 L 164 230 L 164.00000000000034 224.00000000000034 L 166.21999017446961 174.21999017446961 L 177.27711971133337 165.27711971437776 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 3584.2346578123334,
							q: -1,
							r: {b: 31, a: 31},
							c: 0,
							z: _List_fromArray(
								[1]),
							a4: _List_Nil,
							u: {b: 31, a: 31}
						},
							{
							bF: 3567.974903489984,
							q: -1,
							r: {b: 25, a: 87},
							c: 1,
							z: _List_fromArray(
								[0, 2, 9]),
							a4: _List_Nil,
							u: {b: 25, a: 87}
						},
							{
							bF: 7406.399470925515,
							q: -1,
							r: {b: 89, a: 69},
							c: 2,
							z: _List_fromArray(
								[1, 3, 7]),
							a4: _List_Nil,
							u: {b: 89, a: 69}
						},
							{
							bF: 4469.418523795309,
							q: -1,
							r: {b: 175, a: 25},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 175, a: 25}
						},
							{
							bF: 5338.843710654171,
							q: -1,
							r: {b: 231, a: 69},
							c: 4,
							z: _List_fromArray(
								[3, 5, 8]),
							a4: _List_Nil,
							u: {b: 231, a: 69}
						},
							{
							bF: 4704.31263574986,
							q: -1,
							r: {b: 281, a: 87},
							c: 5,
							z: _List_fromArray(
								[4, 6, 10]),
							a4: _List_Nil,
							u: {b: 281, a: 87}
						},
							{
							bF: 4690.130111435961,
							q: -1,
							r: {b: 285, a: 31},
							c: 6,
							z: _List_fromArray(
								[5]),
							a4: _List_Nil,
							u: {b: 285, a: 31}
						},
							{
							bF: 3013.076155472036,
							q: -1,
							r: {b: 129, a: 107},
							c: 7,
							z: _List_fromArray(
								[2, 8, 11]),
							a4: _List_Nil,
							u: {b: 129, a: 107}
						},
							{
							bF: 3276.608285271366,
							q: -1,
							r: {b: 187, a: 105},
							c: 8,
							z: _List_fromArray(
								[4, 7, 11]),
							a4: _List_Nil,
							u: {b: 187, a: 105}
						},
							{
							bF: 5210.270474790032,
							q: -1,
							r: {b: 63, a: 133},
							c: 9,
							z: _List_fromArray(
								[1, 11, 12]),
							a4: _List_Nil,
							u: {b: 63, a: 133}
						},
							{
							bF: 5884.0037883478235,
							q: -1,
							r: {b: 245, a: 133},
							c: 10,
							z: _List_fromArray(
								[5, 11, 13]),
							a4: _List_Nil,
							u: {b: 245, a: 133}
						},
							{
							bF: 9047.022411876274,
							q: -1,
							r: {b: 129, a: 177},
							c: 11,
							z: _List_fromArray(
								[7, 8, 9, 10, 14]),
							a4: _List_Nil,
							u: {b: 129, a: 177}
						},
							{
							bF: 6242.662934705376,
							q: -1,
							r: {b: 37, a: 191},
							c: 12,
							z: _List_fromArray(
								[9]),
							a4: _List_Nil,
							u: {b: 37, a: 191}
						},
							{
							bF: 7829.896993773851,
							q: -1,
							r: {b: 275, a: 191},
							c: 13,
							z: _List_fromArray(
								[10, 14]),
							a4: _List_Nil,
							u: {b: 275, a: 191}
						},
							{
							bF: 3935.144941900109,
							q: -1,
							r: {b: 197, a: 197},
							c: 14,
							z: _List_fromArray(
								[11, 13]),
							a4: _List_Nil,
							u: {b: 197, a: 197}
						}
						]),
					bc: 340
				});
		case 'a & b':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 230,
							bu: 11,
							k: _List_fromArray(
								[
									{
									ah: {b: 31, a: 31},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 0,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1]),
									a4: _List_Nil
								},
									{
									ah: {b: 25, a: 87},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 9]),
									a4: _List_Nil
								},
									{
									ah: {b: 89, a: 69},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 2,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 3, 7]),
									a4: _List_Nil
								},
									{
									ah: {b: 175, a: 25},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 231, a: 69},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 4,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[3, 5, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 281, a: 87},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 6, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 285, a: 31},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5]),
									a4: _List_Nil
								},
									{
									ah: {b: 129, a: 107},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 8, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 187, a: 105},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 7, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 63, a: 133},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 11, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 245, a: 133},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 11, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 129, a: 177},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a & b)',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 8, 9, 10, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 37, a: 191},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9]),
									a4: _List_Nil
								},
									{
									ah: {b: 275, a: 191},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 197, a: 197},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 13]),
									a4: _List_Nil
								}
								]),
							bc: 340
						}),
					dG: true,
					cg: 1.0000000000000002,
					a0: 230,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 50 0 L 54 0 L 65.91109617440898 28.06089590780831 L 59.211761191988366 55.211761191987684 L 49.41848283940295 61.41845239575071 L 0 56 L 0 50 Z'),
								_Utils_Tuple2(1, 'M 54 0 L 56 0 L 67.85280636306958 24.145728626307232 L 61.52260779576596 57.34507115181736 L 65.86107324945067 104.13892675054933 L 82.86393911567207 109.13606088432793 L 85 111 L 82.41521005843589 109.58610109110629 L 47.10128321963706 111.10128322266542 L 0 112 L 0 106 L 0 56 L 49.41848283940295 61.41845239575071 L 59.211761191988366 55.211761191987684 L 65.91109617440898 28.06089590780831 Z'),
								_Utils_Tuple2(2, 'M 56 0 L 106 0 L 150 0 L 145.91586974709293 29.915869747092913 L 109.78281543666617 35.782807345632826 L 99.87632840054026 49.52258532184051 L 148 50 L 156 50 L 159 51 L 159 51 L 157.9999230817661 53.99992308176611 L 155.25040393487632 77.25040393487632 L 152.80130324423945 78.80130324423945 L 103.86414330049439 83.86414330049439 L 99.25040872064295 107.25040872064295 L 87.95741177171757 109.95741177171757 L 85 111 L 85 111 L 82.86393911567207 109.13606088432793 L 65.86107324945067 104.13892675054933 L 61.52260779576596 57.34507115181736 L 67.85280636306958 24.145728626307232 Z'),
								_Utils_Tuple2(3, 'M 150 0 L 200 0 L 222 0 L 224.80130324410817 44.801303244370715 L 211.94878798451117 49.948787984511156 L 162 50 L 159 51 L 159 51 L 156 50 L 148 50 L 99.87632840054026 49.52258532184051 L 109.78281543666617 35.782807345632826 L 145.91586974709293 29.915869747092913 Z'),
								_Utils_Tuple2(4, 'M 222 0 L 264 0 L 252.18670078704693 26.067322908457236 L 259.71960818877085 64.23683516525946 L 253.25349325339408 103.25349325339408 L 237.1354053110623 109.13540531106231 L 235 111 L 235 111 L 232.0425882282824 109.95741177171757 L 223.19867737220864 108.80132262779134 L 216.80139942981612 85.19860057018388 L 169.57437929581917 70.42562070418083 L 160.46601808948748 53.53398191051252 L 159 51 L 159 51 L 162 50 L 211.94878798451117 49.948787984511156 L 224.80130324410817 44.801303244370715 Z'),
								_Utils_Tuple2(5, 'M 264 0 L 266 0 L 254.3838285218393 29.747693201696002 L 265.16847722325815 58.83152277674185 L 313.99969679128685 61.99969679128682 L 335.2504039348763 59.25040393487632 L 337.8893246092574 49.889324609257386 L 338 0 L 340 0 L 340 50 L 340 100 L 340 112 L 336 112 L 286.01328658682894 111.98671341317105 L 237.58478992952035 109.58610110315004 L 235 111 L 237.1354053110623 109.13540531106231 L 253.25349325339408 103.25349325339408 L 259.71960818877085 64.23683516525946 L 252.18670078704693 26.067322908457236 Z'),
								_Utils_Tuple2(6, 'M 266 0 L 316 0 L 338 0 L 337.8893246092574 49.889324609257386 L 335.2504039348763 59.25040393487632 L 313.99969679128685 61.99969679128682 L 265.16847722325815 58.83152277674185 L 254.3838285218393 29.747693201696002 Z'),
								_Utils_Tuple2(7, 'M 159 51 L 159 51 L 160 54 L 160 104 L 160 122 L 144.97938468836293 125.00606803350703 L 134.53069203870447 132.41032970225626 L 107.85896442782065 130.11446898143134 L 86.83813318578794 113.16186681421206 L 85 111 L 85 111 L 87.95741177171757 109.95741177171757 L 99.25040872064295 107.25040872064295 L 103.86414330049439 83.86414330049439 L 152.80130324423945 78.80130324423945 L 155.25040393487632 77.25040393487632 L 157.9999230817661 53.99992308176611 Z'),
								_Utils_Tuple2(8, 'M 159 51 L 160.46601808948748 53.53398191051252 L 169.57437929581917 70.42562070418083 L 216.80139942981612 85.19860057018388 L 223.19867737220864 108.80132262779134 L 232.0425882282824 109.95741177171757 L 235 111 L 235 111 L 233.26534742301038 113.26534742301038 L 208.79600721052338 130.7959755154993 L 195.17425265826222 133.02687242938208 L 177.09286309099335 126.91119634137578 L 160 122 L 160 104 L 160 54 Z'),
								_Utils_Tuple2(9, 'M 82.41521005843589 109.58610109110629 L 85 111 L 85 111 L 84.67498877458398 113.32501122541602 L 104.0081202602469 131.9918731015955 L 109.5962707785463 149.6289298691703 L 89.15309245038276 187.38079091646296 L 92 230 L 90 230 L 89.11384923317135 210.88615076682865 L 81.08707564341432 162.91292435658568 L 48.78320241343091 157.2167975865691 L 0 154 L 0 112 L 47.10128321963706 111.10128322266542 Z'),
								_Utils_Tuple2(10, 'M 286.01328658682894 111.98671341317105 L 336 112 L 340 112 L 340 154 L 320 154 L 270.4498212793891 156.44982127938906 L 237.92003700249637 165.92003700249637 L 230 192 L 230.73854760474939 187.26777961855555 L 216.58599811081928 163.41400191655845 L 210.51838351270354 140.49025220208924 L 235.45002063789997 113.45002063789995 L 235 111 L 235 111 L 237.58478992952035 109.58610110315004 Z'),
								_Utils_Tuple2(11, 'M 85 111 L 85 111 L 86.83813318578794 113.16186681421206 L 107.85896442782065 130.11446898143134 L 134.53069203870447 132.41032970225626 L 144.97938468836293 125.00606803350703 L 160 122 L 177.09286309099335 126.91119634137578 L 195.17425265826222 133.02687242938208 L 208.79600721052338 130.7959755154993 L 233.26534742301038 113.26534742301038 L 235 111 L 235 111 L 235.45002063789997 113.45002063789995 L 210.51838351270354 140.49025220208924 L 216.58599811081928 163.41400191655845 L 230.73854760474939 187.26777961855555 L 230 192 L 216.22213747117007 167.7778625288467 L 177.27711971133337 165.27711971437776 L 166.21999017446961 174.21999017446961 L 164.00000000000034 224.00000000000034 L 164 230 L 142 230 L 92 230 L 89.15309245038276 187.38079091646296 L 109.5962707785463 149.6289298691703 L 104.0081202602469 131.9918731015955 L 84.67498877458398 113.32501122541602 Z'),
								_Utils_Tuple2(12, 'M 0 154 L 48.78320241343091 157.2167975865691 L 81.08707564341432 162.91292435658568 L 89.11384923317135 210.88615076682865 L 90 230 L 50 230 L 0 230 L 0 204 Z'),
								_Utils_Tuple2(13, 'M 320 154 L 340 154 L 340 204 L 340 230 L 332 230 L 282 230 L 232 230 L 230 192 L 237.92003700249637 165.92003700249637 L 270.4498212793891 156.44982127938906 Z'),
								_Utils_Tuple2(14, 'M 216.22213747117007 167.7778625288467 L 230 192 L 232 230 L 214 230 L 164 230 L 164.00000000000034 224.00000000000034 L 166.21999017446961 174.21999017446961 L 177.27711971133337 165.27711971437776 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 3584.2346578123334,
							q: -1,
							r: {b: 31, a: 31},
							c: 0,
							z: _List_fromArray(
								[1]),
							a4: _List_Nil,
							u: {b: 31, a: 31}
						},
							{
							bF: 3567.974903489984,
							q: -1,
							r: {b: 25, a: 87},
							c: 1,
							z: _List_fromArray(
								[0, 2, 9]),
							a4: _List_Nil,
							u: {b: 25, a: 87}
						},
							{
							bF: 7406.399470925515,
							q: -1,
							r: {b: 89, a: 69},
							c: 2,
							z: _List_fromArray(
								[1, 3, 7]),
							a4: _List_Nil,
							u: {b: 89, a: 69}
						},
							{
							bF: 4469.418523795309,
							q: -1,
							r: {b: 175, a: 25},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 175, a: 25}
						},
							{
							bF: 5338.843710654171,
							q: -1,
							r: {b: 231, a: 69},
							c: 4,
							z: _List_fromArray(
								[3, 5, 8]),
							a4: _List_Nil,
							u: {b: 231, a: 69}
						},
							{
							bF: 4704.31263574986,
							q: -1,
							r: {b: 281, a: 87},
							c: 5,
							z: _List_fromArray(
								[4, 6, 10]),
							a4: _List_Nil,
							u: {b: 281, a: 87}
						},
							{
							bF: 4690.130111435961,
							q: -1,
							r: {b: 285, a: 31},
							c: 6,
							z: _List_fromArray(
								[5]),
							a4: _List_Nil,
							u: {b: 285, a: 31}
						},
							{
							bF: 3013.076155472036,
							q: -1,
							r: {b: 129, a: 107},
							c: 7,
							z: _List_fromArray(
								[2, 8, 11]),
							a4: _List_Nil,
							u: {b: 129, a: 107}
						},
							{
							bF: 3276.608285271366,
							q: -1,
							r: {b: 187, a: 105},
							c: 8,
							z: _List_fromArray(
								[4, 7, 11]),
							a4: _List_Nil,
							u: {b: 187, a: 105}
						},
							{
							bF: 5210.270474790032,
							q: -1,
							r: {b: 63, a: 133},
							c: 9,
							z: _List_fromArray(
								[1, 11, 12]),
							a4: _List_Nil,
							u: {b: 63, a: 133}
						},
							{
							bF: 5884.0037883478235,
							q: -1,
							r: {b: 245, a: 133},
							c: 10,
							z: _List_fromArray(
								[5, 11, 13]),
							a4: _List_Nil,
							u: {b: 245, a: 133}
						},
							{
							bF: 9047.022411876274,
							q: -1,
							r: {b: 129, a: 177},
							c: 11,
							z: _List_fromArray(
								[7, 8, 9, 10, 14]),
							a4: _List_Nil,
							u: {b: 129, a: 177}
						},
							{
							bF: 6242.662934705376,
							q: -1,
							r: {b: 37, a: 191},
							c: 12,
							z: _List_fromArray(
								[9]),
							a4: _List_Nil,
							u: {b: 37, a: 191}
						},
							{
							bF: 7829.896993773851,
							q: -1,
							r: {b: 275, a: 191},
							c: 13,
							z: _List_fromArray(
								[10, 14]),
							a4: _List_Nil,
							u: {b: 275, a: 191}
						},
							{
							bF: 3935.144941900109,
							q: -1,
							r: {b: 197, a: 197},
							c: 14,
							z: _List_fromArray(
								[11, 13]),
							a4: _List_Nil,
							u: {b: 197, a: 197}
						}
						]),
					bc: 340
				});
		case '!(a | b)':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 275,
							bu: 15,
							k: _List_fromArray(
								[
									{
									ah: {b: 31, a: 30.88768115942029},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 0,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1]),
									a4: _List_Nil
								},
									{
									ah: {b: 25, a: 86.68478260869566},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 89, a: 68.75},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 2,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 3, 7, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 189, a: 24.90942028985507},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 237, a: 62.77173913043478},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 4,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[3, 5, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 283, a: 86.68478260869566},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 6, 9]),
									a4: _List_Nil
								},
									{
									ah: {b: 285, a: 30.88768115942029},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5]),
									a4: _List_Nil
								},
									{
									ah: {b: 129, a: 106.6123188405797},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 8, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 187, a: 104.6195652173913},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 7, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 245, a: 134.51086956521738},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 11, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 53, a: 132.51811594202897},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 2, 11, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 151, a: 152.44565217391303},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 8, 9, 10, 14, 15, 16]),
									a4: _List_Nil
								},
									{
									ah: {b: 43, a: 198.27898550724638},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 16]),
									a4: _List_Nil
								},
									{
									ah: {b: 297, a: 198.27898550724638},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 227, a: 230.16304347826087},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 13, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 141, a: 224.18478260869566},
									aa: $elm$core$Maybe$Nothing,
									bl: '!((a | b))',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 14, 16]),
									a4: _List_Nil
								},
									{
									ah: {b: 93, a: 204.2572463768116},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 16,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 12, 15]),
									a4: _List_Nil
								}
								]),
							bc: 340
						}),
					dG: true,
					cg: 1.0000000000000002,
					a0: 275,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 50 0 L 52 0 L 65.46667403638281 31.76611749541033 L 55.0562706987676 58.842298675958816 L 45.8097751080518 61.58535343471105 L 0 53.80434782608695 L 0 49.81884057971014 Z'),
								_Utils_Tuple2(1, 'M 52 0 L 54 0 L 67.67901484744604 29.984935332520454 L 61.400233339734015 68.48213900387316 L 64 109.60144927536231 L 49.33451896609727 110.9311330278143 L 0 111.59420289855072 L 0 103.6231884057971 L 0 53.80434782608695 L 45.8097751080518 61.58535343471105 L 55.0562706987676 58.842298675958816 L 65.46667403638281 31.76611749541033 Z'),
								_Utils_Tuple2(2, 'M 54 0 L 104 0 L 154 0 L 164 0 L 159.91586974695292 29.80747891453644 L 158.60671644578454 30.49582254561866 L 109.78281543667453 35.6531594929396 L 99.87632840054026 49.34315566487733 L 148 49.81884057971014 L 158 49.81884057971014 L 161 50.815217391304344 L 161 50.815217391304344 L 159.55088078227033 53.356855851899766 L 152.80130396915513 78.51579199825238 L 103.86414330049439 83.56028770882594 L 99.25040872064295 106.86182028324933 L 87.95741177171757 109.55901535225483 L 85 110.59782608695653 L 85 110.59782608695653 L 82 109.60144927536231 L 64 109.60144927536231 L 61.400233339734015 68.48213900387316 L 67.67901484744604 29.984935332520454 Z'),
								_Utils_Tuple2(3, 'M 164 0 L 214 0 L 222 0 L 224.80130324410817 44.638979681891115 L 213.8893246092574 49.70856618676007 L 164 49.81884057971014 L 161 50.815217391304344 L 161 50.815217391304344 L 158 49.81884057971014 L 148 49.81884057971014 L 99.87632840054026 49.34315566487733 L 109.78281543667453 35.6531594929396 L 158.60671644578454 30.49582254561866 L 159.91586974695292 29.80747891453644 Z'),
								_Utils_Tuple2(4, 'M 222 0 L 264 0 L 252.1405206932325 26.018888860959073 L 258.7517504311263 70.55808632104583 L 255.25142036788583 102.87732101872683 L 237.13606088432795 108.74064037387747 L 235 110.59782608695653 L 235 110.59782608695653 L 232.0425882282824 109.55901535225483 L 223.19867737220864 108.40711493711095 L 216.80139942981612 84.88990998840782 L 169.35448852883445 70.38954947308162 L 162.03757996807582 53.76690401731577 L 161 50.815217391304344 L 161 50.815217391304344 L 164 49.81884057971014 L 213.8893246092574 49.70856618676007 L 224.80130324410817 44.638979681891115 Z'),
								_Utils_Tuple2(5, 'M 264 0 L 266 0 L 254.1829045182327 29.840107722674684 L 264.973875827018 58.81226140423934 L 314 61.77536231884058 L 340 61.77536231884058 L 340 111.59420289855072 L 336 111.59420289855072 L 286.005515215166 111.58870766604838 L 237.57425024274596 109.19955151170007 L 235 110.59782608695653 L 237.13606088432795 108.74064037387747 L 255.25142036788583 102.87732101872683 L 258.7517504311263 70.55808632104583 L 252.1405206932325 26.018888860959073 Z'),
								_Utils_Tuple2(6, 'M 266 0 L 316 0 L 340 0 L 340 49.81884057971014 L 340 61.77536231884058 L 314 61.77536231884058 L 264.973875827018 58.81226140423934 L 254.1829045182327 29.840107722674684 Z'),
								_Utils_Tuple2(7, 'M 159.55088078227033 53.356855851899766 L 161 50.815217391304344 L 160 53.80434782608695 L 160 103.6231884057971 L 160 123.55072463768116 L 158.51640513181934 123.09461179722456 L 143.7548690369801 125.3617994460066 L 128.8021042233667 133.92398176475126 L 110.19550139791727 131.3264728550781 L 86.72704453309345 112.86254620796848 L 85 110.59782608695653 L 85 110.59782608695653 L 87.95741177171757 109.55901535225483 L 99.25040872064295 106.86182028324933 L 103.86414330049439 83.56028770882594 L 152.80130396915513 78.51579199825238 Z'),
								_Utils_Tuple2(8, 'M 161 50.815217391304344 L 161 50.815217391304344 L 162.03757996807582 53.76690401731577 L 169.35448852883445 70.38954947308162 L 216.80139942981612 84.88990998840782 L 223.19867737220864 108.40711493711095 L 232.0425882282824 109.55901535225483 L 235 110.59782608695653 L 235 110.59782608695653 L 233.272955465532 112.8625462065989 L 215.15111662555807 128.68317652638314 L 195.50578918743105 134.16570359185437 L 175.26043333334172 124.41712730000243 L 160 123.55072463768116 L 160 103.6231884057971 L 160 53.80434782608695 Z'),
								_Utils_Tuple2(9, 'M 286.005515215166 111.58870766604838 L 336 111.59420289855072 L 340 111.59420289855072 L 340 155.43478260869566 L 322 155.43478260869566 L 273.11528709134245 156.54602880477964 L 237.88109180944429 165.28007336085938 L 228 187.31884057971016 L 214.8377870215925 170.54206003285023 L 210.08142023616034 145.55058062545277 L 217.26156913211128 130.7859837367044 L 235.45340134328154 113.04233829493633 L 235 110.59782608695653 L 235 110.59782608695653 L 237.57425024274596 109.19955151170007 Z'),
								_Utils_Tuple2(10, 'M 64 109.60144927536231 L 82 109.60144927536231 L 85 110.59782608695653 L 85 110.59782608695653 L 84.54659865659589 113.04233829505844 L 109.6497132946997 141.83452479694705 L 107.92876177995637 183.26235322278265 L 88 199.27536231884056 L 87.99425914740198 189.31731425530603 L 81.11637996609366 162.29346199030525 L 48.47087560595764 156.9583666969625 L 0 155.43478260869566 L 0 111.59420289855072 L 49.33451896609727 110.9311330278143 Z'),
								_Utils_Tuple2(11, 'M 85 110.59782608695653 L 85 110.59782608695653 L 86.72704453309345 112.86254620796848 L 110.19550139791727 131.3264728550781 L 128.8021042233667 133.92398176475126 L 143.7548690369801 125.3617994460066 L 158.51640513181934 123.09461179722456 L 160 123.55072463768116 L 175.26043333334172 124.41712730000243 L 195.50578918743105 134.16570359185437 L 215.15111662555807 128.68317652638314 L 233.272955465532 112.8625462065989 L 235 110.59782608695653 L 235 110.59782608695653 L 235.45340134328154 113.04233829493633 L 217.26156913211128 130.7859837367044 L 210.08142023616034 145.55058062545277 L 214.8377870215925 170.54206003285023 L 228 187.31884057971016 L 206.87917405422633 166.51531715141874 L 176.86459150922457 166.26000988724417 L 170.0492559517738 181.38965719832538 L 170 185.32608695652175 L 145.80658673690897 183.52604460769578 L 113.92365909757689 185.25002285285143 L 94 197.28260869565216 L 88 199.27536231884056 L 107.92876177995637 183.26235322278265 L 109.6497132946997 141.83452479694705 L 84.54659865659589 113.04233829505844 Z'),
								_Utils_Tuple2(12, 'M 0 155.43478260869566 L 48.47087560595764 156.9583666969625 L 81.11637996609366 162.29346199030525 L 87.99425914740198 189.31731425530603 L 88 199.27536231884056 L 86 249.09420289855072 L 86 275 L 50 275 L 0 275 L 0 255.07246376811594 L 0 205.25362318840578 Z'),
								_Utils_Tuple2(13, 'M 322 155.43478260869566 L 340 155.43478260869566 L 340 205.25362318840578 L 340 255.07246376811594 L 340 275 L 296 275 L 295.7315144922817 261.31823737182077 L 280.2007153244459 236.93769306441078 L 252.655071812518 196.62991033173026 L 228 187.31884057971016 L 237.88109180944429 165.28007336085938 L 273.11528709134245 156.54602880477964 Z'),
								_Utils_Tuple2(14, 'M 206.87917405422633 166.51531715141874 L 228 187.31884057971016 L 252.655071812518 196.62991033173026 L 280.2007153244459 236.93769306441078 L 295.7315144922817 261.31823737182077 L 296 275 L 284 275 L 234 275 L 184 275 L 184 269.02173913043475 L 184.56973206080846 220.19596697420258 L 175.57902858210144 203.67974989916078 L 170 185.32608695652175 L 170.0492559517738 181.38965719832538 L 176.86459150922457 166.26000988724417 Z'),
								_Utils_Tuple2(15, 'M 145.80658673690897 183.52604460769578 L 170 185.32608695652175 L 175.57902858210144 203.67974989916078 L 184.56973206080846 220.19596697420258 L 184 269.02173913043475 L 184 275 L 148 275 L 98 275 L 98 247.1014492753623 L 94 197.28260869565216 L 113.92365909757689 185.25002285285143 Z'),
								_Utils_Tuple2(16, 'M 94 197.28260869565216 L 98 247.1014492753623 L 98 275 L 86 275 L 86 249.09420289855072 L 88 199.27536231884056 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 3457.4981135991625,
							q: -1,
							r: {b: 31, a: 30.88768115942029},
							c: 0,
							z: _List_fromArray(
								[1]),
							a4: _List_Nil,
							u: {b: 31, a: 30.88768115942029}
						},
							{
							bF: 3521.2568379613163,
							q: -1,
							r: {b: 25, a: 86.68478260869566},
							c: 1,
							z: _List_fromArray(
								[0, 2, 10]),
							a4: _List_Nil,
							u: {b: 25, a: 86.68478260869566}
						},
							{
							bF: 8004.722761790913,
							q: -1,
							r: {b: 89, a: 68.75},
							c: 2,
							z: _List_fromArray(
								[1, 3, 7, 10]),
							a4: _List_Nil,
							u: {b: 89, a: 68.75}
						},
							{
							bF: 3984.848276995289,
							q: -1,
							r: {b: 189, a: 24.90942028985507},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 189, a: 24.90942028985507}
						},
							{
							bF: 5303.656568227696,
							q: -1,
							r: {b: 237, a: 62.77173913043478},
							c: 4,
							z: _List_fromArray(
								[3, 5, 8]),
							a4: _List_Nil,
							u: {b: 237, a: 62.77173913043478}
						},
							{
							bF: 4501.018562157181,
							q: -1,
							r: {b: 283, a: 86.68478260869566},
							c: 5,
							z: _List_fromArray(
								[4, 6, 9]),
							a4: _List_Nil,
							u: {b: 283, a: 86.68478260869566}
						},
							{
							bF: 4864.14221225578,
							q: -1,
							r: {b: 285, a: 30.88768115942029},
							c: 6,
							z: _List_fromArray(
								[5]),
							a4: _List_Nil,
							u: {b: 285, a: 30.88768115942029}
						},
							{
							bF: 3060.488717248545,
							q: -1,
							r: {b: 129, a: 106.6123188405797},
							c: 7,
							z: _List_fromArray(
								[2, 8, 11]),
							a4: _List_Nil,
							u: {b: 129, a: 106.6123188405797}
						},
							{
							bF: 3320.8415323379572,
							q: -1,
							r: {b: 187, a: 104.6195652173913},
							c: 8,
							z: _List_fromArray(
								[4, 7, 11]),
							a4: _List_Nil,
							u: {b: 187, a: 104.6195652173913}
						},
							{
							bF: 6127.912618486773,
							q: -1,
							r: {b: 245, a: 134.51086956521738},
							c: 9,
							z: _List_fromArray(
								[5, 11, 13]),
							a4: _List_Nil,
							u: {b: 245, a: 134.51086956521738}
						},
							{
							bF: 5526.100767786803,
							q: -1,
							r: {b: 53, a: 132.51811594202897},
							c: 10,
							z: _List_fromArray(
								[1, 2, 11, 12]),
							a4: _List_Nil,
							u: {b: 53, a: 132.51811594202897}
						},
							{
							bF: 5420.417445819038,
							q: -1,
							r: {b: 151, a: 152.44565217391303},
							c: 11,
							z: _List_fromArray(
								[7, 8, 9, 10, 14, 15, 16]),
							a4: _List_Nil,
							u: {b: 151, a: 152.44565217391303}
						},
							{
							bF: 10106.032696877524,
							q: -1,
							r: {b: 43, a: 198.27898550724638},
							c: 12,
							z: _List_fromArray(
								[10, 16]),
							a4: _List_Nil,
							u: {b: 43, a: 198.27898550724638}
						},
							{
							bF: 8910.699293811333,
							q: -1,
							r: {b: 297, a: 198.27898550724638},
							c: 13,
							z: _List_fromArray(
								[9, 14]),
							a4: _List_Nil,
							u: {b: 297, a: 198.27898550724638}
						},
							{
							bF: 9081.104584560817,
							q: -1,
							r: {b: 227, a: 230.16304347826087},
							c: 14,
							z: _List_fromArray(
								[11, 13, 15]),
							a4: _List_Nil,
							u: {b: 227, a: 230.16304347826087}
						},
							{
							bF: 7536.07060428677,
							q: -1,
							r: {b: 141, a: 224.18478260869566},
							c: 15,
							z: _List_fromArray(
								[11, 14, 16]),
							a4: _List_Nil,
							u: {b: 141, a: 224.18478260869566}
						},
							{
							bF: 773.1884057970983,
							q: -1,
							r: {b: 93, a: 204.2572463768116},
							c: 16,
							z: _List_fromArray(
								[11, 12, 15]),
							a4: _List_Nil,
							u: {b: 93, a: 204.2572463768116}
						}
						]),
					bc: 340
				});
		case '(a | b) & !(a & b)':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 525,
							bu: 45,
							k: _List_fromArray(
								[
									{
									ah: {b: 95.16129032258064, a: 40.260736196319016},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 0,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 11, 18, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 191.93548387096774, a: 49.923312883435585},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2]),
									a4: _List_Nil
								},
									{
									ah: {b: 243.54838709677418, a: 27.37730061349693},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 2,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[1, 3, 13, 19]),
									a4: _List_Nil
								},
									{
									ah: {b: 379.0322580645161, a: 85.35276073619632},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4, 5, 10, 17, 20, 21]),
									a4: _List_Nil
								},
									{
									ah: {b: 372.5806451612903, a: 30.598159509202453},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 4,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3]),
									a4: _List_Nil
								},
									{
									ah: {b: 453.22580645161287, a: 24.156441717791413},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 5,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[3, 6, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 546.7741935483871, a: 24.156441717791413},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 7]),
									a4: _List_Nil
								},
									{
									ah: {b: 591.9354838709677, a: 69.24846625766871},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 7,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[6, 8, 16, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 643.5483870967741, a: 88.57361963190185},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 9, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 646.7741935483871, a: 30.598159509202453},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8]),
									a4: _List_Nil
								},
									{
									ah: {b: 337.09677419354836, a: 53.144171779141104},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 24.193548387096772, a: 130.44478527607362},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 12, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 30.64516129032258, a: 66.02760736196319},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11]),
									a4: _List_Nil
								},
									{
									ah: {b: 279.0322580645161, a: 130.44478527607362},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 14, 17, 21, 23, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 288.7096774193548, a: 72.46932515337423},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 488.7096774193548, a: 107.89877300613497},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 16, 24]),
									a4: _List_Nil
								},
									{
									ah: {b: 546.7741935483871, a: 104.67791411042946},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 16,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 15, 24]),
									a4: _List_Nil
								},
									{
									ah: {b: 337.09677419354836, a: 78.91104294478528},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 17,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 127.41935483870967, a: 152.99079754601226},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 18,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 19, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 185.48387096774192, a: 149.76993865030676},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 19,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 18, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 424.19354838709677, a: 130.44478527607362},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 20,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 21, 23, 24, 26, 27, 33]),
									a4: _List_Nil
								},
									{
									ah: {b: 343.54838709677415, a: 107.89877300613497},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 21,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 13, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 604.8387096774193, a: 133.66564417177915},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 22,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 8, 24, 29]),
									a4: _List_Nil
								},
									{
									ah: {b: 340.3225806451613, a: 127.2239263803681},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 23,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[13, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 511.2903225806451, a: 152.99079754601226},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 24,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 16, 20, 22, 30, 32]),
									a4: _List_Nil
								},
									{
									ah: {b: 50, a: 178.75766871165644},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 25,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 11, 28, 35]),
									a4: _List_Nil
								},
									{
									ah: {b: 256.4516129032258, a: 178.75766871165644},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 26,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[13, 20, 28, 31]),
									a4: _List_Nil
								},
									{
									ah: {b: 372.5806451612903, a: 181.97852760736197},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 27,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20, 31, 33, 34]),
									a4: _List_Nil
								},
									{
									ah: {b: 150, a: 278.6042944785276},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a | b)',
									c: 28,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[18, 19, 25, 26, 34, 36, 37, 42]),
									a4: _List_Nil
								},
									{
									ah: {b: 656.4516129032257, a: 194.86196319018404},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 29,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 601.6129032258065, a: 249.61656441717793},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 30,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[24, 29, 32]),
									a4: _List_Nil
								},
									{
									ah: {b: 320.96774193548384, a: 217.4079754601227},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 31,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[26, 27, 34]),
									a4: _List_Nil
								},
									{
									ah: {b: 637.0967741935483, a: 365.5674846625767},
									aa: $elm$core$Maybe$Nothing,
									bl: '!((a & b))',
									c: 32,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[24, 30, 33, 34, 38, 41]),
									a4: _List_Nil
								},
									{
									ah: {b: 450, a: 194.86196319018404},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 33,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20, 27, 32]),
									a4: _List_Nil
								},
									{
									ah: {b: 388.7096774193548, a: 294.7085889570552},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 34,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 28, 31, 32]),
									a4: _List_Nil
								},
									{
									ah: {b: 43.54838709677419, a: 246.3957055214724},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 35,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25]),
									a4: _List_Nil
								},
									{
									ah: {b: 191.93548387096774, a: 233.51226993865032},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 36,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[28]),
									a4: _List_Nil
								},
									{
									ah: {b: 153.2258064516129, a: 365.5674846625767},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 37,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[28, 39, 43]),
									a4: _List_Nil
								},
									{
									ah: {b: 517.741935483871, a: 372.0092024539877},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 38,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[32, 40, 44]),
									a4: _List_Nil
								},
									{
									ah: {b: 198.38709677419354, a: 336.579754601227},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 39,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[37]),
									a4: _List_Nil
								},
									{
									ah: {b: 456.4516129032258, a: 336.579754601227},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 40,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[38]),
									a4: _List_Nil
								},
									{
									ah: {b: 372.5806451612903, a: 397.7760736196319},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 41,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[32, 42, 45]),
									a4: _List_Nil
								},
									{
									ah: {b: 304.83870967741933, a: 394.5552147239264},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 42,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[28, 41, 45]),
									a4: _List_Nil
								},
									{
									ah: {b: 59.677419354838705, a: 465.4141104294479},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 43,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[37, 45, 46]),
									a4: _List_Nil
								},
									{
									ah: {b: 617.741935483871, a: 462.19325153374234},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 44,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[38, 45, 47]),
									a4: _List_Nil
								},
									{
									ah: {b: 308.06451612903226, a: 478.29754601226995},
									aa: $elm$core$Maybe$Nothing,
									bl: '((a | b) & !((a & b)))',
									c: 45,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 42, 43, 44, 48]),
									a4: _List_Nil
								},
									{
									ah: {b: 185.48387096774192, a: 484.739263803681},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 46,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[43]),
									a4: _List_Nil
								},
									{
									ah: {b: 453.22580645161287, a: 484.739263803681},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 47,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[44, 48]),
									a4: _List_Nil
								},
									{
									ah: {b: 379.0322580645161, a: 491.180981595092},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 48,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[45, 47]),
									a4: _List_Nil
								}
								]),
							bc: 700
						}),
					dG: true,
					cg: 1,
					a0: 525,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 48.387096774193544 0 L 96.77419354838709 0 L 145.16129032258064 0 L 158.06451612903226 0 L 158.06451612903226 48.312883435582826 L 154.83870967741933 77.30061349693251 L 151.61290322580643 77.30061349693251 L 103.2258064516129 80.52147239263803 L 96.77419354838709 96.62576687116565 L 145.16129032258064 96.62576687116565 L 158.06451612903226 96.62576687116565 L 162.9032258064516 98.2361963190184 L 162.9032258064516 98.2361963190184 L 158.06451612903226 99.84662576687117 L 158.06451612903226 125.61349693251535 L 148.38709677419354 125.61349693251535 L 100 128.83435582822085 L 100 154.60122699386503 L 90.32258064516128 154.60122699386503 L 85.48387096774192 156.2116564417178 L 85.48387096774192 156.2116564417178 L 80.64516129032258 154.60122699386503 L 64.51612903225806 154.60122699386503 L 64.51612903225806 119.1717791411043 L 58.064516129032256 112.73006134969326 L 64.51612903225806 103.06748466257669 L 67.74193548387096 61.19631901840491 L 48.387096774193544 35.42944785276074 L 0 28.987730061349694 Z'),
								_Utils_Tuple2(1, 'M 158.06451612903226 0 L 161.29032258064515 0 L 164.51612903225805 12.883435582822086 L 212.9032258064516 22.54601226993865 L 225.8064516129032 45.0920245398773 L 225.8064516129032 93.40490797546012 L 216.1290322580645 99.84662576687117 L 167.74193548387095 99.84662576687117 L 162.9032258064516 98.2361963190184 L 162.9032258064516 98.2361963190184 L 162.9032258064516 98.2361963190184 L 158.06451612903226 96.62576687116565 L 145.16129032258064 96.62576687116565 L 96.77419354838709 96.62576687116565 L 103.2258064516129 80.52147239263803 L 151.61290322580643 77.30061349693251 L 154.83870967741933 77.30061349693251 L 158.06451612903226 48.312883435582826 Z'),
								_Utils_Tuple2(2, 'M 161.29032258064515 0 L 209.6774193548387 0 L 258.06451612903226 0 L 306.4516129032258 0 L 329.0161335007222 0 L 327.33993149282605 27.624653416185964 L 325.1171107277325 31.92888892317073 L 325.1171107277325 31.92888892317073 L 320.32858894184955 30.682931052143946 L 273.7383446020759 38.513741513088476 L 261.23535617597133 45.076953490974596 L 251.49974987231207 64.38915331996952 L 258.0648010461168 112.85087772213728 L 253.2752489984354 125.8731075511756 L 254.39534843053613 151.57019854344313 L 235.48387096774192 154.60122699386503 L 233.8709677419355 159.4325153374233 L 233.8709677419355 159.4325153374233 L 229.03225806451613 157.82208588957056 L 222.5806451612903 157.82208588957056 L 216.1290322580645 125.61349693251535 L 167.74193548387095 122.39263803680981 L 164.51612903225805 103.06748466257669 L 162.9032258064516 98.2361963190184 L 167.74193548387095 99.84662576687117 L 216.1290322580645 99.84662576687117 L 225.8064516129032 93.40490797546012 L 225.8064516129032 45.0920245398773 L 212.9032258064516 22.54601226993865 L 164.51612903225805 12.883435582822086 Z'),
								_Utils_Tuple2(3, 'M 329.0161335007222 0 L 341.9142006096507 0 L 343.6749205417457 40.793349137200046 L 359.55491419882037 50.9836452109081 L 407.2789676078411 57.435669337408015 L 421.4753646077817 59.08944597664464 L 426.22742216752613 32.08386742738459 L 412.9032258064516 0 L 416.1290322580645 0 L 429.0560861455569 25.760992666784116 L 427.8676295054135 65.81684135437774 L 437.98040966274624 95.18204530755922 L 448.0530185204468 100.4956181504222 L 449.3944201013788 102.8123302020501 L 445.2349789867098 102.14740667760432 L 445.3411629791607 100.54480817609107 L 430.0547318338504 101.66577482614585 L 417.1101653537009 105.91663731783504 L 370.15419936150306 116.45481725088077 L 375.76764484614023 103.64606644136335 L 330.7952758463822 103.63113500790529 L 342.973189856532 97.11997011949562 L 369.8150141272245 97.58438498215381 L 369.24830503703106 92.44972827220404 L 332.44949542691944 88.3659133575193 L 362.33932459598174 83.35309287928557 L 328.8423888577024 80.91619954639623 L 356.0886675886889 75.99828133030898 L 355.78220987322595 66.82930364990808 L 332.13995490900254 64.89450022854817 L 326.06927292475183 64.04573522193809 L 326.06927292475183 64.04573522193809 L 332.702756976129 62.0853417083444 L 346.231834048192 61.3919096940406 L 346.7891179295972 53.53835762052794 L 339.6203577099724 43.48323309811301 L 337.53392606293716 27.416015057768742 L 330.7039149989023 27.546157067418303 L 330.3896901058453 30.372654586505735 L 325.1171107277325 31.92888892317073 L 327.33993149282605 27.624653416185964 Z'),
								_Utils_Tuple2(4, 'M 341.9142006096507 0 L 390.3225806451613 0 L 412.9032258064516 0 L 426.22742216752613 32.08386742738459 L 421.4753646077817 59.08944597664464 L 407.2789676078411 57.435669337408015 L 359.55491419882037 50.9836452109081 L 343.6749205417457 40.793349137200046 Z'),
								_Utils_Tuple2(5, 'M 416.1290322580645 0 L 464.51612903225805 0 L 512.9032258064516 0 L 522.5806451612902 0 L 519.3548387096774 32.20858895705521 L 516.1290322580645 32.20858895705521 L 467.7419354838709 35.42944785276074 L 464.51612903225805 48.312883435582826 L 458.06451612903226 51.533742331288344 L 506.4516129032258 51.533742331288344 L 516.1290322580645 51.533742331288344 L 520.9677419354839 53.144171779141104 L 520.9677419354839 53.144171779141104 L 516.1290322580645 54.75460122699386 L 516.1290322580645 80.52147239263803 L 509.67741935483866 80.52147239263803 L 461.42149718199886 83.5836407537412 L 463.1039808222071 102.53991999297213 L 453.7612706811703 102.08763920365287 L 449.3944201013788 102.8123302020501 L 449.3944201013788 102.8123302020501 L 448.0530185204468 100.4956181504222 L 437.98040966274624 95.18204530755922 L 427.8676295054135 65.81684135437774 L 429.0560861455569 25.760992666784116 Z'),
								_Utils_Tuple2(6, 'M 522.5806451612902 0 L 570.9677419354838 0 L 587.0967741935483 0 L 587.0967741935483 48.312883435582826 L 574.1935483870967 51.533742331288344 L 525.8064516129032 51.533742331288344 L 520.9677419354839 53.144171779141104 L 520.9677419354839 53.144171779141104 L 516.1290322580645 51.533742331288344 L 506.4516129032258 51.533742331288344 L 458.06451612903226 51.533742331288344 L 464.51612903225805 48.312883435582826 L 467.7419354838709 35.42944785276074 L 516.1290322580645 32.20858895705521 L 519.3548387096774 32.20858895705521 Z'),
								_Utils_Tuple2(7, 'M 587.0967741935483 0 L 619.3548387096773 0 L 612.9032258064516 25.766871165644172 L 616.1290322580645 57.97546012269939 L 616.1290322580645 106.28834355828221 L 616.1290322580645 109.50920245398773 L 600 109.50920245398773 L 595.1612903225806 111.11963190184049 L 595.1612903225806 111.11963190184049 L 590.3225806451612 109.50920245398773 L 580.6451612903226 109.50920245398773 L 574.1935483870967 77.30061349693251 L 525.8064516129032 77.30061349693251 L 522.5806451612902 57.97546012269939 L 520.9677419354839 53.144171779141104 L 520.9677419354839 53.144171779141104 L 525.8064516129032 51.533742331288344 L 574.1935483870967 51.533742331288344 L 587.0967741935483 48.312883435582826 Z'),
								_Utils_Tuple2(8, 'M 619.3548387096773 0 L 622.5806451612902 0 L 616.1290322580645 38.65030674846626 L 625.8064516129032 61.19631901840491 L 674.1935483870967 61.19631901840491 L 700 61.19631901840491 L 700 109.50920245398773 L 700 119.1717791411043 L 658.0645161290322 119.1717791411043 L 616.1290322580645 109.50920245398773 L 616.1290322580645 106.28834355828221 L 616.1290322580645 57.97546012269939 L 612.9032258064516 25.766871165644172 Z'),
								_Utils_Tuple2(9, 'M 622.5806451612902 0 L 670.9677419354838 0 L 700 0 L 700 48.312883435582826 L 700 61.19631901840491 L 674.1935483870967 61.19631901840491 L 625.8064516129032 61.19631901840491 L 616.1290322580645 38.65030674846626 Z'),
								_Utils_Tuple2(10, 'M 337.53392606293716 27.416015057768742 L 339.6203577099724 43.48323309811301 L 346.7891179295972 53.53835762052794 L 346.231834048192 61.3919096940406 L 332.702756976129 62.0853417083444 L 326.06927292475183 64.04573522193809 L 326.06927292475183 64.04573522193809 L 325.04407002861035 60.01849147125335 L 322.4966624934644 54.887966945780484 L 322.78999526596004 36.17638043832999 L 325.1171107277325 31.92888892317073 L 325.1171107277325 31.92888892317073 L 325.1171107277325 31.92888892317073 L 330.3896901058453 30.372654586505735 L 330.7039149989023 27.546157067418303 Z'),
								_Utils_Tuple2(11, 'M 0 28.987730061349694 L 48.387096774193544 35.42944785276074 L 67.74193548387096 61.19631901840491 L 64.51612903225806 103.06748466257669 L 58.064516129032256 112.73006134969326 L 64.51612903225806 119.1717791411043 L 64.51612903225806 154.60122699386503 L 48.387096774193544 157.82208588957056 L 0 157.82208588957056 L 0 154.60122699386503 L 0 106.28834355828221 L 48.387096774193544 106.28834355828221 L 58.064516129032256 103.06748466257669 L 64.51612903225806 67.63803680981596 L 48.387096774193544 38.65030674846626 L 0 32.20858895705521 Z'),
								_Utils_Tuple2(12, 'M 0 32.20858895705521 L 48.387096774193544 38.65030674846626 L 64.51612903225806 67.63803680981596 L 58.064516129032256 103.06748466257669 L 48.387096774193544 106.28834355828221 L 0 106.28834355828221 L 0 80.52147239263803 Z'),
								_Utils_Tuple2(13, 'M 320.32858894184955 30.682931052143946 L 325.1171107277325 31.92888892317073 L 325.1171107277325 31.92888892317073 L 319.8969797188138 33.524471360569926 L 276.4444617893442 41.556996607066026 L 264.1741524670249 48.214138917249535 L 254.2313591106181 70.71275433543849 L 262.8944022208621 106.13118956793056 L 309.5721696186681 104.67945386850145 L 319.729600271976 66.16067792728235 L 326.06927292475183 64.04573522193809 L 322.96387739149793 68.68479981488392 L 322.7550866534021 89.50609399015484 L 326.7335863883836 93.48546366817891 L 317.36846982194214 99.25827683223176 L 321.1270372253595 109.69247223733262 L 330.7952758463822 103.63113500790529 L 333.4040134887616 113.0617454490014 L 333.4040134887616 113.0617454490014 L 325.84036339618143 115.80413338985866 L 317.0924674209235 115.23325242250043 L 309.89830413697877 119.8315314447012 L 322.4666198625268 166.94448378188184 L 334.6835908566167 171.3669705891152 L 287.9575588374735 162.37577458154993 L 238.70967741935482 157.82208588957056 L 233.8709677419355 159.4325153374233 L 235.48387096774192 154.60122699386503 L 254.39534843053613 151.57019854344313 L 253.2752489984354 125.8731075511756 L 258.0648010461168 112.85087772213728 L 251.49974987231207 64.38915331996952 L 261.23535617597133 45.076953490974596 L 273.7383446020759 38.513741513088476 Z'),
								_Utils_Tuple2(14, 'M 319.8969797188138 33.524471360569926 L 325.1171107277325 31.92888892317073 L 322.78999526596004 36.17638043832999 L 322.4966624934644 54.887966945780484 L 325.04407002861035 60.01849147125335 L 326.06927292475183 64.04573522193809 L 326.06927292475183 64.04573522193809 L 319.729600271976 66.16067792728235 L 309.5721696186681 104.67945386850145 L 262.8944022208621 106.13118956793056 L 254.2313591106181 70.71275433543849 L 264.1741524670249 48.214138917249535 L 276.4444617893442 41.556996607066026 Z'),
								_Utils_Tuple2(15, 'M 516.1290322580645 54.75460122699386 L 520.9677419354839 53.144171779141104 L 519.3548387096774 57.97546012269939 L 519.4231496000156 106.20768803250519 L 521.4668251366066 120.1858095884973 L 511.2948467018172 119.67236442927386 L 497.53120585526875 122.64280305332765 L 453.81920517408304 103.56858756390571 L 449.3944201013788 102.8123302020501 L 449.3944201013788 102.8123302020501 L 453.7612706811703 102.08763920365287 L 463.1039808222071 102.53991999297213 L 461.42149718199886 83.5836407537412 L 509.67741935483866 80.52147239263803 L 516.1290322580645 80.52147239263803 Z'),
								_Utils_Tuple2(16, 'M 520.9677419354839 53.144171779141104 L 520.9677419354839 53.144171779141104 L 522.5806451612902 57.97546012269939 L 525.8064516129032 77.30061349693251 L 574.1935483870967 77.30061349693251 L 580.6451612903226 109.50920245398773 L 590.3225806451612 109.50920245398773 L 595.1612903225806 111.11963190184049 L 595.1612903225806 111.11963190184049 L 590.3225806451612 112.73006134969326 L 577.4193548387096 128.83435582822085 L 551.6129032258065 138.49693251533742 L 521.4668251366066 120.1858095884973 L 519.4231496000156 106.20768803250519 L 519.3548387096774 57.97546012269939 Z'),
								_Utils_Tuple2(17, 'M 326.06927292475183 64.04573522193809 L 326.06927292475183 64.04573522193809 L 332.13995490900254 64.89450022854817 L 355.78220987322595 66.82930364990808 L 356.0886675886889 75.99828133030898 L 328.8423888577024 80.91619954639623 L 362.33932459598174 83.35309287928557 L 332.44949542691944 88.3659133575193 L 369.24830503703106 92.44972827220404 L 369.8150141272245 97.58438498215381 L 342.973189856532 97.11997011949562 L 330.7952758463822 103.63113500790529 L 321.1270372253595 109.69247223733262 L 317.36846982194214 99.25827683223176 L 326.7335863883836 93.48546366817891 L 322.7550866534021 89.50609399015484 L 322.96387739149793 68.68479981488392 Z'),
								_Utils_Tuple2(18, 'M 158.06451612903226 99.84662576687117 L 162.9032258064516 98.2361963190184 L 161.29032258064515 103.06748466257669 L 161.29032258064515 151.38036809815952 L 161.29032258064515 167.48466257668713 L 148.38709677419354 167.48466257668713 L 135.48387096774192 180.3680981595092 L 106.4516129032258 173.92638036809817 L 90.32258064516128 157.82208588957056 L 85.48387096774192 156.2116564417178 L 85.48387096774192 156.2116564417178 L 90.32258064516128 154.60122699386503 L 100 154.60122699386503 L 100 128.83435582822085 L 148.38709677419354 125.61349693251535 L 158.06451612903226 125.61349693251535 Z'),
								_Utils_Tuple2(19, 'M 162.9032258064516 98.2361963190184 L 162.9032258064516 98.2361963190184 L 164.51612903225805 103.06748466257669 L 167.74193548387095 122.39263803680981 L 216.1290322580645 125.61349693251535 L 222.5806451612903 157.82208588957056 L 229.03225806451613 157.82208588957056 L 233.8709677419355 159.4325153374233 L 233.8709677419355 159.4325153374233 L 229.03225806451613 161.04294478527606 L 206.4516129032258 177.1472392638037 L 187.09677419354838 177.1472392638037 L 174.19354838709677 167.48466257668713 L 161.29032258064515 167.48466257668713 L 161.29032258064515 151.38036809815952 L 161.29032258064515 103.06748466257669 Z'),
								_Utils_Tuple2(20, 'M 445.3411629791607 100.54480817609107 L 445.2349789867098 102.14740667760432 L 449.3944201013788 102.8123302020501 L 449.3944201013788 102.8123302020501 L 447.82049038446866 105.05574737167213 L 484.06697089439433 120.02957712430762 L 501.12493876070215 159.52206038237898 L 503.3685766268264 166.16911235388756 L 498.7543768925311 163.88403576418497 L 501.0316718119641 171.7013257462432 L 481.1502088463794 163.75953073774082 L 484.1709597747328 174.3908329938489 L 458.7222775298058 168.7352637795851 L 460.75193728180477 184.12651660973162 L 439.2480627181951 184.12651660973162 L 441.28600381128825 168.74052593700517 L 447.7351556541133 128.820904318183 L 433.3899420304903 126.59983360245107 L 388.8738226681013 147.8823637887205 L 348.7253315609612 171.80049499566405 L 339.20822744980785 176.84635905370828 L 337.81093018068844 180.4052978689533 L 337.81093018068844 180.4052978689533 L 335.4880587019377 176.54056958179788 L 334.6835908566167 171.3669705891152 L 355.2494246199387 165.53315417566301 L 363.5199081546478 123.34821082050804 L 336.90381132169625 122.85358826899494 L 333.4040134887616 113.0617454490014 L 342.6258551686838 116.90992293335462 L 370.15419936150306 116.45481725088077 L 417.1101653537009 105.91663731783504 L 430.0547318338504 101.66577482614585 Z'),
								_Utils_Tuple2(21, 'M 330.7952758463822 103.63113500790529 L 375.76764484614023 103.64606644136335 L 370.15419936150306 116.45481725088077 L 342.6258551686838 116.90992293335462 L 333.4040134887616 113.0617454490014 L 333.4040134887616 113.0617454490014 L 333.4040134887616 113.0617454490014 Z'),
								_Utils_Tuple2(22, 'M 595.1612903225806 111.11963190184049 L 600 109.50920245398773 L 616.1290322580645 109.50920245398773 L 658.0645161290322 119.1717791411043 L 700 119.1717791411043 L 700 157.82208588957056 L 693.5483870967741 157.82208588957056 L 645.1612903225806 157.82208588957056 L 596.7741935483871 161.04294478527606 L 590.3225806451612 167.48466257668713 L 587.0967741935483 186.80981595092024 L 574.1935483870967 170.70552147239263 L 567.741935483871 138.49693251533742 L 596.7741935483871 115.95092024539878 L 595.1612903225806 111.11963190184049 Z'),
								_Utils_Tuple2(23, 'M 317.0924674209235 115.23325242250043 L 325.84036339618143 115.80413338985866 L 333.4040134887616 113.0617454490014 L 333.4040134887616 113.0617454490014 L 336.90381132169625 122.85358826899494 L 363.5199081546478 123.34821082050804 L 355.2494246199387 165.53315417566301 L 334.6835908566167 171.3669705891152 L 322.4666198625268 166.94448378188184 L 309.89830413697877 119.8315314447012 Z'),
								_Utils_Tuple2(24, 'M 590.3225806451612 112.73006134969326 L 595.1612903225806 111.11963190184049 L 595.1612903225806 111.11963190184049 L 596.7741935483871 115.95092024539878 L 567.741935483871 138.49693251533742 L 574.1935483870967 170.70552147239263 L 587.0967741935483 186.80981595092024 L 567.741935483871 167.48466257668713 L 544.5076200157209 165.69531983508128 L 539.5087038768571 167.5033650507853 L 541.5696821056605 185.53244912814802 L 510.6813063634363 169.91386565335807 L 506.80545102649967 181.77311870519657 L 491.98740160347523 176.89496158378904 L 493.5942362514028 188.64376691506055 L 460.75193728180477 184.12651660973162 L 458.7222775298058 168.7352637795851 L 484.1709597747328 174.3908329938489 L 481.1502088463794 163.75953073774082 L 501.0316718119641 171.7013257462432 L 498.7543768925311 163.88403576418497 L 503.3685766268264 166.16911235388756 L 501.12493876070215 159.52206038237898 L 484.06697089439433 120.02957712430762 L 447.82049038446866 105.05574737167213 L 449.3944201013788 102.8123302020501 L 449.3944201013788 102.8123302020501 L 453.81920517408304 103.56858756390571 L 497.53120585526875 122.64280305332765 L 511.2948467018172 119.67236442927386 L 521.4668251366066 120.1858095884973 L 551.6129032258065 138.49693251533742 L 577.4193548387096 128.83435582822085 Z'),
								_Utils_Tuple2(25, 'M 64.51612903225806 154.60122699386503 L 80.64516129032258 154.60122699386503 L 85.48387096774192 156.2116564417178 L 85.48387096774192 156.2116564417178 L 83.87096774193547 161.04294478527606 L 103.2258064516129 177.1472392638037 L 112.9032258064516 186.80981595092024 L 93.54838709677419 228.68098159509202 L 93.54838709677419 276.99386503067484 L 70.96774193548387 318.86503067484665 L 45.16129032258064 357.5153374233129 L 0 367.17791411042947 L 0 363.95705521472394 L 38.70967741935483 357.5153374233129 L 61.29032258064516 328.5276073619632 L 87.09677419354838 286.65644171779144 L 87.09677419354838 254.4478527607362 L 87.09677419354838 206.13496932515338 L 48.387096774193544 202.91411042944785 L 0 202.91411042944785 L 0 157.82208588957056 L 48.387096774193544 157.82208588957056 Z'),
								_Utils_Tuple2(26, 'M 287.9575588374735 162.37577458154993 L 334.6835908566167 171.3669705891152 L 335.4880587019377 176.54056958179788 L 337.81093018068844 180.4052978689533 L 337.81093018068844 180.4052978689533 L 336.45674361963887 183.88370641582512 L 312.2056378335649 201.2606774058445 L 270.96774193548384 202.91411042944785 L 258.06451612903226 206.13496932515338 L 261.2903225806451 241.56441717791412 L 287.09677419354836 257.6687116564417 L 300 257.6687116564417 L 338.7096774193548 238.3435582822086 L 338.7096774193548 241.56441717791412 L 303.22580645161287 260.88957055214723 L 283.8709677419355 260.88957055214723 L 258.06451612903226 244.78527607361963 L 254.83870967741933 212.57668711656441 L 248.38709677419354 196.4723926380368 L 212.9032258064516 196.4723926380368 L 206.4516129032258 183.58895705521473 L 235.48387096774192 164.2638036809816 L 233.8709677419355 159.4325153374233 L 233.8709677419355 159.4325153374233 L 238.70967741935482 157.82208588957056 Z'),
								_Utils_Tuple2(27, 'M 388.8738226681013 147.8823637887205 L 433.3899420304903 126.59983360245107 L 447.7351556541133 128.820904318183 L 441.28600381128825 168.74052593700517 L 439.2480627181951 184.12651660973162 L 439.2480627181951 205.59740977063652 L 423.84393510783894 203.56727926625618 L 433.9917144472288 242.8131620928869 L 424.52226540306526 240.6515481605648 L 426.78983980429626 245.84599912927445 L 393.0235735403743 231.6725180329646 L 346.3150111416335 213.86718006626663 L 342.6650553779189 181.83397583774925 L 337.81093018068844 180.4052978689533 L 337.81093018068844 180.4052978689533 L 339.20822744980785 176.84635905370828 L 348.7253315609612 171.80049499566405 Z'),
								_Utils_Tuple2(28, 'M 85.48387096774192 156.2116564417178 L 85.48387096774192 156.2116564417178 L 90.32258064516128 157.82208588957056 L 106.4516129032258 173.92638036809817 L 135.48387096774192 180.3680981595092 L 148.38709677419354 167.48466257668713 L 161.29032258064515 167.48466257668713 L 174.19354838709677 167.48466257668713 L 187.09677419354838 177.1472392638037 L 206.4516129032258 177.1472392638037 L 229.03225806451613 161.04294478527606 L 233.8709677419355 159.4325153374233 L 233.8709677419355 159.4325153374233 L 235.48387096774192 164.2638036809816 L 206.4516129032258 183.58895705521473 L 212.9032258064516 196.4723926380368 L 248.38709677419354 196.4723926380368 L 254.83870967741933 212.57668711656441 L 258.06451612903226 244.78527607361963 L 283.8709677419355 260.88957055214723 L 303.22580645161287 260.88957055214723 L 338.7096774193548 241.56441717791412 L 332.258064516129 286.65644171779144 L 306.4516129032258 312.4233128834356 L 277.41935483870964 315.6441717791411 L 277.41935483870964 360.7361963190184 L 312.9032258064516 360.7361963190184 L 332.258064516129 351.07361963190186 L 337.09677419354836 349.4631901840491 L 335.4838709677419 354.2944785276074 L 300 367.17791411042947 L 277.41935483870964 380.06134969325154 L 264.51612903225805 399.3865030674847 L 262.9032258064516 404.217791411043 L 262.9032258064516 404.217791411043 L 261.2903225806451 399.3865030674847 L 254.83870967741933 380.06134969325154 L 245.16129032258064 367.17791411042947 L 245.16129032258064 325.30674846625766 L 229.03225806451613 312.4233128834356 L 183.87096774193546 315.6441717791411 L 138.70967741935482 331.7484662576687 L 116.12903225806451 338.19018404907973 L 74.19354838709677 360.7361963190184 L 41.93548387096774 380.06134969325154 L 9.677419354838708 415.4907975460123 L 0 418.7116564417178 L 0 415.4907975460123 L 0 367.17791411042947 L 45.16129032258064 357.5153374233129 L 70.96774193548387 318.86503067484665 L 93.54838709677419 276.99386503067484 L 93.54838709677419 228.68098159509202 L 112.9032258064516 186.80981595092024 L 103.2258064516129 177.1472392638037 L 83.87096774193547 161.04294478527606 Z M 177.41935483870967 222.23926380368098 L 180.64516129032256 257.6687116564417 L 209.6774193548387 257.6687116564417 L 209.6774193548387 222.23926380368098 Z'),
								_Utils_Tuple2(29, 'M 645.1612903225806 157.82208588957056 L 693.5483870967741 157.82208588957056 L 700 157.82208588957056 L 700 206.13496932515338 L 700 254.4478527607362 L 700 264.11042944785277 L 683.8709677419355 264.11042944785277 L 648.3870967741935 231.90184049079755 L 619.3548387096773 193.2515337423313 L 587.0967741935483 186.80981595092024 L 590.3225806451612 167.48466257668713 L 596.7741935483871 161.04294478527606 Z'),
								_Utils_Tuple2(30, 'M 567.741935483871 167.48466257668713 L 587.0967741935483 186.80981595092024 L 619.3548387096773 193.2515337423313 L 648.3870967741935 231.90184049079755 L 683.8709677419355 264.11042944785277 L 700 264.11042944785277 L 700 312.4233128834356 L 690.3225806451612 312.4233128834356 L 641.9354838709677 312.4233128834356 L 593.5483870967741 305.9815950920245 L 545.1612903225806 296.319018404908 L 541.9354838709677 264.11042944785277 L 551.2771590826865 216.41251627569085 L 543.9442967140697 214.32993138006287 L 541.5696821056605 185.53244912814802 L 539.5087038768571 167.5033650507853 L 544.5076200157209 165.69531983508128 Z'),
								_Utils_Tuple2(31, 'M 337.81093018068844 180.4052978689533 L 337.81093018068844 180.4052978689533 L 342.6650553779189 181.83397583774925 L 346.3150111416335 213.86718006626663 L 345.16087303242745 241.56460306797544 L 338.7096774193548 241.56441717791412 L 338.7096774193548 238.3435582822086 L 300 257.6687116564417 L 287.09677419354836 257.6687116564417 L 261.2903225806451 241.56441717791412 L 258.06451612903226 206.13496932515338 L 270.96774193548384 202.91411042944785 L 312.2056378335649 201.2606774058445 L 336.45674361963887 183.88370641582512 Z'),
								_Utils_Tuple2(32, 'M 541.5696821056605 185.53244912814802 L 543.9442967140697 214.32993138006287 L 551.2771590826865 216.41251627569085 L 541.9354838709677 264.11042944785277 L 545.1612903225806 296.319018404908 L 593.5483870967741 305.9815950920245 L 641.9354838709677 312.4233128834356 L 690.3225806451612 312.4233128834356 L 700 312.4233128834356 L 700 360.7361963190184 L 700 409.0490797546012 L 700 457.36196319018404 L 700 486.3496932515338 L 687.0967741935483 467.02453987730064 L 658.0645161290322 428.37423312883436 L 616.1290322580645 402.6073619631902 L 600 380.06134969325154 L 561.2903225806451 363.95705521472394 L 519.3548387096774 341.41104294478527 L 480.64516129032256 312.4233128834356 L 451.6129032258064 315.6441717791411 L 432.258064516129 331.7484662576687 L 435.4838709677419 367.17791411042947 L 422.5806451612903 389.7239263803681 L 419.3548387096774 399.3865030674847 L 417.7419354838709 404.217791411043 L 417.7419354838709 404.217791411043 L 416.1290322580645 399.3865030674847 L 387.09677419354836 367.17791411042947 L 341.93548387096774 347.85276073619633 L 337.09677419354836 349.4631901840491 L 338.7096774193548 344.6319018404908 L 383.8709677419355 360.7361963190184 L 406.4516129032258 360.7361963190184 L 406.4516129032258 347.85276073619633 L 429.0322580645161 344.6319018404908 L 429.0322580645161 338.19018404907973 L 435.4838709677419 322.0858895705521 L 454.83890153219437 309.20698758668686 L 459.1947745986644 265.2471165980588 L 473.49932954686506 218.325250820566 L 441.27772247019425 220.98866260078302 L 439.2480627181951 205.59740977063652 L 460.75193728180477 205.59740977063652 L 460.75193728180477 184.12651660973162 L 493.5942362514028 188.64376691506055 L 491.98740160347523 176.89496158378904 L 506.80545102649967 181.77311870519657 L 510.6813063634363 169.91386565335807 Z'),
								_Utils_Tuple2(33, 'M 439.2480627181951 184.12651660973162 L 460.75193728180477 184.12651660973162 L 460.75193728180477 205.59740977063652 L 439.2480627181951 205.59740977063652 Z'),
								_Utils_Tuple2(34, 'M 423.84393510783894 203.56727926625618 L 439.2480627181951 205.59740977063652 L 441.27772247019425 220.98866260078302 L 473.49932954686506 218.325250820566 L 459.1947745986644 265.2471165980588 L 454.83890153219437 309.20698758668686 L 435.4838709677419 322.0858895705521 L 429.0322580645161 338.19018404907973 L 429.0322580645161 344.6319018404908 L 406.4516129032258 347.85276073619633 L 406.4516129032258 360.7361963190184 L 383.8709677419355 360.7361963190184 L 338.7096774193548 344.6319018404908 L 337.09677419354836 349.4631901840491 L 337.09677419354836 349.4631901840491 L 337.09677419354836 349.4631901840491 L 332.258064516129 351.07361963190186 L 312.9032258064516 360.7361963190184 L 277.41935483870964 360.7361963190184 L 277.41935483870964 315.6441717791411 L 306.4516129032258 312.4233128834356 L 332.258064516129 286.65644171779144 L 338.7096774193548 241.56441717791412 L 345.16087303242745 241.56460306797544 L 346.3150111416335 213.86718006626663 L 393.0235735403743 231.6725180329646 L 426.78983980429626 245.84599912927445 L 424.52226540306526 240.6515481605648 L 433.9917144472288 242.8131620928869 Z'),
								_Utils_Tuple2(35, 'M 0 202.91411042944785 L 48.387096774193544 202.91411042944785 L 87.09677419354838 206.13496932515338 L 87.09677419354838 254.4478527607362 L 87.09677419354838 286.65644171779144 L 61.29032258064516 328.5276073619632 L 38.70967741935483 357.5153374233129 L 0 363.95705521472394 L 0 347.85276073619633 L 0 299.5398773006135 L 0 251.2269938650307 Z'),
								_Utils_Tuple2(36, 'M 209.6774193548387 222.23926380368098 L 209.6774193548387 257.6687116564417 L 180.64516129032256 257.6687116564417 L 177.41935483870967 222.23926380368098 Z'),
								_Utils_Tuple2(37, 'M 229.03225806451613 312.4233128834356 L 245.16129032258064 325.30674846625766 L 245.16129032258064 367.17791411042947 L 254.83870967741933 380.06134969325154 L 261.2903225806451 399.3865030674847 L 262.9032258064516 404.217791411043 L 258.06451612903226 402.6073619631902 L 216.1290322580645 405.8282208588957 L 167.74193548387095 405.8282208588957 L 119.35483870967741 405.8282208588957 L 70.96774193548387 405.8282208588957 L 22.58064516129032 409.0490797546012 L 0 421.9325153374233 L 0 418.7116564417178 L 9.677419354838708 415.4907975460123 L 41.93548387096774 380.06134969325154 L 74.19354838709677 360.7361963190184 L 116.12903225806451 338.19018404907973 L 138.70967741935482 331.7484662576687 L 183.87096774193546 315.6441717791411 Z M 187.09677419354838 318.86503067484665 L 177.41935483870967 328.5276073619632 L 180.64516129032256 354.2944785276074 L 206.4516129032258 360.7361963190184 L 238.70967741935482 357.5153374233129 L 241.93548387096772 344.6319018404908 L 235.48387096774192 318.86503067484665 Z'),
								_Utils_Tuple2(38, 'M 480.64516129032256 312.4233128834356 L 519.3548387096774 341.41104294478527 L 561.2903225806451 363.95705521472394 L 600 380.06134969325154 L 616.1290322580645 402.6073619631902 L 658.0645161290322 428.37423312883436 L 687.0967741935483 467.02453987730064 L 700 486.3496932515338 L 700 489.57055214723925 L 696.7741935483871 489.57055214723925 L 687.0967741935483 473.46625766871165 L 658.0645161290322 434.8159509202454 L 616.1290322580645 409.0490797546012 L 567.741935483871 405.8282208588957 L 519.3548387096774 405.8282208588957 L 470.96774193548384 405.8282208588957 L 422.5806451612903 402.6073619631902 L 417.7419354838709 404.217791411043 L 419.3548387096774 399.3865030674847 L 422.5806451612903 389.7239263803681 L 435.4838709677419 367.17791411042947 L 432.258064516129 331.7484662576687 L 451.6129032258064 315.6441717791411 Z M 454.83870967741933 318.86503067484665 L 435.4838709677419 338.19018404907973 L 445.1612903225806 357.5153374233129 L 493.54838709677415 357.5153374233129 L 503.22580645161287 357.5153374233129 L 503.22580645161287 341.41104294478527 L 483.87096774193543 318.86503067484665 Z'),
								_Utils_Tuple2(39, 'M 235.48387096774192 318.86503067484665 L 241.93548387096772 344.6319018404908 L 238.70967741935482 357.5153374233129 L 206.4516129032258 360.7361963190184 L 180.64516129032256 354.2944785276074 L 177.41935483870967 328.5276073619632 L 187.09677419354838 318.86503067484665 Z'),
								_Utils_Tuple2(40, 'M 483.87096774193543 318.86503067484665 L 503.22580645161287 341.41104294478527 L 503.22580645161287 357.5153374233129 L 493.54838709677415 357.5153374233129 L 445.1612903225806 357.5153374233129 L 435.4838709677419 338.19018404907973 L 454.83870967741933 318.86503067484665 Z'),
								_Utils_Tuple2(41, 'M 337.09677419354836 349.4631901840491 L 341.93548387096774 347.85276073619633 L 387.09677419354836 367.17791411042947 L 416.1290322580645 399.3865030674847 L 417.7419354838709 404.217791411043 L 417.7419354838709 404.217791411043 L 412.9032258064516 405.8282208588957 L 393.54838709677415 425.15337423312883 L 370.96774193548384 431.5950920245399 L 358.06451612903226 418.7116564417178 L 338.7096774193548 418.7116564417178 L 338.7096774193548 402.6073619631902 L 338.7096774193548 354.2944785276074 L 337.09677419354836 349.4631901840491 Z'),
								_Utils_Tuple2(42, 'M 337.09677419354836 349.4631901840491 L 337.09677419354836 349.4631901840491 L 338.7096774193548 354.2944785276074 L 338.7096774193548 402.6073619631902 L 338.7096774193548 418.7116564417178 L 325.80645161290323 418.7116564417178 L 316.1290322580645 431.5950920245399 L 283.8709677419355 421.9325153374233 L 267.741935483871 405.8282208588957 L 262.9032258064516 404.217791411043 L 262.9032258064516 404.217791411043 L 264.51612903225805 399.3865030674847 L 277.41935483870964 380.06134969325154 L 300 367.17791411042947 L 335.4838709677419 354.2944785276074 Z'),
								_Utils_Tuple2(43, 'M 258.06451612903226 402.6073619631902 L 262.9032258064516 404.217791411043 L 262.9032258064516 404.217791411043 L 261.2903225806451 409.0490797546012 L 290.3225806451613 438.0368098159509 L 283.8709677419355 463.8036809815951 L 267.741935483871 483.12883435582825 L 274.19354838709677 525 L 270.96774193548384 525 L 267.741935483871 505.67484662576686 L 264.51612903225805 457.36196319018404 L 225.8064516129032 450.92024539877303 L 183.87096774193546 450.92024539877303 L 145.16129032258064 457.36196319018404 L 119.35483870967741 470.2453987730061 L 109.6774193548387 508.8957055214724 L 109.6774193548387 525 L 96.77419354838709 525 L 48.387096774193544 525 L 0 525 L 0 518.5582822085889 L 0 470.2453987730061 L 0 421.9325153374233 L 22.58064516129032 409.0490797546012 L 70.96774193548387 405.8282208588957 L 119.35483870967741 405.8282208588957 L 167.74193548387095 405.8282208588957 L 216.1290322580645 405.8282208588957 Z'),
								_Utils_Tuple2(44, 'M 417.7419354838709 404.217791411043 L 422.5806451612903 402.6073619631902 L 470.96774193548384 405.8282208588957 L 519.3548387096774 405.8282208588957 L 567.741935483871 405.8282208588957 L 616.1290322580645 409.0490797546012 L 658.0645161290322 434.8159509202454 L 687.0967741935483 473.46625766871165 L 696.7741935483871 489.57055214723925 L 700 489.57055214723925 L 700 525 L 674.1935483870967 525 L 625.8064516129032 525 L 577.4193548387096 525 L 577.4193548387096 496.0122699386503 L 561.2903225806451 450.92024539877303 L 545.1612903225806 447.6993865030675 L 496.7741935483871 447.6993865030675 L 448.38709677419354 450.92024539877303 L 416.1290322580645 457.36196319018404 L 412.9032258064516 486.3496932515338 L 412.9032258064516 479.9079754601227 L 393.54838709677415 457.36196319018404 L 390.3225806451613 438.0368098159509 L 419.3548387096774 409.0490797546012 L 417.7419354838709 404.217791411043 Z'),
								_Utils_Tuple2(45, 'M 262.9032258064516 404.217791411043 L 262.9032258064516 404.217791411043 L 267.741935483871 405.8282208588957 L 283.8709677419355 421.9325153374233 L 316.1290322580645 431.5950920245399 L 325.80645161290323 418.7116564417178 L 338.7096774193548 418.7116564417178 L 358.06451612903226 418.7116564417178 L 370.96774193548384 431.5950920245399 L 393.54838709677415 425.15337423312883 L 412.9032258064516 405.8282208588957 L 417.7419354838709 404.217791411043 L 417.7419354838709 404.217791411043 L 419.3548387096774 409.0490797546012 L 390.3225806451613 438.0368098159509 L 393.54838709677415 457.36196319018404 L 412.9032258064516 479.9079754601227 L 412.9032258064516 486.3496932515338 L 396.7741935483871 463.8036809815951 L 358.06451612903226 463.8036809815951 L 348.38709677419354 467.02453987730064 L 348.38709677419354 515.3374233128834 L 348.38709677419354 525 L 322.5806451612903 525 L 274.19354838709677 525 L 267.741935483871 483.12883435582825 L 283.8709677419355 463.8036809815951 L 290.3225806451613 438.0368098159509 L 261.2903225806451 409.0490797546012 Z'),
								_Utils_Tuple2(46, 'M 225.8064516129032 450.92024539877303 L 264.51612903225805 457.36196319018404 L 267.741935483871 505.67484662576686 L 270.96774193548384 525 L 254.83870967741933 525 L 206.4516129032258 525 L 158.06451612903226 525 L 109.6774193548387 525 L 109.6774193548387 508.8957055214724 L 119.35483870967741 470.2453987730061 L 145.16129032258064 457.36196319018404 L 183.87096774193546 450.92024539877303 Z'),
								_Utils_Tuple2(47, 'M 496.7741935483871 447.6993865030675 L 545.1612903225806 447.6993865030675 L 561.2903225806451 450.92024539877303 L 577.4193548387096 496.0122699386503 L 577.4193548387096 525 L 558.0645161290322 525 L 509.67741935483866 525 L 461.2903225806451 525 L 412.9032258064516 525 L 412.9032258064516 486.3496932515338 L 416.1290322580645 457.36196319018404 L 448.38709677419354 450.92024539877303 Z'),
								_Utils_Tuple2(48, 'M 396.7741935483871 463.8036809815951 L 412.9032258064516 486.3496932515338 L 412.9032258064516 525 L 396.7741935483871 525 L 348.38709677419354 525 L 348.38709677419354 515.3374233128834 L 348.38709677419354 467.02453987730064 L 358.06451612903226 463.8036809815951 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 14073.075400752025,
							q: -1,
							r: {b: 95.16129032258064, a: 40.260736196319016},
							c: 0,
							z: _List_fromArray(
								[1, 11, 18, 25]),
							a4: _List_Nil,
							u: {b: 95.16129032258064, a: 40.260736196319016}
						},
							{
							bF: 6483.277261033054,
							q: -1,
							r: {b: 191.93548387096774, a: 49.923312883435585},
							c: 1,
							z: _List_fromArray(
								[0, 2]),
							a4: _List_Nil,
							u: {b: 191.93548387096774, a: 49.923312883435585}
						},
							{
							bF: 10184.375812219847,
							q: -1,
							r: {b: 243.54838709677418, a: 27.37730061349693},
							c: 2,
							z: _List_fromArray(
								[1, 3, 13, 19]),
							a4: _List_Nil,
							u: {b: 243.54838709677418, a: 27.37730061349693}
						},
							{
							bF: 5309.485657412007,
							q: -1,
							r: {b: 379.0322580645161, a: 85.35276073619632},
							c: 3,
							z: _List_fromArray(
								[2, 4, 5, 10, 17, 20, 21]),
							a4: _List_Nil,
							u: {b: 379.0322580645161, a: 85.35276073619632}
						},
							{
							bF: 4181.729395077466,
							q: -1,
							r: {b: 372.5806451612903, a: 30.598159509202453},
							c: 4,
							z: _List_fromArray(
								[3]),
							a4: _List_Nil,
							u: {b: 372.5806451612903, a: 30.598159509202453}
						},
							{
							bF: 7038.641859423121,
							q: -1,
							r: {b: 453.22580645161287, a: 24.156441717791413},
							c: 5,
							z: _List_fromArray(
								[3, 6, 15]),
							a4: _List_Nil,
							u: {b: 453.22580645161287, a: 24.156441717791413}
						},
							{
							bF: 4387.121511973079,
							q: -1,
							r: {b: 546.7741935483871, a: 24.156441717791413},
							c: 6,
							z: _List_fromArray(
								[5, 7]),
							a4: _List_Nil,
							u: {b: 546.7741935483871, a: 24.156441717791413}
						},
							{
							bF: 5101.424896101336,
							q: -1,
							r: {b: 591.9354838709677, a: 69.24846625766871},
							c: 7,
							z: _List_fromArray(
								[6, 8, 16, 22]),
							a4: _List_Nil,
							u: {b: 591.9354838709677, a: 69.24846625766871}
						},
							{
							bF: 4945.576885018805,
							q: -1,
							r: {b: 643.5483870967741, a: 88.57361963190185},
							c: 8,
							z: _List_fromArray(
								[7, 9, 22]),
							a4: _List_Nil,
							u: {b: 643.5483870967741, a: 88.57361963190185}
						},
							{
							bF: 4898.822481694042,
							q: -1,
							r: {b: 646.7741935483871, a: 30.598159509202453},
							c: 9,
							z: _List_fromArray(
								[8]),
							a4: _List_Nil,
							u: {b: 646.7741935483871, a: 30.598159509202453}
						},
							{
							bF: 620.2207792281433,
							q: -1,
							r: {b: 337.09677419354836, a: 53.144171779141104},
							c: 10,
							z: _List_fromArray(
								[3, 14]),
							a4: _List_Nil,
							u: {b: 337.09677419354836, a: 53.144171779141104}
						},
							{
							bF: 3740.3522659806054,
							q: -1,
							r: {b: 24.193548387096772, a: 130.44478527607362},
							c: 11,
							z: _List_fromArray(
								[0, 12, 25]),
							a4: _List_Nil,
							u: {b: 24.193548387096772, a: 130.44478527607362}
						},
							{
							bF: 4135.167227389669,
							q: -1,
							r: {b: 30.64516129032258, a: 66.02760736196319},
							c: 12,
							z: _List_fromArray(
								[11]),
							a4: _List_Nil,
							u: {b: 30.64516129032258, a: 66.02760736196319}
						},
							{
							bF: 4534.270466659459,
							q: -1,
							r: {b: 279.0322580645161, a: 130.44478527607362},
							c: 13,
							z: _List_fromArray(
								[2, 14, 17, 21, 23, 26]),
							a4: _List_Nil,
							u: {b: 279.0322580645161, a: 130.44478527607362}
						},
							{
							bF: 3905.0485218575805,
							q: -1,
							r: {b: 288.7096774193548, a: 72.46932515337423},
							c: 14,
							z: _List_fromArray(
								[10, 13]),
							a4: _List_Nil,
							u: {b: 288.7096774193548, a: 72.46932515337423}
						},
							{
							bF: 2154.067407958568,
							q: -1,
							r: {b: 488.7096774193548, a: 107.89877300613497},
							c: 15,
							z: _List_fromArray(
								[5, 16, 24]),
							a4: _List_Nil,
							u: {b: 488.7096774193548, a: 107.89877300613497}
						},
							{
							bF: 3351.645257660057,
							q: -1,
							r: {b: 546.7741935483871, a: 104.67791411042946},
							c: 16,
							z: _List_fromArray(
								[7, 15, 24]),
							a4: _List_Nil,
							u: {b: 546.7741935483871, a: 104.67791411042946}
						},
							{
							bF: 1099.8625005416598,
							q: -1,
							r: {b: 337.09677419354836, a: 78.91104294478528},
							c: 17,
							z: _List_fromArray(
								[3, 13]),
							a4: _List_Nil,
							u: {b: 337.09677419354836, a: 78.91104294478528}
						},
							{
							bF: 3046.8286166633707,
							q: -1,
							r: {b: 127.41935483870967, a: 152.99079754601226},
							c: 18,
							z: _List_fromArray(
								[0, 19, 28]),
							a4: _List_Nil,
							u: {b: 127.41935483870967, a: 152.99079754601226}
						},
							{
							bF: 3018.256481298241,
							q: -1,
							r: {b: 185.48387096774192, a: 149.76993865030676},
							c: 19,
							z: _List_fromArray(
								[2, 18, 28]),
							a4: _List_Nil,
							u: {b: 185.48387096774192, a: 149.76993865030676}
						},
							{
							bF: 6240.868559135251,
							q: -1,
							r: {b: 424.19354838709677, a: 130.44478527607362},
							c: 20,
							z: _List_fromArray(
								[3, 21, 23, 24, 26, 27, 33]),
							a4: _List_Nil,
							u: {b: 424.19354838709677, a: 130.44478527607362}
						},
							{
							bF: 511.98980197293713,
							q: -1,
							r: {b: 343.54838709677415, a: 107.89877300613497},
							c: 21,
							z: _List_fromArray(
								[3, 13, 20]),
							a4: _List_Nil,
							u: {b: 343.54838709677415, a: 107.89877300613497}
						},
							{
							bF: 5701.4397387690515,
							q: -1,
							r: {b: 604.8387096774193, a: 133.66564417177915},
							c: 22,
							z: _List_fromArray(
								[7, 8, 24, 29]),
							a4: _List_Nil,
							u: {b: 604.8387096774193, a: 133.66564417177915}
						},
							{
							bF: 2116.709740514925,
							q: -1,
							r: {b: 340.3225806451613, a: 127.2239263803681},
							c: 23,
							z: _List_fromArray(
								[13, 20]),
							a4: _List_Nil,
							u: {b: 340.3225806451613, a: 127.2239263803681}
						},
							{
							bF: 4348.181356249093,
							q: -1,
							r: {b: 511.2903225806451, a: 152.99079754601226},
							c: 24,
							z: _List_fromArray(
								[15, 16, 20, 22, 30, 32]),
							a4: _List_Nil,
							u: {b: 511.2903225806451, a: 152.99079754601226}
						},
							{
							bF: 5748.194142093804,
							q: -1,
							r: {b: 50, a: 178.75766871165644},
							c: 25,
							z: _List_fromArray(
								[0, 11, 28, 35]),
							a4: _List_Nil,
							u: {b: 50, a: 178.75766871165644}
						},
							{
							bF: 4751.978765398959,
							q: -1,
							r: {b: 256.4516129032258, a: 178.75766871165644},
							c: 26,
							z: _List_fromArray(
								[13, 20, 28, 31]),
							a4: _List_Nil,
							u: {b: 256.4516129032258, a: 178.75766871165644}
						},
							{
							bF: 7744.16339988742,
							q: -1,
							r: {b: 372.5806451612903, a: 181.97852760736197},
							c: 27,
							z: _List_fromArray(
								[20, 31, 33, 34]),
							a4: _List_Nil,
							u: {b: 372.5806451612903, a: 181.97852760736197}
						},
							{
							bF: 32912.50247377794,
							q: -1,
							r: {b: 150, a: 278.6042944785276},
							c: 28,
							z: _List_fromArray(
								[18, 19, 25, 26, 34, 36, 37, 42]),
							a4: _List_Nil,
							u: {b: 150, a: 278.6042944785276}
						},
							{
							bF: 7361.221056797956,
							q: -1,
							r: {b: 656.4516129032257, a: 194.86196319018404},
							c: 29,
							z: _List_fromArray(
								[22, 30]),
							a4: _List_Nil,
							u: {b: 656.4516129032257, a: 194.86196319018404}
						},
							{
							bF: 15257.483908287912,
							q: -1,
							r: {b: 601.6129032258065, a: 249.61656441717793},
							c: 30,
							z: _List_fromArray(
								[24, 29, 32]),
							a4: _List_Nil,
							u: {b: 601.6129032258065, a: 249.61656441717793}
						},
							{
							bF: 4419.249406588926,
							q: -1,
							r: {b: 320.96774193548384, a: 217.4079754601227},
							c: 31,
							z: _List_fromArray(
								[26, 27, 34]),
							a4: _List_Nil,
							u: {b: 320.96774193548384, a: 217.4079754601227}
						},
							{
							bF: 30042.269486733865,
							q: -1,
							r: {b: 637.0967741935483, a: 365.5674846625767},
							c: 32,
							z: _List_fromArray(
								[24, 30, 33, 34, 38, 41]),
							a4: _List_Nil,
							u: {b: 637.0967741935483, a: 365.5674846625767}
						},
							{
							bF: 461.7073933007632,
							q: -1,
							r: {b: 450, a: 194.86196319018404},
							c: 33,
							z: _List_fromArray(
								[20, 27, 32]),
							a4: _List_Nil,
							u: {b: 450, a: 194.86196319018404}
						},
							{
							bF: 17809.93633430174,
							q: -1,
							r: {b: 388.7096774193548, a: 294.7085889570552},
							c: 34,
							z: _List_fromArray(
								[27, 28, 31, 32]),
							a4: _List_Nil,
							u: {b: 388.7096774193548, a: 294.7085889570552}
						},
							{
							bF: 11911.98298040768,
							q: -1,
							r: {b: 43.54838709677419, a: 246.3957055214724},
							c: 35,
							z: _List_fromArray(
								[25]),
							a4: _List_Nil,
							u: {b: 43.54838709677419, a: 246.3957055214724}
						},
							{
							bF: 1085.741143874926,
							q: -1,
							r: {b: 191.93548387096774, a: 233.51226993865032},
							c: 36,
							z: _List_fromArray(
								[28]),
							a4: _List_Nil,
							u: {b: 191.93548387096774, a: 233.51226993865032}
						},
							{
							bF: 12810.706510983568,
							q: -1,
							r: {b: 153.2258064516129, a: 365.5674846625767},
							c: 37,
							z: _List_fromArray(
								[28, 39, 43]),
							a4: _List_Nil,
							u: {b: 153.2258064516129, a: 365.5674846625767}
						},
							{
							bF: 9709.33109044125,
							q: -1,
							r: {b: 517.741935483871, a: 372.0092024539877},
							c: 38,
							z: _List_fromArray(
								[32, 40, 44]),
							a4: _List_Nil,
							u: {b: 517.741935483871, a: 372.0092024539877}
						},
							{
							bF: 2342.9150999406265,
							q: -1,
							r: {b: 198.38709677419354, a: 336.579754601227},
							c: 39,
							z: _List_fromArray(
								[37]),
							a4: _List_Nil,
							u: {b: 198.38709677419354, a: 336.579754601227}
						},
							{
							bF: 2119.532950722365,
							q: -1,
							r: {b: 456.4516129032258, a: 336.579754601227},
							c: 40,
							z: _List_fromArray(
								[38]),
							a4: _List_Nil,
							u: {b: 456.4516129032258, a: 336.579754601227}
						},
							{
							bF: 4223.481100336423,
							q: -1,
							r: {b: 372.5806451612903, a: 397.7760736196319},
							c: 41,
							z: _List_fromArray(
								[32, 42, 45]),
							a4: _List_Nil,
							u: {b: 372.5806451612903, a: 397.7760736196319}
						},
							{
							bF: 3870.2256085493573,
							q: -1,
							r: {b: 304.83870967741933, a: 394.5552147239264},
							c: 42,
							z: _List_fromArray(
								[28, 41, 45]),
							a4: _List_Nil,
							u: {b: 304.83870967741933, a: 394.5552147239264}
						},
							{
							bF: 22008.336631703918,
							q: -1,
							r: {b: 59.677419354838705, a: 465.4141104294479},
							c: 43,
							z: _List_fromArray(
								[37, 45, 46]),
							a4: _List_Nil,
							u: {b: 59.677419354838705, a: 465.4141104294479}
						},
							{
							bF: 20070.626360577895,
							q: -1,
							r: {b: 617.741935483871, a: 462.19325153374234},
							c: 44,
							z: _List_fromArray(
								[38, 45, 47]),
							a4: _List_Nil,
							u: {b: 617.741935483871, a: 462.19325153374234}
						},
							{
							bF: 9361.27053235699,
							q: -1,
							r: {b: 308.06451612903226, a: 478.29754601226995},
							c: 45,
							z: _List_fromArray(
								[41, 42, 43, 44, 48]),
							a4: _List_Nil,
							u: {b: 308.06451612903226, a: 478.29754601226995}
						},
							{
							bF: 10685.978626558506,
							q: -1,
							r: {b: 185.48387096774192, a: 484.739263803681},
							c: 46,
							z: _List_fromArray(
								[43]),
							a4: _List_Nil,
							u: {b: 185.48387096774192, a: 484.739263803681}
						},
							{
							bF: 11911.982980407687,
							q: -1,
							r: {b: 453.22580645161287, a: 484.739263803681},
							c: 47,
							z: _List_fromArray(
								[44, 48]),
							a4: _List_Nil,
							u: {b: 453.22580645161287, a: 484.739263803681}
						},
							{
							bF: 3750.742133386113,
							q: -1,
							r: {b: 379.0322580645161, a: 491.180981595092},
							c: 48,
							z: _List_fromArray(
								[45, 47]),
							a4: _List_Nil,
							u: {b: 379.0322580645161, a: 491.180981595092}
						}
						]),
					bc: 700
				});
		case '!a | b':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 425,
							bu: 12,
							k: _List_fromArray(
								[
									{
									ah: {b: 54.745762711864415, a: 54.73484848484849},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 0,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 3]),
									a4: _List_Nil
								},
									{
									ah: {b: 239.37853107344634, a: 142.739898989899},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 3]),
									a4: _List_Nil
								},
									{
									ah: {b: 357.4576271186441, a: 22.53787878787879},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 2,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[1, 4, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 104.12429378531074, a: 183.52272727272728},
									aa: $elm$core$Maybe$Nothing,
									bl: '!(a)',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 1, 6, 9]),
									a4: _List_Nil
								},
									{
									ah: {b: 301.6384180790961, a: 282.26010101010104},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 4,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 5, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 323.1073446327684, a: 222.15909090909093},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4]),
									a4: _List_Nil
								},
									{
									ah: {b: 26.836158192090398, a: 277.96717171717177},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 7, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 41.864406779661024, a: 235.0378787878788},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6]),
									a4: _List_Nil
								},
									{
									ah: {b: 209.3220338983051, a: 301.57828282828285},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 9, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 144.91525423728814, a: 295.1388888888889},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 8, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 271.5819209039548, a: 325.18939393939394},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 12, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 82.65536723163842, a: 327.3358585858586},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 12, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 147.0621468926554, a: 370.26515151515156},
									aa: $elm$core$Maybe$Nothing,
									bl: '(!(a) | b)',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 9, 10, 11, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 37.57062146892656, a: 387.4368686868687},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11]),
									a4: _List_Nil
								},
									{
									ah: {b: 295.1977401129944, a: 387.4368686868687},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 217.90960451977404, a: 391.72979797979804},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[12, 14]),
									a4: _List_Nil
								}
								]),
							bc: 380
						}),
					dG: true,
					cg: 1.0000000000000004,
					a0: 425,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 49.37853107344633 0 L 98.75706214689266 0 L 148.135593220339 0 L 197.51412429378533 0 L 246.89265536723167 0 L 296.271186440678 0 L 330.6214689265537 0 L 328.384266960006 49.27839556175505 L 319.5605834560177 53.335259044111275 L 270.50847457627117 53.661616161616166 L 221.1299435028249 53.661616161616166 L 187.99034366321513 50.57913549159768 L 140.94860440138626 61.50131268067892 L 122.31971776864435 77.21957428424074 L 87.87678467557305 83.56633608745324 L 85.8753807364096 133.08048266741645 L 82.92416241596894 155.88742846546072 L 49.37853094870208 158.83838371366448 L 0 158.83838383838386 L 0 148.10606060606062 L 0 98.73737373737374 L 0 49.36868686868687 Z'),
								_Utils_Tuple2(1, 'M 330.6214689265537 0 L 334.9152542372882 0 L 334.9152542372882 49.36868686868687 L 334.9152542372882 98.73737373737374 L 334.9152505645175 148.10605693402215 L 330.5454186134699 180.22699515149216 L 285.7490192643289 191.24760731205663 L 270.7511588683668 219.1820298494536 L 266.1268606650531 240.31575227229072 L 229.68013656393137 242.57603697391153 L 179.85689756372318 244.21498031939228 L 177.11864406779662 245.77020202020202 L 177.11864406779662 245.77020202020202 L 177.11864406779662 245.77020202020202 L 174.54849122934226 247.49349086559374 L 151.20128918545635 258.49437767808973 L 119.36583200580044 258.4357414484451 L 113.8039357251961 238.2695245658427 L 120.35464189302995 216.92155683683117 L 168.08165963963629 210.9774434661302 L 170.46491438148408 168.71048399297723 L 124.95150599967613 156.26027327451308 L 118.12791055271248 139.47139724444716 L 118.50407089794555 90.57640528040875 L 138.99926139381887 65.99175223750699 L 172.95643338198357 54.86639687878484 L 221.1299435028249 53.661616161616166 L 270.50847457627117 53.661616161616166 L 319.5605834560177 53.335259044111275 L 328.384266960006 49.27839556175505 Z'),
								_Utils_Tuple2(2, 'M 334.9152542372882 0 L 380.00000000000006 0 L 380.00000000000006 49.36868686868687 L 380.00000000000006 98.73737373737374 L 380.00000000000006 148.10606060606062 L 380.00000000000006 195.32828282828285 L 354.3538266298733 188.77237365732557 L 318.9508625530988 185.80647490148962 L 287.6181471372789 195.26282719832284 L 272.9151323791017 223.46301456762302 L 277.4769208500009 266.7194635862176 L 274.0151875219278 293.27874111293295 L 258.5480700596468 301.42581831787516 L 256.5536723163842 303.7247474747475 L 256.5536723163842 303.7247474747475 L 253.37904951043615 302.6058080884827 L 243.88558166187127 301.3650600675935 L 237.52715191119364 281.96464643115974 L 225.36883871753017 274.80235390050234 L 192.44129858275505 264.79403660436276 L 179.1266352220524 245.9090758296267 L 177.11864406779662 245.77020202020202 L 179.85689756372318 244.21498031939228 L 229.68013656393137 242.57603697391153 L 266.1268606650531 240.31575227229072 L 270.7511588683668 219.1820298494536 L 285.7490192643289 191.24760731205663 L 330.5454186134699 180.22699515149216 L 334.9152505645175 148.10605693402215 L 334.9152542372882 98.73737373737374 L 334.9152542372882 49.36868686868687 Z'),
								_Utils_Tuple2(3, 'M 221.1299435028249 53.661616161616166 L 172.95643338198357 54.86639687878484 L 138.99926139381887 65.99175223750699 L 118.50407089794555 90.57640528040875 L 118.12791055271248 139.47139724444716 L 124.95150599967613 156.26027327451308 L 170.46491438148408 168.71048399297723 L 168.08165963963629 210.9774434661302 L 120.35464189302995 216.92155683683117 L 113.8039357251961 238.2695245658427 L 119.36583200580044 258.4357414484451 L 151.20128918545635 258.49437767808973 L 174.54849122934226 247.49349086559374 L 177.11864406779662 245.77020202020202 L 175.03057671647554 247.97548024318013 L 135.82408695828482 268.8778168718365 L 110.75624570037886 291.03719541216105 L 105.775610992926 301.0828061794639 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 102.58295842947163 300.9728462538942 L 83.10191420275528 262.57067850338217 L 84.52720325043902 226.7146741036608 L 63.439743408383414 213.4668434919585 L 24.965526763202497 213.84944556836567 L 0 223.23232323232324 L 0 208.20707070707073 L 0 158.83838383838386 L 49.37853094870208 158.83838371366448 L 82.92416241596894 155.88742846546072 L 85.8753807364096 133.08048266741645 L 87.87678467557305 83.56633608745324 L 122.31971776864435 77.21957428424074 L 140.94860440138626 61.50131268067892 L 187.99034366321513 50.57913549159768 Z'),
								_Utils_Tuple2(4, 'M 354.3538266298733 188.77237365732557 L 380.00000000000006 195.32828282828285 L 380.00000000000006 244.69696969696972 L 380.00000000000006 294.0656565656566 L 380.00000000000006 306.94444444444446 L 377.8531073446328 306.94444444444446 L 328.47457628587176 306.94444442976214 L 280.3166872407072 303.57925449670273 L 259.01822069408763 301.92175680373055 L 256.5536723163842 303.7247474747475 L 258.5480700596468 301.42581831787516 L 274.0151875219278 293.27874111293295 L 277.4769208500009 266.7194635862176 L 272.9151323791017 223.46301456762302 L 287.6181471372789 195.26282719832284 L 318.9508625530988 185.80647490148962 Z M 304.14839266000143 190.32513075290615 L 283.10105094730034 205.7718840678653 L 275.20908729871053 231.4793039484605 L 287.7748252236705 255.33810170852462 L 337.0588099927294 257.5724213410828 L 355.5795296476074 254.62480220283447 L 358.3730816608096 206.21856634855934 L 349.43369472589023 189.39862802458572 Z'),
								_Utils_Tuple2(5, 'M 349.43369472589023 189.39862802458572 L 358.3730816608096 206.21856634855934 L 355.5795296476074 254.62480220283447 L 337.0588099927294 257.5724213410828 L 287.7748252236705 255.33810170852462 L 275.20908729871053 231.4793039484605 L 283.10105094730034 205.7718840678653 L 304.14839266000143 190.32513075290615 Z'),
								_Utils_Tuple2(6, 'M 63.439743408383414 213.4668434919585 L 84.52720325043902 226.7146741036608 L 83.10191420275528 262.57067850338217 L 102.58295842947163 300.9728462538942 L 104.12429378531073 303.7247474747475 L 100.90910577973315 302.6566651020791 L 67.71864234824103 305.96271757903287 L 49.37261013079093 306.9385246822003 L 0 306.94444444444446 L 0 272.6010101010101 L 0 223.23232323232324 L 24.965526763202497 213.84944556836567 Z M 27.113452165974664 215.9970680940773 L 13.531955431980869 230.2768364577096 L 19.883747650359204 248.42830568602938 L 61.9044217806384 257.21540409812826 L 76.15118020765127 252.14610093185226 L 82.35254765444897 228.83338134467886 L 61.29285142275861 215.61330880803206 Z'),
								_Utils_Tuple2(7, 'M 61.29285142275861 215.61330880803206 L 82.35254765444897 228.83338134467886 L 76.15118020765127 252.14610093185226 L 61.9044217806384 257.21540409812826 L 19.883747650359204 248.42830568602938 L 13.531955431980869 230.2768364577096 L 27.113452165974664 215.9970680940773 Z'),
								_Utils_Tuple2(8, 'M 177.11864406779662 245.77020202020202 L 179.1266352220524 245.9090758296267 L 192.44129858275505 264.79403660436276 L 225.36883871753017 274.80235390050234 L 237.52715191119364 281.96464643115974 L 243.88558166187127 301.3650600675935 L 253.37904951043615 302.6058080884827 L 256.5536723163842 303.7247474747475 L 256.5536723163842 303.7247474747475 L 254.75185818385495 306.2162218484914 L 235.04099578771388 322.99918667116856 L 214.06668638537482 329.00969065622155 L 194.73955640666367 318.4442690323283 L 180.33898305084747 317.6767676767677 L 180.33898305084747 298.3585858585859 L 178.67417588260457 248.50790961232155 L 177.11864406779662 245.77020202020202 Z'),
								_Utils_Tuple2(9, 'M 177.11864406779662 245.77020202020202 L 177.11864406779662 245.77020202020202 L 178.67417588260457 248.50790961232155 L 180.33898305084747 298.3585858585859 L 180.33898305084747 317.6767676767677 L 158.21268282720365 325.5724210553323 L 151.29420222070132 328.5095449311373 L 123.61937584480752 322.8699154111979 L 105.92279816564303 306.2195309408494 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 105.775610992926 301.0828061794639 L 110.75624570037886 291.03719541216105 L 135.82408695828482 268.8778168718365 L 175.03057671647554 247.97548024318013 Z'),
								_Utils_Tuple2(10, 'M 280.3166872407072 303.57925449670273 L 328.47457628587176 306.94444442976214 L 377.8531073446328 306.94444444444446 L 380.00000000000006 306.94444444444446 L 380.00000000000006 352.020202020202 L 341.3559320949656 349.87373748214077 L 293.1746148494684 351.0707124142911 L 261.85927258093363 358.3979768726839 L 251.18644067796612 390.6565656565657 L 251.31987925595448 380.20695744375956 L 237.78509686929823 358.97947883372063 L 228.85921618700175 334.6949063080425 L 241.77434360111027 323.291667110876 L 257.0712762569931 306.3887128712428 L 256.5536723163842 303.7247474747475 L 256.5536723163842 303.7247474747475 L 259.01822069408763 301.92175680373055 Z'),
								_Utils_Tuple2(11, 'M 100.90910577973315 302.6566651020791 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 103.6053431059585 306.3900593414976 L 119.85291384803955 324.48868368190347 L 131.6681166414043 334.5520095687004 L 107.09508961429589 376.8667409628989 L 111.63841807909606 425.00000000000006 L 109.49152542372883 425.00000000000006 L 108.9838170567383 406.1894253310322 L 101.15115657491557 358.21244346959037 L 83.69626084311437 352.05274824663377 L 35.54693558142509 351.07018457519433 L 0 356.31313131313135 L 0 306.94444444444446 L 49.37261013079093 306.9385246822003 L 67.71864234824103 305.96271757903287 Z'),
								_Utils_Tuple2(12, 'M 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 105.92279816564303 306.2195309408494 L 123.61937584480752 322.8699154111979 L 151.29420222070132 328.5095449311373 L 158.21268282720365 325.5724210553323 L 180.33898305084747 317.6767676767677 L 194.73955640666367 318.4442690323283 L 214.06668638537482 329.00969065622155 L 235.04099578771388 322.99918667116856 L 254.75185818385495 306.2162218484914 L 256.5536723163842 303.7247474747475 L 256.5536723163842 303.7247474747475 L 257.0712762569931 306.3887128712428 L 241.77434360111027 323.291667110876 L 228.85921618700175 334.6949063080425 L 237.78509686929823 358.97947883372063 L 251.31987925595448 380.20695744375956 L 251.18644067796612 390.6565656565657 L 247.67619311662605 383.43379017546266 L 235.12756062166477 361.63648660952884 L 196.17496936711137 361.4136373057787 L 186.00274553660563 374.8545525384259 L 184.63276836158232 422.8535353535358 L 184.63276836158195 425.00000000000006 L 161.0169491525424 425.00000000000006 L 111.63841807909606 425.00000000000006 L 107.09508961429589 376.8667409628989 L 131.6681166414043 334.5520095687004 L 119.85291384803955 324.48868368190347 L 103.6053431059585 306.3900593414976 Z'),
								_Utils_Tuple2(13, 'M 83.69626084311437 352.05274824663377 L 101.15115657491557 358.21244346959037 L 108.9838170567383 406.1894253310322 L 109.49152542372883 425.00000000000006 L 98.75706214689266 425.00000000000006 L 49.37853107344633 425.00000000000006 L 0 425.00000000000006 L 0 405.6818181818182 L 0 356.31313131313135 L 35.54693558142509 351.07018457519433 Z'),
								_Utils_Tuple2(14, 'M 341.3559320949656 349.87373748214077 L 380.00000000000006 352.020202020202 L 380.00000000000006 401.3888888888889 L 380.00000000000006 425.00000000000006 L 349.9435028248588 425.00000000000006 L 300.5649717514125 425.00000000000006 L 251.18644067796612 425.00000000000006 L 251.18644067796612 390.6565656565657 L 261.85927258093363 358.3979768726839 L 293.1746148494684 351.0707124142911 Z'),
								_Utils_Tuple2(15, 'M 235.12756062166477 361.63648660952884 L 247.67619311662605 383.43379017546266 L 251.18644067796612 390.6565656565657 L 251.18644067796612 425.00000000000006 L 234.01129943502826 425.00000000000006 L 184.63276836158195 425.00000000000006 L 184.63276836158232 422.8535353535358 L 186.00274553660563 374.8545525384259 L 196.17496936711137 361.4136373057787 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 27971.582756128206,
							q: -1,
							r: {b: 54.745762711864415, a: 54.73484848484849},
							c: 0,
							z: _List_fromArray(
								[1, 3]),
							a4: _List_Nil,
							u: {b: 54.745762711864415, a: 54.73484848484849}
						},
							{
							bF: 35079.84346198599,
							q: -1,
							r: {b: 239.37853107344634, a: 142.739898989899},
							c: 1,
							z: _List_fromArray(
								[0, 2, 3]),
							a4: _List_Nil,
							u: {b: 239.37853107344634, a: 142.739898989899}
						},
							{
							bF: 12728.470418696399,
							q: -1,
							r: {b: 357.4576271186441, a: 22.53787878787879},
							c: 2,
							z: _List_fromArray(
								[1, 4, 8]),
							a4: _List_Nil,
							u: {b: 357.4576271186441, a: 22.53787878787879}
						},
							{
							bF: 15287.40966808251,
							q: -1,
							r: {b: 104.12429378531074, a: 183.52272727272728},
							c: 3,
							z: _List_fromArray(
								[0, 1, 6, 9]),
							a4: _List_Nil,
							u: {b: 104.12429378531074, a: 183.52272727272728}
						},
							{
							bF: 7228.0433573561895,
							q: -1,
							r: {b: 301.6384180790961, a: 282.26010101010104},
							c: 4,
							z: _List_fromArray(
								[2, 5, 10]),
							a4: _List_Nil,
							u: {b: 301.6384180790961, a: 282.26010101010104}
						},
							{
							bF: 4824.552724014771,
							q: -1,
							r: {b: 323.1073446327684, a: 222.15909090909093},
							c: 5,
							z: _List_fromArray(
								[4]),
							a4: _List_Nil,
							u: {b: 323.1073446327684, a: 222.15909090909093}
						},
							{
							bF: 5750.4130627326595,
							q: -1,
							r: {b: 26.836158192090398, a: 277.96717171717177},
							c: 6,
							z: _List_fromArray(
								[3, 7, 11]),
							a4: _List_Nil,
							u: {b: 26.836158192090398, a: 277.96717171717177}
						},
							{
							bF: 2177.2213556698644,
							q: -1,
							r: {b: 41.864406779661024, a: 235.0378787878788},
							c: 7,
							z: _List_fromArray(
								[6]),
							a4: _List_Nil,
							u: {b: 41.864406779661024, a: 235.0378787878788}
						},
							{
							bF: 3419.1373883403685,
							q: -1,
							r: {b: 209.3220338983051, a: 301.57828282828285},
							c: 8,
							z: _List_fromArray(
								[2, 9, 12]),
							a4: _List_Nil,
							u: {b: 209.3220338983051, a: 301.57828282828285}
						},
							{
							bF: 4028.2578600405122,
							q: -1,
							r: {b: 144.91525423728814, a: 295.1388888888889},
							c: 9,
							z: _List_fromArray(
								[3, 8, 12]),
							a4: _List_Nil,
							u: {b: 144.91525423728814, a: 295.1388888888889}
						},
							{
							bF: 6983.051984172598,
							q: -1,
							r: {b: 271.5819209039548, a: 325.18939393939394},
							c: 10,
							z: _List_fromArray(
								[4, 12, 14]),
							a4: _List_Nil,
							u: {b: 271.5819209039548, a: 325.18939393939394}
						},
							{
							bF: 6023.455452187392,
							q: -1,
							r: {b: 82.65536723163842, a: 327.3358585858586},
							c: 11,
							z: _List_fromArray(
								[6, 12, 13]),
							a4: _List_Nil,
							u: {b: 82.65536723163842, a: 327.3358585858586}
						},
							{
							bF: 9298.20249868589,
							q: -1,
							r: {b: 147.0621468926554, a: 370.26515151515156},
							c: 12,
							z: _List_fromArray(
								[8, 9, 10, 11, 15]),
							a4: _List_Nil,
							u: {b: 147.0621468926554, a: 370.26515151515156}
						},
							{
							bF: 7630.342829203022,
							q: -1,
							r: {b: 37.57062146892656, a: 387.4368686868687},
							c: 13,
							z: _List_fromArray(
								[11]),
							a4: _List_Nil,
							u: {b: 37.57062146892656, a: 387.4368686868687}
						},
							{
							bF: 9191.636699569222,
							q: -1,
							r: {b: 295.1977401129944, a: 387.4368686868687},
							c: 14,
							z: _List_fromArray(
								[10, 15]),
							a4: _List_Nil,
							u: {b: 295.1977401129944, a: 387.4368686868687}
						},
							{
							bF: 3878.378483134431,
							q: -1,
							r: {b: 217.90960451977404, a: 391.72979797979804},
							c: 15,
							z: _List_fromArray(
								[12, 14]),
							a4: _List_Nil,
							u: {b: 217.90960451977404, a: 391.72979797979804}
						}
						]),
					bc: 380
				});
		case '(!s & a) | (s & b)':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 675,
							bu: 43,
							k: _List_fromArray(
								[
									{
									ah: {b: 54.744897959183675, a: 54.67877094972067},
									aa: $elm$core$Maybe$Nothing,
									bl: 's',
									c: 0,
									bo: $elm$core$Maybe$Just('s'),
									z: _List_fromArray(
										[1, 7]),
									a4: _List_Nil
								},
									{
									ah: {b: 228.41836734693877, a: 160.26536312849163},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 7]),
									a4: _List_Nil
								},
									{
									ah: {b: 251.07142857142858, a: 265.8519553072626},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 2,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 3, 9, 17, 23]),
									a4: _List_Nil
								},
									{
									ah: {b: 375.66326530612247, a: 16.96927374301676},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 473.8265306122449, a: 81.07541899441341},
									aa: $elm$core$Maybe$Nothing,
									bl: 's',
									c: 4,
									bo: $elm$core$Maybe$Just('s'),
									z: _List_fromArray(
										[3, 5, 8, 18, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 590.8673469387755, a: 194.20391061452514},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 6]),
									a4: _List_Nil
								},
									{
									ah: {b: 651.2755102040817, a: 88.6173184357542},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 6,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[5, 11, 19, 21]),
									a4: _List_Nil
								},
									{
									ah: {b: 100.05102040816327, a: 186.66201117318437},
									aa: $elm$core$Maybe$Nothing,
									bl: '!(s)',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 1, 14, 16]),
									a4: _List_Nil
								},
									{
									ah: {b: 454.94897959183675, a: 265.8519553072626},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 10, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 300.1530612244898, a: 280.93575418994413},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 10, 12, 23]),
									a4: _List_Nil
								},
									{
									ah: {b: 409.64285714285717, a: 224.37150837988827},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 9, 24]),
									a4: _List_Nil
								},
									{
									ah: {b: 681.4795918367347, a: 280.93575418994413},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 13, 21]),
									a4: _List_Nil
								},
									{
									ah: {b: 319.03061224489795, a: 220.60055865921788},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9]),
									a4: _List_Nil
								},
									{
									ah: {b: 700.3571428571429, a: 220.60055865921788},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11]),
									a4: _List_Nil
								},
									{
									ah: {b: 24.540816326530614, a: 280.93575418994413},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 15, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 35.86734693877551, a: 235.68435754189946},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[14]),
									a4: _List_Nil
								},
									{
									ah: {b: 145.35714285714286, a: 296.01955307262574},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 16,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[7, 17, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 209.5408163265306, a: 303.5614525139665},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 17,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 16, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 530.4591836734694, a: 303.5614525139665},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 18,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 19, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 587.0918367346939, a: 303.5614525139665},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 19,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 18, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 66.07142857142857, a: 329.9581005586592},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 20,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[14, 22, 29]),
									a4: _List_Nil
								},
									{
									ah: {b: 647.5, a: 326.18715083798884},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 21,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 11, 26, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 168.01020408163265, a: 431.7737430167598},
									aa: $elm$core$Maybe$Nothing,
									bl: '(!(s) & a)',
									c: 22,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16, 17, 20, 23, 31, 34, 35, 39]),
									a4: _List_Nil
								},
									{
									ah: {b: 277.5, a: 329.9581005586592},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 23,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 9, 22, 24, 27, 32]),
									a4: _List_Nil
								},
									{
									ah: {b: 368.11224489795916, a: 322.41620111731845},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 24,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 23, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 470.05102040816325, a: 329.9581005586592},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 25,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 8, 24, 26, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 511.5816326530612, a: 409.14804469273747},
									aa: $elm$core$Maybe$Nothing,
									bl: '(s & b)',
									c: 26,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[18, 19, 21, 25, 32, 33, 34, 36, 40]),
									a4: _List_Nil
								},
									{
									ah: {b: 307.7040816326531, a: 375.20949720670393},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 27,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[23, 34]),
									a4: _List_Nil
								},
									{
									ah: {b: 432.2959183673469, a: 375.20949720670393},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 28,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25]),
									a4: _List_Nil
								},
									{
									ah: {b: 54.744897959183675, a: 405.3770949720671},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 29,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20]),
									a4: _List_Nil
								},
									{
									ah: {b: 685.2551020408163, a: 405.3770949720671},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 30,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[21, 33]),
									a4: _List_Nil
								},
									{
									ah: {b: 205.76530612244898, a: 390.2932960893855},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 31,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22]),
									a4: _List_Nil
								},
									{
									ah: {b: 368.11224489795916, a: 363.89664804469277},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 32,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[23, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 605.969387755102, a: 428.0027932960894},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 33,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[26, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 364.33673469387753, a: 461.94134078212295},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 34,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22, 26, 27]),
									a4: _List_Nil
								},
									{
									ah: {b: 164.23469387755102, a: 518.5055865921788},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 35,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22, 37, 42]),
									a4: _List_Nil
								},
									{
									ah: {b: 545.5612244897959, a: 526.0474860335196},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 36,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[26, 38, 41]),
									a4: _List_Nil
								},
									{
									ah: {b: 217.09183673469389, a: 484.5670391061453},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 37,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[35]),
									a4: _List_Nil
								},
									{
									ah: {b: 492.7040816326531, a: 484.5670391061453},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 38,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36]),
									a4: _List_Nil
								},
									{
									ah: {b: 315.2551020408163, a: 544.9022346368715},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 39,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22, 40, 43]),
									a4: _List_Nil
								},
									{
									ah: {b: 390.765306122449, a: 544.9022346368715},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 40,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[26, 39, 43]),
									a4: _List_Nil
								},
									{
									ah: {b: 628.6224489795918, a: 620.3212290502794},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 41,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36, 43, 44]),
									a4: _List_Nil
								},
									{
									ah: {b: 58.52040816326531, a: 616.550279329609},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 42,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[35, 43, 45]),
									a4: _List_Nil
								},
									{
									ah: {b: 330.35714285714283, a: 624.0921787709498},
									aa: $elm$core$Maybe$Nothing,
									bl: '((!(s) & a) | (s & b))',
									c: 43,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[39, 40, 41, 42, 46]),
									a4: _List_Nil
								},
									{
									ah: {b: 473.8265306122449, a: 635.4050279329609},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 44,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 46]),
									a4: _List_Nil
								},
									{
									ah: {b: 186.8877551020408, a: 639.1759776536313},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 45,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[42]),
									a4: _List_Nil
								},
									{
									ah: {b: 398.31632653061223, a: 642.9469273743017},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 46,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[43, 44]),
									a4: _List_Nil
								}
								]),
							bc: 740
						}),
					dG: true,
					cg: 0.9999999999999997,
					a0: 675,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 49.08163265306123 0 L 98.16326530612245 0 L 147.24489795918367 0 L 196.3265306122449 0 L 245.40816326530611 0 L 294.48979591836735 0 L 328.46938775510205 0 L 328.46938775510205 49.022346368715084 L 324.6938775510204 79.18994413407822 L 313.3673469387755 79.18994413407822 L 264.2857142857143 79.18994413407822 L 215.20408163265307 79.18994413407822 L 166.12244897959184 79.18994413407822 L 117.04081632653062 79.18994413407822 L 86.83673469387755 82.9608938547486 L 86.83673469387755 131.9832402234637 L 86.83673469387755 158.37988826815644 L 49.08163265306123 158.37988826815644 L 0 158.37988826815644 L 0 147.06703910614524 L 0 98.04469273743017 L 0 49.022346368715084 Z'),
								_Utils_Tuple2(1, 'M 328.46938775510205 0 L 336.0204081632653 0 L 336.0204081632653 49.022346368715084 L 336.0204081632653 98.04469273743017 L 336.0204081632653 147.06703910614524 L 332.2448979591837 181.0055865921788 L 283.16326530612247 188.54748603351956 L 268.0612244897959 207.40223463687153 L 264.2857142857143 241.34078212290504 L 234.08163265306123 245.11173184357543 L 185 245.11173184357543 L 179.33673469387753 246.99720670391062 L 179.33673469387753 246.99720670391062 L 179.33673469387753 246.99720670391062 L 173.6734693877551 248.88268156424581 L 151.0204081632653 260.195530726257 L 117.04081632653062 260.195530726257 L 113.26530612244898 218.7150837988827 L 147.24489795918367 214.9441340782123 L 151.0204081632653 165.9217877094972 L 120.81632653061224 158.37988826815644 L 117.04081632653062 128.2122905027933 L 117.04081632653062 79.18994413407822 L 166.12244897959184 79.18994413407822 L 215.20408163265307 79.18994413407822 L 264.2857142857143 79.18994413407822 L 313.3673469387755 79.18994413407822 L 324.6938775510204 79.18994413407822 L 328.46938775510205 49.022346368715084 Z'),
								_Utils_Tuple2(2, 'M 336.0204081632653 0 L 358.6734693877551 0 L 358.6734693877551 49.022346368715084 L 358.6734693877551 98.04469273743017 L 358.6734693877551 147.06703910614524 L 366.2244897959184 165.9217877094972 L 377.55102040816325 169.6927374301676 L 377.55102040816325 173.46368715083798 L 379.4387755102041 179.1201117318436 L 379.4387755102041 179.1201117318436 L 373.7755102040816 181.0055865921788 L 366.2244897959184 192.31843575418995 L 358.6734693877551 184.77653631284917 L 313.3673469387755 188.54748603351956 L 290.7142857142857 192.31843575418995 L 271.83673469387753 214.9441340782123 L 275.61224489795916 252.6536312849162 L 272.0850784184331 299.23271771682056 L 271.41886277262887 302.71380458713725 L 259.3853530467081 304.8169629060441 L 254.3612515745041 307.0821413509014 L 254.3612515745041 307.0821413509014 L 249.17124805690992 305.4406327637114 L 241.6326530612245 305.4469273743017 L 237.85714285714286 279.05027932960894 L 188.77551020408163 271.50837988826817 L 185 248.88268156424581 L 179.33673469387753 246.99720670391062 L 179.33673469387753 246.99720670391062 L 185 245.11173184357543 L 234.08163265306123 245.11173184357543 L 264.2857142857143 241.34078212290504 L 268.0612244897959 207.40223463687153 L 283.16326530612247 188.54748603351956 L 332.2448979591837 181.0055865921788 L 336.0204081632653 147.06703910614524 L 336.0204081632653 98.04469273743017 L 336.0204081632653 49.022346368715084 Z'),
								_Utils_Tuple2(3, 'M 358.6734693877551 0 L 392.6530612244898 0 L 392.6530612244898 49.022346368715084 L 392.6530612244898 98.04469273743017 L 392.6530612244898 147.06703910614524 L 388.87755102040813 173.46368715083798 L 381.3265306122449 173.46368715083798 L 379.4387755102041 179.1201117318436 L 379.4387755102041 179.1201117318436 L 377.55102040816325 173.46368715083798 L 377.55102040816325 169.6927374301676 L 366.2244897959184 165.9217877094972 L 358.6734693877551 147.06703910614524 L 358.6734693877551 98.04469273743017 L 358.6734693877551 49.022346368715084 Z'),
								_Utils_Tuple2(4, 'M 392.6530612244898 0 L 441.734693877551 0 L 490.81632653061223 0 L 539.8979591836735 0 L 558.7755102040817 0 L 558.7755102040817 49.022346368715084 L 558.7755102040817 98.04469273743017 L 558.7755102040817 147.06703910614524 L 558.7755102040817 196.08938547486034 L 555 226.25698324022346 L 505.9183673469388 230.02793296089388 L 498.3673469387755 245.11173184357543 L 547.4489795918367 245.11173184357543 L 551.2244897959183 245.11173184357543 L 556.8877551020408 246.99720670391062 L 556.8877551020408 246.99720670391062 L 555 252.6536312849162 L 551.2244897959183 275.27932960893855 L 502.14285714285717 279.05027932960894 L 494.59183673469386 286.5921787709497 L 490.81632653061223 305.4469273743017 L 485.24825484441874 307.28522019964606 L 485.24825484441874 307.28522019964606 L 479.9937729873428 305.17596882548776 L 470.5456232187428 304.0216067788462 L 466.99307161224493 299.9546810941105 L 460.61224489795916 252.6536312849162 L 460.61224489795916 203.63128491620114 L 434.18367346938777 177.2346368715084 L 385.1020408163265 177.2346368715084 L 379.4387755102041 179.1201117318436 L 381.3265306122449 173.46368715083798 L 388.87755102040813 173.46368715083798 L 392.6530612244898 147.06703910614524 L 392.6530612244898 98.04469273743017 L 392.6530612244898 49.022346368715084 Z'),
								_Utils_Tuple2(5, 'M 558.7755102040817 0 L 562.5510204081633 0 L 562.5510204081633 49.022346368715084 L 562.5510204081633 98.04469273743017 L 562.5510204081633 147.06703910614524 L 566.3265306122449 162.15083798882682 L 611.6326530612245 165.9217877094972 L 622.9591836734694 188.54748603351956 L 626.734693877551 237.56983240223465 L 626.734693877551 245.11173184357543 L 611.6326530612245 245.11173184357543 L 562.5510204081633 245.11173184357543 L 556.8877551020408 246.99720670391062 L 556.8877551020408 246.99720670391062 L 551.2244897959183 245.11173184357543 L 547.4489795918367 245.11173184357543 L 498.3673469387755 245.11173184357543 L 505.9183673469388 230.02793296089388 L 555 226.25698324022346 L 558.7755102040817 196.08938547486034 L 558.7755102040817 147.06703910614524 L 558.7755102040817 98.04469273743017 L 558.7755102040817 49.022346368715084 Z'),
								_Utils_Tuple2(6, 'M 562.5510204081633 0 L 611.6326530612245 0 L 660.7142857142857 0 L 709.795918367347 0 L 740 0 L 740 49.022346368715084 L 740 98.04469273743017 L 740 147.06703910614524 L 740 184.77653631284917 L 694.6938775510204 188.54748603351956 L 672.0408163265306 192.31843575418995 L 653.1632653061224 214.9441340782123 L 656.9387755102041 263.9664804469274 L 656.9387755102041 301.6759776536313 L 649.3877551020408 301.6759776536313 L 641.8367346938776 301.6759776536313 L 636.1734693877552 303.5614525139665 L 636.1734693877552 303.5614525139665 L 630.5102040816327 301.6759776536313 L 622.9591836734694 301.6759776536313 L 615.4081632653061 275.27932960893855 L 566.3265306122449 271.50837988826817 L 562.5510204081633 248.88268156424581 L 556.8877551020408 246.99720670391062 L 556.8877551020408 246.99720670391062 L 562.5510204081633 245.11173184357543 L 611.6326530612245 245.11173184357543 L 626.734693877551 245.11173184357543 L 626.734693877551 237.56983240223465 L 622.9591836734694 188.54748603351956 L 611.6326530612245 165.9217877094972 L 566.3265306122449 162.15083798882682 L 562.5510204081633 147.06703910614524 L 562.5510204081633 98.04469273743017 L 562.5510204081633 49.022346368715084 Z'),
								_Utils_Tuple2(7, 'M 117.04081632653062 79.18994413407822 L 117.04081632653062 128.2122905027933 L 120.81632653061224 158.37988826815644 L 151.0204081632653 165.9217877094972 L 147.24489795918367 214.9441340782123 L 113.26530612244898 218.7150837988827 L 117.04081632653062 260.195530726257 L 151.0204081632653 260.195530726257 L 173.6734693877551 248.88268156424581 L 179.33673469387753 246.99720670391062 L 177.44897959183675 252.6536312849162 L 132.14285714285714 271.50837988826817 L 105.71428571428571 297.90502793296093 L 103.8265306122449 303.5614525139665 L 103.8265306122449 303.5614525139665 L 101.93877551020408 297.90502793296093 L 86.83673469387755 271.50837988826817 L 86.83673469387755 230.02793296089388 L 67.95918367346938 211.1731843575419 L 22.653061224489797 214.9441340782123 L 0 226.25698324022346 L 0 207.40223463687153 L 0 158.37988826815644 L 49.08163265306123 158.37988826815644 L 86.83673469387755 158.37988826815644 L 86.83673469387755 131.9832402234637 L 86.83673469387755 82.9608938547486 Z'),
								_Utils_Tuple2(8, 'M 379.4387755102041 179.1201117318436 L 385.1020408163265 177.2346368715084 L 434.18367346938777 177.2346368715084 L 460.61224489795916 203.63128491620114 L 460.61224489795916 252.6536312849162 L 466.99307161224493 299.9546810941105 L 470.5456232187428 304.0216067788462 L 468.7908207900188 310.5953516622716 L 453.9719018246774 303.09095931640593 L 417.7784506498763 292.97487161765906 L 370.95479200056667 279.69758083616097 L 400.77557914588687 280.8387329796243 L 446.03238445263895 294.334027745332 L 452.1192561515952 296.2493176754069 L 445.577904664765 260.1038186859557 L 456.83673469387753 256.4245810055866 L 456.83673469387753 207.40223463687153 L 434.18367346938777 184.77653631284917 L 385.1020408163265 181.0055865921788 L 379.4387755102041 179.1201117318436 Z'),
								_Utils_Tuple2(9, 'M 373.7755102040816 181.0055865921788 L 379.4387755102041 179.1201117318436 L 377.55102040816325 184.77653631284917 L 366.2244897959184 207.40223463687153 L 366.10029505561334 255.8007557768025 L 365.5600523231032 279.67978314593137 L 316.97996409449 287.890246419624 L 271.41886277262887 302.71380458713725 L 272.0850784184331 299.23271771682056 L 275.61224489795916 252.6536312849162 L 271.83673469387753 214.9441340782123 L 290.7142857142857 192.31843575418995 L 313.3673469387755 188.54748603351956 L 358.6734693877551 184.77653631284917 L 366.2244897959184 192.31843575418995 Z M 317.14285714285717 192.31843575418995 L 294.48979591836735 196.08938547486034 L 275.61224489795916 218.7150837988827 L 283.16326530612247 256.4245810055866 L 331.1765696614194 253.14376687912193 L 354.3054086007875 251.40201508263786 L 354.80423078619293 240.43627333132966 L 354.8979591836735 192.31843575418995 Z'),
								_Utils_Tuple2(10, 'M 379.4387755102041 179.1201117318436 L 379.4387755102041 179.1201117318436 L 385.1020408163265 181.0055865921788 L 434.18367346938777 184.77653631284917 L 456.83673469387753 207.40223463687153 L 456.83673469387753 256.4245810055866 L 445.577904664765 260.1038186859557 L 452.1192561515952 296.2493176754069 L 446.03238445263895 294.334027745332 L 400.77557914588687 280.8387329796243 L 370.95479200056667 279.69758083616097 L 365.5600523231032 279.67978314593137 L 366.10029505561334 255.8007557768025 L 366.2244897959184 207.40223463687153 L 377.55102040816325 184.77653631284917 Z'),
								_Utils_Tuple2(11, 'M 740 184.77653631284917 L 740 188.54748603351956 L 698.469387755102 192.31843575418995 L 675.8163265306123 196.08938547486034 L 656.9387755102041 218.7150837988827 L 664.4897959183673 256.4245810055866 L 713.5714285714286 256.4245810055866 L 740 256.4245810055866 L 740 305.4469273743017 L 698.469387755102 305.4469273743017 L 649.3877551020408 301.6759776536313 L 656.9387755102041 301.6759776536313 L 656.9387755102041 263.9664804469274 L 653.1632653061224 214.9441340782123 L 672.0408163265306 192.31843575418995 L 694.6938775510204 188.54748603351956 Z'),
								_Utils_Tuple2(12, 'M 354.8979591836735 192.31843575418995 L 354.80423078619293 240.43627333132966 L 354.3054086007875 251.40201508263786 L 331.1765696614194 253.14376687912193 L 283.16326530612247 256.4245810055866 L 275.61224489795916 218.7150837988827 L 294.48979591836735 196.08938547486034 L 317.14285714285717 192.31843575418995 Z'),
								_Utils_Tuple2(13, 'M 740 188.54748603351956 L 740 237.56983240223465 L 740 256.4245810055866 L 713.5714285714286 256.4245810055866 L 664.4897959183673 256.4245810055866 L 656.9387755102041 218.7150837988827 L 675.8163265306123 196.08938547486034 L 698.469387755102 192.31843575418995 Z'),
								_Utils_Tuple2(14, 'M 67.95918367346938 211.1731843575419 L 86.83673469387755 230.02793296089388 L 86.83673469387755 271.50837988826817 L 101.93877551020408 297.90502793296093 L 103.8265306122449 303.5614525139665 L 98.16326530612245 301.6759776536313 L 49.08163265306123 305.4469273743017 L 0 305.4469273743017 L 0 275.27932960893855 L 0 226.25698324022346 L 22.653061224489797 214.9441340782123 Z M 26.428571428571427 218.7150837988827 L 15.10204081632653 230.02793296089388 L 18.877551020408163 252.6536312849162 L 67.95918367346938 256.4245810055866 L 79.28571428571429 256.4245810055866 L 83.06122448979592 233.79888268156427 L 71.73469387755102 218.7150837988827 Z'),
								_Utils_Tuple2(15, 'M 71.73469387755102 218.7150837988827 L 83.06122448979592 233.79888268156427 L 79.28571428571429 256.4245810055866 L 67.95918367346938 256.4245810055866 L 18.877551020408163 252.6536312849162 L 15.10204081632653 230.02793296089388 L 26.428571428571427 218.7150837988827 Z'),
								_Utils_Tuple2(16, 'M 179.33673469387753 246.99720670391062 L 179.33673469387753 246.99720670391062 L 181.22448979591837 252.6536312849162 L 181.22448979591837 301.6759776536313 L 181.22448979591837 316.75977653631287 L 158.57142857142858 328.07262569832403 L 154.79591836734693 331.8435754189944 L 117.04081632653062 320.53072625698326 L 109.48979591836735 305.4469273743017 L 103.8265306122449 303.5614525139665 L 103.8265306122449 303.5614525139665 L 105.71428571428571 297.90502793296093 L 132.14285714285714 271.50837988826817 L 177.44897959183675 252.6536312849162 Z'),
								_Utils_Tuple2(17, 'M 179.33673469387753 246.99720670391062 L 185 248.88268156424581 L 188.77551020408163 271.50837988826817 L 237.85714285714286 279.05027932960894 L 241.6326530612245 305.4469273743017 L 249.17124805690992 305.4406327637114 L 254.3612515745041 307.0821413509014 L 254.3612515745041 307.0821413509014 L 249.10266280216172 309.17941483779333 L 234.08163265306123 324.30167597765364 L 211.42857142857142 331.8435754189944 L 181.22448979591837 316.75977653631287 L 181.22448979591837 301.6759776536313 L 181.22448979591837 252.6536312849162 Z'),
								_Utils_Tuple2(18, 'M 556.8877551020408 246.99720670391062 L 556.8877551020408 246.99720670391062 L 558.7755102040817 252.6536312849162 L 558.7755102040817 301.6759776536313 L 558.7755102040817 316.75977653631287 L 543.6734693877551 324.30167597765364 L 536.1224489795918 331.8435754189944 L 502.14285714285717 320.53072625698326 L 490.81632653061223 309.2178770949721 L 485.24825484441874 307.28522019964606 L 485.24825484441874 307.28522019964606 L 490.81632653061223 305.4469273743017 L 494.59183673469386 286.5921787709497 L 502.14285714285717 279.05027932960894 L 551.2244897959183 275.27932960893855 L 555 252.6536312849162 Z'),
								_Utils_Tuple2(19, 'M 556.8877551020408 246.99720670391062 L 562.5510204081633 248.88268156424581 L 566.3265306122449 271.50837988826817 L 615.4081632653061 275.27932960893855 L 622.9591836734694 301.6759776536313 L 630.5102040816327 301.6759776536313 L 636.1734693877552 303.5614525139665 L 636.1734693877552 303.5614525139665 L 630.5102040816327 305.4469273743017 L 611.6326530612245 324.30167597765364 L 592.7551020408163 331.8435754189944 L 581.4285714285714 324.30167597765364 L 558.7755102040817 316.75977653631287 L 558.7755102040817 301.6759776536313 L 558.7755102040817 252.6536312849162 Z'),
								_Utils_Tuple2(20, 'M 98.16326530612245 301.6759776536313 L 103.8265306122449 303.5614525139665 L 103.8265306122449 303.5614525139665 L 101.93877551020408 309.2178770949721 L 128.3673469387755 335.6145251396648 L 117.04081632653062 373.32402234636874 L 109.48979591836735 392.1787709497207 L 113.26530612244898 437.4301675977654 L 86.83673469387755 478.9106145251397 L 60.40816326530612 509.0782122905028 L 15.10204081632653 520.391061452514 L 0 520.391061452514 L 0 516.6201117318436 L 11.326530612244898 516.6201117318436 L 56.63265306122449 505.3072625698324 L 75.51020408163265 486.45251396648047 L 101.93877551020408 444.97206703910615 L 109.48979591836735 411.03351955307267 L 105.71428571428571 362.0111731843576 L 98.16326530612245 354.4692737430168 L 49.08163265306123 350.6983240223464 L 0 350.6983240223464 L 0 305.4469273743017 L 49.08163265306123 305.4469273743017 Z'),
								_Utils_Tuple2(21, 'M 636.1734693877552 303.5614525139665 L 641.8367346938776 301.6759776536313 L 649.3877551020408 301.6759776536313 L 698.469387755102 305.4469273743017 L 740 305.4469273743017 L 740 350.6983240223464 L 717.3469387755102 350.6983240223464 L 668.2653061224489 354.4692737430168 L 634.2857142857143 358.2402234636872 L 630.5102040816327 384.6368715083799 L 630.5102040816327 380.8659217877095 L 619.1836734693877 365.78212290502796 L 611.6326530612245 335.6145251396648 L 638.0612244897959 309.2178770949721 L 636.1734693877552 303.5614525139665 Z'),
								_Utils_Tuple2(22, 'M 103.8265306122449 303.5614525139665 L 103.8265306122449 303.5614525139665 L 109.48979591836735 305.4469273743017 L 117.04081632653062 320.53072625698326 L 154.79591836734693 331.8435754189944 L 158.57142857142858 328.07262569832403 L 181.22448979591837 316.75977653631287 L 211.42857142857142 331.8435754189944 L 234.08163265306123 324.30167597765364 L 249.10266280216172 309.17941483779333 L 254.3612515745041 307.0821413509014 L 254.3612515745041 307.0821413509014 L 255.54956684476193 312.42817579926646 L 230.30612244897958 335.6145251396648 L 234.08163265306123 346.92737430167597 L 262.280641517762 345.0764528137675 L 265.04444801498903 391.03376137783556 L 283.75192625414604 415.98171873929243 L 315.83236088845007 432.06673266530595 L 342.13803622259104 426.12258293496484 L 352.53253024457416 425.8555235011593 L 350.30163470003936 431.1984886332128 L 351.2967007410499 457.55002711945343 L 326.0559697006396 469.8646529664242 L 294.0435314480354 468.21947646739204 L 298.265306122449 512.8491620111732 L 328.46938775510205 512.8491620111732 L 354.8703713544579 494.2699133724552 L 360.55347134579387 496.02023576902366 L 360.55347134579387 496.02023576902366 L 354.8964645458016 497.7807304405689 L 332.2448979591837 516.6201117318436 L 309.59183673469386 520.391061452514 L 286.9387755102041 550.5586592178771 L 285.05102040816325 556.2150837988827 L 285.05102040816325 556.2150837988827 L 283.16326530612247 550.5586592178771 L 275.61224489795916 535.4748603351956 L 260.51020408163265 512.8491620111732 L 268.0612244897959 478.9106145251397 L 245.40816326530611 460.05586592178776 L 207.6530612244898 463.82681564245814 L 162.3469387755102 482.6815642458101 L 135.91836734693877 490.22346368715085 L 98.16326530612245 509.0782122905028 L 60.40816326530612 531.7039106145252 L 30.20408163265306 565.6424581005587 L 0 580.7262569832402 L 0 569.413407821229 L 0 520.391061452514 L 15.10204081632653 520.391061452514 L 60.40816326530612 509.0782122905028 L 86.83673469387755 478.9106145251397 L 113.26530612244898 437.4301675977654 L 109.48979591836735 392.1787709497207 L 117.04081632653062 373.32402234636874 L 128.3673469387755 335.6145251396648 L 101.93877551020408 309.2178770949721 Z M 188.77551020408163 365.78212290502796 L 192.55102040816325 407.2625698324023 L 230.30612244897958 407.2625698324023 L 230.30612244897958 365.78212290502796 L 211.42857142857142 365.78212290502796 L 211.42857142857142 377.0949720670391 L 207.6530612244898 365.78212290502796 Z'),
								_Utils_Tuple2(23, 'M 254.3612515745041 307.0821413509014 L 259.3853530467081 304.8169629060441 L 271.41886277262887 302.71380458713725 L 316.97996409449 287.890246419624 L 365.5600523231032 279.67978314593137 L 341.7988600140549 289.46734709923624 L 331.5984176850453 316.9596165676887 L 363.7148133162045 316.8704939223886 L 362.2258357577031 339.52320220194616 L 382.8284463495581 345.82866265248265 L 382.8284463495581 345.82866265248265 L 361.432128362942 351.2310801620256 L 353.8472701948489 374.28067654679955 L 353.8472701948489 374.28067654679955 L 347.997367894334 352.5460847328631 L 354.04389668384243 317.61903972174434 L 312.5386825192986 328.83307959256047 L 270.76377227461217 347.73523851759035 L 270.2140161601001 396.26092824675925 L 298.94853877634097 422.26904778693864 L 340.6419228036414 421.71444669108143 L 352.53253024457416 425.8555235011593 L 352.53253024457416 425.8555235011593 L 342.13803622259104 426.12258293496484 L 315.83236088845007 432.06673266530595 L 283.75192625414604 415.98171873929243 L 265.04444801498903 391.03376137783556 L 262.280641517762 345.0764528137675 L 234.08163265306123 346.92737430167597 L 230.30612244897958 335.6145251396648 L 255.54956684476193 312.42817579926646 L 254.3612515745041 307.0821413509014 Z'),
								_Utils_Tuple2(24, 'M 365.5600523231032 279.67978314593137 L 370.95479200056667 279.69758083616097 L 402.73775863180765 297.24269434931074 L 413.4130352552521 325.33311381177185 L 383.17523909958004 317.83266647558185 L 386.09846182623613 331.8153137125086 L 382.8284463495581 345.82866265248265 L 382.8284463495581 345.82866265248265 L 362.2258357577031 339.52320220194616 L 363.7148133162045 316.8704939223886 L 331.5984176850453 316.9596165676887 L 341.7988600140549 289.46734709923624 Z'),
								_Utils_Tuple2(25, 'M 370.95479200056667 279.69758083616097 L 417.7784506498763 292.97487161765906 L 453.9719018246774 303.09095931640593 L 468.7908207900188 310.5953516622716 L 470.5456232187428 304.0216067788462 L 479.9937729873428 305.17596882548776 L 485.24825484441874 307.28522019964606 L 485.24825484441874 307.28522019964606 L 483.78148316242766 312.7540857069702 L 509.6938775510204 335.6145251396648 L 502.14285714285717 365.78212290502796 L 483.80449904547885 373.6257464753185 L 465.40253331649575 411.2781322786027 L 441.825882953994 416.57296639370537 L 419.875187448448 414.0081356957239 L 413.1204201950453 406.621056136088 L 399.7876123914162 410.7068336078292 L 401.8274219742217 404.11200925146477 L 393.63013177497544 406.1398166474213 L 395.622281479132 398.52966715964914 L 385.8516164252829 400.4317720796681 L 390.3447644097988 366.56210018577747 L 382.8284463495581 345.82866265248265 L 382.8284463495581 345.82866265248265 L 386.09846182623613 331.8153137125086 L 383.17523909958004 317.83266647558185 L 413.4130352552521 325.33311381177185 L 402.73775863180765 297.24269434931074 Z M 393.9113392898043 325.9271264981885 L 400.17437575359736 366.4358012983924 L 397.66342760441233 389.4216775177356 L 405.90558666600356 387.5155292466801 L 403.9309559439866 396.43638368162067 L 410.9740035621239 394.40829847294646 L 408.944268886676 402.00965645958377 L 420.5319371427064 398.0847928930519 L 426.2879757465159 406.8321906658876 L 443.1523282144667 412.32754579824353 L 469.2664146109819 402.90966708845855 L 481.3454208628716 357.860962860615 L 462.9684356803696 347.37302545945334 L 428.235772153355 330.8726764513776 Z'),
								_Utils_Tuple2(26, 'M 630.5102040816327 305.4469273743017 L 636.1734693877552 303.5614525139665 L 636.1734693877552 303.5614525139665 L 638.0612244897959 309.2178770949721 L 611.6326530612245 335.6145251396648 L 619.1836734693877 365.78212290502796 L 630.5102040816327 380.8659217877095 L 630.5102040816327 384.6368715083799 L 615.4081632653061 365.78212290502796 L 566.3265306122449 365.78212290502796 L 566.3265306122449 414.80446927374305 L 570.1020408163265 448.74301675977654 L 588.9795918367347 456.28491620111737 L 619.1836734693877 493.99441340782124 L 645.6122448979592 520.391061452514 L 690.9183673469388 531.7039106145252 L 740 531.7039106145252 L 740 580.7262569832402 L 740 625.977653631285 L 721.1224489795918 595.8100558659219 L 679.5918367346939 569.413407821229 L 653.1632653061224 546.7877094972067 L 626.734693877551 520.391061452514 L 596.530612244898 505.3072625698324 L 551.2244897959183 486.45251396648047 L 509.6938775510204 460.05586592178776 L 464.3877551020408 467.59776536312853 L 453.0612244897959 475.1396648044693 L 456.83673469387753 516.6201117318436 L 437.9591836734694 546.7877094972067 L 436.07142857142856 552.4441340782123 L 436.07142857142856 552.4441340782123 L 430.40816326530614 550.5586592178771 L 415.3061224489796 524.1620111731844 L 392.6530612244898 512.8491620111732 L 362.44897959183675 501.536312849162 L 360.55347134579387 496.02023576902366 L 366.2240614058637 497.8022236521068 L 396.42857142857144 509.0782122905028 L 426.63265306122446 509.0782122905028 L 426.63265306122446 497.76536312849163 L 429.5983585000086 450.4639473588601 L 423.39337181959854 449.6665862727224 L 375.74285052161446 455.9948406981095 L 384.3086388105716 407.84030621614363 L 374.0553728992114 408.8762661763247 L 375.5492182007836 392.8411910238717 L 362.3272419658866 392.9862934375794 L 353.8472701948489 374.28067654679955 L 376.5902498391477 381.5605350196747 L 377.4968669287843 366.7336635577546 L 382.8284463495581 345.82866265248265 L 382.8284463495581 345.82866265248265 L 390.3447644097988 366.56210018577747 L 385.8516164252829 400.4317720796681 L 395.622281479132 398.52966715964914 L 393.63013177497544 406.1398166474213 L 401.8274219742217 404.11200925146477 L 399.7876123914162 410.7068336078292 L 413.1204201950453 406.621056136088 L 419.875187448448 414.0081356957239 L 441.825882953994 416.57296639370537 L 465.40253331649575 411.2781322786027 L 483.80449904547885 373.6257464753185 L 502.14285714285717 365.78212290502796 L 509.6938775510204 335.6145251396648 L 483.78148316242766 312.7540857069702 L 485.24825484441874 307.28522019964606 L 485.24825484441874 307.28522019964606 L 490.81632653061223 309.2178770949721 L 502.14285714285717 320.53072625698326 L 536.1224489795918 331.8435754189944 L 543.6734693877551 324.30167597765364 L 558.7755102040817 316.75977653631287 L 581.4285714285714 324.30167597765364 L 592.7551020408163 331.8435754189944 L 611.6326530612245 324.30167597765364 Z'),
								_Utils_Tuple2(27, 'M 312.5386825192986 328.83307959256047 L 354.04389668384243 317.61903972174434 L 347.997367894334 352.5460847328631 L 353.8472701948489 374.28067654679955 L 353.8472701948489 374.28067654679955 L 349.9437027674217 391.69401258504007 L 355.209341515485 419.5458119302598 L 352.53253024457416 425.8555235011593 L 352.53253024457416 425.8555235011593 L 340.6419228036414 421.71444669108143 L 298.94853877634097 422.26904778693864 L 270.2140161601001 396.26092824675925 L 270.76377227461217 347.73523851759035 Z'),
								_Utils_Tuple2(28, 'M 428.235772153355 330.8726764513776 L 462.9684356803696 347.37302545945334 L 481.3454208628716 357.860962860615 L 469.2664146109819 402.90966708845855 L 443.1523282144667 412.32754579824353 L 426.2879757465159 406.8321906658876 L 420.5319371427064 398.0847928930519 L 408.944268886676 402.00965645958377 L 410.9740035621239 394.40829847294646 L 403.9309559439866 396.43638368162067 L 405.90558666600356 387.5155292466801 L 397.66342760441233 389.4216775177356 L 400.17437575359736 366.4358012983924 L 393.9113392898043 325.9271264981885 Z'),
								_Utils_Tuple2(29, 'M 0 350.6983240223464 L 49.08163265306123 350.6983240223464 L 98.16326530612245 354.4692737430168 L 105.71428571428571 362.0111731843576 L 109.48979591836735 411.03351955307267 L 101.93877551020408 444.97206703910615 L 75.51020408163265 486.45251396648047 L 56.63265306122449 505.3072625698324 L 11.326530612244898 516.6201117318436 L 0 516.6201117318436 L 0 497.76536312849163 L 0 448.74301675977654 L 0 399.72067039106145 Z'),
								_Utils_Tuple2(30, 'M 717.3469387755102 350.6983240223464 L 740 350.6983240223464 L 740 399.72067039106145 L 740 448.74301675977654 L 740 490.22346368715085 L 732.4489795918367 490.22346368715085 L 687.1428571428571 478.9106145251397 L 664.4897959183673 460.05586592178776 L 634.2857142857143 422.3463687150838 L 630.5102040816327 384.6368715083799 L 634.2857142857143 358.2402234636872 L 668.2653061224489 354.4692737430168 Z'),
								_Utils_Tuple2(31, 'M 207.6530612244898 365.78212290502796 L 211.42857142857142 377.0949720670391 L 211.42857142857142 365.78212290502796 L 230.30612244897958 365.78212290502796 L 230.30612244897958 407.2625698324023 L 192.55102040816325 407.2625698324023 L 188.77551020408163 365.78212290502796 Z'),
								_Utils_Tuple2(32, 'M 361.432128362942 351.2310801620256 L 382.8284463495581 345.82866265248265 L 377.4968669287843 366.7336635577546 L 376.5902498391477 381.5605350196747 L 353.8472701948489 374.28067654679955 L 353.8472701948489 374.28067654679955 Z'),
								_Utils_Tuple2(33, 'M 615.4081632653061 365.78212290502796 L 630.5102040816327 384.6368715083799 L 634.2857142857143 422.3463687150838 L 664.4897959183673 460.05586592178776 L 687.1428571428571 478.9106145251397 L 732.4489795918367 490.22346368715085 L 740 490.22346368715085 L 740 531.7039106145252 L 690.9183673469388 531.7039106145252 L 645.6122448979592 520.391061452514 L 619.1836734693877 493.99441340782124 L 588.9795918367347 456.28491620111737 L 570.1020408163265 448.74301675977654 L 566.3265306122449 414.80446927374305 L 566.3265306122449 365.78212290502796 Z'),
								_Utils_Tuple2(34, 'M 353.8472701948489 374.28067654679955 L 353.8472701948489 374.28067654679955 L 362.3272419658866 392.9862934375794 L 375.5492182007836 392.8411910238717 L 374.0553728992114 408.8762661763247 L 384.3086388105716 407.84030621614363 L 375.74285052161446 455.9948406981095 L 423.39337181959854 449.6665862727224 L 429.5983585000086 450.4639473588601 L 426.63265306122446 497.76536312849163 L 426.63265306122446 509.0782122905028 L 396.42857142857144 509.0782122905028 L 366.2240614058637 497.8022236521068 L 360.55347134579387 496.02023576902366 L 360.55347134579387 496.02023576902366 L 360.55347134579387 496.02023576902366 L 354.8703713544579 494.2699133724552 L 328.46938775510205 512.8491620111732 L 298.265306122449 512.8491620111732 L 294.0435314480354 468.21947646739204 L 326.0559697006396 469.8646529664242 L 351.2967007410499 457.55002711945343 L 350.30163470003936 431.1984886332128 L 352.53253024457416 425.8555235011593 L 352.53253024457416 425.8555235011593 L 352.53253024457416 425.8555235011593 L 355.209341515485 419.5458119302598 L 349.9437027674217 391.69401258504007 Z'),
								_Utils_Tuple2(35, 'M 245.40816326530611 460.05586592178776 L 268.0612244897959 478.9106145251397 L 260.51020408163265 512.8491620111732 L 275.61224489795916 535.4748603351956 L 283.16326530612247 550.5586592178771 L 285.05102040816325 556.2150837988827 L 279.38775510204084 554.3296089385475 L 237.85714285714286 558.1005586592179 L 188.77551020408163 558.1005586592179 L 139.69387755102042 558.1005586592179 L 90.61224489795919 558.1005586592179 L 41.53061224489796 561.8715083798883 L 0 584.4972067039106 L 0 580.7262569832402 L 30.20408163265306 565.6424581005587 L 60.40816326530612 531.7039106145252 L 98.16326530612245 509.0782122905028 L 135.91836734693877 490.22346368715085 L 162.3469387755102 482.6815642458101 L 207.6530612244898 463.82681564245814 Z M 211.42857142857142 467.59776536312853 L 196.3265306122449 482.6815642458101 L 200.10204081632654 505.3072625698324 L 249.18367346938774 505.3072625698324 L 264.2857142857143 490.22346368715085 L 252.9591836734694 467.59776536312853 Z'),
								_Utils_Tuple2(36, 'M 509.6938775510204 460.05586592178776 L 551.2244897959183 486.45251396648047 L 596.530612244898 505.3072625698324 L 626.734693877551 520.391061452514 L 653.1632653061224 546.7877094972067 L 679.5918367346939 569.413407821229 L 721.1224489795918 595.8100558659219 L 740 625.977653631285 L 740 629.7486033519554 L 721.1224489795918 610.8938547486034 L 690.9183673469388 580.7262569832402 L 649.3877551020408 565.6424581005587 L 600.3061224489796 565.6424581005587 L 551.2244897959183 565.6424581005587 L 502.14285714285717 565.6424581005587 L 471.9387755102041 558.1005586592179 L 441.734693877551 550.5586592178771 L 436.07142857142856 552.4441340782123 L 437.9591836734694 546.7877094972067 L 456.83673469387753 516.6201117318436 L 453.0612244897959 475.1396648044693 L 464.3877551020408 467.59776536312853 Z M 468.16326530612247 471.3687150837989 L 456.83673469387753 482.6815642458101 L 468.16326530612247 505.3072625698324 L 517.2448979591836 505.3072625698324 L 528.5714285714286 505.3072625698324 L 528.5714285714286 486.45251396648047 L 513.469387755102 467.59776536312853 Z'),
								_Utils_Tuple2(37, 'M 252.9591836734694 467.59776536312853 L 264.2857142857143 490.22346368715085 L 249.18367346938774 505.3072625698324 L 200.10204081632654 505.3072625698324 L 196.3265306122449 482.6815642458101 L 211.42857142857142 467.59776536312853 Z'),
								_Utils_Tuple2(38, 'M 513.469387755102 467.59776536312853 L 528.5714285714286 486.45251396648047 L 528.5714285714286 505.3072625698324 L 517.2448979591836 505.3072625698324 L 468.16326530612247 505.3072625698324 L 456.83673469387753 482.6815642458101 L 468.16326530612247 471.3687150837989 Z'),
								_Utils_Tuple2(39, 'M 354.8964645458016 497.7807304405689 L 360.55347134579387 496.02023576902366 L 358.6734693877551 501.536312849162 L 358.6734693877551 550.5586592178771 L 358.6734693877551 565.6424581005587 L 324.6938775510204 576.9553072625698 L 286.9387755102041 561.8715083798883 L 285.05102040816325 556.2150837988827 L 285.05102040816325 556.2150837988827 L 286.9387755102041 550.5586592178771 L 309.59183673469386 520.391061452514 L 332.2448979591837 516.6201117318436 Z'),
								_Utils_Tuple2(40, 'M 360.55347134579387 496.02023576902366 L 360.55347134579387 496.02023576902366 L 362.44897959183675 501.536312849162 L 392.6530612244898 512.8491620111732 L 415.3061224489796 524.1620111731844 L 430.40816326530614 550.5586592178771 L 436.07142857142856 552.4441340782123 L 436.07142857142856 552.4441340782123 L 430.40816326530614 554.3296089385475 L 426.63265306122446 569.413407821229 L 396.42857142857144 580.7262569832402 L 358.6734693877551 565.6424581005587 L 358.6734693877551 550.5586592178771 L 358.6734693877551 501.536312849162 Z'),
								_Utils_Tuple2(41, 'M 436.07142857142856 552.4441340782123 L 441.734693877551 550.5586592178771 L 471.9387755102041 558.1005586592179 L 502.14285714285717 565.6424581005587 L 551.2244897959183 565.6424581005587 L 600.3061224489796 565.6424581005587 L 649.3877551020408 565.6424581005587 L 690.9183673469388 580.7262569832402 L 721.1224489795918 610.8938547486034 L 740 629.7486033519554 L 740 675 L 728.6734693877551 675 L 679.5918367346939 675 L 630.5102040816327 675 L 581.4285714285714 675 L 581.4285714285714 648.6033519553073 L 570.1020408163265 603.3519553072626 L 521.0204081632653 599.5810055865923 L 471.9387755102041 603.3519553072626 L 434.18367346938777 607.122905027933 L 430.40816326530614 637.2905027932961 L 419.0816326530612 614.6648044692738 L 411.53061224489795 588.268156424581 L 437.9591836734694 558.1005586592179 L 436.07142857142856 552.4441340782123 Z'),
								_Utils_Tuple2(42, 'M 279.38775510204084 554.3296089385475 L 285.05102040816325 556.2150837988827 L 285.05102040816325 556.2150837988827 L 283.16326530612247 561.8715083798883 L 309.59183673469386 588.268156424581 L 294.48979591836735 629.7486033519554 L 294.48979591836735 675 L 290.7142857142857 675 L 286.9387755102041 656.1452513966481 L 286.9387755102041 607.122905027933 L 275.61224489795916 603.3519553072626 L 226.53061224489795 603.3519553072626 L 177.44897959183675 607.122905027933 L 158.57142857142858 618.4357541899442 L 151.0204081632653 663.6871508379888 L 151.0204081632653 675 L 147.24489795918367 675 L 98.16326530612245 675 L 49.08163265306123 675 L 0 675 L 0 633.5195530726257 L 0 584.4972067039106 L 41.53061224489796 561.8715083798883 L 90.61224489795919 558.1005586592179 L 139.69387755102042 558.1005586592179 L 188.77551020408163 558.1005586592179 L 237.85714285714286 558.1005586592179 Z'),
								_Utils_Tuple2(43, 'M 430.40816326530614 554.3296089385475 L 436.07142857142856 552.4441340782123 L 436.07142857142856 552.4441340782123 L 437.9591836734694 558.1005586592179 L 411.53061224489795 588.268156424581 L 419.0816326530612 614.6648044692738 L 430.40816326530614 637.2905027932961 L 415.3061224489796 614.6648044692738 L 377.55102040816325 614.6648044692738 L 366.2244897959184 618.4357541899442 L 366.2244897959184 667.4581005586592 L 366.2244897959184 675 L 343.57142857142856 675 L 294.48979591836735 675 L 294.48979591836735 629.7486033519554 L 309.59183673469386 588.268156424581 L 283.16326530612247 561.8715083798883 L 285.05102040816325 556.2150837988827 L 285.05102040816325 556.2150837988827 L 286.9387755102041 561.8715083798883 L 324.6938775510204 576.9553072625698 L 358.6734693877551 565.6424581005587 L 396.42857142857144 580.7262569832402 L 426.63265306122446 569.413407821229 Z'),
								_Utils_Tuple2(44, 'M 521.0204081632653 599.5810055865923 L 570.1020408163265 603.3519553072626 L 581.4285714285714 648.6033519553073 L 581.4285714285714 675 L 532.3469387755102 675 L 483.265306122449 675 L 434.18367346938777 675 L 430.40816326530614 637.2905027932961 L 434.18367346938777 607.122905027933 L 471.9387755102041 603.3519553072626 Z'),
								_Utils_Tuple2(45, 'M 226.53061224489795 603.3519553072626 L 275.61224489795916 603.3519553072626 L 286.9387755102041 607.122905027933 L 286.9387755102041 656.1452513966481 L 290.7142857142857 675 L 249.18367346938774 675 L 200.10204081632654 675 L 151.0204081632653 675 L 151.0204081632653 663.6871508379888 L 158.57142857142858 618.4357541899442 L 177.44897959183675 607.122905027933 Z'),
								_Utils_Tuple2(46, 'M 415.3061224489796 614.6648044692738 L 430.40816326530614 637.2905027932961 L 434.18367346938777 675 L 415.3061224489796 675 L 366.2244897959184 675 L 366.2244897959184 667.4581005586592 L 366.2244897959184 618.4357541899442 L 377.55102040816325 614.6648044692738 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 32888.06863527534,
							q: -1,
							r: {b: 54.744897959183675, a: 54.67877094972067},
							c: 0,
							z: _List_fromArray(
								[1, 7]),
							a4: _List_Nil,
							u: {b: 54.744897959183675, a: 54.67877094972067}
						},
							{
							bF: 31877.223235662976,
							q: -1,
							r: {b: 228.41836734693877, a: 160.26536312849163},
							c: 1,
							z: _List_fromArray(
								[0, 2, 7]),
							a4: _List_Nil,
							u: {b: 228.41836734693877, a: 160.26536312849163}
						},
							{
							bF: 9133.667061097132,
							q: -1,
							r: {b: 251.07142857142858, a: 265.8519553072626},
							c: 2,
							z: _List_fromArray(
								[1, 3, 9, 17, 23]),
							a4: _List_Nil,
							u: {b: 251.07142857142858, a: 265.8519553072626}
						},
							{
							bF: 5662.8698267016225,
							q: -1,
							r: {b: 375.66326530612247, a: 16.96927374301676},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 375.66326530612247, a: 16.96927374301676}
						},
							{
							bF: 39286.45874487811,
							q: -1,
							r: {b: 473.8265306122449, a: 81.07541899441341},
							c: 4,
							z: _List_fromArray(
								[3, 5, 8, 18, 25]),
							a4: _List_Nil,
							u: {b: 473.8265306122449, a: 81.07541899441341}
						},
							{
							bF: 6858.7995952571055,
							q: -1,
							r: {b: 590.8673469387755, a: 194.20391061452514},
							c: 5,
							z: _List_fromArray(
								[4, 6]),
							a4: _List_Nil,
							u: {b: 590.8673469387755, a: 194.20391061452514}
						},
							{
							bF: 37657.55045034776,
							q: -1,
							r: {b: 651.2755102040817, a: 88.6173184357542},
							c: 6,
							z: _List_fromArray(
								[5, 11, 19, 21]),
							a4: _List_Nil,
							u: {b: 651.2755102040817, a: 88.6173184357542}
						},
							{
							bF: 13649.972209554222,
							q: -1,
							r: {b: 100.05102040816327, a: 186.66201117318437},
							c: 7,
							z: _List_fromArray(
								[0, 1, 14, 16]),
							a4: _List_Nil,
							u: {b: 100.05102040816327, a: 186.66201117318437}
						},
							{
							bF: 1883.5174262404034,
							q: -1,
							r: {b: 454.94897959183675, a: 265.8519553072626},
							c: 8,
							z: _List_fromArray(
								[4, 10, 25]),
							a4: _List_Nil,
							u: {b: 454.94897959183675, a: 265.8519553072626}
						},
							{
							bF: 4790.448135226779,
							q: -1,
							r: {b: 300.1530612244898, a: 280.93575418994413},
							c: 9,
							z: _List_fromArray(
								[2, 10, 12, 23]),
							a4: _List_Nil,
							u: {b: 300.1530612244898, a: 280.93575418994413}
						},
							{
							bF: 8591.154890548074,
							q: -1,
							r: {b: 409.64285714285717, a: 224.37150837988827},
							c: 10,
							z: _List_fromArray(
								[8, 9, 24]),
							a4: _List_Nil,
							u: {b: 409.64285714285717, a: 224.37150837988827}
						},
							{
							bF: 4662.7023714514,
							q: -1,
							r: {b: 681.4795918367347, a: 280.93575418994413},
							c: 11,
							z: _List_fromArray(
								[6, 13, 21]),
							a4: _List_Nil,
							u: {b: 681.4795918367347, a: 280.93575418994413}
						},
							{
							bF: 4429.092923624641,
							q: -1,
							r: {b: 319.03061224489795, a: 220.60055865921788},
							c: 12,
							z: _List_fromArray(
								[9]),
							a4: _List_Nil,
							u: {b: 319.03061224489795, a: 220.60055865921788}
						},
							{
							bF: 4933.21029529129,
							q: -1,
							r: {b: 700.3571428571429, a: 220.60055865921788},
							c: 13,
							z: _List_fromArray(
								[11]),
							a4: _List_Nil,
							u: {b: 700.3571428571429, a: 220.60055865921788}
						},
							{
							bF: 5702.022289362672,
							q: -1,
							r: {b: 24.540816326530614, a: 280.93575418994413},
							c: 14,
							z: _List_fromArray(
								[7, 15, 20]),
							a4: _List_Nil,
							u: {b: 24.540816326530614, a: 280.93575418994413}
						},
							{
							bF: 2221.012427317295,
							q: -1,
							r: {b: 35.86734693877551, a: 235.68435754189946},
							c: 15,
							z: _List_fromArray(
								[14]),
							a4: _List_Nil,
							u: {b: 35.86734693877551, a: 235.68435754189946}
						},
							{
							bF: 4043.3815984494395,
							q: -1,
							r: {b: 145.35714285714286, a: 296.01955307262574},
							c: 16,
							z: _List_fromArray(
								[7, 17, 22]),
							a4: _List_Nil,
							u: {b: 145.35714285714286, a: 296.01955307262574}
						},
							{
							bF: 3183.613402413881,
							q: -1,
							r: {b: 209.5408163265306, a: 303.5614525139665},
							c: 17,
							z: _List_fromArray(
								[2, 16, 22]),
							a4: _List_Nil,
							u: {b: 209.5408163265306, a: 303.5614525139665}
						},
							{
							bF: 3181.8479347292887,
							q: -1,
							r: {b: 530.4591836734694, a: 303.5614525139665},
							c: 18,
							z: _List_fromArray(
								[4, 19, 26]),
							a4: _List_Nil,
							u: {b: 530.4591836734694, a: 303.5614525139665}
						},
							{
							bF: 3335.0779557632777,
							q: -1,
							r: {b: 587.0918367346939, a: 303.5614525139665},
							c: 19,
							z: _List_fromArray(
								[6, 18, 26]),
							a4: _List_Nil,
							u: {b: 587.0918367346939, a: 303.5614525139665}
						},
							{
							bF: 6915.748631854981,
							q: -1,
							r: {b: 66.07142857142857, a: 329.9581005586592},
							c: 20,
							z: _List_fromArray(
								[14, 22, 29]),
							a4: _List_Nil,
							u: {b: 66.07142857142857, a: 329.9581005586592}
						},
							{
							bF: 6118.46211948464,
							q: -1,
							r: {b: 647.5, a: 326.18715083798884},
							c: 21,
							z: _List_fromArray(
								[6, 11, 26, 30]),
							a4: _List_Nil,
							u: {b: 647.5, a: 326.18715083798884}
						},
							{
							bF: 31831.146683597573,
							q: -1,
							r: {b: 168.01020408163265, a: 431.7737430167598},
							c: 22,
							z: _List_fromArray(
								[16, 17, 20, 23, 31, 34, 35, 39]),
							a4: _List_Nil,
							u: {b: 168.01020408163265, a: 431.7737430167598}
						},
							{
							bF: 5457.544463054524,
							q: -1,
							r: {b: 277.5, a: 329.9581005586592},
							c: 23,
							z: _List_fromArray(
								[2, 9, 22, 24, 27, 32]),
							a4: _List_Nil,
							u: {b: 277.5, a: 329.9581005586592}
						},
							{
							bF: 2776.8007890338995,
							q: -1,
							r: {b: 368.11224489795916, a: 322.41620111731845},
							c: 24,
							z: _List_fromArray(
								[10, 23, 25]),
							a4: _List_Nil,
							u: {b: 368.11224489795916, a: 322.41620111731845}
						},
							{
							bF: 5994.99566678227,
							q: -1,
							r: {b: 470.05102040816325, a: 329.9581005586592},
							c: 25,
							z: _List_fromArray(
								[4, 8, 24, 26, 28]),
							a4: _List_Nil,
							u: {b: 470.05102040816325, a: 329.9581005586592}
						},
							{
							bF: 30022.422537789826,
							q: -1,
							r: {b: 511.5816326530612, a: 409.14804469273747},
							c: 26,
							z: _List_fromArray(
								[18, 19, 21, 25, 32, 33, 34, 36, 40]),
							a4: _List_Nil,
							u: {b: 511.5816326530612, a: 409.14804469273747}
						},
							{
							bF: 7032.305988934051,
							q: -1,
							r: {b: 307.7040816326531, a: 375.20949720670393},
							c: 27,
							z: _List_fromArray(
								[23, 34]),
							a4: _List_Nil,
							u: {b: 307.7040816326531, a: 375.20949720670393}
						},
							{
							bF: 5191.64670651521,
							q: -1,
							r: {b: 432.2959183673469, a: 375.20949720670393},
							c: 28,
							z: _List_fromArray(
								[25]),
							a4: _List_Nil,
							u: {b: 432.2959183673469, a: 375.20949720670393}
						},
							{
							bF: 15219.63003078326,
							q: -1,
							r: {b: 54.744897959183675, a: 405.3770949720671},
							c: 29,
							z: _List_fromArray(
								[20]),
							a4: _List_Nil,
							u: {b: 54.744897959183675, a: 405.3770949720671}
						},
							{
							bF: 12379.296830464009,
							q: -1,
							r: {b: 685.2551020408163, a: 405.3770949720671},
							c: 30,
							z: _List_fromArray(
								[21, 33]),
							a4: _List_Nil,
							u: {b: 685.2551020408163, a: 405.3770949720671}
						},
							{
							bF: 1623.0475430395672,
							q: -1,
							r: {b: 205.76530612244898, a: 390.2932960893855},
							c: 31,
							z: _List_fromArray(
								[22]),
							a4: _List_Nil,
							u: {b: 205.76530612244898, a: 390.2932960893855}
						},
							{
							bF: 625.0822725386606,
							q: -1,
							r: {b: 368.11224489795916, a: 363.89664804469277},
							c: 32,
							z: _List_fromArray(
								[23, 26]),
							a4: _List_Nil,
							u: {b: 368.11224489795916, a: 363.89664804469277}
						},
							{
							bF: 13098.278417512294,
							q: -1,
							r: {b: 605.969387755102, a: 428.0027932960894},
							c: 33,
							z: _List_fromArray(
								[26, 30]),
							a4: _List_Nil,
							u: {b: 605.969387755102, a: 428.0027932960894}
						},
							{
							bF: 8044.7536157168,
							q: -1,
							r: {b: 364.33673469387753, a: 461.94134078212295},
							c: 34,
							z: _List_fromArray(
								[22, 26, 27]),
							a4: _List_Nil,
							u: {b: 364.33673469387753, a: 461.94134078212295}
						},
							{
							bF: 13461.328525823737,
							q: -1,
							r: {b: 164.23469387755102, a: 518.5055865921788},
							c: 35,
							z: _List_fromArray(
								[22, 37, 42]),
							a4: _List_Nil,
							u: {b: 164.23469387755102, a: 518.5055865921788}
						},
							{
							bF: 13646.412894766909,
							q: -1,
							r: {b: 545.5612244897959, a: 526.0474860335196},
							c: 36,
							z: _List_fromArray(
								[26, 38, 41]),
							a4: _List_Nil,
							u: {b: 545.5612244897959, a: 526.0474860335196}
						},
							{
							bF: 2164.063390719406,
							q: -1,
							r: {b: 217.09183673469389, a: 484.5670391061453},
							c: 37,
							z: _List_fromArray(
								[35]),
							a4: _List_Nil,
							u: {b: 217.09183673469389, a: 484.5670391061453}
						},
							{
							bF: 2242.3683160414803,
							q: -1,
							r: {b: 492.7040816326531, a: 484.5670391061453},
							c: 38,
							z: _List_fromArray(
								[36]),
							a4: _List_Nil,
							u: {b: 492.7040816326531, a: 484.5670391061453}
						},
							{
							bF: 3683.409126192928,
							q: -1,
							r: {b: 315.2551020408163, a: 544.9022346368715},
							c: 39,
							z: _List_fromArray(
								[22, 40, 43]),
							a4: _List_Nil,
							u: {b: 315.2551020408163, a: 544.9022346368715}
						},
							{
							bF: 4078.709804612299,
							q: -1,
							r: {b: 390.765306122449, a: 544.9022346368715},
							c: 40,
							z: _List_fromArray(
								[26, 39, 43]),
							a4: _List_Nil,
							u: {b: 390.765306122449, a: 544.9022346368715}
						},
							{
							bF: 22263.513994983456,
							q: -1,
							r: {b: 628.6224489795918, a: 620.3212290502794},
							c: 41,
							z: _List_fromArray(
								[36, 43, 44]),
							a4: _List_Nil,
							u: {b: 628.6224489795918, a: 620.3212290502794}
						},
							{
							bF: 24925.881455934308,
							q: -1,
							r: {b: 58.52040816326531, a: 616.550279329609},
							c: 42,
							z: _List_fromArray(
								[35, 43, 45]),
							a4: _List_Nil,
							u: {b: 58.52040816326531, a: 616.550279329609}
						},
							{
							bF: 9247.099817580674,
							q: -1,
							r: {b: 330.35714285714283, a: 624.0921787709498},
							c: 43,
							z: _List_fromArray(
								[39, 40, 41, 42, 46]),
							a4: _List_Nil,
							u: {b: 330.35714285714283, a: 624.0921787709498}
						},
							{
							bF: 10535.571770607683,
							q: -1,
							r: {b: 473.8265306122449, a: 635.4050279329609},
							c: 44,
							z: _List_fromArray(
								[41, 46]),
							a4: _List_Nil,
							u: {b: 473.8265306122449, a: 635.4050279329609}
						},
							{
							bF: 9197.269410557528,
							q: -1,
							r: {b: 186.8877551020408, a: 639.1759776536313},
							c: 45,
							z: _List_fromArray(
								[42]),
							a4: _List_Nil,
							u: {b: 186.8877551020408, a: 639.1759776536313}
						},
							{
							bF: 3751.517785885313,
							q: -1,
							r: {b: 398.31632653061223, a: 642.9469273743017},
							c: 46,
							z: _List_fromArray(
								[43, 44]),
							a4: _List_Nil,
							u: {b: 398.31632653061223, a: 642.9469273743017}
						}
						]),
					bc: 740
				});
		case '(a & b) | (a & c) | (b & c)':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 730,
							bu: 73,
							k: _List_fromArray(
								[
									{
									ah: {b: 77.38938053097344, a: 77.21153846153847},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 0,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 36, 45]),
									a4: _List_Nil
								},
									{
									ah: {b: 189.95575221238937, a: 236.31410256410257},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2]),
									a4: _List_Nil
								},
									{
									ah: {b: 227.47787610619469, a: 156.76282051282053},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 2,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[1, 3, 29, 34, 37, 46]),
									a4: _List_Nil
								},
									{
									ah: {b: 227.47787610619469, a: 30.416666666666668},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 316.59292035398227, a: 77.21153846153847},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 4,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 5, 6, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 363.49557522123894, a: 30.416666666666668},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4]),
									a4: _List_Nil
								},
									{
									ah: {b: 447.92035398230087, a: 67.8525641025641},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 6,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[4, 7, 18]),
									a4: _List_Nil
								},
									{
									ah: {b: 527.6548672566371, a: 25.73717948717949},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 598.0088495575221, a: 58.493589743589745},
									aa: $elm$core$Maybe$Nothing,
									bl: 'c',
									c: 8,
									bo: $elm$core$Maybe$Just('c'),
									z: _List_fromArray(
										[7, 9, 19]),
									a4: _List_Nil
								},
									{
									ah: {b: 640.221238938053, a: 86.57051282051283},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 10, 11, 23]),
									a4: _List_Nil
								},
									{
									ah: {b: 644.9115044247787, a: 30.416666666666668},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9]),
									a4: _List_Nil
								},
									{
									ah: {b: 734.0265486725664, a: 35.09615384615385},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9, 12, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 776.2389380530973, a: 7.01923076923077},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 13, 24]),
									a4: _List_Nil
								},
									{
									ah: {b: 809.0707964601769, a: 21.05769230769231},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 13,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[12, 14, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 870.0442477876105, a: 25.73717948717949},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[13, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 959.1592920353982, a: 58.493589743589745},
									aa: $elm$core$Maybe$Nothing,
									bl: 'c',
									c: 15,
									bo: $elm$core$Maybe$Just('c'),
									z: _List_fromArray(
										[14, 16, 21, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 1001.3716814159292, a: 86.57051282051283},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 16,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 17, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 1006.0619469026548, a: 30.416666666666668},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 17,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16]),
									a4: _List_Nil
								},
									{
									ah: {b: 485.4424778761062, a: 105.28846153846155},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 18,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 19, 27]),
									a4: _List_Nil
								},
									{
									ah: {b: 546.4159292035398, a: 105.28846153846155},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 19,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 18, 27]),
									a4: _List_Nil
								},
									{
									ah: {b: 851.2831858407079, a: 109.96794871794873},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 20,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[13, 21, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 907.5663716814158, a: 105.28846153846155},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 21,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 20, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 419.77876106194685, a: 133.3653846153846},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 22,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 27, 29, 31]),
									a4: _List_Nil
								},
									{
									ah: {b: 616.7699115044247, a: 133.3653846153846},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 23,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9, 27, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 799.6902654867256, a: 138.0448717948718},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 24,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[12, 25, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 837.2123893805309, a: 208.2371794871795},
									aa: $elm$core$Maybe$Nothing,
									bl: '(b & c)',
									c: 25,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20, 21, 24, 26, 33, 35, 40, 49]),
									a4: _List_Nil
								},
									{
									ah: {b: 968.5398230088495, a: 133.3653846153846},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 26,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 16, 25, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 504.20353982300884, a: 240.99358974358975},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a & c)',
									c: 27,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[18, 19, 22, 23, 32, 35, 41, 44, 47, 48]),
									a4: _List_Nil
								},
									{
									ah: {b: 729.3362831858407, a: 170.80128205128207},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 28,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 23, 24, 35]),
									a4: _List_Nil
								},
									{
									ah: {b: 293.14159292035396, a: 147.40384615384616},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 29,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 1006.0619469026548, a: 203.55769230769232},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 30,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[26, 33]),
									a4: _List_Nil
								},
									{
									ah: {b: 396.32743362831854, a: 194.19871794871796},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 31,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22, 34, 38]),
									a4: _List_Nil
								},
									{
									ah: {b: 551.1061946902655, a: 184.8397435897436},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 32,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27]),
									a4: _List_Nil
								},
									{
									ah: {b: 931.0176991150443, a: 236.31410256410257},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 33,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 335.3539823008849, a: 198.87820512820514},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 34,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 31, 38]),
									a4: _List_Nil
								},
									{
									ah: {b: 724.646017699115, a: 273.75},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 35,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 27, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 21.106194690265486, a: 334.58333333333337},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 36,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 39, 55]),
									a4: _List_Nil
								},
									{
									ah: {b: 283.76106194690266, a: 339.26282051282055},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 37,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 38, 44, 50]),
									a4: _List_Nil
								},
									{
									ah: {b: 335.3539823008849, a: 273.75},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 38,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[31, 34, 37]),
									a4: _List_Nil
								},
									{
									ah: {b: 30.48672566371681, a: 273.75},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 39,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36]),
									a4: _List_Nil
								},
									{
									ah: {b: 893.4955752212389, a: 325.224358974359},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 40,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 42, 54]),
									a4: _List_Nil
								},
									{
									ah: {b: 508.8938053097345, a: 320.5448717948718},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 41,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 43, 52, 53, 56]),
									a4: _List_Nil
								},
									{
									ah: {b: 827.8318584070796, a: 287.78846153846155},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 42,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[40]),
									a4: _List_Nil
								},
									{
									ah: {b: 583.5512937298047, a: 291.7682699572705},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 43,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41]),
									a4: _List_Nil
								},
									{
									ah: {b: 390.83076927789915, a: 277.84550913066886},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 44,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 37]),
									a4: _List_Nil
								},
									{
									ah: {b: 124.29203539823008, a: 357.9807692307692},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 45,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 46, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 189.95575221238937, a: 357.9807692307692},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 46,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 45, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 433.84955752212386, a: 306.5064102564103},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 47,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 663.6725663716813, a: 348.6217948717949},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 48,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 49, 57]),
									a4: _List_Nil
								},
									{
									ah: {b: 729.3362831858407, a: 348.6217948717949},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 49,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 48, 57]),
									a4: _List_Nil
								},
									{
									ah: {b: 321.283185840708, a: 381.37820512820514},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 50,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[37, 51, 59]),
									a4: _List_Nil
								},
									{
									ah: {b: 152.43362831858406, a: 587.2756410256411},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a & b)',
									c: 51,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[45, 46, 47, 50, 52, 53, 55, 58, 63, 65, 66, 70, 72]),
									a4: _List_Nil
								},
									{
									ah: {b: 459.17373998857994, a: 342.59784354949386},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 52,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 506.811425538286, a: 376.4857909564769},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 53,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 987.3008849557522, a: 428.17307692307696},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 54,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[40, 57, 62]),
									a4: _List_Nil
								},
									{
									ah: {b: 21.106194690265486, a: 381.37820512820514},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 55,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36, 51, 60]),
									a4: _List_Nil
								},
									{
									ah: {b: 616.7699115044247, a: 386.0576923076923},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 56,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 57, 58, 61]),
									a4: _List_Nil
								},
									{
									ah: {b: 963.8495575221239, a: 666.8269230769231},
									aa: $elm$core$Maybe$Nothing,
									bl: '((a & c) | (b & c))',
									c: 57,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[48, 49, 54, 56, 64, 65, 67, 71, 74]),
									a4: _List_Nil
								},
									{
									ah: {b: 513.5840707964602, a: 400.09615384615387},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 58,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 56]),
									a4: _List_Nil
								},
									{
									ah: {b: 288.4513274336283, a: 395.4166666666667},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 59,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[50]),
									a4: _List_Nil
								},
									{
									ah: {b: 44.557522123893804, a: 460.9294871794872},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 60,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[55]),
									a4: _List_Nil
								},
									{
									ah: {b: 551.1061946902655, a: 432.85256410256414},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 61,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[56, 65]),
									a4: _List_Nil
								},
									{
									ah: {b: 855.9734513274336, a: 465.60897435897436},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 62,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[54, 64]),
									a4: _List_Nil
								},
									{
									ah: {b: 189.95575221238937, a: 432.85256410256414},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 63,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51]),
									a4: _List_Nil
								},
									{
									ah: {b: 752.787610619469, a: 484.3269230769231},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 64,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 62]),
									a4: _List_Nil
								},
									{
									ah: {b: 513.5840707964602, a: 512.4038461538462},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 65,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 57, 61]),
									a4: _List_Nil
								},
									{
									ah: {b: 340.0442477876106, a: 582.5961538461539},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 66,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 68, 72]),
									a4: _List_Nil
								},
									{
									ah: {b: 710.5752212389381, a: 577.9166666666667},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 67,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 69, 74]),
									a4: _List_Nil
								},
									{
									ah: {b: 391.6371681415929, a: 540.4807692307693},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 68,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[66]),
									a4: _List_Nil
								},
									{
									ah: {b: 635.5309734513274, a: 540.4807692307693},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 69,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[67]),
									a4: _List_Nil
								},
									{
									ah: {b: 476.0619469026548, a: 601.3141025641025},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 70,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 71, 73]),
									a4: _List_Nil
								},
									{
									ah: {b: 551.1061946902655, a: 601.3141025641025},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 71,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 70, 73]),
									a4: _List_Nil
								},
									{
									ah: {b: 260.30973451327435, a: 666.8269230769231},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 72,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 66, 73, 76]),
									a4: _List_Nil
								},
									{
									ah: {b: 490.13274336283183, a: 676.1858974358975},
									aa: $elm$core$Maybe$Nothing,
									bl: '((a & b) | ((a & c) | (b & c)))',
									c: 73,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[70, 71, 72, 74, 77]),
									a4: _List_Nil
								},
									{
									ah: {b: 804.3805309734513, a: 671.5064102564103},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 74,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 67, 73, 75]),
									a4: _List_Nil
								},
									{
									ah: {b: 635.5309734513274, a: 690.224358974359},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 75,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[74, 77]),
									a4: _List_Nil
								},
									{
									ah: {b: 330.6637168141593, a: 690.224358974359},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 76,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[72]),
									a4: _List_Nil
								},
									{
									ah: {b: 555.7964601769911, a: 694.9038461538462},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 77,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[73, 75]),
									a4: _List_Nil
								}
								]),
							bc: 1060
						}),
					dG: true,
					cg: 1,
					a0: 730,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 46.902654867256636 0 L 93.80530973451327 0 L 140.7079646017699 0 L 159.46902654867256 0 L 159.46902654867256 46.794871794871796 L 159.17161445034733 93.52358258845852 L 158.81433451110186 140.36187280487977 L 159.05596681107178 187.30928019181368 L 159.44567985918945 233.96443152968948 L 149.89833514519916 275.900020079761 L 106.19040212383058 292.086649539973 L 110.33772666325547 303.21681649756204 L 155.42950893611436 300.13634523473473 L 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 158.20765235119057 307.587678307326 L 148.5395230102367 326.0186895635514 L 102.36650541936841 340.78511165993837 L 91.24030532078699 357.7614028291209 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 81.50206894327414 358.55703402553223 L 64.70573572758828 324.80762599008176 L 69.24114812474124 276.2327894794555 L 47.798941982647094 242.4391029796717 L 0 233.97435897435898 L 0 187.17948717948718 L 0 140.3846153846154 L 0 93.58974358974359 L 0 46.794871794871796 Z'),
								_Utils_Tuple2(1, 'M 159.46902654867256 0 L 164.1592920353982 0 L 164.1587031833634 46.794746925247686 L 163.71612219147153 93.49060225449021 L 163.28195567739036 140.35376062877168 L 166.22980469316036 189.34640225118318 L 208.54320411776075 212.66763262633975 L 224.5590004776425 258.1994533082829 L 216.07076916721775 299.8050042803581 L 168.84889164191895 304.1660023166654 L 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 155.42950893611436 300.13634523473473 L 110.33772666325547 303.21681649756204 L 106.19040212383058 292.086649539973 L 149.89833514519916 275.900020079761 L 159.44567985918945 233.96443152968948 L 159.05596681107178 187.30928019181368 L 158.81433451110186 140.36187280487977 L 159.17161445034733 93.52358258845852 L 159.46902654867256 46.794871794871796 Z'),
								_Utils_Tuple2(2, 'M 164.1592920353982 0 L 206.3716814159292 0 L 225.5953322333867 45.19484337248301 L 243.89716240311967 89.48707447456803 L 266.8353279619968 112.80116080268837 L 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 270.5833734768453 123.35247170880882 L 295.5107072935839 166.02070911808258 L 313.28949842622046 183.42326927749988 L 317.77330118255645 187.84740736372635 L 317.77330118255645 187.84740736372635 L 315.4572709030563 194.14828169775143 L 322.5997545955598 228.68345105155046 L 298.4177276433006 237.46914070785397 L 258.07095610304566 255.18501319656485 L 257.229099698356 303.4705781173349 L 248.1071239653422 350.4867431208759 L 241.65659376358025 358.0884574816056 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 231.61564552760632 358.53199565103716 L 222.22787142812956 349.1802477732655 L 183.8434038416396 331.322661068011 L 164.5599958426218 308.4463708628705 L 161.81415929203538 301.8269230769231 L 168.84889164191895 304.1660023166654 L 216.07076916721775 299.8050042803581 L 224.5590004776425 258.1994533082829 L 208.54320411776075 212.66763262633975 L 166.22980469316036 189.34640225118318 L 163.28195567739036 140.35376062877168 L 163.71612219147153 93.49060225449021 L 164.1587031833634 46.794746925247686 Z'),
								_Utils_Tuple2(3, 'M 206.3716814159292 0 L 215.75221238938053 0 L 234.42970130097206 7.440583832389524 L 246.50022049510017 38.44574793995866 L 256.87047388823953 63.000517223427444 L 252.58817910974884 85.99534808442483 L 281.71444496496633 93.86376251067361 L 277.31496119584284 113.41486386132082 L 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 266.8353279619968 112.80116080268837 L 243.89716240311967 89.48707447456803 L 225.5953322333867 45.19484337248301 Z'),
								_Utils_Tuple2(4, 'M 215.75221238938053 0 L 262.59494484837745 0 L 309.5886674568915 0 L 333.0687990949354 0 L 337.1734200530284 47.572561558707314 L 381.02735537799737 60.339490777618835 L 412.0132379991134 55.05386049321286 L 419.08753708993083 43.77219726829662 L 417.43362831858406 0 L 422.1238938053097 0 L 424.7721050080971 49.397019630782154 L 432.2219899772677 97.92106849423212 L 438.9492818387721 105.14819292997635 L 443.4674738832735 109.92951645150244 L 438.29737177131324 107.35201986173031 L 398.6527078979456 114.14121077226923 L 373.78979984276367 115.91017552190252 L 326.28122897759334 114.98672295110237 L 279.6505855831241 114.776809160204 L 271.919658354061 117.32348762648567 L 277.31496119584284 113.41486386132082 L 281.71444496496633 93.86376251067361 L 252.58817910974884 85.99534808442483 L 256.87047388823953 63.000517223427444 L 246.50022049510017 38.44574793995866 L 234.42970130097206 7.440583832389524 Z'),
								_Utils_Tuple2(5, 'M 333.0687990949354 0 L 379.91150442477874 0 L 417.43362831858406 0 L 419.08753708993083 43.77219726829662 L 412.0132379991134 55.05386049321286 L 381.02735537799737 60.339490777618835 L 337.1734200530284 47.572561558707314 Z'),
								_Utils_Tuple2(6, 'M 422.1238938053097 0 L 469.0265486725663 0 L 497.16814159292034 0 L 487.698227600996 27.986326600810848 L 463.0267483158919 46.66010826054147 L 504.40602906534866 49.331863995557626 L 516.5799438713486 47.44403001711812 L 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 519.3580948290668 54.895370615018265 L 509.6899654881119 73.32638187124283 L 463.49912634352177 88.07502336813153 L 448.5705637044884 105.82329430498118 L 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 438.9492818387721 105.14819292997635 L 432.2219899772677 97.92106849423212 L 424.7721050080971 49.397019630782154 Z'),
								_Utils_Tuple2(7, 'M 497.16814159292034 0 L 544.070796460177 0 L 586.2831858407079 0 L 577.2212116771962 47.11269655602203 L 529.9993341197951 51.473694624357734 L 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 516.5799438713486 47.44403001711812 L 504.40602906534866 49.331863995557626 L 463.0267483158919 46.66010826054147 L 487.698227600996 27.986326600810848 Z'),
								_Utils_Tuple2(8, 'M 586.2831858407079 0 L 619.1150442477875 0 L 613.2059471169993 47.51874343748409 L 610.851809101458 94.7145318311101 L 602.8065238244604 105.395692266638 L 598.0088495575221 109.96794871794873 L 598.0088495575221 109.96794871794873 L 592.7660880054824 105.83968795872948 L 583.3783139060058 96.4879400809578 L 544.9938463195157 78.6303533757033 L 525.7104383204978 55.75406317056273 L 522.9646017699115 49.13461538461539 L 529.9993341197951 51.473694624357734 L 577.2212116771962 47.11269655602203 Z'),
								_Utils_Tuple2(9, 'M 619.1150442477875 0 L 623.8053097345132 0 L 621.8086761913951 48.816084722602156 L 670.193922652454 60.3069815332532 L 691.348189293076 48.66971565566506 L 694.1592920353982 0 L 698.8495575221239 0 L 698.8495575221239 46.794871794871796 L 698.8495575221239 93.58974358974359 L 698.8495575221239 112.30769230769232 L 652.0863523997706 112.16856302059657 L 604.7301189507418 107.94161209183963 L 598.0088495575221 109.96794871794873 L 602.8065238244604 105.395692266638 L 610.851809101458 94.7145318311101 L 613.2059471169993 47.51874343748409 Z'),
								_Utils_Tuple2(10, 'M 623.8053097345132 0 L 670.7079646017698 0 L 694.1592920353982 0 L 691.348189293076 48.66971565566506 L 670.193922652454 60.3069815332532 L 621.8086761913951 48.816084722602156 Z'),
								_Utils_Tuple2(11, 'M 698.8495575221239 0 L 745.7522123893805 0 L 769.2035398230088 0 L 768.4710468156968 46.06406206853939 L 761.7333315982651 95.49567638535177 L 752.3243648320097 104.82628029744168 L 703.5398230088496 112.30769230769232 L 698.8495575221239 112.30769230769232 L 698.8495575221239 93.58974358974359 L 698.8495575221239 46.794871794871796 Z'),
								_Utils_Tuple2(12, 'M 769.2035398230088 0 L 787.9646017699115 0 L 785.8886733648544 44.72265498408058 L 787.0407648474779 94.5148139739741 L 798.8677269537125 106.10911272056953 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 799.3423541425173 113.92051342073842 L 767.9499682114772 121.35258478319935 L 749.9543560805413 125.8342958228294 L 703.5398230088496 112.30769230769232 L 752.3243648320097 104.82628029744168 L 761.7333315982651 95.49567638535177 L 768.4710468156968 46.06406206853939 Z'),
								_Utils_Tuple2(13, 'M 787.9646017699115 0 L 834.8672566371681 0 L 844.2477876106194 0 L 835.4810683336439 28.674777636998094 L 822.1539825163027 48.78492404781828 L 867.6999785429138 51.47380169916144 L 877.0796972142575 51.47432335597361 L 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 880.5085375082024 59.574857530304946 L 870.8415766518758 78.00366312976423 L 824.211967335629 92.548702110492 L 809.8622156063814 107.75329653606698 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 798.8677269537125 106.10911272056953 L 787.0407648474779 94.5148139739741 L 785.8886733648544 44.72265498408058 Z'),
								_Utils_Tuple2(14, 'M 844.2477876106194 0 L 891.150442477876 0 L 938.0530973451326 0 L 947.433628318584 0 L 942.5460662207311 46.59802857460224 L 937.8558007340047 51.27751575408861 L 891.1487246880763 56.15213231155565 L 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 877.0796972142575 51.47432335597361 L 867.6999785429138 51.47380169916144 L 822.1539825163027 48.78492404781828 L 835.4810683336439 28.674777636998094 Z'),
								_Utils_Tuple2(15, 'M 947.433628318584 0 L 980.2654867256637 0 L 974.3564345107035 47.51878825009497 L 975.7007022632002 93.74176903267414 L 975.575221238938 107.62820512820514 L 956.8141592920354 107.62820512820514 L 950.9950806750073 104.07493704787905 L 910.1751334475475 79.28825885234392 L 887.1750006894697 60.12015231163088 L 884.1150442477876 53.81410256410257 L 891.1487246880763 56.15213231155565 L 937.8558007340047 51.27751575408861 L 942.5460662207311 46.59802857460224 Z'),
								_Utils_Tuple2(16, 'M 980.2654867256637 0 L 984.9557522123894 0 L 982.9591187052321 48.81608475848047 L 1027.1866477288888 60.81486972480874 L 1060 60.833333333333336 L 1060 107.62820512820514 L 1060 112.30769230769232 L 1022.5091718509916 112.27646848103169 L 975.575221238938 107.62820512820514 L 975.7007022632002 93.74176903267414 L 974.3564345107035 47.51878825009497 Z'),
								_Utils_Tuple2(17, 'M 984.9557522123894 0 L 1031.858407079646 0 L 1060 0 L 1060 46.794871794871796 L 1060 60.833333333333336 L 1027.1866477288888 60.81486972480874 L 982.9591187052321 48.81608475848047 Z'),
								_Utils_Tuple2(18, 'M 519.3580948290668 54.895370615018265 L 522.9646017699115 49.13461538461539 L 520.6194690265487 56.15384615384616 L 520.6194690265487 102.94871794871796 L 520.6194690265487 121.66666666666667 L 490.46455603351717 131.20344622925873 L 448.0872997460655 114.60973197742452 L 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 448.5705637044884 105.82329430498118 L 463.49912634352177 88.07502336813153 L 509.6899654881119 73.32638187124283 Z'),
								_Utils_Tuple2(19, 'M 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 525.7104383204978 55.75406317056273 L 544.9938463195157 78.6303533757033 L 583.3783139060058 96.4879400809578 L 592.7660880054824 105.83968795872948 L 598.0088495575221 109.96794871794873 L 598.0088495575221 109.96794871794873 L 592.9367240214026 114.26643551763264 L 565.0278265599284 128.121682011209 L 520.6194690265487 121.66666666666667 L 520.6194690265487 102.94871794871796 L 520.6194690265487 56.15384615384616 Z'),
								_Utils_Tuple2(20, 'M 880.5085375082024 59.574857530304946 L 884.1150442477876 53.81410256410257 L 881.7699115044247 60.833333333333336 L 881.7699115044247 107.62820512820514 L 881.7699115044247 121.66666666666667 L 851.9275319136718 131.5154161907879 L 809.087030828129 114.63117006060845 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 809.8622156063814 107.75329653606698 L 824.211967335629 92.548702110492 L 870.8415766518758 78.00366312976423 Z'),
								_Utils_Tuple2(21, 'M 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 887.1750006894697 60.12015231163088 L 910.1751334475475 79.28825885234392 L 950.9950806750073 104.07493704787905 L 956.8141592920354 107.62820512820514 L 913.9358187202774 131.2737195296585 L 881.7699115044247 121.66666666666667 L 881.7699115044247 107.62820512820514 L 881.7699115044247 60.833333333333336 Z'),
								_Utils_Tuple2(22, 'M 438.29737177131324 107.35201986173031 L 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 442.98319858132504 115.13834182426233 L 465.3509575234522 154.19873473180442 L 456.9731418090084 194.5957933064948 L 439.4989239188635 220.59617310147115 L 406.1804601028238 240.4289043668659 L 390.2458813399267 252.24689880586678 L 375.1103474630717 266.96634206582036 L 388.5892636953496 251.15227928672672 L 406.2518686096331 233.2309645561853 L 444.92991823617035 207.54023887349314 L 447.5303130682334 174.4903498458415 L 423.2822399771865 155.79465815824796 L 373.9191482254591 154.02685854700778 L 326.2011364123667 165.38869609796413 L 321.1678043270645 181.04587522693936 L 317.77330118255645 187.84740736372635 L 317.77330118255645 187.84740736372635 L 314.4779259999336 182.29516243529545 L 306.29625952516847 166.9582838166092 L 309.5157773016329 154.62888091771728 L 295.2501878215845 122.45949593706823 L 278.865008966168 119.82731189939972 L 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 279.6505855831241 114.776809160204 L 326.28122897759334 114.98672295110237 L 373.78979984276367 115.91017552190252 L 398.6527078979456 114.14121077226923 Z'),
								_Utils_Tuple2(23, 'M 598.0088495575221 109.96794871794873 L 604.7301189507418 107.94161209183963 L 652.0863523997706 112.16856302059657 L 698.8495575221239 112.30769230769232 L 664.501090105273 148.23046592565362 L 622.0969005000934 171.08493517842226 L 633.8917479913105 205.13031526425203 L 663.4958526109652 207.9073237831402 L 698.8495575221239 201.21794871794873 L 668.1189315139238 212.64385440180993 L 626.3980912749817 207.98672781291648 L 611.76532423645 162.03416573886193 L 576.1566006019077 143.41950746025736 L 598.2227490092243 114.85985665542222 L 598.0088495575221 109.96794871794873 Z'),
								_Utils_Tuple2(24, 'M 799.3423541425173 113.92051342073842 L 804.3805309734512 109.96794871794873 L 803.8465093052494 115.17995421427301 L 825.8081431815215 147.80987321436965 L 799.9351496758213 189.76355227510294 L 775.4074540304528 212.0859817125332 L 750.4605488764813 214.93059451770097 L 703.5398230088496 201.21794871794873 L 750.4795560605154 209.94570378798625 L 770.7219028717807 207.40148645602955 L 794.9203500488736 177.3408120467719 L 764.5059845590804 145.0713726619632 L 727.4604338221592 130.55743606688543 L 703.5398230088496 112.30769230769232 L 749.9543560805413 125.8342958228294 L 767.9499682114772 121.35258478319935 Z'),
								_Utils_Tuple2(25, 'M 956.8141592920354 107.62820512820514 L 933.7131464655158 150.78751263609917 L 951.8627497224011 196.79900557202873 L 952.1238938053096 201.21794871794873 L 938.0122155475353 173.18526010710403 L 896.5605817475134 169.20923036225483 L 886.5536530718645 215.17665557983975 L 901.957207496142 260.6283255157625 L 934.2409049476287 298.61112422436037 L 979.1524536347287 319.315603527712 L 1027.321081903766 332.09100089209414 L 1060 332.2435897435898 L 1060 379.03846153846155 L 1060 383.71794871794873 L 1019.6852291558062 363.1067422222729 L 982.5678788739772 329.94648853030503 L 938.2624759363705 308.63725641036257 L 895.1818766462748 290.7855224413271 L 853.5511164461223 266.87100890591256 L 806.2871701974658 270.94703395109036 L 797.0986595148124 306.6603446256285 L 779.9450906394377 352.319499433637 L 776.2389380530972 357.98076923076917 L 776.2389380530972 357.98076923076917 L 772.733733658463 352.1189442490733 L 755.8719349944882 331.50609678646185 L 711.1853409750156 310.57717976500913 L 705.8849557522124 306.5064102564103 L 712.2689926542964 309.4946896351098 L 758.0780416434627 307.07938591236586 L 763.53884775666 293.83559513704665 L 761.7021713249862 246.1379574527271 L 719.3101583686321 232.27872564310042 L 703.5398230088496 201.21794871794873 L 750.4605488764813 214.93059451770097 L 775.4074540304528 212.0859817125332 L 799.9351496758213 189.76355227510294 L 825.8081431815215 147.80987321436965 L 803.8465093052494 115.17995421427301 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 809.087030828129 114.63117006060845 L 851.9275319136718 131.5154161907879 L 881.7699115044247 121.66666666666667 L 913.9358187202774 131.2737195296585 Z'),
								_Utils_Tuple2(26, 'M 956.8141592920354 107.62820512820514 L 975.575221238938 107.62820512820514 L 1022.5091718509916 112.27646848103169 L 1060 112.30769230769232 L 1060 149.74358974358975 L 1036.5552515514 149.7501536100024 L 989.6973924147474 154.4743335787676 L 958.306235757887 174.6296732906156 L 952.1238938053096 201.21794871794873 L 951.8627497224011 196.79900557202873 L 933.7131464655158 150.78751263609917 Z'),
								_Utils_Tuple2(27, 'M 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 448.0872997460655 114.60973197742452 L 490.46455603351717 131.20344622925873 L 520.6194690265487 121.66666666666667 L 565.0278265599284 128.121682011209 L 592.9367240214026 114.26643551763264 L 598.0088495575221 109.96794871794873 L 598.0088495575221 109.96794871794873 L 598.2227490092243 114.85985665542222 L 576.1566006019077 143.41950746025736 L 611.76532423645 162.03416573886193 L 626.3980912749817 207.98672781291648 L 668.1189315139238 212.64385440180993 L 698.8495575221239 201.21794871794873 L 678.8993353030412 242.1469057710193 L 653.3476136080319 263.44875521669275 L 634.2219555952695 290.12272653391346 L 652.6239832642227 312.25696788795165 L 700.592736294825 303.804278590639 L 705.8849557522124 306.5064102564103 L 700.2588828464105 305.5727533381762 L 654.9257104270032 325.8565778074926 L 629.5550908321075 356.69181222423737 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 622.5564133289013 357.011433942336 L 607.7084100427245 322.36436955275263 L 600.7539615820463 275.6457109179964 L 554.4410232183324 264.04030592437636 L 506.3816324095624 267.56375864926275 L 469.0266930573369 293.52456075926625 L 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 431.7292519390126 293.1928485700255 L 425.6316712829299 280.9610122056774 L 395.5908444261514 293.4178011565894 L 430.28509304992536 264.99194067817376 L 448.4723159322665 249.9680449464124 L 414.9911648180347 248.37100028748918 L 386.44841051737734 264.1519241214887 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 390.2458813399267 252.24689880586678 L 406.1804601028238 240.4289043668659 L 439.4989239188635 220.59617310147115 L 456.9731418090084 194.5957933064948 L 465.3509575234522 154.19873473180442 L 442.98319858132504 115.13834182426233 Z M 540.0958151807932 169.21386371289515 L 535.233752975313 205.41281081727988 L 565.2020303938169 221.4324934668897 L 570.4871273534508 218.1605037438601 L 572.5438800700609 172.83610503719646 Z'),
								_Utils_Tuple2(28, 'M 698.8495575221239 112.30769230769232 L 703.5398230088496 112.30769230769232 L 727.4604338221592 130.55743606688543 L 764.5059845590804 145.0713726619632 L 794.9203500488736 177.3408120467719 L 770.7219028717807 207.40148645602955 L 750.4795560605154 209.94570378798625 L 703.5398230088496 201.21794871794873 L 698.8495575221239 201.21794871794873 L 663.4958526109652 207.9073237831402 L 633.8917479913105 205.13031526425203 L 622.0969005000934 171.08493517842226 L 664.501090105273 148.23046592565362 Z'),
								_Utils_Tuple2(29, 'M 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 278.865008966168 119.82731189939972 L 295.2501878215845 122.45949593706823 L 309.5157773016329 154.62888091771728 L 306.29625952516847 166.9582838166092 L 314.4779259999336 182.29516243529545 L 317.77330118255645 187.84740736372635 L 313.28949842622046 183.42326927749988 L 295.5107072935839 166.02070911808258 L 270.5833734768453 123.35247170880882 Z'),
								_Utils_Tuple2(30, 'M 1036.5552515514 149.7501536100024 L 1060 149.74358974358975 L 1060 196.53846153846155 L 1060 243.33333333333334 L 1060 280.7692307692308 L 1015.3186797983326 269.19402640826723 L 977.4830354664136 241.42990329433388 L 952.1238938053096 201.21794871794873 L 958.306235757887 174.6296732906156 L 989.6973924147474 154.4743335787676 Z'),
								_Utils_Tuple2(31, 'M 373.9191482254591 154.02685854700778 L 423.2822399771865 155.79465815824796 L 447.5303130682334 174.4903498458415 L 444.92991823617035 207.54023887349314 L 406.2518686096331 233.2309645561853 L 388.5892636953496 251.15227928672672 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 376.7409959485237 254.0115973881723 L 390.3847679264122 208.61998741584694 L 342.19649037679386 220.94858072501836 L 352.01074962903994 192.55616572799013 L 325.05167192578966 184.96924687484994 L 317.77330118255645 187.84740736372635 L 321.1678043270645 181.04587522693936 L 326.2011364123667 165.38869609796413 Z'),
								_Utils_Tuple2(32, 'M 572.5438800700609 172.83610503719646 L 570.4871273534508 218.1605037438601 L 565.2020303938169 221.4324934668897 L 535.233752975313 205.41281081727988 L 540.0958151807932 169.21386371289515 Z'),
								_Utils_Tuple2(33, 'M 938.0122155475353 173.18526010710403 L 952.1238938053096 201.21794871794873 L 977.4830354664136 241.42990329433388 L 1015.3186797983326 269.19402640826723 L 1060 280.7692307692308 L 1060 327.5641025641026 L 1060 332.2435897435898 L 1027.321081903766 332.09100089209414 L 979.1524536347287 319.315603527712 L 934.2409049476287 298.61112422436037 L 901.957207496142 260.6283255157625 L 886.5536530718645 215.17665557983975 L 896.5605817475134 169.20923036225483 Z'),
								_Utils_Tuple2(34, 'M 317.77330118255645 187.84740736372635 L 325.05167192578966 184.96924687484994 L 352.01074962903994 192.55616572799013 L 342.19649037679386 220.94858072501836 L 322.5997545955598 228.68345105155046 L 315.4572709030563 194.14828169775143 L 317.77330118255645 187.84740736372635 L 317.77330118255645 187.84740736372635 Z'),
								_Utils_Tuple2(35, 'M 698.8495575221239 201.21794871794873 L 703.5398230088496 201.21794871794873 L 719.3101583686321 232.27872564310042 L 761.7021713249862 246.1379574527271 L 763.53884775666 293.83559513704665 L 758.0780416434627 307.07938591236586 L 712.2689926542964 309.4946896351098 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 700.592736294825 303.804278590639 L 652.6239832642227 312.25696788795165 L 634.2219555952695 290.12272653391346 L 653.3476136080319 263.44875521669275 L 678.8993353030412 242.1469057710193 Z'),
								_Utils_Tuple2(36, 'M 0 233.97435897435898 L 47.798941982647094 242.4391029796717 L 69.24114812474124 276.2327894794555 L 64.70573572758828 324.80762599008176 L 81.50206894327414 358.55703402553223 L 86.76991150442478 362.6602564102564 L 79.73451327433628 360.3205128205128 L 46.90265486725663 360.3205128205128 L 0 360.3205128205128 L 0 313.52564102564105 L 48.02234629707574 309.96334642181426 L 63.44569719631879 283.92377953707364 L 46.317531577213174 248.59630999967214 L 0 238.65384615384616 Z'),
								_Utils_Tuple2(37, 'M 322.5997545955598 228.68345105155046 L 301.2420732204594 240.91015000602525 L 260.2996651542929 265.9156990280752 L 273.533216132366 310.1399305206441 L 321.5540040059452 315.4750490947724 L 351.54012695794347 304.99574935095586 L 363.54201215224583 283.64596736163077 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 377.2715637394617 279.9711855398498 L 377.79083270773054 302.19401643590425 L 395.5908444261514 293.4178011565894 L 375.21792033006926 324.560548410458 L 349.8652889742526 367.00137405402313 L 328.4199062250135 376.7159585078911 L 292.67732591500385 365.78096987687024 L 243.3624462489828 359.9104299184991 L 236.85840707964599 362.6602564102564 L 241.65659376358025 358.0884574816056 L 248.1071239653422 350.4867431208759 L 257.229099698356 303.4705781173349 L 258.07095610304566 255.18501319656485 L 298.4177276433006 237.46914070785397 Z'),
								_Utils_Tuple2(38, 'M 322.5997545955598 228.68345105155046 L 342.19649037679386 220.94858072501836 L 390.3847679264122 208.61998741584694 L 376.7409959485237 254.0115973881723 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 363.54201215224583 283.64596736163077 L 351.54012695794347 304.99574935095586 L 321.5540040059452 315.4750490947724 L 273.533216132366 310.1399305206441 L 260.2996651542929 265.9156990280752 L 301.2420732204594 240.91015000602525 Z'),
								_Utils_Tuple2(39, 'M 0 238.65384615384616 L 46.317531577213174 248.59630999967214 L 63.44569719631879 283.92377953707364 L 48.02234629707574 309.96334642181426 L 0 313.52564102564105 L 0 285.44871794871796 Z'),
								_Utils_Tuple2(40, 'M 853.5511164461223 266.87100890591256 L 895.1818766462748 290.7855224413271 L 938.2624759363705 308.63725641036257 L 982.5678788739772 329.94648853030503 L 1019.6852291558062 363.1067422222729 L 1060 383.71794871794873 L 1060 388.3974358974359 L 1017.4911983136346 369.97521832496693 L 970.8665960064117 360.3388303753157 L 923.9823008810969 360.32051282436277 L 877.0796460212491 360.32051281697085 L 830.1899607272351 360.30757304802086 L 782.4461784405319 356.46728036333474 L 776.2389380530972 357.98076923076917 L 779.9450906394377 352.319499433637 L 797.0986595148124 306.6603446256285 L 806.2871701974658 270.94703395109036 Z M 811.0329316033224 275.57117113621 L 804.9003029121704 301.6792715664301 L 851.9226796773822 311.82154655985045 L 863.1420437072139 304.6694281856416 L 854.7596833944874 275.0194183077218 Z'),
								_Utils_Tuple2(41, 'M 600.7539615820463 275.6457109179964 L 607.7084100427245 322.36436955275263 L 622.5564133289013 357.011433942336 L 626.1820031757353 362.6629158906568 L 619.3520845095356 360.3403866325713 L 606.6198622984023 360.49931660123485 L 558.6102881065827 368.6887547899637 L 517.1993747261787 391.546034833081 L 506.5082057898494 399.0295257803954 L 515.4041822875903 391.16660550407835 L 525.7451343023681 378.43677026926224 L 526.4557513966982 337.6351730291464 L 510.3178641183156 345.2378895455958 L 487.6594556516982 374.97443777365027 L 486.36914279590866 369.15162412134214 L 484.5505415254276 362.53787606490613 L 481.7306300343453 355.16178688351505 L 477.32028239972726 347.07061225974644 L 470.95556178437835 338.94419943982507 L 463.34584551429447 331.3499774141755 L 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 469.0266930573369 293.52456075926625 L 506.3816324095624 267.56375864926275 L 554.4410232183324 264.04030592437636 Z M 564.0779637328316 269.65068713807557 L 563.0743008400412 271.2408449748564 L 562.4961982800536 273.476257769861 L 562.3192029316724 276.348906315195 L 562.4925847468808 279.79325618203296 L 562.9508624635871 283.6854906623155 L 563.6293487180723 287.8506735114367 L 564.4788233058968 292.0784602207498 L 565.4744604310282 296.14737321270644 L 566.6160409129626 299.85531242883684 L 567.9198625329683 303.0500635593305 L 569.4063314697318 305.65066853577105 L 571.0888792575647 307.6519025918265 L 572.9682758321425 309.11018926653026 L 575.0327210986961 310.11654122913444 L 577.2610464606532 310.76612463029386 L 579.625709077397 311.1332703395114 L 582.0936321751469 311.25699655279357 L 584.6249259392732 311.1381175398395 L 587.1707273927047 310.74628351803335 L 589.6660033632462 310.03340074633206 L 592.0362041278759 308.9521817238799 L 594.2085161671854 307.4728424813262 L 596.1278170742427 305.59683195181105 L 597.7572680576985 303.3600245698896 L 599.0799277230865 300.82972717783485 L 600.08718519813 298.0927648502792 L 600.7653588961463 295.2420691529348 L 601.090846997827 292.36510786776165 L 601.031289605195 289.53651142681633 L 600.5511582999198 286.8156209583084 L 599.6237082099824 284.2471300765602 L 598.2416250697758 281.86276473053886 L 596.4228548858251 279.68251831937187 L 594.2136638785122 277.71469027691296 L 591.6845207015721 275.95657019991484 L 588.9266254816616 274.39625012496884 L 586.0305789994122 273.0166577795579 L 583.0809246698883 271.79926153276466 L 580.1435200273918 270.7306011727642 L 577.2642178305998 269.809151349793 L 574.4880357138677 269.0490240770369 L 571.8649440984037 268.4851982930254 L 569.4516038107082 268.17665355216354 L 567.3097763543807 268.2046074960079 L 565.5010050784821 268.6642867188101 Z'),
								_Utils_Tuple2(42, 'M 854.7596833944874 275.0194183077218 L 863.1420437072139 304.6694281856416 L 851.9226796773822 311.82154655985045 L 804.9003029121704 301.6792715664301 L 811.0329316033224 275.57117113621 Z'),
								_Utils_Tuple2(43, 'M 564.0779637328316 269.65068713807557 L 565.5010050784821 268.6642867188101 L 567.3097763543807 268.2046074960079 L 569.4516038107082 268.17665355216354 L 571.8649440984037 268.4851982930254 L 574.4880357138677 269.0490240770369 L 577.2642178305998 269.809151349793 L 580.1435200273918 270.7306011727642 L 583.0809246698883 271.79926153276466 L 586.0305789994122 273.0166577795579 L 588.9266254816616 274.39625012496884 L 591.6845207015721 275.95657019991484 L 594.2136638785122 277.71469027691296 L 596.4228548858251 279.68251831937187 L 598.2416250697758 281.86276473053886 L 599.6237082099824 284.2471300765602 L 600.5511582999198 286.8156209583084 L 601.031289605195 289.53651142681633 L 601.090846997827 292.36510786776165 L 600.7653588961463 295.2420691529348 L 600.08718519813 298.0927648502792 L 599.0799277230865 300.82972717783485 L 597.7572680576985 303.3600245698896 L 596.1278170742427 305.59683195181105 L 594.2085161671854 307.4728424813262 L 592.0362041278759 308.9521817238799 L 589.6660033632462 310.03340074633206 L 587.1707273927047 310.74628351803335 L 584.6249259392732 311.1381175398395 L 582.0936321751469 311.25699655279357 L 579.625709077397 311.1332703395114 L 577.2610464606532 310.76612463029386 L 575.0327210986961 310.11654122913444 L 572.9682758321425 309.11018926653026 L 571.0888792575647 307.6519025918265 L 569.4063314697318 305.65066853577105 L 567.9198625329683 303.0500635593305 L 566.6160409129626 299.85531242883684 L 565.4744604310282 296.14737321270644 L 564.4788233058968 292.0784602207498 L 563.6293487180723 287.8506735114367 L 562.9508624635871 283.6854906623155 L 562.4925847468808 279.79325618203296 L 562.3192029316724 276.348906315195 L 562.4961982800536 273.476257769861 L 563.0743008400412 271.2408449748564 Z'),
								_Utils_Tuple2(44, 'M 448.4723159322665 249.9680449464124 L 430.28509304992536 264.99194067817376 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 377.79083270773054 302.19401643590425 L 377.2715637394617 279.9711855398498 L 375.1103474630717 266.96634206582036 L 386.44841051737734 264.1519241214887 L 414.9911648180347 248.37100028748918 Z'),
								_Utils_Tuple2(45, 'M 158.20765235119057 307.587678307326 L 161.81415929203538 301.8269230769231 L 159.46902654867256 308.8461538461538 L 159.46902654867256 355.64102564102564 L 159.46902654867256 374.35897435897436 L 128.8454806793559 380.3107443710137 L 91.65495258381145 367.14443177417104 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 91.24030532078699 357.7614028291209 L 102.36650541936841 340.78511165993837 L 148.5395230102367 326.0186895635514 Z'),
								_Utils_Tuple2(46, 'M 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 164.5599958426218 308.4463708628705 L 183.8434038416396 331.322661068011 L 222.22787142812956 349.1802477732655 L 231.61564552760632 358.53199565103716 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 231.78641099557342 366.9586140554155 L 204.20497407610588 380.4882079760644 L 159.46902654867256 374.35897435897436 L 159.46902654867256 355.64102564102564 L 159.46902654867256 308.8461538461538 Z'),
								_Utils_Tuple2(47, 'M 395.5908444261514 293.4178011565894 L 425.6316712829299 280.9610122056774 L 431.7292519390126 293.1928485700255 L 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 422.40314181563446 320.9848051184073 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 Z'),
								_Utils_Tuple2(48, 'M 700.2588828464105 305.5727533381762 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 702.4866222741701 312.47486056357405 L 698.8517605400123 360.3227107758299 L 698.8495575221239 374.35897435897436 L 673.9015835341877 383.23942553587545 L 631.2226020145381 366.9592561152452 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 629.5550908321075 356.69181222423737 L 654.9257104270032 325.8565778074926 Z'),
								_Utils_Tuple2(49, 'M 702.4866222741701 312.47486056357405 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 711.1853409750156 310.57717976500913 L 755.8719349944882 331.50609678646185 L 772.733733658463 352.1189442490733 L 776.2389380530972 357.98076923076917 L 776.2389380530972 357.98076923076917 L 771.6691786685726 362.78041680530015 L 735.5572945137617 380.04351747574594 L 698.8495575221239 374.35897435897436 L 698.8517605400123 360.3227107758299 Z'),
								_Utils_Tuple2(50, 'M 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 393.249482004293 327.0732370244643 L 391.08293831766326 374.9326192227318 L 346.5725842879565 392.187284640168 L 308.8112440812291 416.1804959754058 L 287.0324182938648 440.10798052489463 L 254.38422039377338 429.4018228562667 L 213.77852443434634 401.11899558699133 L 232.84759750297872 368.0145548218944 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 243.3624462489828 359.9104299184991 L 292.67732591500385 365.78096987687024 L 328.4199062250135 376.7159585078911 L 349.8652889742526 367.00137405402313 L 375.21792033006926 324.560548410458 Z M 242.40062194892664 390.8169678885631 L 260.13840794543677 423.62461779765977 L 289.8366873272332 424.70955586330587 L 298.6866367272702 388.97621523452545 L 276.093757111574 387.35301006063145 L 270.09838865187015 397.7564102564103 L 263.3555323579151 387.4215416952229 Z'),
								_Utils_Tuple2(51, 'M 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 422.40314181563446 320.9848051184073 L 446.4032559913937 315.85196136432114 L 439.80345333765956 338.214599413176 L 447.27864308612317 346.50197344144186 L 454.86608024260516 354.1405362296682 L 462.76336194477346 360.8352692789382 L 470.3261003032063 365.9116597626119 L 476.93364792988297 369.6687774779382 L 482.67452715913385 372.5816076579225 L 487.6594556516982 374.97443777365027 L 479.17248333999544 384.68640466477785 L 434.78223072410793 405.1230349541456 L 471.64084582234784 408.57977967905424 L 499.7716146768313 402.80190355999815 L 506.5082057898494 399.0295257803954 L 496.2276337119755 406.40028901196075 L 480.22642421481686 416.8901398830197 L 494.7862348376079 414.9241225525488 L 483.63327204199203 422.07905456113906 L 496.78974081032874 420.3504909056657 L 486.68609371717406 426.8472895682808 L 498.77555371895556 425.43546791762634 L 486.4925426642717 438.2056002966925 L 518.1598297292828 436.9617981103728 L 523.2036044845761 432.13310679330624 L 519.0823748163759 438.1443801481703 L 504.67833791947805 485.6655113327942 L 470.88087517740166 516.5936338755142 L 456.779126349408 550.5928573794451 L 481.90904174485433 564.5158006987292 L 518.0667788316039 552.210589292851 L 522.9646017699115 554.5192307692307 L 517.922147710025 554.1678515312043 L 473.54679772896 575.4072973471445 L 440.88495575221236 603.6538461538462 L 436.1946902654867 603.6538461538462 L 427.08028946190996 571.2903578220214 L 418.77160695137354 522.7225942026275 L 374.150385814132 523.0442502546853 L 335.89222276392707 555.0562343468355 L 294.7806918262719 579.5519988963372 L 260.8479747715263 615.8895674758492 L 223.2688832351006 643.9096538227316 L 195.14963739514837 681.3678469850724 L 174.5884414030675 726.3667214724121 L 173.53982300884954 730 L 140.7079646017699 730 L 93.80530973451327 730 L 46.902654867256636 730 L 0 730 L 0 715.9615384615385 L 0 669.1666666666667 L 0 622.3717948717949 L 0 575.5769230769231 L 39.18013586925895 567.8721505546102 L 68.88241553762886 531.9933533829119 L 90.31420226999401 492.5683644981441 L 91.29969039093763 448.29635634982026 L 107.29480220464504 403.2421831708831 L 86.41504349549248 367.69282448078354 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 91.65495258381145 367.14443177417104 L 128.8454806793559 380.3107443710137 L 159.46902654867256 374.35897435897436 L 204.20497407610588 380.4882079760644 L 231.78641099557342 366.9586140554155 L 236.85840707964599 362.6602564102564 L 232.84759750297872 368.0145548218944 L 213.77852443434634 401.11899558699133 L 254.38422039377338 429.4018228562667 L 287.0324182938648 440.10798052489463 L 308.8112440812291 416.1804959754058 L 346.5725842879565 392.187284640168 L 391.08293831766326 374.9326192227318 L 393.249482004293 327.0732370244643 Z M 169.0751377267447 444.5625062853668 L 184.3676349865039 475.3458336507384 L 204.6339578808927 470.85421017004836 L 209.36738568407787 427.5451235827566 L 183.2587830182521 413.93761745697833 Z'),
								_Utils_Tuple2(52, 'M 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 463.34584551429447 331.3499774141755 L 470.95556178437835 338.94419943982507 L 477.32028239972726 347.07061225974644 L 481.7306300343453 355.16178688351505 L 484.5505415254276 362.53787606490613 L 486.36914279590866 369.15162412134214 L 487.6594556516982 374.97443777365027 L 482.67452715913385 372.5816076579225 L 476.93364792988297 369.6687774779382 L 470.3261003032063 365.9116597626119 L 462.76336194477346 360.8352692789382 L 454.86608024260516 354.1405362296682 L 447.27864308612317 346.50197344144186 L 439.80345333765956 338.214599413176 Z'),
								_Utils_Tuple2(53, 'M 526.4557513966982 337.6351730291464 L 525.7451343023681 378.43677026926224 L 515.4041822875903 391.16660550407835 L 506.5082057898494 399.0295257803954 L 506.5082057898494 399.0295257803954 L 506.5082057898494 399.0295257803954 L 499.7716146768313 402.80190355999815 L 471.64084582234784 408.57977967905424 L 434.78223072410793 405.1230349541456 L 479.17248333999544 384.68640466477785 L 487.6594556516982 374.97443777365027 L 510.3178641183156 345.2378895455958 Z'),
								_Utils_Tuple2(54, 'M 776.2389380530972 357.98076923076917 L 782.4461784405319 356.46728036333474 L 830.1899607272351 360.30757304802086 L 877.0796460212491 360.32051281697085 L 923.9823008810969 360.32051282436277 L 970.8665960064117 360.3388303753157 L 1017.4911983136346 369.97521832496693 L 1060 388.3974358974359 L 1060 435.19230769230774 L 1060 481.9871794871795 L 1060 528.7820512820513 L 1060 575.5769230769231 L 1060 622.3717948717949 L 1060 669.1666666666667 L 1060 673.8461538461539 L 1029.0062623182152 653.294308434572 L 988.7116490378744 627.9835035179697 L 950.096884696053 600.9967099833402 L 905.221238938053 584.9358974358975 L 951.5389891072938 586.691220016243 L 956.7546089150607 556.8158740407616 L 952.2872910705587 509.90108078071773 L 934.5875346450332 466.72682954924045 L 914.1138357416896 421.6406590429126 L 872.3430485856272 407.16161008919914 L 825.4891187497092 407.11777227316855 L 778.0573310008119 415.94882963542545 L 769.2035398230088 439.8717948717949 L 753.111495100331 405.41843593362785 L 776.8548670379471 363.2747671169103 L 776.2389380530972 357.98076923076917 Z'),
								_Utils_Tuple2(55, 'M 0 360.3205128205128 L 46.90265486725663 360.3205128205128 L 79.73451327433628 360.3205128205128 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 86.41504349549248 367.69282448078354 L 107.29480220464504 403.2421831708831 L 91.29969039093763 448.29635634982026 L 90.31420226999401 492.5683644981441 L 68.88241553762886 531.9933533829119 L 39.18013586925895 567.8721505546102 L 0 575.5769230769231 L 0 570.8974358974359 L 16.408320115750826 568.5501007057123 L 49.707785503908205 550.2986844003071 L 73.00031060228196 512.7043650264868 L 87.67569735413721 468.71624116652083 L 81.62660938923916 419.2660976278104 L 46.85127988652709 407.1666415355634 L 0 407.11538461538464 Z'),
								_Utils_Tuple2(56, 'M 506.5082057898494 399.0295257803954 L 517.1993747261787 391.546034833081 L 558.6102881065827 368.6887547899637 L 606.6198622984023 360.49931660123485 L 619.3520845095356 360.3403866325713 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 625.9607599360178 367.56023212655356 L 649.0727750518728 405.214016891258 L 617.1575692558525 442.59830489768945 L 592.5554145593582 464.71013480227134 L 573.091285221721 466.55995452021716 L 528.3545717175713 454.15966892424854 L 577.18508932421 461.2823890632928 L 597.473733135035 455.65397279698107 L 611.3387594534366 418.99273218931876 L 576.30806894862 409.50023958958957 L 532.4249224858091 425.0147105099883 L 529.2463263410996 427.3097131111594 L 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 521.0671073475248 429.43241328352366 L 532.5265499955128 412.0605242531797 L 532.3725611927428 390.2000647997875 L 513.8771709964744 397.6448764667272 L 506.5082057898494 399.0295257803954 Z'),
								_Utils_Tuple2(57, 'M 771.6691786685726 362.78041680530015 L 776.2389380530972 357.98076923076917 L 776.2389380530972 357.98076923076917 L 776.8548670379471 363.2747671169103 L 753.111495100331 405.41843593362785 L 769.2035398230088 439.8717948717949 L 748.737696402512 422.8692565985979 L 712.5950670155473 425.5222232629862 L 708.5937574511081 472.2667907511999 L 729.7808996754146 516.6397385797659 L 762.7949387862427 553.8938739661686 L 808.0499069181932 574.2557230082033 L 854.3920636187129 584.1739074999078 L 900.5311104180789 584.9357607838976 L 905.221238938053 584.9358974358975 L 950.096884696053 600.9967099833402 L 988.7116490378744 627.9835035179697 L 1029.0062623182152 653.294308434572 L 1060 673.8461538461539 L 1060 720.6410256410256 L 1060 730 L 1041.2389380530974 730 L 994.3362831858407 730 L 947.433628318584 730 L 941.992697830063 716.7104784228121 L 917.2155403458025 675.9178770787948 L 885.7744288776777 637.0944286632847 L 841.2480552126284 616.0056594764185 L 802.9582082050117 584.0152080934758 L 760.2759873195776 561.0865240204165 L 716.9737647136122 543.4559040732235 L 675.2899342152006 519.5345550152273 L 628.3615336514536 519.282931550589 L 613.7138311060248 548.7305885058786 L 602.1477561853486 596.085578952793 L 600.3539823008849 608.3333333333334 L 595.6637168141592 608.3333333333334 L 573.2392274670437 579.2319318607107 L 528.1018972308368 558.7527152567521 L 522.9646017699115 554.5192307692307 L 529.1567305262728 557.7002192882867 L 577.2948327570851 561.7828344021752 L 586.0212801344824 537.8844254115654 L 577.2214015119979 491.0281396147294 L 529.9428185719211 482.8204261963117 L 528.3545717175713 454.15966892424854 L 573.091285221721 466.55995452021716 L 592.5554145593582 464.71013480227134 L 617.1575692558525 442.59830489768945 L 649.0727750518728 405.214016891258 L 625.9607599360178 367.56023212655356 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 631.2226020145381 366.9592561152452 L 673.9015835341877 383.23942553587545 L 698.8495575221239 374.35897435897436 L 735.5572945137617 380.04351747574594 Z'),
								_Utils_Tuple2(58, 'M 506.5082057898494 399.0295257803954 L 506.5082057898494 399.0295257803954 L 513.8771709964744 397.6448764667272 L 532.3725611927428 390.2000647997875 L 532.5265499955128 412.0605242531797 L 521.0671073475248 429.43241328352366 L 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 518.1598297292828 436.9617981103728 L 486.4925426642717 438.2056002966925 L 498.77555371895556 425.43546791762634 L 486.68609371717406 426.8472895682808 L 496.78974081032874 420.3504909056657 L 483.63327204199203 422.07905456113906 L 494.7862348376079 414.9241225525488 L 480.22642421481686 416.8901398830197 L 496.2276337119755 406.40028901196075 Z'),
								_Utils_Tuple2(59, 'M 263.3555323579151 387.4215416952229 L 270.09838865187015 397.7564102564103 L 276.093757111574 387.35301006063145 L 298.6866367272702 388.97621523452545 L 289.8366873272332 424.70955586330587 L 260.13840794543677 423.62461779765977 L 242.40062194892664 390.8169678885631 Z'),
								_Utils_Tuple2(60, 'M 0 407.11538461538464 L 46.85127988652709 407.1666415355634 L 81.62660938923916 419.2660976278104 L 87.67569735413721 468.71624116652083 L 73.00031060228196 512.7043650264868 L 49.707785503908205 550.2986844003071 L 16.408320115750826 568.5501007057123 L 0 570.8974358974359 L 0 547.5 L 0 500.70512820512823 L 0 453.9102564102564 Z'),
								_Utils_Tuple2(61, 'M 576.30806894862 409.50023958958957 L 611.3387594534366 418.99273218931876 L 597.473733135035 455.65397279698107 L 577.18508932421 461.2823890632928 L 528.3545717175713 454.15966892424854 L 526.0455232150357 434.9211188349346 L 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 529.2463263410996 427.3097131111594 L 532.4249224858091 425.0147105099883 Z'),
								_Utils_Tuple2(62, 'M 825.4891187497092 407.11777227316855 L 872.3430485856272 407.16161008919914 L 914.1138357416896 421.6406590429126 L 934.5875346450332 466.72682954924045 L 952.2872910705587 509.90108078071773 L 956.7546089150607 556.8158740407616 L 951.5389891072938 586.691220016243 L 905.221238938053 584.9358974358975 L 902.156019598363 555.2376625947151 L 877.7910770593517 528.0722551206347 L 830.1385503643206 514.7819421921527 L 793.3068011675518 481.3367437311158 L 769.2035398230088 439.8717948717949 L 778.0573310008119 415.94882963542545 Z'),
								_Utils_Tuple2(63, 'M 183.2587830182521 413.93761745697833 L 209.36738568407787 427.5451235827566 L 204.6339578808927 470.85421017004836 L 184.3676349865039 475.3458336507384 L 169.0751377267447 444.5625062853668 Z'),
								_Utils_Tuple2(64, 'M 748.737696402512 422.8692565985979 L 769.2035398230088 439.8717948717949 L 793.3068011675518 481.3367437311158 L 830.1385503643206 514.7819421921527 L 877.7910770593517 528.0722551206347 L 902.156019598363 555.2376625947151 L 905.221238938053 584.9358974358975 L 900.5311104180789 584.9357607838976 L 854.3920636187129 584.1739074999078 L 808.0499069181932 574.2557230082033 L 762.7949387862427 553.8938739661686 L 729.7808996754146 516.6397385797659 L 708.5937574511081 472.2667907511999 L 712.5950670155473 425.5222232629862 Z'),
								_Utils_Tuple2(65, 'M 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 526.0455232150357 434.9211188349346 L 528.3545717175713 454.15966892424854 L 529.9428185719211 482.8204261963117 L 577.2214015119979 491.0281396147294 L 586.0212801344824 537.8844254115654 L 577.2948327570851 561.7828344021752 L 529.1567305262728 557.7002192882867 L 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 518.0667788316039 552.210589292851 L 481.90904174485433 564.5158006987292 L 456.779126349408 550.5928573794451 L 470.88087517740166 516.5936338755142 L 504.67833791947805 485.6655113327942 L 519.0823748163759 438.1443801481703 Z'),
								_Utils_Tuple2(66, 'M 418.77160695137354 522.7225942026275 L 427.08028946190996 571.2903578220214 L 436.1946902654867 603.6538461538462 L 396.129073629804 615.154659938589 L 361.11876998884145 617.660707987174 L 314.2528369373631 617.6973454156155 L 266.9100119426811 621.9376739858706 L 227.9591489907823 648.5891412705569 L 199.83989536361838 686.0473266635812 L 178.23008849557522 730 L 173.53982300884954 730 L 174.5884414030675 726.3667214724121 L 195.14963739514837 681.3678469850724 L 223.2688832351006 643.9096538227316 L 260.8479747715263 615.8895674758492 L 294.7806918262719 579.5519988963372 L 335.89222276392707 555.0562343468355 L 374.150385814132 523.0442502546853 Z M 378.8189697002036 527.7564871608507 L 361.91277323641856 553.5757156188322 L 408.93237929887573 557.800695648931 L 411.90505681358104 556.1704669378026 L 416.30377300331827 529.3116839479554 Z'),
								_Utils_Tuple2(67, 'M 675.2899342152006 519.5345550152273 L 716.9737647136122 543.4559040732235 L 760.2759873195776 561.0865240204165 L 802.9582082050117 584.0152080934758 L 841.2480552126284 616.0056594764185 L 885.7744288776777 637.0944286632847 L 917.2155403458025 675.9178770787948 L 941.992697830063 716.7104784228121 L 947.433628318584 730 L 942.7433628318583 730 L 937.6841230415089 721.0091520356306 L 912.5252748908712 680.5973642265608 L 881.0841633873821 641.7739158463335 L 836.2126662184681 621.0294770638433 L 787.9498408748741 613.0275474870782 L 741.0619468990851 613.0128205163821 L 694.159327732601 613.0127848976505 L 647.7102157499137 612.5602842620904 L 600.3539823008849 608.3333333333334 L 602.1477561853486 596.085578952793 L 613.7138311060248 548.7305885058786 L 628.3615336514536 519.282931550589 Z M 624.9299053308282 529.3169315799856 L 628.9622001989881 556.5415825567352 L 677.2401834848409 558.7709420672177 L 684.7305895528737 552.8631975125566 L 673.6317834664732 525.8702545236148 Z'),
								_Utils_Tuple2(68, 'M 416.30377300331827 529.3116839479554 L 411.90505681358104 556.1704669378026 L 408.93237929887573 557.800695648931 L 361.91277323641856 553.5757156188322 L 378.8189697002036 527.7564871608507 Z'),
								_Utils_Tuple2(69, 'M 673.6317834664732 525.8702545236148 L 684.7305895528737 552.8631975125566 L 677.2401834848409 558.7709420672177 L 628.9622001989881 556.5415825567352 L 624.9299053308282 529.3169315799856 Z'),
								_Utils_Tuple2(70, 'M 517.922147710025 554.1678515312043 L 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 520.6194690265487 561.5384615384615 L 520.6194690265487 608.3333333333334 L 520.6194690265487 622.3717948717949 L 480.9058499060062 632.0145004701083 L 440.88495575221236 603.6538461538462 L 473.54679772896 575.4072973471445 Z'),
								_Utils_Tuple2(71, 'M 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 528.1018972308368 558.7527152567521 L 573.2392274670437 579.2319318607107 L 595.6637168141592 608.3333333333334 L 565.0295145031666 628.8026892935732 L 520.6194690265487 622.3717948717949 L 520.6194690265487 608.3333333333334 L 520.6194690265487 561.5384615384615 Z'),
								_Utils_Tuple2(72, 'M 436.1946902654867 603.6538461538462 L 440.88495575221236 603.6538461538462 L 465.4500704810963 643.588950516511 L 453.1644953870757 689.3154458749641 L 454.95575221238937 730 L 450.26548672566366 730 L 449.1923188070398 717.0322402226329 L 443.89954308272894 670.8384940869096 L 417.1740800727418 655.3871569285234 L 370.5360147896014 655.1332383453911 L 323.0245529528397 659.2053141398131 L 296.9588979247958 689.3534045696226 L 295.4867256637168 730 L 272.0353982300885 730 L 225.13274336283183 730 L 178.23008849557522 730 L 199.83989536361838 686.0473266635812 L 227.9591489907823 648.5891412705569 L 266.9100119426811 621.9376739858706 L 314.2528369373631 617.6973454156155 L 361.11876998884145 617.660707987174 L 396.129073629804 615.154659938589 Z'),
								_Utils_Tuple2(73, 'M 440.88495575221236 603.6538461538462 L 480.9058499060062 632.0145004701083 L 520.6194690265487 622.3717948717949 L 565.0295145031666 628.8026892935732 L 595.6637168141592 608.3333333333334 L 570.7690704032516 648.8643579509511 L 590.2495260594517 693.2863643103999 L 590.9734513274336 697.2435897435898 L 575.5145807349143 675.2344847768321 L 535.4065200197269 669.9179695001974 L 525.3165016615719 715.9682900588589 L 525.3097345132743 730 L 501.858407079646 730 L 454.95575221238937 730 L 453.1644953870757 689.3154458749641 L 465.4500704810963 643.588950516511 Z'),
								_Utils_Tuple2(74, 'M 595.6637168141592 608.3333333333334 L 600.3539823008849 608.3333333333334 L 647.7102157499137 612.5602842620904 L 694.159327732601 613.0127848976505 L 741.0619468990851 613.0128205163821 L 787.9498408748741 613.0275474870782 L 836.2126662184681 621.0294770638433 L 881.0841633873821 641.7739158463335 L 912.5252748908712 680.5973642265608 L 937.6841230415089 721.0091520356306 L 942.7433628318583 730 L 938.0530973451326 730 L 891.150442477876 730 L 844.2477876106194 730 L 797.3451327433628 730 L 750.4424778761062 730 L 750.4409062003983 725.322080884484 L 747.5134719923374 676.7684288262228 L 721.4001244396025 651.3474085030385 L 675.4047641262475 650.4553266597709 L 628.5469485054953 655.1794603558092 L 595.9210168258826 678.7823497577051 L 590.9734513274336 697.2435897435898 L 590.2495260594517 693.2863643103999 L 570.7690704032516 648.8643579509511 Z'),
								_Utils_Tuple2(75, 'M 675.4047641262475 650.4553266597709 L 721.4001244396025 651.3474085030385 L 747.5134719923374 676.7684288262228 L 750.4409062003983 725.322080884484 L 750.4424778761062 730 L 736.3716814159292 730 L 689.4690265486726 730 L 642.566371681416 730 L 595.6637168141592 730 L 590.9734513274336 697.2435897435898 L 595.9210168258826 678.7823497577051 L 628.5469485054953 655.1794603558092 Z'),
								_Utils_Tuple2(76, 'M 370.5360147896014 655.1332383453911 L 417.1740800727418 655.3871569285234 L 443.89954308272894 670.8384940869096 L 449.1923188070398 717.0322402226329 L 450.26548672566366 730 L 436.1946902654867 730 L 389.29203539823004 730 L 342.3893805309734 730 L 295.4867256637168 730 L 296.9588979247958 689.3534045696226 L 323.0245529528397 659.2053141398131 Z'),
								_Utils_Tuple2(77, 'M 575.5145807349143 675.2344847768321 L 590.9734513274336 697.2435897435898 L 595.6637168141592 730 L 572.2123893805309 730 L 525.3097345132743 730 L 525.3165016615719 715.9682900588589 L 535.4065200197269 669.9179695001974 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 46303.18823892044,
							q: -1,
							r: {b: 77.38938053097344, a: 77.21153846153847},
							c: 0,
							z: _List_fromArray(
								[1, 36, 45]),
							a4: _List_Nil,
							u: {b: 77.38938053097344, a: 77.21153846153847}
						},
							{
							bF: 8051.57560982195,
							q: -1,
							r: {b: 189.95575221238937, a: 236.31410256410257},
							c: 1,
							z: _List_fromArray(
								[0, 2]),
							a4: _List_Nil,
							u: {b: 189.95575221238937, a: 236.31410256410257}
						},
							{
							bF: 28982.078943913893,
							q: -1,
							r: {b: 227.47787610619469, a: 156.76282051282053},
							c: 2,
							z: _List_fromArray(
								[1, 3, 29, 34, 37, 46]),
							a4: _List_Nil,
							u: {b: 227.47787610619469, a: 156.76282051282053}
						},
							{
							bF: 2477.6308423863093,
							q: -1,
							r: {b: 227.47787610619469, a: 30.416666666666668},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 227.47787610619469, a: 30.416666666666668}
						},
							{
							bF: 15297.300798845765,
							q: -1,
							r: {b: 316.59292035398227, a: 77.21153846153847},
							c: 4,
							z: _List_fromArray(
								[3, 5, 6, 22]),
							a4: _List_Nil,
							u: {b: 316.59292035398227, a: 77.21153846153847}
						},
							{
							bF: 4564.965102224658,
							q: -1,
							r: {b: 363.49557522123894, a: 30.416666666666668},
							c: 5,
							z: _List_fromArray(
								[4]),
							a4: _List_Nil,
							u: {b: 363.49557522123894, a: 30.416666666666668}
						},
							{
							bF: 6485.877099124547,
							q: -1,
							r: {b: 447.92035398230087, a: 67.8525641025641},
							c: 6,
							z: _List_fromArray(
								[4, 7, 18]),
							a4: _List_Nil,
							u: {b: 447.92035398230087, a: 67.8525641025641}
						},
							{
							bF: 4725.148428904787,
							q: -1,
							r: {b: 527.6548672566371, a: 25.73717948717949},
							c: 7,
							z: _List_fromArray(
								[6, 8]),
							a4: _List_Nil,
							u: {b: 527.6548672566371, a: 25.73717948717949}
						},
							{
							bF: 5050.37510469659,
							q: -1,
							r: {b: 598.0088495575221, a: 58.493589743589745},
							c: 8,
							z: _List_fromArray(
								[7, 9, 19]),
							a4: _List_Nil,
							u: {b: 598.0088495575221, a: 58.493589743589745}
						},
							{
							bF: 5751.006249224414,
							q: -1,
							r: {b: 640.221238938053, a: 86.57051282051283},
							c: 9,
							z: _List_fromArray(
								[8, 10, 11, 23]),
							a4: _List_Nil,
							u: {b: 640.221238938053, a: 86.57051282051283}
						},
							{
							bF: 3812.308152135778,
							q: -1,
							r: {b: 644.9115044247787, a: 30.416666666666668},
							c: 10,
							z: _List_fromArray(
								[9]),
							a4: _List_Nil,
							u: {b: 644.9115044247787, a: 30.416666666666668}
						},
							{
							bF: 7259.320297161445,
							q: -1,
							r: {b: 734.0265486725664, a: 35.09615384615385},
							c: 11,
							z: _List_fromArray(
								[9, 12, 28]),
							a4: _List_Nil,
							u: {b: 734.0265486725664, a: 35.09615384615385}
						},
							{
							bF: 3459.315909985682,
							q: -1,
							r: {b: 776.2389380530973, a: 7.01923076923077},
							c: 12,
							z: _List_fromArray(
								[11, 13, 24]),
							a4: _List_Nil,
							u: {b: 776.2389380530973, a: 7.01923076923077}
						},
							{
							bF: 6200.9700543497165,
							q: -1,
							r: {b: 809.0707964601769, a: 21.05769230769231},
							c: 13,
							z: _List_fromArray(
								[12, 14, 20]),
							a4: _List_Nil,
							u: {b: 809.0707964601769, a: 21.05769230769231}
						},
							{
							bF: 5733.528957797855,
							q: -1,
							r: {b: 870.0442477876105, a: 25.73717948717949},
							c: 14,
							z: _List_fromArray(
								[13, 15]),
							a4: _List_Nil,
							u: {b: 870.0442477876105, a: 25.73717948717949}
						},
							{
							bF: 4974.219916712911,
							q: -1,
							r: {b: 959.1592920353982, a: 58.493589743589745},
							c: 15,
							z: _List_fromArray(
								[14, 16, 21, 26]),
							a4: _List_Nil,
							u: {b: 959.1592920353982, a: 58.493589743589745}
						},
							{
							bF: 4940.875218528414,
							q: -1,
							r: {b: 1001.3716814159292, a: 86.57051282051283},
							c: 16,
							z: _List_fromArray(
								[15, 17, 26]),
							a4: _List_Nil,
							u: {b: 1001.3716814159292, a: 86.57051282051283}
						},
							{
							bF: 4371.46186543916,
							q: -1,
							r: {b: 1006.0619469026548, a: 30.416666666666668},
							c: 17,
							z: _List_fromArray(
								[16]),
							a4: _List_Nil,
							u: {b: 1006.0619469026548, a: 30.416666666666668}
						},
							{
							bF: 3130.3335479323305,
							q: -1,
							r: {b: 485.4424778761062, a: 105.28846153846155},
							c: 18,
							z: _List_fromArray(
								[6, 19, 27]),
							a4: _List_Nil,
							u: {b: 485.4424778761062, a: 105.28846153846155}
						},
							{
							bF: 3057.9258679263294,
							q: -1,
							r: {b: 546.4159292035398, a: 105.28846153846155},
							c: 19,
							z: _List_fromArray(
								[8, 18, 27]),
							a4: _List_Nil,
							u: {b: 546.4159292035398, a: 105.28846153846155}
						},
							{
							bF: 2833.540277934557,
							q: -1,
							r: {b: 851.2831858407079, a: 109.96794871794873},
							c: 20,
							z: _List_fromArray(
								[13, 21, 25]),
							a4: _List_Nil,
							u: {b: 851.2831858407079, a: 109.96794871794873}
						},
							{
							bF: 2919.5362984981402,
							q: -1,
							r: {b: 907.5663716814158, a: 105.28846153846155},
							c: 21,
							z: _List_fromArray(
								[15, 20, 25]),
							a4: _List_Nil,
							u: {b: 907.5663716814158, a: 105.28846153846155}
						},
							{
							bF: 8400.410095242849,
							q: -1,
							r: {b: 419.77876106194685, a: 133.3653846153846},
							c: 22,
							z: _List_fromArray(
								[4, 27, 29, 31]),
							a4: _List_Nil,
							u: {b: 419.77876106194685, a: 133.3653846153846}
						},
							{
							bF: 4941.121792843882,
							q: -1,
							r: {b: 616.7699115044247, a: 133.3653846153846},
							c: 23,
							z: _List_fromArray(
								[9, 27, 28]),
							a4: _List_Nil,
							u: {b: 616.7699115044247, a: 133.3653846153846}
						},
							{
							bF: 3933.27892714669,
							q: -1,
							r: {b: 799.6902654867256, a: 138.0448717948718},
							c: 24,
							z: _List_fromArray(
								[12, 25, 28]),
							a4: _List_Nil,
							u: {b: 799.6902654867256, a: 138.0448717948718}
						},
							{
							bF: 26231.73906693035,
							q: -1,
							r: {b: 837.2123893805309, a: 208.2371794871795},
							c: 25,
							z: _List_fromArray(
								[20, 21, 24, 26, 33, 35, 40, 49]),
							a4: _List_Nil,
							u: {b: 837.2123893805309, a: 208.2371794871795}
						},
							{
							bF: 5797.494924331229,
							q: -1,
							r: {b: 968.5398230088495, a: 133.3653846153846},
							c: 26,
							z: _List_fromArray(
								[15, 16, 25, 30]),
							a4: _List_Nil,
							u: {b: 968.5398230088495, a: 133.3653846153846}
						},
							{
							bF: 31708.649000307596,
							q: -1,
							r: {b: 504.20353982300884, a: 240.99358974358975},
							c: 27,
							z: _List_fromArray(
								[18, 19, 22, 23, 32, 35, 41, 44, 47, 48]),
							a4: _List_Nil,
							u: {b: 504.20353982300884, a: 240.99358974358975}
						},
							{
							bF: 10352.816441601193,
							q: -1,
							r: {b: 729.3362831858407, a: 170.80128205128207},
							c: 28,
							z: _List_fromArray(
								[11, 23, 24, 35]),
							a4: _List_Nil,
							u: {b: 729.3362831858407, a: 170.80128205128207}
						},
							{
							bF: 1078.6853981892982,
							q: -1,
							r: {b: 293.14159292035396, a: 147.40384615384616},
							c: 29,
							z: _List_fromArray(
								[2, 22]),
							a4: _List_Nil,
							u: {b: 293.14159292035396, a: 147.40384615384616}
						},
							{
							bF: 10593.300885516728,
							q: -1,
							r: {b: 1006.0619469026548, a: 203.55769230769232},
							c: 30,
							z: _List_fromArray(
								[26, 33]),
							a4: _List_Nil,
							u: {b: 1006.0619469026548, a: 203.55769230769232}
						},
							{
							bF: 7206.005000827678,
							q: -1,
							r: {b: 396.32743362831854, a: 194.19871794871796},
							c: 31,
							z: _List_fromArray(
								[22, 34, 38]),
							a4: _List_Nil,
							u: {b: 396.32743362831854, a: 194.19871794871796}
						},
							{
							bF: 1499.4878335657631,
							q: -1,
							r: {b: 551.1061946902655, a: 184.8397435897436},
							c: 32,
							z: _List_fromArray(
								[27]),
							a4: _List_Nil,
							u: {b: 551.1061946902655, a: 184.8397435897436}
						},
							{
							bF: 13890.859762280044,
							q: -1,
							r: {b: 931.0176991150443, a: 236.31410256410257},
							c: 33,
							z: _List_fromArray(
								[25, 30]),
							a4: _List_Nil,
							u: {b: 931.0176991150443, a: 236.31410256410257}
						},
							{
							bF: 1056.8416602236175,
							q: -1,
							r: {b: 335.3539823008849, a: 198.87820512820514},
							c: 34,
							z: _List_fromArray(
								[2, 31, 38]),
							a4: _List_Nil,
							u: {b: 335.3539823008849, a: 198.87820512820514}
						},
							{
							bF: 8488.556891617307,
							q: -1,
							r: {b: 724.646017699115, a: 273.75},
							c: 35,
							z: _List_fromArray(
								[25, 27, 28]),
							a4: _List_Nil,
							u: {b: 724.646017699115, a: 273.75}
						},
							{
							bF: 4344.879817952326,
							q: -1,
							r: {b: 21.106194690265486, a: 334.58333333333337},
							c: 36,
							z: _List_fromArray(
								[0, 39, 55]),
							a4: _List_Nil,
							u: {b: 21.106194690265486, a: 334.58333333333337}
						},
							{
							bF: 8235.952469324158,
							q: -1,
							r: {b: 283.76106194690266, a: 339.26282051282055},
							c: 37,
							z: _List_fromArray(
								[2, 38, 44, 50]),
							a4: _List_Nil,
							u: {b: 283.76106194690266, a: 339.26282051282055}
						},
							{
							bF: 8287.879266685351,
							q: -1,
							r: {b: 335.3539823008849, a: 273.75},
							c: 38,
							z: _List_fromArray(
								[31, 34, 37]),
							a4: _List_Nil,
							u: {b: 335.3539823008849, a: 273.75}
						},
							{
							bF: 3705.908411546362,
							q: -1,
							r: {b: 30.48672566371681, a: 273.75},
							c: 39,
							z: _List_fromArray(
								[36]),
							a4: _List_Nil,
							u: {b: 30.48672566371681, a: 273.75}
						},
							{
							bF: 12602.273689824302,
							q: -1,
							r: {b: 893.4955752212389, a: 325.224358974359},
							c: 40,
							z: _List_fromArray(
								[25, 42, 54]),
							a4: _List_Nil,
							u: {b: 893.4955752212389, a: 325.224358974359}
						},
							{
							bF: 12024.344437976011,
							q: -1,
							r: {b: 508.8938053097345, a: 320.5448717948718},
							c: 41,
							z: _List_fromArray(
								[27, 43, 52, 53, 56]),
							a4: _List_Nil,
							u: {b: 508.8938053097345, a: 320.5448717948718}
						},
							{
							bF: 1645.0709159172256,
							q: -1,
							r: {b: 827.8318584070796, a: 287.78846153846155},
							c: 42,
							z: _List_fromArray(
								[40]),
							a4: _List_Nil,
							u: {b: 827.8318584070796, a: 287.78846153846155}
						},
							{
							bF: 1275.796147367757,
							q: -1,
							r: {b: 583.5512937298047, a: 291.7682699572705},
							c: 43,
							z: _List_fromArray(
								[41]),
							a4: _List_Nil,
							u: {b: 583.5512937298047, a: 291.7682699572705}
						},
							{
							bF: 1744.9566094045658,
							q: -1,
							r: {b: 390.83076927789915, a: 277.84550913066886},
							c: 44,
							z: _List_fromArray(
								[27, 37]),
							a4: _List_Nil,
							u: {b: 390.83076927789915, a: 277.84550913066886}
						},
							{
							bF: 2900.7120040304635,
							q: -1,
							r: {b: 124.29203539823008, a: 357.9807692307692},
							c: 45,
							z: _List_fromArray(
								[0, 46, 51]),
							a4: _List_Nil,
							u: {b: 124.29203539823008, a: 357.9807692307692}
						},
							{
							bF: 3047.3572139000607,
							q: -1,
							r: {b: 189.95575221238937, a: 357.9807692307692},
							c: 46,
							z: _List_fromArray(
								[2, 45, 51]),
							a4: _List_Nil,
							u: {b: 189.95575221238937, a: 357.9807692307692}
						},
							{
							bF: 1032.4052683341652,
							q: -1,
							r: {b: 433.84955752212386, a: 306.5064102564103},
							c: 47,
							z: _List_fromArray(
								[27, 51]),
							a4: _List_Nil,
							u: {b: 433.84955752212386, a: 306.5064102564103}
						},
							{
							bF: 3667.6120526227605,
							q: -1,
							r: {b: 663.6725663716813, a: 348.6217948717949},
							c: 48,
							z: _List_fromArray(
								[27, 49, 57]),
							a4: _List_Nil,
							u: {b: 663.6725663716813, a: 348.6217948717949}
						},
							{
							bF: 3640.373992915105,
							q: -1,
							r: {b: 729.3362831858407, a: 348.6217948717949},
							c: 49,
							z: _List_fromArray(
								[25, 48, 57]),
							a4: _List_Nil,
							u: {b: 729.3362831858407, a: 348.6217948717949}
						},
							{
							bF: 7358.149099726339,
							q: -1,
							r: {b: 321.283185840708, a: 381.37820512820514},
							c: 50,
							z: _List_fromArray(
								[37, 51, 59]),
							a4: _List_Nil,
							u: {b: 321.283185840708, a: 381.37820512820514}
						},
							{
							bF: 108090.27692713418,
							q: -1,
							r: {b: 152.43362831858406, a: 587.2756410256411},
							c: 51,
							z: _List_fromArray(
								[45, 46, 47, 50, 52, 53, 55, 58, 63, 65, 66, 70, 72]),
							a4: _List_Nil,
							u: {b: 152.43362831858406, a: 587.2756410256411}
						},
							{
							bF: 1132.1610141730634,
							q: -1,
							r: {b: 459.17373998857994, a: 342.59784354949386},
							c: 52,
							z: _List_fromArray(
								[41, 51]),
							a4: _List_Nil,
							u: {b: 459.17373998857994, a: 342.59784354949386}
						},
							{
							bF: 2434.5779929308774,
							q: -1,
							r: {b: 506.811425538286, a: 376.4857909564769},
							c: 53,
							z: _List_fromArray(
								[41, 51]),
							a4: _List_Nil,
							u: {b: 506.811425538286, a: 376.4857909564769}
						},
							{
							bF: 41154.142300514184,
							q: -1,
							r: {b: 987.3008849557522, a: 428.17307692307696},
							c: 54,
							z: _List_fromArray(
								[40, 57, 62]),
							a4: _List_Nil,
							u: {b: 987.3008849557522, a: 428.17307692307696}
						},
							{
							bF: 6367.774956642475,
							q: -1,
							r: {b: 21.106194690265486, a: 381.37820512820514},
							c: 55,
							z: _List_fromArray(
								[36, 51, 60]),
							a4: _List_Nil,
							u: {b: 21.106194690265486, a: 381.37820512820514}
						},
							{
							bF: 6408.5510592879145,
							q: -1,
							r: {b: 616.7699115044247, a: 386.0576923076923},
							c: 56,
							z: _List_fromArray(
								[41, 57, 58, 61]),
							a4: _List_Nil,
							u: {b: 616.7699115044247, a: 386.0576923076923}
						},
							{
							bF: 42503.495627709504,
							q: -1,
							r: {b: 963.8495575221239, a: 666.8269230769231},
							c: 57,
							z: _List_fromArray(
								[48, 49, 54, 56, 64, 65, 67, 71, 74]),
							a4: _List_Nil,
							u: {b: 963.8495575221239, a: 666.8269230769231}
						},
							{
							bF: 1437.753170632379,
							q: -1,
							r: {b: 513.5840707964602, a: 400.09615384615387},
							c: 58,
							z: _List_fromArray(
								[51, 56]),
							a4: _List_Nil,
							u: {b: 513.5840707964602, a: 400.09615384615387}
						},
							{
							bF: 1496.370214122573,
							q: -1,
							r: {b: 288.4513274336283, a: 395.4166666666667},
							c: 59,
							z: _List_fromArray(
								[50]),
							a4: _List_Nil,
							u: {b: 288.4513274336283, a: 395.4166666666667}
						},
							{
							bF: 11427.564645903785,
							q: -1,
							r: {b: 44.557522123893804, a: 460.9294871794872},
							c: 60,
							z: _List_fromArray(
								[55]),
							a4: _List_Nil,
							u: {b: 44.557522123893804, a: 460.9294871794872}
						},
							{
							bF: 3201.270481709129,
							q: -1,
							r: {b: 551.1061946902655, a: 432.85256410256414},
							c: 61,
							z: _List_fromArray(
								[56, 65]),
							a4: _List_Nil,
							u: {b: 551.1061946902655, a: 432.85256410256414}
						},
							{
							bF: 19540.079787569615,
							q: -1,
							r: {b: 855.9734513274336, a: 465.60897435897436},
							c: 62,
							z: _List_fromArray(
								[54, 64]),
							a4: _List_Nil,
							u: {b: 855.9734513274336, a: 465.60897435897436}
						},
							{
							bF: 1674.7999946874625,
							q: -1,
							r: {b: 189.95575221238937, a: 432.85256410256414},
							c: 63,
							z: _List_fromArray(
								[51]),
							a4: _List_Nil,
							u: {b: 189.95575221238937, a: 432.85256410256414}
						},
							{
							bF: 15036.15821312819,
							q: -1,
							r: {b: 752.787610619469, a: 484.3269230769231},
							c: 64,
							z: _List_fromArray(
								[57, 62]),
							a4: _List_Nil,
							u: {b: 752.787610619469, a: 484.3269230769231}
						},
							{
							bF: 8638.2746694964,
							q: -1,
							r: {b: 513.5840707964602, a: 512.4038461538462},
							c: 65,
							z: _List_fromArray(
								[51, 57, 61]),
							a4: _List_Nil,
							u: {b: 513.5840707964602, a: 512.4038461538462}
						},
							{
							bF: 10303.694896402216,
							q: -1,
							r: {b: 340.0442477876106, a: 582.5961538461539},
							c: 66,
							z: _List_fromArray(
								[51, 68, 72]),
							a4: _List_Nil,
							u: {b: 340.0442477876106, a: 582.5961538461539}
						},
							{
							bF: 13791.92059549311,
							q: -1,
							r: {b: 710.5752212389381, a: 577.9166666666667},
							c: 67,
							z: _List_fromArray(
								[57, 69, 74]),
							a4: _List_Nil,
							u: {b: 710.5752212389381, a: 577.9166666666667}
						},
							{
							bF: 1218.7394239668793,
							q: -1,
							r: {b: 391.6371681415929, a: 540.4807692307693},
							c: 68,
							z: _List_fromArray(
								[66]),
							a4: _List_Nil,
							u: {b: 391.6371681415929, a: 540.4807692307693}
						},
							{
							bF: 1593.9405449824117,
							q: -1,
							r: {b: 635.5309734513274, a: 540.4807692307693},
							c: 69,
							z: _List_fromArray(
								[67]),
							a4: _List_Nil,
							u: {b: 635.5309734513274, a: 540.4807692307693}
						},
							{
							bF: 3829.9850598737103,
							q: -1,
							r: {b: 476.0619469026548, a: 601.3141025641025},
							c: 70,
							z: _List_fromArray(
								[51, 71, 73]),
							a4: _List_Nil,
							u: {b: 476.0619469026548, a: 601.3141025641025}
						},
							{
							bF: 3565.3735662536346,
							q: -1,
							r: {b: 551.1061946902655, a: 601.3141025641025},
							c: 71,
							z: _List_fromArray(
								[57, 70, 73]),
							a4: _List_Nil,
							u: {b: 551.1061946902655, a: 601.3141025641025}
						},
							{
							bF: 17264.320077300523,
							q: -1,
							r: {b: 260.30973451327435, a: 666.8269230769231},
							c: 72,
							z: _List_fromArray(
								[51, 66, 73, 76]),
							a4: _List_Nil,
							u: {b: 260.30973451327435, a: 666.8269230769231}
						},
							{
							bF: 10048.570046015288,
							q: -1,
							r: {b: 490.13274336283183, a: 676.1858974358975},
							c: 73,
							z: _List_fromArray(
								[70, 71, 72, 74, 77]),
							a4: _List_Nil,
							u: {b: 490.13274336283183, a: 676.1858974358975}
						},
							{
							bF: 25472.136341008154,
							q: -1,
							r: {b: 804.3805309734513, a: 671.5064102564103},
							c: 74,
							z: _List_fromArray(
								[57, 67, 73, 75]),
							a4: _List_Nil,
							u: {b: 804.3805309734513, a: 671.5064102564103}
						},
							{
							bF: 11248.485856423154,
							q: -1,
							r: {b: 635.5309734513274, a: 690.224358974359},
							c: 75,
							z: _List_fromArray(
								[74, 77]),
							a4: _List_Nil,
							u: {b: 635.5309734513274, a: 690.224358974359}
						},
							{
							bF: 10413.759339201642,
							q: -1,
							r: {b: 330.6637168141593, a: 690.224358974359},
							c: 76,
							z: _List_fromArray(
								[72]),
							a4: _List_Nil,
							u: {b: 330.6637168141593, a: 690.224358974359}
						},
							{
							bF: 3430.4213368207566,
							q: -1,
							r: {b: 555.7964601769911, a: 694.9038461538462},
							c: 77,
							z: _List_fromArray(
								[73, 75]),
							a4: _List_Nil,
							u: {b: 555.7964601769911, a: 694.9038461538462}
						}
						]),
					bc: 1060
				});
		case '(a | b) & !c':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 480,
							bu: 36,
							k: _List_fromArray(
								[
									{
									ah: {b: 28.965517241379313, a: 28.965517241379313},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 0,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1]),
									a4: _List_Nil
								},
									{
									ah: {b: 26.20689655172414, a: 86.89655172413794},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 17]),
									a4: _List_Nil
								},
									{
									ah: {b: 89.65517241379311, a: 23.448275862068968},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 2,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 3, 10, 17]),
									a4: _List_Nil
								},
									{
									ah: {b: 169.6551724137931, a: 23.448275862068968},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 235.86206896551727, a: 62.06896551724138},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 4,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[3, 5, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 280, a: 84.13793103448276},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 6, 9, 12, 13, 14, 18]),
									a4: _List_Nil
								},
									{
									ah: {b: 282.7586206896552, a: 28.965517241379313},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 7]),
									a4: _List_Nil
								},
									{
									ah: {b: 337.93103448275866, a: 4.137931034482759},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 420.68965517241384, a: 78.62068965517241},
									aa: $elm$core$Maybe$Nothing,
									bl: 'c',
									c: 8,
									bo: $elm$core$Maybe$Just('c'),
									z: _List_fromArray(
										[7, 9, 12, 13, 15, 16, 21, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 359.9457047436357, a: 62.748333580359834},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 131.0344827586207, a: 108.96551724137932},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 11, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 188.96551724137933, a: 108.96551724137932},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 10, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 356.2057353888602, a: 74.20511306122337},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 288.5859688548067, a: 95.82386977102064},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 8, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 249.6551724137931, a: 131.0344827586207},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 15, 20, 21, 22, 24, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 353.5160374238918, a: 114.67635979841108},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 13, 14, 18]),
									a4: _List_Nil
								},
									{
									ah: {b: 417.93103448275866, a: 216.55172413793105},
									aa: $elm$core$Maybe$Nothing,
									bl: '!(c)',
									c: 16,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 19, 25, 27, 30, 33]),
									a4: _List_Nil
								},
									{
									ah: {b: 62.06896551724138, a: 131.0344827586207},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 17,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 2, 20, 23]),
									a4: _List_Nil
								},
									{
									ah: {b: 329.65517241379314, a: 108.96551724137932},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 18,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 517.2413793103449, a: 150.34482758620692},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 19,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16]),
									a4: _List_Nil
								},
									{
									ah: {b: 142.0689655172414, a: 216.55172413793105},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a | b)',
									c: 20,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 11, 14, 17, 26, 27, 28, 32]),
									a4: _List_Nil
								},
									{
									ah: {b: 287.00938245587895, a: 130.34208477862688},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 21,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 337.17845155842986, a: 162.18280496532594},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 22,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 14, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 42.758620689655174, a: 197.24137931034485},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 23,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[17]),
									a4: _List_Nil
								},
									{
									ah: {b: 274.48275862068965, a: 194.48275862068968},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 24,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[14, 27]),
									a4: _List_Nil
								},
									{
									ah: {b: 334.1775995042041, a: 180.3285771678576},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 25,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[14, 16, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 191.7241379310345, a: 183.44827586206898},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 26,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20]),
									a4: _List_Nil
								},
									{
									ah: {b: 291.0344827586207, a: 274.48275862068965},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 27,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16, 20, 24]),
									a4: _List_Nil
								},
									{
									ah: {b: 81.37931034482759, a: 324.1379310344828},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 28,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20, 29, 35]),
									a4: _List_Nil
								},
									{
									ah: {b: 125.51724137931035, a: 288.2758620689655},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 29,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[28]),
									a4: _List_Nil
								},
									{
									ah: {b: 448.2758620689655, a: 326.89655172413796},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 30,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16, 31, 34]),
									a4: _List_Nil
								},
									{
									ah: {b: 387.58620689655174, a: 291.0344827586207},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 31,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[30]),
									a4: _List_Nil
								},
									{
									ah: {b: 230.34482758620692, a: 351.72413793103453},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 32,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20, 33, 36]),
									a4: _List_Nil
								},
									{
									ah: {b: 302.0689655172414, a: 351.72413793103453},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 33,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16, 32, 36]),
									a4: _List_Nil
								},
									{
									ah: {b: 511.72413793103453, a: 406.89655172413796},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 34,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[30, 36, 38]),
									a4: _List_Nil
								},
									{
									ah: {b: 37.24137931034483, a: 404.1379310344828},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 35,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[28, 36, 37]),
									a4: _List_Nil
								},
									{
									ah: {b: 238.62068965517244, a: 426.2068965517242},
									aa: $elm$core$Maybe$Nothing,
									bl: '((a | b) & !(c))',
									c: 36,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[32, 33, 34, 35, 39]),
									a4: _List_Nil
								},
									{
									ah: {b: 97.93103448275863, a: 442.7586206896552},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 37,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[35]),
									a4: _List_Nil
								},
									{
									ah: {b: 382.0689655172414, a: 442.7586206896552},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 38,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[34, 39]),
									a4: _List_Nil
								},
									{
									ah: {b: 307.58620689655174, a: 445.51724137931035},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 39,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36, 38]),
									a4: _List_Nil
								}
								]),
							bc: 560
						}),
					dG: true,
					cg: 1.0000000000000004,
					a0: 480,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 49.65517241379311 0 L 55.17241379310345 0 L 63.44827586206897 27.586206896551726 L 57.931034482758626 60.689655172413794 L 49.65517241379311 60.689655172413794 L 0 60.689655172413794 L 0 49.65517241379311 Z'),
								_Utils_Tuple2(1, 'M 55.17241379310345 0 L 57.931034482758626 0 L 66.20689655172414 22.06896551724138 L 63.44827586206897 57.931034482758626 L 63.44827586206897 107.58620689655173 L 41.37931034482759 113.10344827586208 L 0 113.10344827586208 L 0 110.3448275862069 L 0 60.689655172413794 L 49.65517241379311 60.689655172413794 L 57.931034482758626 60.689655172413794 L 63.44827586206897 27.586206896551726 Z'),
								_Utils_Tuple2(2, 'M 57.931034482758626 0 L 107.58620689655173 0 L 146.20689655172416 0 L 143.44827586206898 33.10344827586207 L 102.06896551724138 35.862068965517246 L 96.55172413793105 49.65517241379311 L 146.20689655172416 49.65517241379311 L 154.48275862068965 49.65517241379311 L 158.6206896551724 51.0344827586207 L 158.6206896551724 51.0344827586207 L 157.24137931034483 55.17241379310345 L 157.24137931034483 80 L 151.7241379310345 80 L 102.06896551724138 82.75862068965517 L 102.06896551724138 107.58620689655173 L 88.27586206896552 107.58620689655173 L 84.13793103448276 108.96551724137932 L 84.13793103448276 108.96551724137932 L 80 107.58620689655173 L 63.44827586206897 107.58620689655173 L 63.44827586206897 57.931034482758626 L 66.20689655172414 22.06896551724138 Z'),
								_Utils_Tuple2(3, 'M 146.20689655172416 0 L 195.86206896551727 0 L 226.20689655172416 0 L 226.20689655172416 49.65517241379311 L 212.41379310344828 49.65517241379311 L 162.75862068965517 49.65517241379311 L 158.6206896551724 51.0344827586207 L 158.6206896551724 51.0344827586207 L 154.48275862068965 49.65517241379311 L 146.20689655172416 49.65517241379311 L 96.55172413793105 49.65517241379311 L 102.06896551724138 35.862068965517246 L 143.44827586206898 33.10344827586207 Z'),
								_Utils_Tuple2(4, 'M 226.20689655172416 0 L 261.01862106712434 0 L 250.86096957375662 22.100261851566053 L 253.20077816623007 64.40680012855479 L 246.62130077272462 102.02722555428768 L 236.11171592386964 104.85898762115299 L 234.02724531238377 107.6068990080246 L 232.9068273738347 111.7359021523011 L 232.9068273738347 111.7359021523011 L 228.9643162861537 110.34485606304447 L 220.6896551724138 110.3448275862069 L 215.17241379310346 80 L 165.51724137931035 74.48275862068967 L 162.75862068965517 52.41379310344828 L 158.6206896551724 51.0344827586207 L 158.6206896551724 51.0344827586207 L 162.75862068965517 49.65517241379311 L 212.41379310344828 49.65517241379311 L 226.20689655172416 49.65517241379311 Z'),
								_Utils_Tuple2(5, 'M 261.01862106712434 0 L 263.51846252124614 0 L 253.43380527786243 27.617810787797872 L 259.71115156900555 57.92794362702092 L 307.3917462623853 46.458894045841326 L 336.53827508399024 45.69626022600121 L 331.64520220025565 15.51175266380271 L 337.2358418724832 14.105408823413782 L 335.5509080939691 18.490628046188274 L 343.59473073877183 47.34347936170684 L 323.5384280617094 50.72741101541876 L 322.62251498840715 56.97864342291211 L 352.4245852630431 58.79035833118643 L 311.8224989595246 59.75476590159975 L 291.98380493956506 69.21969301000387 L 335.026707361456 63.89775139447128 L 361.1032018326348 71.1579810763707 L 349.74497631098285 68.79237449132958 L 306.7993615081351 68.67032898383258 L 282.47234714181354 80.52907194373252 L 319.48621113266796 71.22859810631667 L 351.87849302921387 73.34191831622284 L 354.25495336016934 79.35883074839185 L 337.7148658559146 76.7004920501417 L 292.20525184221265 81.70007820309083 L 275.6074574604102 94.23092648219449 L 281.2684122781395 106.15619475038115 L 295.52519378553467 104.05817347873689 L 297.31562866147533 94.3496507944488 L 339.89356895502755 91.52646075092986 L 341.25775461218757 102.25084994281346 L 311.5775762646784 102.0255620092464 L 310.74916121575535 113.4986939472432 L 294.9674539234359 113.10948992990926 L 247.84428691267712 108.30430656275459 L 238.03568130126365 107.6872214053673 L 236.18260750323228 110.41888771861353 L 232.9068273738347 111.7359021523011 L 234.02724531238377 107.6068990080246 L 236.11171592386964 104.85898762115299 L 246.62130077272462 102.02722555428768 L 253.20077816623007 64.40680012855479 L 250.86096957375662 22.100261851566053 Z'),
								_Utils_Tuple2(6, 'M 263.51846252124614 0 L 312.3927481669903 0 L 318.4059475685724 0 L 335.1996236614694 9.143810399396063 L 337.2358418724832 14.105408823413782 L 337.2358418724832 14.105408823413782 L 331.64520220025565 15.51175266380271 L 336.53827508399024 45.69626022600121 L 307.3917462623853 46.458894045841326 L 259.71115156900555 57.92794362702092 L 253.43380527786243 27.617810787797872 Z'),
								_Utils_Tuple2(7, 'M 318.4059475685724 0 L 359.9156702767691 0 L 357.26277494486635 12.21089030721968 L 342.9448162252672 12.525357753855621 L 337.2358418724832 14.105408823413782 L 337.2358418724832 14.105408823413782 L 335.1996236614694 9.143810399396063 Z'),
								_Utils_Tuple2(8, 'M 359.9156702767691 0 L 407.9164733734886 0 L 455.1724137931035 0 L 504.82758620689657 0 L 554.4827586206897 0 L 560 0 L 560 49.65517241379311 L 560 99.31034482758622 L 560 104.82758620689656 L 513.1034482758621 110.3448275862069 L 502.0689655172414 113.10344827586208 L 488.2758620689655 124.13793103448276 L 482.75862068965523 135.17241379310346 L 444.1379310344828 137.93103448275863 L 444.1379310344828 162.75862068965517 L 397.6971406854338 165.08627974318622 L 354.62158944196574 176.38097373923844 L 355.4625854111214 172.27120898884544 L 343.06410501661196 173.00946194873467 L 365.4747954722025 164.50087090972735 L 369.2613294934616 150.68465684994706 L 330.9472767077927 150.58399207322003 L 363.4772759240528 143.61490740199702 L 333.9599179234132 139.9697602540669 L 356.29241041721843 131.4318443776202 L 312.74699648760986 132.90477639354654 L 312.1530857412347 128.1610381850646 L 358.01922299874497 126.65335503385974 L 369.9502925611306 125.16073846501615 L 382.59751324542464 106.44796850484228 L 384.6269531733406 94.43017504757853 L 356.71937196247455 86.55790942231079 L 354.25495336016934 79.35883074839185 L 366.16970677359626 82.3445014103275 L 361.1032018326348 71.1579810763707 L 375.66025820975364 76.01458578679967 L 373.5590947647831 71.71385901019433 L 378.4807683265641 73.72572478841502 L 364.80216054901234 65.92540349945266 L 369.235366049147 64.77052217271981 L 356.84349909575275 50.07904542535431 L 343.04872713609524 15.65914364494208 L 337.2358418724832 14.105408823413782 L 337.2358418724832 14.105408823413782 L 342.9448162252672 12.525357753855621 L 357.26277494486635 12.21089030721968 Z'),
								_Utils_Tuple2(9, 'M 337.2358418724832 14.105408823413782 L 337.2358418724832 14.105408823413782 L 343.04872713609524 15.65914364494208 L 356.84349909575275 50.07904542535431 L 369.235366049147 64.77052217271981 L 364.80216054901234 65.92540349945266 L 378.4807683265641 73.72572478841502 L 373.5590947647831 71.71385901019433 L 375.66025820975364 76.01458578679967 L 361.1032018326348 71.1579810763707 L 335.026707361456 63.89775139447128 L 291.98380493956506 69.21969301000387 L 311.8224989595246 59.75476590159975 L 352.4245852630431 58.79035833118643 L 322.62251498840715 56.97864342291211 L 323.5384280617094 50.72741101541876 L 343.59473073877183 47.34347936170684 L 335.5509080939691 18.490628046188274 Z'),
								_Utils_Tuple2(10, 'M 158.6206896551724 51.0344827586207 L 158.6206896551724 51.0344827586207 L 160 55.17241379310345 L 160 104.82758620689656 L 160 121.37931034482759 L 146.20689655172416 126.89655172413794 L 132.41379310344828 137.93103448275863 L 96.55172413793105 124.13793103448276 L 88.27586206896552 110.3448275862069 L 84.13793103448276 108.96551724137932 L 84.13793103448276 108.96551724137932 L 88.27586206896552 107.58620689655173 L 102.06896551724138 107.58620689655173 L 102.06896551724138 82.75862068965517 L 151.7241379310345 80 L 157.24137931034483 80 L 157.24137931034483 55.17241379310345 Z'),
								_Utils_Tuple2(11, 'M 158.6206896551724 51.0344827586207 L 162.75862068965517 52.41379310344828 L 165.51724137931035 74.48275862068967 L 215.17241379310346 80 L 220.6896551724138 110.3448275862069 L 228.9643162861537 110.34485606304447 L 232.9068273738347 111.7359021523011 L 232.9068273738347 111.7359021523011 L 231.67499641583308 115.86590634200611 L 206.89655172413794 132.41379310344828 L 190.34482758620692 137.93103448275863 L 176.55172413793105 126.89655172413794 L 160 121.37931034482759 L 160 104.82758620689656 L 160 55.17241379310345 Z'),
								_Utils_Tuple2(12, 'M 306.7993615081351 68.67032898383258 L 349.74497631098285 68.79237449132958 L 361.1032018326348 71.1579810763707 L 366.16970677359626 82.3445014103275 L 354.25495336016934 79.35883074839185 L 351.87849302921387 73.34191831622284 L 319.48621113266796 71.22859810631667 L 282.47234714181354 80.52907194373252 Z'),
								_Utils_Tuple2(13, 'M 292.20525184221265 81.70007820309083 L 337.7148658559146 76.7004920501417 L 354.25495336016934 79.35883074839185 L 356.71937196247455 86.55790942231079 L 384.6269531733406 94.43017504757853 L 382.59751324542464 106.44796850484228 L 381.9243149359749 99.77849334811043 L 358.9798222313947 94.84595040627356 L 360.5166131102343 104.2685691685998 L 341.25775461218757 102.25084994281346 L 339.89356895502755 91.52646075092986 L 297.31562866147533 94.3496507944488 L 295.52519378553467 104.05817347873689 L 281.2684122781395 106.15619475038115 L 275.6074574604102 94.23092648219449 Z'),
								_Utils_Tuple2(14, 'M 247.84428691267712 108.30430656275459 L 294.9674539234359 113.10948992990926 L 310.74916121575535 113.4986939472432 L 312.1530857412347 128.1610381850646 L 296.30514461748567 126.74467577477503 L 295.4156624906271 120.66782204990804 L 277.0625487552659 118.80379778175694 L 271.71580376224415 122.79528091390227 L 273.5508509767506 138.12352871137352 L 313.78649336434523 145.95179541512258 L 274.7075034232354 144.3624610345849 L 313.7874640213665 151.11100137299277 L 330.9472767077927 150.58399207322003 L 313.70183288320715 153.61335964207612 L 279.4292712753728 153.6629344499606 L 285.4322942423917 165.38670718776302 L 326.64148100647543 169.86089785864468 L 326.00155621509174 173.78161785743188 L 325.47216623714235 178.32507694733823 L 318.9683244637178 185.30205056624416 L 318.9683244637178 185.30205056624416 L 312.62007949098904 178.28213541151487 L 312.47157456215587 174.29321755140262 L 302.78398103368284 170.57032259216473 L 258.46222580101323 158.98292257360757 L 242.038605029407 159.90554928307608 L 234.4808245088651 168.27591023779667 L 237.24137931034485 204.13793103448276 L 266.9505247826547 237.82954182852268 L 237.24137931034485 209.6551724137931 L 231.7241379310345 187.58620689655174 L 215.17241379310346 168.27586206896552 L 209.6551724137931 140.6896551724138 L 234.14132313945143 115.89455814852653 L 232.9068273738347 111.7359021523011 L 232.9068273738347 111.7359021523011 L 236.18260750323228 110.41888771861353 L 238.03568130126365 107.6872214053673 Z'),
								_Utils_Tuple2(15, 'M 358.9798222313947 94.84595040627356 L 381.9243149359749 99.77849334811043 L 382.59751324542464 106.44796850484228 L 369.9502925611306 125.16073846501615 L 358.01922299874497 126.65335503385974 L 312.1530857412347 128.1610381850646 L 310.74916121575535 113.4986939472432 L 340.9857998422685 113.6962267559803 L 341.25775461218757 102.25084994281346 L 360.5166131102343 104.2685691685998 Z'),
								_Utils_Tuple2(16, 'M 560 104.82758620689656 L 560 107.58620689655173 L 515.8620689655173 113.10344827586208 L 502.0689655172414 118.62068965517243 L 477.2413793103449 143.44827586206898 L 477.2413793103449 193.1034482758621 L 480.00000000000006 220.6896551724138 L 526.896551724138 234.48275862068968 L 560 234.48275862068968 L 560 284.1379310344828 L 560 333.7931034482759 L 560 364.1379310344828 L 535.1724137931035 339.3103448275862 L 524.1379310344828 328.2758620689655 L 480.00000000000006 306.2068965517242 L 435.86206896551727 286.89655172413796 L 416.55172413793105 267.58620689655174 L 383.448275862069 270.3448275862069 L 369.65517241379314 275.86206896551727 L 361.3793103448276 292.4137931034483 L 369.65517241379314 317.2413793103448 L 358.62068965517244 331.0344827586207 L 347.58620689655174 353.1034482758621 L 346.2068965517242 357.2413793103449 L 346.2068965517242 357.2413793103449 L 344.82758620689657 353.1034482758621 L 339.3103448275862 339.3103448275862 L 306.2068965517242 320 L 273.1034482758621 303.448275862069 L 271.72413793103453 299.3103448275863 L 275.86206896551727 300.68965517241384 L 308.9655172413793 317.2413793103448 L 336.55172413793105 317.2413793103448 L 339.3103448275862 281.3793103448276 L 342.76668572100175 233.65468956533684 L 358.9189020019089 187.72442800376163 L 326.1434543672597 192.32733673172697 L 318.9683244637178 185.30205056624416 L 340.3170511487662 187.6476923869805 L 352.0495613051729 185.53949603289698 L 360.484770134355 183.38603512552544 L 366.8554478936236 181.41270035667696 L 368.1059822868275 177.38889811566082 L 361.85219373458074 179.08379181986115 L 353.49706269994147 180.88035018134315 L 341.5821087766619 182.66263602282936 L 342.49433041738564 177.54237203356746 L 343.06410501661196 173.00946194873467 L 355.4625854111214 172.27120898884544 L 354.62158944196574 176.38097373923844 L 397.6971406854338 165.08627974318622 L 444.1379310344828 162.75862068965517 L 444.1379310344828 137.93103448275863 L 482.75862068965523 135.17241379310346 L 488.2758620689655 124.13793103448276 L 502.0689655172414 113.10344827586208 L 513.1034482758621 110.3448275862069 Z'),
								_Utils_Tuple2(17, 'M 63.44827586206897 107.58620689655173 L 80 107.58620689655173 L 84.13793103448276 108.96551724137932 L 84.13793103448276 108.96551724137932 L 82.75862068965517 113.10344827586208 L 110.3448275862069 140.6896551724138 L 104.82758620689656 168.27586206896552 L 88.27586206896552 187.58620689655174 L 91.0344827586207 234.48275862068968 L 57.931034482758626 267.58620689655174 L 38.62068965517241 284.1379310344828 L 0 292.4137931034483 L 0 289.65517241379314 L 35.862068965517246 281.3793103448276 L 57.931034482758626 259.3103448275862 L 85.51724137931035 234.48275862068968 L 88.27586206896552 209.6551724137931 L 85.51724137931035 160 L 49.65517241379311 157.24137931034483 L 0 154.48275862068965 L 0 113.10344827586208 L 41.37931034482759 113.10344827586208 Z'),
								_Utils_Tuple2(18, 'M 311.5775762646784 102.0255620092464 L 341.25775461218757 102.25084994281346 L 340.9857998422685 113.6962267559803 L 310.74916121575535 113.4986939472432 Z'),
								_Utils_Tuple2(19, 'M 560 107.58620689655173 L 560 157.24137931034483 L 560 206.89655172413794 L 560 234.48275862068968 L 526.896551724138 234.48275862068968 L 480.00000000000006 220.6896551724138 L 477.2413793103449 193.1034482758621 L 477.2413793103449 143.44827586206898 L 502.0689655172414 118.62068965517243 L 515.8620689655173 113.10344827586208 Z'),
								_Utils_Tuple2(20, 'M 84.13793103448276 108.96551724137932 L 84.13793103448276 108.96551724137932 L 88.27586206896552 110.3448275862069 L 96.55172413793105 124.13793103448276 L 132.41379310344828 137.93103448275863 L 146.20689655172416 126.89655172413794 L 160 121.37931034482759 L 176.55172413793105 126.89655172413794 L 190.34482758620692 137.93103448275863 L 206.89655172413794 132.41379310344828 L 231.67499641583308 115.86590634200611 L 232.9068273738347 111.7359021523011 L 232.9068273738347 111.7359021523011 L 234.14132313945143 115.89455814852653 L 209.6551724137931 140.6896551724138 L 215.17241379310346 168.27586206896552 L 231.7241379310345 187.58620689655174 L 237.24137931034485 209.6551724137931 L 266.9505247826547 237.82954182852268 L 262.0689655172414 253.79310344827587 L 248.27586206896552 267.58620689655174 L 206.89655172413794 270.3448275862069 L 206.89655172413794 317.2413793103448 L 237.24137931034485 317.2413793103448 L 267.58620689655174 297.93103448275866 L 271.72413793103453 299.3103448275863 L 271.72413793103453 299.3103448275863 L 267.58620689655174 300.68965517241384 L 240.00000000000003 320 L 217.93103448275863 325.51724137931035 L 195.86206896551727 355.86206896551727 L 194.48275862068965 360.00000000000006 L 194.48275862068965 360.00000000000006 L 193.1034482758621 355.86206896551727 L 176.55172413793105 325.51724137931035 L 168.27586206896552 317.2413793103448 L 173.79310344827587 306.2068965517242 L 173.79310344827587 278.62068965517244 L 148.96551724137933 264.82758620689657 L 115.86206896551725 267.58620689655174 L 102.06896551724138 275.86206896551727 L 55.17241379310345 289.65517241379314 L 16.551724137931036 297.93103448275866 L 0 300.68965517241384 L 0 292.4137931034483 L 38.62068965517241 284.1379310344828 L 57.931034482758626 267.58620689655174 L 91.0344827586207 234.48275862068968 L 88.27586206896552 187.58620689655174 L 104.82758620689656 168.27586206896552 L 110.3448275862069 140.6896551724138 L 82.75862068965517 113.10344827586208 Z M 176.55172413793105 168.27586206896552 L 176.55172413793105 201.3793103448276 L 223.44827586206898 201.3793103448276 L 223.44827586206898 187.58620689655174 L 212.41379310344828 168.27586206896552 Z'),
								_Utils_Tuple2(21, 'M 277.0625487552659 118.80379778175694 L 295.4156624906271 120.66782204990804 L 296.30514461748567 126.74467577477503 L 312.1530857412347 128.1610381850646 L 312.74699648760986 132.90477639354654 L 356.29241041721843 131.4318443776202 L 333.9599179234132 139.9697602540669 L 363.4772759240528 143.61490740199702 L 330.9472767077927 150.58399207322003 L 313.7874640213665 151.11100137299277 L 274.7075034232354 144.3624610345849 L 313.78649336434523 145.95179541512258 L 273.5508509767506 138.12352871137352 L 271.71580376224415 122.79528091390227 Z'),
								_Utils_Tuple2(22, 'M 330.9472767077927 150.58399207322003 L 369.2613294934616 150.68465684994706 L 365.4747954722025 164.50087090972735 L 343.06410501661196 173.00946194873467 L 326.00155621509174 173.78161785743188 L 326.64148100647543 169.86089785864468 L 285.4322942423917 165.38670718776302 L 279.4292712753728 153.6629344499606 L 313.70183288320715 153.61335964207612 Z'),
								_Utils_Tuple2(23, 'M 0 154.48275862068965 L 49.65517241379311 157.24137931034483 L 85.51724137931035 160 L 88.27586206896552 209.6551724137931 L 85.51724137931035 234.48275862068968 L 57.931034482758626 259.3103448275862 L 35.862068965517246 281.3793103448276 L 0 289.65517241379314 L 0 253.79310344827587 L 0 204.13793103448276 Z'),
								_Utils_Tuple2(24, 'M 302.78398103368284 170.57032259216473 L 312.47157456215587 174.29321755140262 L 312.62007949098904 178.28213541151487 L 318.9683244637178 185.30205056624416 L 318.9683244637178 185.30205056624416 L 315.088894859705 190.9336107790389 L 326.484012439791 238.96847344806798 L 324.2249497364233 248.10700263215892 L 314.75381098155174 247.19106631961264 L 266.9505247826547 237.82954182852268 L 237.24137931034485 204.13793103448276 L 234.4808245088651 168.27591023779667 L 242.038605029407 159.90554928307608 L 258.46222580101323 158.98292257360757 Z'),
								_Utils_Tuple2(25, 'M 326.00155621509174 173.78161785743188 L 343.06410501661196 173.00946194873467 L 342.49433041738564 177.54237203356746 L 341.5821087766619 182.66263602282936 L 353.49706269994147 180.88035018134315 L 361.85219373458074 179.08379181986115 L 368.1059822868275 177.38889811566082 L 366.8554478936236 181.41270035667696 L 360.484770134355 183.38603512552544 L 352.0495613051729 185.53949603289698 L 340.3170511487662 187.6476923869805 L 318.9683244637178 185.30205056624416 L 318.9683244637178 185.30205056624416 L 325.47216623714235 178.32507694733823 Z'),
								_Utils_Tuple2(26, 'M 212.41379310344828 168.27586206896552 L 223.44827586206898 187.58620689655174 L 223.44827586206898 201.3793103448276 L 176.55172413793105 201.3793103448276 L 176.55172413793105 168.27586206896552 Z'),
								_Utils_Tuple2(27, 'M 318.9683244637178 185.30205056624416 L 318.9683244637178 185.30205056624416 L 326.1434543672597 192.32733673172697 L 358.9189020019089 187.72442800376163 L 342.76668572100175 233.65468956533684 L 339.3103448275862 281.3793103448276 L 336.55172413793105 317.2413793103448 L 308.9655172413793 317.2413793103448 L 275.86206896551727 300.68965517241384 L 271.72413793103453 299.3103448275863 L 271.72413793103453 299.3103448275863 L 271.72413793103453 299.3103448275863 L 267.58620689655174 297.93103448275866 L 237.24137931034485 317.2413793103448 L 206.89655172413794 317.2413793103448 L 206.89655172413794 270.3448275862069 L 248.27586206896552 267.58620689655174 L 262.0689655172414 253.79310344827587 L 266.9505247826547 237.82954182852268 L 314.75381098155174 247.19106631961264 L 324.2249497364233 248.10700263215892 L 326.484012439791 238.96847344806798 L 315.088894859705 190.9336107790389 Z'),
								_Utils_Tuple2(28, 'M 148.96551724137933 264.82758620689657 L 173.79310344827587 278.62068965517244 L 173.79310344827587 306.2068965517242 L 168.27586206896552 317.2413793103448 L 176.55172413793105 325.51724137931035 L 193.1034482758621 355.86206896551727 L 194.48275862068965 360.00000000000006 L 190.34482758620692 358.62068965517244 L 154.48275862068965 364.1379310344828 L 148.96551724137933 366.89655172413796 L 99.31034482758622 366.89655172413796 L 49.65517241379311 366.89655172413796 L 0 366.89655172413796 L 0 350.3448275862069 L 0 300.68965517241384 L 16.551724137931036 297.93103448275866 L 55.17241379310345 289.65517241379314 L 102.06896551724138 275.86206896551727 L 115.86206896551725 267.58620689655174 Z M 118.62068965517243 270.3448275862069 L 104.82758620689656 278.62068965517244 L 107.58620689655173 303.448275862069 L 140.6896551724138 311.7241379310345 L 165.51724137931035 311.7241379310345 L 171.0344827586207 303.448275862069 L 171.0344827586207 281.3793103448276 L 154.48275862068965 270.3448275862069 Z'),
								_Utils_Tuple2(29, 'M 154.48275862068965 270.3448275862069 L 171.0344827586207 281.3793103448276 L 171.0344827586207 303.448275862069 L 165.51724137931035 311.7241379310345 L 140.6896551724138 311.7241379310345 L 107.58620689655173 303.448275862069 L 104.82758620689656 278.62068965517244 L 118.62068965517243 270.3448275862069 Z'),
								_Utils_Tuple2(30, 'M 416.55172413793105 267.58620689655174 L 435.86206896551727 286.89655172413796 L 480.00000000000006 306.2068965517242 L 524.1379310344828 328.2758620689655 L 535.1724137931035 339.3103448275862 L 560 364.1379310344828 L 560 366.89655172413796 L 548.9655172413793 361.3793103448276 L 499.3103448275862 361.3793103448276 L 449.65517241379314 361.3793103448276 L 400 361.3793103448276 L 350.3448275862069 355.86206896551727 L 346.2068965517242 357.2413793103449 L 347.58620689655174 353.1034482758621 L 358.62068965517244 331.0344827586207 L 369.65517241379314 317.2413793103448 L 361.3793103448276 292.4137931034483 L 369.65517241379314 275.86206896551727 L 383.448275862069 270.3448275862069 Z M 386.2068965517242 273.1034482758621 L 369.65517241379314 281.3793103448276 L 366.89655172413796 292.4137931034483 L 375.1724137931035 311.7241379310345 L 424.82758620689657 311.7241379310345 L 433.1034482758621 311.7241379310345 L 433.1034482758621 289.65517241379314 L 416.55172413793105 273.1034482758621 Z'),
								_Utils_Tuple2(31, 'M 416.55172413793105 273.1034482758621 L 433.1034482758621 289.65517241379314 L 433.1034482758621 311.7241379310345 L 424.82758620689657 311.7241379310345 L 375.1724137931035 311.7241379310345 L 366.89655172413796 292.4137931034483 L 369.65517241379314 281.3793103448276 L 386.2068965517242 273.1034482758621 Z'),
								_Utils_Tuple2(32, 'M 267.58620689655174 300.68965517241384 L 271.72413793103453 299.3103448275863 L 270.3448275862069 303.448275862069 L 270.3448275862069 353.1034482758621 L 270.3448275862069 372.4137931034483 L 259.3103448275862 375.1724137931035 L 242.75862068965517 388.96551724137936 L 212.41379310344828 377.93103448275866 L 195.86206896551727 364.1379310344828 L 194.48275862068965 360.00000000000006 L 194.48275862068965 360.00000000000006 L 195.86206896551727 355.86206896551727 L 217.93103448275863 325.51724137931035 L 240.00000000000003 320 Z'),
								_Utils_Tuple2(33, 'M 271.72413793103453 299.3103448275863 L 271.72413793103453 299.3103448275863 L 273.1034482758621 303.448275862069 L 306.2068965517242 320 L 339.3103448275862 339.3103448275862 L 344.82758620689657 353.1034482758621 L 346.2068965517242 357.2413793103449 L 346.2068965517242 357.2413793103449 L 342.0689655172414 358.62068965517244 L 336.55172413793105 375.1724137931035 L 300.68965517241384 383.448275862069 L 284.1379310344828 372.4137931034483 L 270.3448275862069 372.4137931034483 L 270.3448275862069 353.1034482758621 L 270.3448275862069 303.448275862069 Z'),
								_Utils_Tuple2(34, 'M 346.2068965517242 357.2413793103449 L 350.3448275862069 355.86206896551727 L 400 361.3793103448276 L 449.65517241379314 361.3793103448276 L 499.3103448275862 361.3793103448276 L 548.9655172413793 361.3793103448276 L 560 366.89655172413796 L 560 416.55172413793105 L 560 466.2068965517242 L 560 480.00000000000006 L 537.9310344827586 480.00000000000006 L 488.2758620689655 480.00000000000006 L 488.2758620689655 452.4137931034483 L 468.96551724137936 408.2758620689655 L 430.3448275862069 405.51724137931035 L 380.68965517241384 408.2758620689655 L 350.3448275862069 411.0344827586207 L 344.82758620689657 416.55172413793105 L 342.0689655172414 438.62068965517244 L 342.0689655172414 433.1034482758621 L 322.7586206896552 411.0344827586207 L 317.2413793103448 386.2068965517242 L 333.7931034482759 380.68965517241384 L 347.58620689655174 361.3793103448276 L 346.2068965517242 357.2413793103449 Z'),
								_Utils_Tuple2(35, 'M 190.34482758620692 358.62068965517244 L 194.48275862068965 360.00000000000006 L 194.48275862068965 360.00000000000006 L 193.1034482758621 364.1379310344828 L 209.6551724137931 380.68965517241384 L 220.6896551724138 386.2068965517242 L 217.93103448275863 411.0344827586207 L 198.62068965517244 433.1034482758621 L 201.3793103448276 480.00000000000006 L 198.62068965517244 480.00000000000006 L 198.62068965517244 460.68965517241384 L 195.86206896551727 411.0344827586207 L 146.20689655172416 405.51724137931035 L 96.55172413793105 408.2758620689655 L 55.17241379310345 424.82758620689657 L 44.13793103448276 460.68965517241384 L 44.13793103448276 480.00000000000006 L 0 480.00000000000006 L 0 466.2068965517242 L 0 416.55172413793105 L 0 366.89655172413796 L 49.65517241379311 366.89655172413796 L 99.31034482758622 366.89655172413796 L 148.96551724137933 366.89655172413796 L 154.48275862068965 364.1379310344828 Z'),
								_Utils_Tuple2(36, 'M 342.0689655172414 358.62068965517244 L 346.2068965517242 357.2413793103449 L 346.2068965517242 357.2413793103449 L 347.58620689655174 361.3793103448276 L 333.7931034482759 380.68965517241384 L 317.2413793103448 386.2068965517242 L 322.7586206896552 411.0344827586207 L 342.0689655172414 433.1034482758621 L 342.0689655172414 438.62068965517244 L 325.51724137931035 416.55172413793105 L 289.65517241379314 416.55172413793105 L 275.86206896551727 419.3103448275862 L 275.86206896551727 468.96551724137936 L 275.86206896551727 480.00000000000006 L 251.0344827586207 480.00000000000006 L 201.3793103448276 480.00000000000006 L 198.62068965517244 433.1034482758621 L 217.93103448275863 411.0344827586207 L 220.6896551724138 386.2068965517242 L 209.6551724137931 380.68965517241384 L 193.1034482758621 364.1379310344828 L 194.48275862068965 360.00000000000006 L 194.48275862068965 360.00000000000006 L 195.86206896551727 364.1379310344828 L 212.41379310344828 377.93103448275866 L 242.75862068965517 388.96551724137936 L 259.3103448275862 375.1724137931035 L 270.3448275862069 372.4137931034483 L 284.1379310344828 372.4137931034483 L 300.68965517241384 383.448275862069 L 336.55172413793105 375.1724137931035 Z'),
								_Utils_Tuple2(37, 'M 146.20689655172416 405.51724137931035 L 195.86206896551727 411.0344827586207 L 198.62068965517244 460.68965517241384 L 198.62068965517244 480.00000000000006 L 193.1034482758621 480.00000000000006 L 143.44827586206898 480.00000000000006 L 93.79310344827587 480.00000000000006 L 44.13793103448276 480.00000000000006 L 44.13793103448276 460.68965517241384 L 55.17241379310345 424.82758620689657 L 96.55172413793105 408.2758620689655 Z'),
								_Utils_Tuple2(38, 'M 430.3448275862069 405.51724137931035 L 468.96551724137936 408.2758620689655 L 488.2758620689655 452.4137931034483 L 488.2758620689655 480.00000000000006 L 441.3793103448276 480.00000000000006 L 391.72413793103453 480.00000000000006 L 342.0689655172414 480.00000000000006 L 342.0689655172414 438.62068965517244 L 344.82758620689657 416.55172413793105 L 350.3448275862069 411.0344827586207 L 380.68965517241384 408.2758620689655 Z'),
								_Utils_Tuple2(39, 'M 325.51724137931035 416.55172413793105 L 342.0689655172414 438.62068965517244 L 342.0689655172414 480.00000000000006 L 325.51724137931035 480.00000000000006 L 275.86206896551727 480.00000000000006 L 275.86206896551727 468.96551724137936 L 275.86206896551727 419.3103448275862 L 289.65517241379314 416.55172413793105 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 3645.184304399524,
							q: -1,
							r: {b: 28.965517241379313, a: 28.965517241379313},
							c: 0,
							z: _List_fromArray(
								[1]),
							a4: _List_Nil,
							u: {b: 28.965517241379313, a: 28.965517241379313}
						},
							{
							bF: 3489.179548156957,
							q: -1,
							r: {b: 26.20689655172414, a: 86.89655172413794},
							c: 1,
							z: _List_fromArray(
								[0, 2, 17]),
							a4: _List_Nil,
							u: {b: 26.20689655172414, a: 86.89655172413794}
						},
							{
							bF: 7320.808561236622,
							q: -1,
							r: {b: 89.65517241379311, a: 23.448275862068968},
							c: 2,
							z: _List_fromArray(
								[1, 3, 10, 17]),
							a4: _List_Nil,
							u: {b: 89.65517241379311, a: 23.448275862068968}
						},
							{
							bF: 4735.315101070153,
							q: -1,
							r: {b: 169.6551724137931, a: 23.448275862068968},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 169.6551724137931, a: 23.448275862068968}
						},
							{
							bF: 4731.59363331152,
							q: -1,
							r: {b: 235.86206896551727, a: 62.06896551724138},
							c: 4,
							z: _List_fromArray(
								[3, 5, 11]),
							a4: _List_Nil,
							u: {b: 235.86206896551727, a: 62.06896551724138}
						},
							{
							bF: 4249.852789945172,
							q: -1,
							r: {b: 280, a: 84.13793103448276},
							c: 5,
							z: _List_fromArray(
								[4, 6, 9, 12, 13, 14, 18]),
							a4: _List_Nil,
							u: {b: 280, a: 84.13793103448276}
						},
							{
							bF: 3793.449231606788,
							q: -1,
							r: {b: 282.7586206896552, a: 28.965517241379313},
							c: 6,
							z: _List_fromArray(
								[5, 7]),
							a4: _List_Nil,
							u: {b: 282.7586206896552, a: 28.965517241379313}
						},
							{
							bF: 369.74991478545394,
							q: -1,
							r: {b: 337.93103448275866, a: 4.137931034482759},
							c: 7,
							z: _List_fromArray(
								[6, 8]),
							a4: _List_Nil,
							u: {b: 337.93103448275866, a: 4.137931034482759}
						},
							{
							bF: 27974.58552865597,
							q: -1,
							r: {b: 420.68965517241384, a: 78.62068965517241},
							c: 8,
							z: _List_fromArray(
								[7, 9, 12, 13, 15, 16, 21, 22]),
							a4: _List_Nil,
							u: {b: 420.68965517241384, a: 78.62068965517241}
						},
							{
							bF: 1226.3954053414254,
							q: -1,
							r: {b: 359.9457047436357, a: 62.748333580359834},
							c: 9,
							z: _List_fromArray(
								[5, 8]),
							a4: _List_Nil,
							u: {b: 359.9457047436357, a: 62.748333580359834}
						},
							{
							bF: 3101.070154577881,
							q: -1,
							r: {b: 131.0344827586207, a: 108.96551724137932},
							c: 10,
							z: _List_fromArray(
								[2, 11, 20]),
							a4: _List_Nil,
							u: {b: 131.0344827586207, a: 108.96551724137932}
						},
							{
							bF: 3307.424526459935,
							q: -1,
							r: {b: 188.96551724137933, a: 108.96551724137932},
							c: 11,
							z: _List_fromArray(
								[4, 10, 20]),
							a4: _List_Nil,
							u: {b: 188.96551724137933, a: 108.96551724137932}
						},
							{
							bF: 344.67210639679615,
							q: -1,
							r: {b: 356.2057353888602, a: 74.20511306122337},
							c: 12,
							z: _List_fromArray(
								[5, 8]),
							a4: _List_Nil,
							u: {b: 356.2057353888602, a: 74.20511306122337}
						},
							{
							bF: 1589.3412154418675,
							q: -1,
							r: {b: 288.5859688548067, a: 95.82386977102064},
							c: 13,
							z: _List_fromArray(
								[5, 8, 15]),
							a4: _List_Nil,
							u: {b: 288.5859688548067, a: 95.82386977102064}
						},
							{
							bF: 4411.513920182622,
							q: -1,
							r: {b: 249.6551724137931, a: 131.0344827586207},
							c: 14,
							z: _List_fromArray(
								[5, 15, 20, 21, 22, 24, 25]),
							a4: _List_Nil,
							u: {b: 249.6551724137931, a: 131.0344827586207}
						},
							{
							bF: 1378.0909874438512,
							q: -1,
							r: {b: 353.5160374238918, a: 114.67635979841108},
							c: 15,
							z: _List_fromArray(
								[8, 13, 14, 18]),
							a4: _List_Nil,
							u: {b: 353.5160374238918, a: 114.67635979841108}
						},
							{
							bF: 26751.277390865514,
							q: -1,
							r: {b: 417.93103448275866, a: 216.55172413793105},
							c: 16,
							z: _List_fromArray(
								[8, 19, 25, 27, 30, 33]),
							a4: _List_Nil,
							u: {b: 417.93103448275866, a: 216.55172413793105}
						},
							{
							bF: 5602.85374554102,
							q: -1,
							r: {b: 62.06896551724138, a: 131.0344827586207},
							c: 17,
							z: _List_fromArray(
								[1, 2, 20, 23]),
							a4: _List_Nil,
							u: {b: 62.06896551724138, a: 131.0344827586207}
						},
							{
							bF: 343.4173383361558,
							q: -1,
							r: {b: 329.65517241379314, a: 108.96551724137932},
							c: 18,
							z: _List_fromArray(
								[5, 15]),
							a4: _List_Nil,
							u: {b: 329.65517241379314, a: 108.96551724137932}
						},
							{
							bF: 9284.185493460169,
							q: -1,
							r: {b: 517.2413793103449, a: 150.34482758620692},
							c: 19,
							z: _List_fromArray(
								[16]),
							a4: _List_Nil,
							u: {b: 517.2413793103449, a: 150.34482758620692}
						},
							{
							bF: 22987.150602005426,
							q: -1,
							r: {b: 142.0689655172414, a: 216.55172413793105},
							c: 20,
							z: _List_fromArray(
								[10, 11, 14, 17, 26, 27, 28, 32]),
							a4: _List_Nil,
							u: {b: 142.0689655172414, a: 216.55172413793105}
						},
							{
							bF: 1468.0314456312244,
							q: -1,
							r: {b: 287.00938245587895, a: 130.34208477862688},
							c: 21,
							z: _List_fromArray(
								[8, 14]),
							a4: _List_Nil,
							u: {b: 287.00938245587895, a: 130.34208477862688}
						},
							{
							bF: 1432.5455970046423,
							q: -1,
							r: {b: 337.17845155842986, a: 162.18280496532594},
							c: 22,
							z: _List_fromArray(
								[8, 14, 25]),
							a4: _List_Nil,
							u: {b: 337.17845155842986, a: 162.18280496532594}
						},
							{
							bF: 9691.319857312727,
							q: -1,
							r: {b: 42.758620689655174, a: 197.24137931034485},
							c: 23,
							z: _List_fromArray(
								[17]),
							a4: _List_Nil,
							u: {b: 42.758620689655174, a: 197.24137931034485}
						},
							{
							bF: 5835.452975357057,
							q: -1,
							r: {b: 274.48275862068965, a: 194.48275862068968},
							c: 24,
							z: _List_fromArray(
								[14, 27]),
							a4: _List_Nil,
							u: {b: 274.48275862068965, a: 194.48275862068968}
						},
							{
							bF: 358.2273289833356,
							q: -1,
							r: {b: 334.1775995042041, a: 180.3285771678576},
							c: 25,
							z: _List_fromArray(
								[14, 16, 22]),
							a4: _List_Nil,
							u: {b: 334.1775995042041, a: 180.3285771678576}
						},
							{
							bF: 1445.8977407847779,
							q: -1,
							r: {b: 191.7241379310345, a: 183.44827586206898},
							c: 26,
							z: _List_fromArray(
								[20]),
							a4: _List_Nil,
							u: {b: 191.7241379310345, a: 183.44827586206898}
						},
							{
							bF: 9258.405232280977,
							q: -1,
							r: {b: 291.0344827586207, a: 274.48275862068965},
							c: 27,
							z: _List_fromArray(
								[16, 20, 24]),
							a4: _List_Nil,
							u: {b: 291.0344827586207, a: 274.48275862068965}
						},
							{
							bF: 12803.804994054697,
							q: -1,
							r: {b: 81.37931034482759, a: 324.1379310344828},
							c: 28,
							z: _List_fromArray(
								[20, 29, 35]),
							a4: _List_Nil,
							u: {b: 81.37931034482759, a: 324.1379310344828}
						},
							{
							bF: 2374.3162901307915,
							q: -1,
							r: {b: 125.51724137931035, a: 288.2758620689655},
							c: 29,
							z: _List_fromArray(
								[28]),
							a4: _List_Nil,
							u: {b: 125.51724137931035, a: 288.2758620689655}
						},
							{
							bF: 9698.929845422099,
							q: -1,
							r: {b: 448.2758620689655, a: 326.89655172413796},
							c: 30,
							z: _List_fromArray(
								[16, 31, 34]),
							a4: _List_Nil,
							u: {b: 448.2758620689655, a: 326.89655172413796}
						},
							{
							bF: 2233.5315101070228,
							q: -1,
							r: {b: 387.58620689655174, a: 291.0344827586207},
							c: 31,
							z: _List_fromArray(
								[30]),
							a4: _List_Nil,
							u: {b: 387.58620689655174, a: 291.0344827586207}
						},
							{
							bF: 4202.615933412613,
							q: -1,
							r: {b: 230.34482758620692, a: 351.72413793103453},
							c: 32,
							z: _List_fromArray(
								[20, 33, 36]),
							a4: _List_Nil,
							u: {b: 230.34482758620692, a: 351.72413793103453}
						},
							{
							bF: 4037.098692033287,
							q: -1,
							r: {b: 302.0689655172414, a: 351.72413793103453},
							c: 33,
							z: _List_fromArray(
								[16, 32, 36]),
							a4: _List_Nil,
							u: {b: 302.0689655172414, a: 351.72413793103453}
						},
							{
							bF: 16797.146254459003,
							q: -1,
							r: {b: 511.72413793103453, a: 406.89655172413796},
							c: 34,
							z: _List_fromArray(
								[30, 36, 38]),
							a4: _List_Nil,
							u: {b: 511.72413793103453, a: 406.89655172413796}
						},
							{
							bF: 13288.941736028526,
							q: -1,
							r: {b: 37.24137931034483, a: 404.1379310344828},
							c: 35,
							z: _List_fromArray(
								[28, 36, 37]),
							a4: _List_Nil,
							u: {b: 37.24137931034483, a: 404.1379310344828}
						},
							{
							bF: 8831.39120095125,
							q: -1,
							r: {b: 238.62068965517244, a: 426.2068965517242},
							c: 36,
							z: _List_fromArray(
								[32, 33, 34, 35, 39]),
							a4: _List_Nil,
							u: {b: 238.62068965517244, a: 426.2068965517242}
						},
							{
							bF: 10349.58382877527,
							q: -1,
							r: {b: 97.93103448275863, a: 442.7586206896552},
							c: 37,
							z: _List_fromArray(
								[35]),
							a4: _List_Nil,
							u: {b: 97.93103448275863, a: 442.7586206896552}
						},
							{
							bF: 10056.599286563636,
							q: -1,
							r: {b: 382.0689655172414, a: 442.7586206896552},
							c: 38,
							z: _List_fromArray(
								[34, 39]),
							a4: _List_Nil,
							u: {b: 382.0689655172414, a: 442.7586206896552}
						},
							{
							bF: 3999.04875148632,
							q: -1,
							r: {b: 307.58620689655174, a: 445.51724137931035},
							c: 39,
							z: _List_fromArray(
								[36, 38]),
							a4: _List_Nil,
							u: {b: 307.58620689655174, a: 445.51724137931035}
						}
						]),
					bc: 560
				});
		case '(a & b) | (c & d) | (e & f)':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 730,
							bu: 73,
							k: _List_fromArray(
								[
									{
									ah: {b: 77.38938053097344, a: 77.21153846153847},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 0,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 36, 45]),
									a4: _List_Nil
								},
									{
									ah: {b: 189.95575221238937, a: 236.31410256410257},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2]),
									a4: _List_Nil
								},
									{
									ah: {b: 227.47787610619469, a: 156.76282051282053},
									aa: $elm$core$Maybe$Nothing,
									bl: 'b',
									c: 2,
									bo: $elm$core$Maybe$Just('b'),
									z: _List_fromArray(
										[1, 3, 29, 34, 37, 46]),
									a4: _List_Nil
								},
									{
									ah: {b: 227.47787610619469, a: 30.416666666666668},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 4]),
									a4: _List_Nil
								},
									{
									ah: {b: 316.59292035398227, a: 77.21153846153847},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 4,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3, 5, 6, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 363.49557522123894, a: 30.416666666666668},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4]),
									a4: _List_Nil
								},
									{
									ah: {b: 447.92035398230087, a: 67.8525641025641},
									aa: $elm$core$Maybe$Nothing,
									bl: 'c',
									c: 6,
									bo: $elm$core$Maybe$Just('c'),
									z: _List_fromArray(
										[4, 7, 18]),
									a4: _List_Nil
								},
									{
									ah: {b: 527.6548672566371, a: 25.73717948717949},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 8]),
									a4: _List_Nil
								},
									{
									ah: {b: 598.0088495575221, a: 58.493589743589745},
									aa: $elm$core$Maybe$Nothing,
									bl: 'd',
									c: 8,
									bo: $elm$core$Maybe$Just('d'),
									z: _List_fromArray(
										[7, 9, 19]),
									a4: _List_Nil
								},
									{
									ah: {b: 640.221238938053, a: 86.57051282051283},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 10, 11, 23]),
									a4: _List_Nil
								},
									{
									ah: {b: 644.9115044247787, a: 30.416666666666668},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9]),
									a4: _List_Nil
								},
									{
									ah: {b: 734.0265486725664, a: 35.09615384615385},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9, 12, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 776.2389380530973, a: 7.01923076923077},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 13, 24]),
									a4: _List_Nil
								},
									{
									ah: {b: 809.0707964601769, a: 21.05769230769231},
									aa: $elm$core$Maybe$Nothing,
									bl: 'e',
									c: 13,
									bo: $elm$core$Maybe$Just('e'),
									z: _List_fromArray(
										[12, 14, 20]),
									a4: _List_Nil
								},
									{
									ah: {b: 870.0442477876105, a: 25.73717948717949},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[13, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 959.1592920353982, a: 58.493589743589745},
									aa: $elm$core$Maybe$Nothing,
									bl: 'f',
									c: 15,
									bo: $elm$core$Maybe$Just('f'),
									z: _List_fromArray(
										[14, 16, 21, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 1001.3716814159292, a: 86.57051282051283},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 16,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 17, 26]),
									a4: _List_Nil
								},
									{
									ah: {b: 1006.0619469026548, a: 30.416666666666668},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 17,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[16]),
									a4: _List_Nil
								},
									{
									ah: {b: 485.4424778761062, a: 105.28846153846155},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 18,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[6, 19, 27]),
									a4: _List_Nil
								},
									{
									ah: {b: 546.4159292035398, a: 105.28846153846155},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 19,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 18, 27]),
									a4: _List_Nil
								},
									{
									ah: {b: 851.2831858407079, a: 109.96794871794873},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 20,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[13, 21, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 907.5663716814158, a: 105.28846153846155},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 21,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 20, 25]),
									a4: _List_Nil
								},
									{
									ah: {b: 419.77876106194685, a: 133.3653846153846},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 22,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[4, 27, 29, 31]),
									a4: _List_Nil
								},
									{
									ah: {b: 616.7699115044247, a: 133.3653846153846},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 23,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[9, 27, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 799.6902654867256, a: 138.0448717948718},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 24,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[12, 25, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 837.2123893805309, a: 208.2371794871795},
									aa: $elm$core$Maybe$Nothing,
									bl: '(e & f)',
									c: 25,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[20, 21, 24, 26, 33, 35, 40, 49]),
									a4: _List_Nil
								},
									{
									ah: {b: 968.5398230088495, a: 133.3653846153846},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 26,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[15, 16, 25, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 504.20353982300884, a: 240.99358974358975},
									aa: $elm$core$Maybe$Nothing,
									bl: '(c & d)',
									c: 27,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[18, 19, 22, 23, 32, 35, 41, 44, 47, 48]),
									a4: _List_Nil
								},
									{
									ah: {b: 729.3362831858407, a: 170.80128205128207},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 28,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11, 23, 24, 35]),
									a4: _List_Nil
								},
									{
									ah: {b: 293.14159292035396, a: 147.40384615384616},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 29,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 22]),
									a4: _List_Nil
								},
									{
									ah: {b: 1006.0619469026548, a: 203.55769230769232},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 30,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[26, 33]),
									a4: _List_Nil
								},
									{
									ah: {b: 396.32743362831854, a: 194.19871794871796},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 31,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[22, 34, 38]),
									a4: _List_Nil
								},
									{
									ah: {b: 551.1061946902655, a: 184.8397435897436},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 32,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27]),
									a4: _List_Nil
								},
									{
									ah: {b: 931.0176991150443, a: 236.31410256410257},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 33,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 30]),
									a4: _List_Nil
								},
									{
									ah: {b: 335.3539823008849, a: 198.87820512820514},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 34,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 31, 38]),
									a4: _List_Nil
								},
									{
									ah: {b: 724.646017699115, a: 273.75},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 35,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 27, 28]),
									a4: _List_Nil
								},
									{
									ah: {b: 21.106194690265486, a: 334.58333333333337},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 36,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 39, 55]),
									a4: _List_Nil
								},
									{
									ah: {b: 283.76106194690266, a: 339.26282051282055},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 37,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 38, 44, 50]),
									a4: _List_Nil
								},
									{
									ah: {b: 335.3539823008849, a: 273.75},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 38,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[31, 34, 37]),
									a4: _List_Nil
								},
									{
									ah: {b: 30.48672566371681, a: 273.75},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 39,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36]),
									a4: _List_Nil
								},
									{
									ah: {b: 893.4955752212389, a: 325.224358974359},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 40,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 42, 54]),
									a4: _List_Nil
								},
									{
									ah: {b: 508.8938053097345, a: 320.5448717948718},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 41,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 43, 52, 53, 56]),
									a4: _List_Nil
								},
									{
									ah: {b: 827.8318584070796, a: 287.78846153846155},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 42,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[40]),
									a4: _List_Nil
								},
									{
									ah: {b: 583.5512937298047, a: 291.7682699572705},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 43,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41]),
									a4: _List_Nil
								},
									{
									ah: {b: 390.83076927789915, a: 277.84550913066886},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 44,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 37]),
									a4: _List_Nil
								},
									{
									ah: {b: 124.29203539823008, a: 357.9807692307692},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 45,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 46, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 189.95575221238937, a: 357.9807692307692},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 46,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[2, 45, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 433.84955752212386, a: 306.5064102564103},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 47,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 663.6725663716813, a: 348.6217948717949},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 48,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[27, 49, 57]),
									a4: _List_Nil
								},
									{
									ah: {b: 729.3362831858407, a: 348.6217948717949},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 49,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[25, 48, 57]),
									a4: _List_Nil
								},
									{
									ah: {b: 321.283185840708, a: 381.37820512820514},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 50,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[37, 51, 59]),
									a4: _List_Nil
								},
									{
									ah: {b: 152.43362831858406, a: 587.2756410256411},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a & b)',
									c: 51,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[45, 46, 47, 50, 52, 53, 55, 58, 63, 65, 66, 70, 72]),
									a4: _List_Nil
								},
									{
									ah: {b: 459.17373998857994, a: 342.59784354949386},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 52,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 506.811425538286, a: 376.4857909564769},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 53,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 51]),
									a4: _List_Nil
								},
									{
									ah: {b: 987.3008849557522, a: 428.17307692307696},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 54,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[40, 57, 62]),
									a4: _List_Nil
								},
									{
									ah: {b: 21.106194690265486, a: 381.37820512820514},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 55,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[36, 51, 60]),
									a4: _List_Nil
								},
									{
									ah: {b: 616.7699115044247, a: 386.0576923076923},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 56,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[41, 57, 58, 61]),
									a4: _List_Nil
								},
									{
									ah: {b: 963.8495575221239, a: 666.8269230769231},
									aa: $elm$core$Maybe$Nothing,
									bl: '((c & d) | (e & f))',
									c: 57,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[48, 49, 54, 56, 64, 65, 67, 71, 74]),
									a4: _List_Nil
								},
									{
									ah: {b: 513.5840707964602, a: 400.09615384615387},
									aa: $elm$core$Maybe$Nothing,
									bl: 'Packing cell',
									c: 58,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 56]),
									a4: _List_Nil
								},
									{
									ah: {b: 288.4513274336283, a: 395.4166666666667},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 59,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[50]),
									a4: _List_Nil
								},
									{
									ah: {b: 44.557522123893804, a: 460.9294871794872},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 60,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[55]),
									a4: _List_Nil
								},
									{
									ah: {b: 551.1061946902655, a: 432.85256410256414},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 61,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[56, 65]),
									a4: _List_Nil
								},
									{
									ah: {b: 855.9734513274336, a: 465.60897435897436},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 62,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[54, 64]),
									a4: _List_Nil
								},
									{
									ah: {b: 189.95575221238937, a: 432.85256410256414},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 63,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51]),
									a4: _List_Nil
								},
									{
									ah: {b: 752.787610619469, a: 484.3269230769231},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 64,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 62]),
									a4: _List_Nil
								},
									{
									ah: {b: 513.5840707964602, a: 512.4038461538462},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 65,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 57, 61]),
									a4: _List_Nil
								},
									{
									ah: {b: 340.0442477876106, a: 582.5961538461539},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 66,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 68, 72]),
									a4: _List_Nil
								},
									{
									ah: {b: 710.5752212389381, a: 577.9166666666667},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 67,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 69, 74]),
									a4: _List_Nil
								},
									{
									ah: {b: 391.6371681415929, a: 540.4807692307693},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 68,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[66]),
									a4: _List_Nil
								},
									{
									ah: {b: 635.5309734513274, a: 540.4807692307693},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 69,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[67]),
									a4: _List_Nil
								},
									{
									ah: {b: 476.0619469026548, a: 601.3141025641025},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 70,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 71, 73]),
									a4: _List_Nil
								},
									{
									ah: {b: 551.1061946902655, a: 601.3141025641025},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 71,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 70, 73]),
									a4: _List_Nil
								},
									{
									ah: {b: 260.30973451327435, a: 666.8269230769231},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 72,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[51, 66, 73, 76]),
									a4: _List_Nil
								},
									{
									ah: {b: 490.13274336283183, a: 676.1858974358975},
									aa: $elm$core$Maybe$Nothing,
									bl: '((a & b) | ((c & d) | (e & f)))',
									c: 73,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[70, 71, 72, 74, 77]),
									a4: _List_Nil
								},
									{
									ah: {b: 804.3805309734513, a: 671.5064102564103},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 74,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[57, 67, 73, 75]),
									a4: _List_Nil
								},
									{
									ah: {b: 635.5309734513274, a: 690.224358974359},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 75,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[74, 77]),
									a4: _List_Nil
								},
									{
									ah: {b: 330.6637168141593, a: 690.224358974359},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 76,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[72]),
									a4: _List_Nil
								},
									{
									ah: {b: 555.7964601769911, a: 694.9038461538462},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 77,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[73, 75]),
									a4: _List_Nil
								}
								]),
							bc: 1060
						}),
					dG: true,
					cg: 1,
					a0: 730,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 46.902654867256636 0 L 93.80530973451327 0 L 140.7079646017699 0 L 159.46902654867256 0 L 159.46902654867256 46.794871794871796 L 159.17161445034733 93.52358258845852 L 158.81433451110186 140.36187280487977 L 159.05596681107178 187.30928019181368 L 159.44567985918945 233.96443152968948 L 149.89833514519916 275.900020079761 L 106.19040212383058 292.086649539973 L 110.33772666325547 303.21681649756204 L 155.42950893611436 300.13634523473473 L 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 158.20765235119057 307.587678307326 L 148.5395230102367 326.0186895635514 L 102.36650541936841 340.78511165993837 L 91.24030532078699 357.7614028291209 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 81.50206894327414 358.55703402553223 L 64.70573572758828 324.80762599008176 L 69.24114812474124 276.2327894794555 L 47.798941982647094 242.4391029796717 L 0 233.97435897435898 L 0 187.17948717948718 L 0 140.3846153846154 L 0 93.58974358974359 L 0 46.794871794871796 Z'),
								_Utils_Tuple2(1, 'M 159.46902654867256 0 L 164.1592920353982 0 L 164.1587031833634 46.794746925247686 L 163.71612219147153 93.49060225449021 L 163.28195567739036 140.35376062877168 L 166.22980469316036 189.34640225118318 L 208.54320411776075 212.66763262633975 L 224.5590004776425 258.1994533082829 L 216.07076916721775 299.8050042803581 L 168.84889164191895 304.1660023166654 L 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 155.42950893611436 300.13634523473473 L 110.33772666325547 303.21681649756204 L 106.19040212383058 292.086649539973 L 149.89833514519916 275.900020079761 L 159.44567985918945 233.96443152968948 L 159.05596681107178 187.30928019181368 L 158.81433451110186 140.36187280487977 L 159.17161445034733 93.52358258845852 L 159.46902654867256 46.794871794871796 Z'),
								_Utils_Tuple2(2, 'M 164.1592920353982 0 L 206.3716814159292 0 L 225.5953322333867 45.19484337248301 L 243.89716240311967 89.48707447456803 L 266.8353279619968 112.80116080268837 L 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 270.5833734768453 123.35247170880882 L 295.5107072935839 166.02070911808258 L 313.28949842622046 183.42326927749988 L 317.77330118255645 187.84740736372635 L 317.77330118255645 187.84740736372635 L 315.4572709030563 194.14828169775143 L 322.5997545955598 228.68345105155046 L 298.4177276433006 237.46914070785397 L 258.07095610304566 255.18501319656485 L 257.229099698356 303.4705781173349 L 248.1071239653422 350.4867431208759 L 241.65659376358025 358.0884574816056 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 231.61564552760632 358.53199565103716 L 222.22787142812956 349.1802477732655 L 183.8434038416396 331.322661068011 L 164.5599958426218 308.4463708628705 L 161.81415929203538 301.8269230769231 L 168.84889164191895 304.1660023166654 L 216.07076916721775 299.8050042803581 L 224.5590004776425 258.1994533082829 L 208.54320411776075 212.66763262633975 L 166.22980469316036 189.34640225118318 L 163.28195567739036 140.35376062877168 L 163.71612219147153 93.49060225449021 L 164.1587031833634 46.794746925247686 Z'),
								_Utils_Tuple2(3, 'M 206.3716814159292 0 L 215.75221238938053 0 L 234.42970130097206 7.440583832389524 L 246.50022049510017 38.44574793995866 L 256.87047388823953 63.000517223427444 L 252.58817910974884 85.99534808442483 L 281.71444496496633 93.86376251067361 L 277.31496119584284 113.41486386132082 L 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 266.8353279619968 112.80116080268837 L 243.89716240311967 89.48707447456803 L 225.5953322333867 45.19484337248301 Z'),
								_Utils_Tuple2(4, 'M 215.75221238938053 0 L 262.59494484837745 0 L 309.5886674568915 0 L 333.0687990949354 0 L 337.1734200530284 47.572561558707314 L 381.02735537799737 60.339490777618835 L 412.0132379991134 55.05386049321286 L 419.08753708993083 43.77219726829662 L 417.43362831858406 0 L 422.1238938053097 0 L 424.7721050080971 49.397019630782154 L 432.2219899772677 97.92106849423212 L 438.9492818387721 105.14819292997635 L 443.4674738832735 109.92951645150244 L 438.29737177131324 107.35201986173031 L 398.6527078979456 114.14121077226923 L 373.78979984276367 115.91017552190252 L 326.28122897759334 114.98672295110237 L 279.6505855831241 114.776809160204 L 271.919658354061 117.32348762648567 L 277.31496119584284 113.41486386132082 L 281.71444496496633 93.86376251067361 L 252.58817910974884 85.99534808442483 L 256.87047388823953 63.000517223427444 L 246.50022049510017 38.44574793995866 L 234.42970130097206 7.440583832389524 Z'),
								_Utils_Tuple2(5, 'M 333.0687990949354 0 L 379.91150442477874 0 L 417.43362831858406 0 L 419.08753708993083 43.77219726829662 L 412.0132379991134 55.05386049321286 L 381.02735537799737 60.339490777618835 L 337.1734200530284 47.572561558707314 Z'),
								_Utils_Tuple2(6, 'M 422.1238938053097 0 L 469.0265486725663 0 L 497.16814159292034 0 L 487.698227600996 27.986326600810848 L 463.0267483158919 46.66010826054147 L 504.40602906534866 49.331863995557626 L 516.5799438713486 47.44403001711812 L 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 519.3580948290668 54.895370615018265 L 509.6899654881119 73.32638187124283 L 463.49912634352177 88.07502336813153 L 448.5705637044884 105.82329430498118 L 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 438.9492818387721 105.14819292997635 L 432.2219899772677 97.92106849423212 L 424.7721050080971 49.397019630782154 Z'),
								_Utils_Tuple2(7, 'M 497.16814159292034 0 L 544.070796460177 0 L 586.2831858407079 0 L 577.2212116771962 47.11269655602203 L 529.9993341197951 51.473694624357734 L 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 516.5799438713486 47.44403001711812 L 504.40602906534866 49.331863995557626 L 463.0267483158919 46.66010826054147 L 487.698227600996 27.986326600810848 Z'),
								_Utils_Tuple2(8, 'M 586.2831858407079 0 L 619.1150442477875 0 L 613.2059471169993 47.51874343748409 L 610.851809101458 94.7145318311101 L 602.8065238244604 105.395692266638 L 598.0088495575221 109.96794871794873 L 598.0088495575221 109.96794871794873 L 592.7660880054824 105.83968795872948 L 583.3783139060058 96.4879400809578 L 544.9938463195157 78.6303533757033 L 525.7104383204978 55.75406317056273 L 522.9646017699115 49.13461538461539 L 529.9993341197951 51.473694624357734 L 577.2212116771962 47.11269655602203 Z'),
								_Utils_Tuple2(9, 'M 619.1150442477875 0 L 623.8053097345132 0 L 621.8086761913951 48.816084722602156 L 670.193922652454 60.3069815332532 L 691.348189293076 48.66971565566506 L 694.1592920353982 0 L 698.8495575221239 0 L 698.8495575221239 46.794871794871796 L 698.8495575221239 93.58974358974359 L 698.8495575221239 112.30769230769232 L 652.0863523997706 112.16856302059657 L 604.7301189507418 107.94161209183963 L 598.0088495575221 109.96794871794873 L 602.8065238244604 105.395692266638 L 610.851809101458 94.7145318311101 L 613.2059471169993 47.51874343748409 Z'),
								_Utils_Tuple2(10, 'M 623.8053097345132 0 L 670.7079646017698 0 L 694.1592920353982 0 L 691.348189293076 48.66971565566506 L 670.193922652454 60.3069815332532 L 621.8086761913951 48.816084722602156 Z'),
								_Utils_Tuple2(11, 'M 698.8495575221239 0 L 745.7522123893805 0 L 769.2035398230088 0 L 768.4710468156968 46.06406206853939 L 761.7333315982651 95.49567638535177 L 752.3243648320097 104.82628029744168 L 703.5398230088496 112.30769230769232 L 698.8495575221239 112.30769230769232 L 698.8495575221239 93.58974358974359 L 698.8495575221239 46.794871794871796 Z'),
								_Utils_Tuple2(12, 'M 769.2035398230088 0 L 787.9646017699115 0 L 785.8886733648544 44.72265498408058 L 787.0407648474779 94.5148139739741 L 798.8677269537125 106.10911272056953 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 799.3423541425173 113.92051342073842 L 767.9499682114772 121.35258478319935 L 749.9543560805413 125.8342958228294 L 703.5398230088496 112.30769230769232 L 752.3243648320097 104.82628029744168 L 761.7333315982651 95.49567638535177 L 768.4710468156968 46.06406206853939 Z'),
								_Utils_Tuple2(13, 'M 787.9646017699115 0 L 834.8672566371681 0 L 844.2477876106194 0 L 835.4810683336439 28.674777636998094 L 822.1539825163027 48.78492404781828 L 867.6999785429138 51.47380169916144 L 877.0796972142575 51.47432335597361 L 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 880.5085375082024 59.574857530304946 L 870.8415766518758 78.00366312976423 L 824.211967335629 92.548702110492 L 809.8622156063814 107.75329653606698 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 798.8677269537125 106.10911272056953 L 787.0407648474779 94.5148139739741 L 785.8886733648544 44.72265498408058 Z'),
								_Utils_Tuple2(14, 'M 844.2477876106194 0 L 891.150442477876 0 L 938.0530973451326 0 L 947.433628318584 0 L 942.5460662207311 46.59802857460224 L 937.8558007340047 51.27751575408861 L 891.1487246880763 56.15213231155565 L 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 877.0796972142575 51.47432335597361 L 867.6999785429138 51.47380169916144 L 822.1539825163027 48.78492404781828 L 835.4810683336439 28.674777636998094 Z'),
								_Utils_Tuple2(15, 'M 947.433628318584 0 L 980.2654867256637 0 L 974.3564345107035 47.51878825009497 L 975.7007022632002 93.74176903267414 L 975.575221238938 107.62820512820514 L 956.8141592920354 107.62820512820514 L 950.9950806750073 104.07493704787905 L 910.1751334475475 79.28825885234392 L 887.1750006894697 60.12015231163088 L 884.1150442477876 53.81410256410257 L 891.1487246880763 56.15213231155565 L 937.8558007340047 51.27751575408861 L 942.5460662207311 46.59802857460224 Z'),
								_Utils_Tuple2(16, 'M 980.2654867256637 0 L 984.9557522123894 0 L 982.9591187052321 48.81608475848047 L 1027.1866477288888 60.81486972480874 L 1060 60.833333333333336 L 1060 107.62820512820514 L 1060 112.30769230769232 L 1022.5091718509916 112.27646848103169 L 975.575221238938 107.62820512820514 L 975.7007022632002 93.74176903267414 L 974.3564345107035 47.51878825009497 Z'),
								_Utils_Tuple2(17, 'M 984.9557522123894 0 L 1031.858407079646 0 L 1060 0 L 1060 46.794871794871796 L 1060 60.833333333333336 L 1027.1866477288888 60.81486972480874 L 982.9591187052321 48.81608475848047 Z'),
								_Utils_Tuple2(18, 'M 519.3580948290668 54.895370615018265 L 522.9646017699115 49.13461538461539 L 520.6194690265487 56.15384615384616 L 520.6194690265487 102.94871794871796 L 520.6194690265487 121.66666666666667 L 490.46455603351717 131.20344622925873 L 448.0872997460655 114.60973197742452 L 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 448.5705637044884 105.82329430498118 L 463.49912634352177 88.07502336813153 L 509.6899654881119 73.32638187124283 Z'),
								_Utils_Tuple2(19, 'M 522.9646017699115 49.13461538461539 L 522.9646017699115 49.13461538461539 L 525.7104383204978 55.75406317056273 L 544.9938463195157 78.6303533757033 L 583.3783139060058 96.4879400809578 L 592.7660880054824 105.83968795872948 L 598.0088495575221 109.96794871794873 L 598.0088495575221 109.96794871794873 L 592.9367240214026 114.26643551763264 L 565.0278265599284 128.121682011209 L 520.6194690265487 121.66666666666667 L 520.6194690265487 102.94871794871796 L 520.6194690265487 56.15384615384616 Z'),
								_Utils_Tuple2(20, 'M 880.5085375082024 59.574857530304946 L 884.1150442477876 53.81410256410257 L 881.7699115044247 60.833333333333336 L 881.7699115044247 107.62820512820514 L 881.7699115044247 121.66666666666667 L 851.9275319136718 131.5154161907879 L 809.087030828129 114.63117006060845 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 809.8622156063814 107.75329653606698 L 824.211967335629 92.548702110492 L 870.8415766518758 78.00366312976423 Z'),
								_Utils_Tuple2(21, 'M 884.1150442477876 53.81410256410257 L 884.1150442477876 53.81410256410257 L 887.1750006894697 60.12015231163088 L 910.1751334475475 79.28825885234392 L 950.9950806750073 104.07493704787905 L 956.8141592920354 107.62820512820514 L 913.9358187202774 131.2737195296585 L 881.7699115044247 121.66666666666667 L 881.7699115044247 107.62820512820514 L 881.7699115044247 60.833333333333336 Z'),
								_Utils_Tuple2(22, 'M 438.29737177131324 107.35201986173031 L 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 442.98319858132504 115.13834182426233 L 465.3509575234522 154.19873473180442 L 456.9731418090084 194.5957933064948 L 439.4989239188635 220.59617310147115 L 406.1804601028238 240.4289043668659 L 390.2458813399267 252.24689880586678 L 375.1103474630717 266.96634206582036 L 388.5892636953496 251.15227928672672 L 406.2518686096331 233.2309645561853 L 444.92991823617035 207.54023887349314 L 447.5303130682334 174.4903498458415 L 423.2822399771865 155.79465815824796 L 373.9191482254591 154.02685854700778 L 326.2011364123667 165.38869609796413 L 321.1678043270645 181.04587522693936 L 317.77330118255645 187.84740736372635 L 317.77330118255645 187.84740736372635 L 314.4779259999336 182.29516243529545 L 306.29625952516847 166.9582838166092 L 309.5157773016329 154.62888091771728 L 295.2501878215845 122.45949593706823 L 278.865008966168 119.82731189939972 L 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 279.6505855831241 114.776809160204 L 326.28122897759334 114.98672295110237 L 373.78979984276367 115.91017552190252 L 398.6527078979456 114.14121077226923 Z'),
								_Utils_Tuple2(23, 'M 598.0088495575221 109.96794871794873 L 604.7301189507418 107.94161209183963 L 652.0863523997706 112.16856302059657 L 698.8495575221239 112.30769230769232 L 664.501090105273 148.23046592565362 L 622.0969005000934 171.08493517842226 L 633.8917479913105 205.13031526425203 L 663.4958526109652 207.9073237831402 L 698.8495575221239 201.21794871794873 L 668.1189315139238 212.64385440180993 L 626.3980912749817 207.98672781291648 L 611.76532423645 162.03416573886193 L 576.1566006019077 143.41950746025736 L 598.2227490092243 114.85985665542222 L 598.0088495575221 109.96794871794873 Z'),
								_Utils_Tuple2(24, 'M 799.3423541425173 113.92051342073842 L 804.3805309734512 109.96794871794873 L 803.8465093052494 115.17995421427301 L 825.8081431815215 147.80987321436965 L 799.9351496758213 189.76355227510294 L 775.4074540304528 212.0859817125332 L 750.4605488764813 214.93059451770097 L 703.5398230088496 201.21794871794873 L 750.4795560605154 209.94570378798625 L 770.7219028717807 207.40148645602955 L 794.9203500488736 177.3408120467719 L 764.5059845590804 145.0713726619632 L 727.4604338221592 130.55743606688543 L 703.5398230088496 112.30769230769232 L 749.9543560805413 125.8342958228294 L 767.9499682114772 121.35258478319935 Z'),
								_Utils_Tuple2(25, 'M 956.8141592920354 107.62820512820514 L 933.7131464655158 150.78751263609917 L 951.8627497224011 196.79900557202873 L 952.1238938053096 201.21794871794873 L 938.0122155475353 173.18526010710403 L 896.5605817475134 169.20923036225483 L 886.5536530718645 215.17665557983975 L 901.957207496142 260.6283255157625 L 934.2409049476287 298.61112422436037 L 979.1524536347287 319.315603527712 L 1027.321081903766 332.09100089209414 L 1060 332.2435897435898 L 1060 379.03846153846155 L 1060 383.71794871794873 L 1019.6852291558062 363.1067422222729 L 982.5678788739772 329.94648853030503 L 938.2624759363705 308.63725641036257 L 895.1818766462748 290.7855224413271 L 853.5511164461223 266.87100890591256 L 806.2871701974658 270.94703395109036 L 797.0986595148124 306.6603446256285 L 779.9450906394377 352.319499433637 L 776.2389380530972 357.98076923076917 L 776.2389380530972 357.98076923076917 L 772.733733658463 352.1189442490733 L 755.8719349944882 331.50609678646185 L 711.1853409750156 310.57717976500913 L 705.8849557522124 306.5064102564103 L 712.2689926542964 309.4946896351098 L 758.0780416434627 307.07938591236586 L 763.53884775666 293.83559513704665 L 761.7021713249862 246.1379574527271 L 719.3101583686321 232.27872564310042 L 703.5398230088496 201.21794871794873 L 750.4605488764813 214.93059451770097 L 775.4074540304528 212.0859817125332 L 799.9351496758213 189.76355227510294 L 825.8081431815215 147.80987321436965 L 803.8465093052494 115.17995421427301 L 804.3805309734512 109.96794871794873 L 804.3805309734512 109.96794871794873 L 809.087030828129 114.63117006060845 L 851.9275319136718 131.5154161907879 L 881.7699115044247 121.66666666666667 L 913.9358187202774 131.2737195296585 Z'),
								_Utils_Tuple2(26, 'M 956.8141592920354 107.62820512820514 L 975.575221238938 107.62820512820514 L 1022.5091718509916 112.27646848103169 L 1060 112.30769230769232 L 1060 149.74358974358975 L 1036.5552515514 149.7501536100024 L 989.6973924147474 154.4743335787676 L 958.306235757887 174.6296732906156 L 952.1238938053096 201.21794871794873 L 951.8627497224011 196.79900557202873 L 933.7131464655158 150.78751263609917 Z'),
								_Utils_Tuple2(27, 'M 443.4674738832735 109.92951645150244 L 443.4674738832735 109.92951645150244 L 448.0872997460655 114.60973197742452 L 490.46455603351717 131.20344622925873 L 520.6194690265487 121.66666666666667 L 565.0278265599284 128.121682011209 L 592.9367240214026 114.26643551763264 L 598.0088495575221 109.96794871794873 L 598.0088495575221 109.96794871794873 L 598.2227490092243 114.85985665542222 L 576.1566006019077 143.41950746025736 L 611.76532423645 162.03416573886193 L 626.3980912749817 207.98672781291648 L 668.1189315139238 212.64385440180993 L 698.8495575221239 201.21794871794873 L 678.8993353030412 242.1469057710193 L 653.3476136080319 263.44875521669275 L 634.2219555952695 290.12272653391346 L 652.6239832642227 312.25696788795165 L 700.592736294825 303.804278590639 L 705.8849557522124 306.5064102564103 L 700.2588828464105 305.5727533381762 L 654.9257104270032 325.8565778074926 L 629.5550908321075 356.69181222423737 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 622.5564133289013 357.011433942336 L 607.7084100427245 322.36436955275263 L 600.7539615820463 275.6457109179964 L 554.4410232183324 264.04030592437636 L 506.3816324095624 267.56375864926275 L 469.0266930573369 293.52456075926625 L 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 431.7292519390126 293.1928485700255 L 425.6316712829299 280.9610122056774 L 395.5908444261514 293.4178011565894 L 430.28509304992536 264.99194067817376 L 448.4723159322665 249.9680449464124 L 414.9911648180347 248.37100028748918 L 386.44841051737734 264.1519241214887 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 390.2458813399267 252.24689880586678 L 406.1804601028238 240.4289043668659 L 439.4989239188635 220.59617310147115 L 456.9731418090084 194.5957933064948 L 465.3509575234522 154.19873473180442 L 442.98319858132504 115.13834182426233 Z M 540.0958151807932 169.21386371289515 L 535.233752975313 205.41281081727988 L 565.2020303938169 221.4324934668897 L 570.4871273534508 218.1605037438601 L 572.5438800700609 172.83610503719646 Z'),
								_Utils_Tuple2(28, 'M 698.8495575221239 112.30769230769232 L 703.5398230088496 112.30769230769232 L 727.4604338221592 130.55743606688543 L 764.5059845590804 145.0713726619632 L 794.9203500488736 177.3408120467719 L 770.7219028717807 207.40148645602955 L 750.4795560605154 209.94570378798625 L 703.5398230088496 201.21794871794873 L 698.8495575221239 201.21794871794873 L 663.4958526109652 207.9073237831402 L 633.8917479913105 205.13031526425203 L 622.0969005000934 171.08493517842226 L 664.501090105273 148.23046592565362 Z'),
								_Utils_Tuple2(29, 'M 271.919658354061 117.32348762648567 L 271.919658354061 117.32348762648567 L 278.865008966168 119.82731189939972 L 295.2501878215845 122.45949593706823 L 309.5157773016329 154.62888091771728 L 306.29625952516847 166.9582838166092 L 314.4779259999336 182.29516243529545 L 317.77330118255645 187.84740736372635 L 313.28949842622046 183.42326927749988 L 295.5107072935839 166.02070911808258 L 270.5833734768453 123.35247170880882 Z'),
								_Utils_Tuple2(30, 'M 1036.5552515514 149.7501536100024 L 1060 149.74358974358975 L 1060 196.53846153846155 L 1060 243.33333333333334 L 1060 280.7692307692308 L 1015.3186797983326 269.19402640826723 L 977.4830354664136 241.42990329433388 L 952.1238938053096 201.21794871794873 L 958.306235757887 174.6296732906156 L 989.6973924147474 154.4743335787676 Z'),
								_Utils_Tuple2(31, 'M 373.9191482254591 154.02685854700778 L 423.2822399771865 155.79465815824796 L 447.5303130682334 174.4903498458415 L 444.92991823617035 207.54023887349314 L 406.2518686096331 233.2309645561853 L 388.5892636953496 251.15227928672672 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 376.7409959485237 254.0115973881723 L 390.3847679264122 208.61998741584694 L 342.19649037679386 220.94858072501836 L 352.01074962903994 192.55616572799013 L 325.05167192578966 184.96924687484994 L 317.77330118255645 187.84740736372635 L 321.1678043270645 181.04587522693936 L 326.2011364123667 165.38869609796413 Z'),
								_Utils_Tuple2(32, 'M 572.5438800700609 172.83610503719646 L 570.4871273534508 218.1605037438601 L 565.2020303938169 221.4324934668897 L 535.233752975313 205.41281081727988 L 540.0958151807932 169.21386371289515 Z'),
								_Utils_Tuple2(33, 'M 938.0122155475353 173.18526010710403 L 952.1238938053096 201.21794871794873 L 977.4830354664136 241.42990329433388 L 1015.3186797983326 269.19402640826723 L 1060 280.7692307692308 L 1060 327.5641025641026 L 1060 332.2435897435898 L 1027.321081903766 332.09100089209414 L 979.1524536347287 319.315603527712 L 934.2409049476287 298.61112422436037 L 901.957207496142 260.6283255157625 L 886.5536530718645 215.17665557983975 L 896.5605817475134 169.20923036225483 Z'),
								_Utils_Tuple2(34, 'M 317.77330118255645 187.84740736372635 L 325.05167192578966 184.96924687484994 L 352.01074962903994 192.55616572799013 L 342.19649037679386 220.94858072501836 L 322.5997545955598 228.68345105155046 L 315.4572709030563 194.14828169775143 L 317.77330118255645 187.84740736372635 L 317.77330118255645 187.84740736372635 Z'),
								_Utils_Tuple2(35, 'M 698.8495575221239 201.21794871794873 L 703.5398230088496 201.21794871794873 L 719.3101583686321 232.27872564310042 L 761.7021713249862 246.1379574527271 L 763.53884775666 293.83559513704665 L 758.0780416434627 307.07938591236586 L 712.2689926542964 309.4946896351098 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 700.592736294825 303.804278590639 L 652.6239832642227 312.25696788795165 L 634.2219555952695 290.12272653391346 L 653.3476136080319 263.44875521669275 L 678.8993353030412 242.1469057710193 Z'),
								_Utils_Tuple2(36, 'M 0 233.97435897435898 L 47.798941982647094 242.4391029796717 L 69.24114812474124 276.2327894794555 L 64.70573572758828 324.80762599008176 L 81.50206894327414 358.55703402553223 L 86.76991150442478 362.6602564102564 L 79.73451327433628 360.3205128205128 L 46.90265486725663 360.3205128205128 L 0 360.3205128205128 L 0 313.52564102564105 L 48.02234629707574 309.96334642181426 L 63.44569719631879 283.92377953707364 L 46.317531577213174 248.59630999967214 L 0 238.65384615384616 Z'),
								_Utils_Tuple2(37, 'M 322.5997545955598 228.68345105155046 L 301.2420732204594 240.91015000602525 L 260.2996651542929 265.9156990280752 L 273.533216132366 310.1399305206441 L 321.5540040059452 315.4750490947724 L 351.54012695794347 304.99574935095586 L 363.54201215224583 283.64596736163077 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 377.2715637394617 279.9711855398498 L 377.79083270773054 302.19401643590425 L 395.5908444261514 293.4178011565894 L 375.21792033006926 324.560548410458 L 349.8652889742526 367.00137405402313 L 328.4199062250135 376.7159585078911 L 292.67732591500385 365.78096987687024 L 243.3624462489828 359.9104299184991 L 236.85840707964599 362.6602564102564 L 241.65659376358025 358.0884574816056 L 248.1071239653422 350.4867431208759 L 257.229099698356 303.4705781173349 L 258.07095610304566 255.18501319656485 L 298.4177276433006 237.46914070785397 Z'),
								_Utils_Tuple2(38, 'M 322.5997545955598 228.68345105155046 L 342.19649037679386 220.94858072501836 L 390.3847679264122 208.61998741584694 L 376.7409959485237 254.0115973881723 L 375.1103474630717 266.96634206582036 L 375.1103474630717 266.96634206582036 L 363.54201215224583 283.64596736163077 L 351.54012695794347 304.99574935095586 L 321.5540040059452 315.4750490947724 L 273.533216132366 310.1399305206441 L 260.2996651542929 265.9156990280752 L 301.2420732204594 240.91015000602525 Z'),
								_Utils_Tuple2(39, 'M 0 238.65384615384616 L 46.317531577213174 248.59630999967214 L 63.44569719631879 283.92377953707364 L 48.02234629707574 309.96334642181426 L 0 313.52564102564105 L 0 285.44871794871796 Z'),
								_Utils_Tuple2(40, 'M 853.5511164461223 266.87100890591256 L 895.1818766462748 290.7855224413271 L 938.2624759363705 308.63725641036257 L 982.5678788739772 329.94648853030503 L 1019.6852291558062 363.1067422222729 L 1060 383.71794871794873 L 1060 388.3974358974359 L 1017.4911983136346 369.97521832496693 L 970.8665960064117 360.3388303753157 L 923.9823008810969 360.32051282436277 L 877.0796460212491 360.32051281697085 L 830.1899607272351 360.30757304802086 L 782.4461784405319 356.46728036333474 L 776.2389380530972 357.98076923076917 L 779.9450906394377 352.319499433637 L 797.0986595148124 306.6603446256285 L 806.2871701974658 270.94703395109036 Z M 811.0329316033224 275.57117113621 L 804.9003029121704 301.6792715664301 L 851.9226796773822 311.82154655985045 L 863.1420437072139 304.6694281856416 L 854.7596833944874 275.0194183077218 Z'),
								_Utils_Tuple2(41, 'M 600.7539615820463 275.6457109179964 L 607.7084100427245 322.36436955275263 L 622.5564133289013 357.011433942336 L 626.1820031757353 362.6629158906568 L 619.3520845095356 360.3403866325713 L 606.6198622984023 360.49931660123485 L 558.6102881065827 368.6887547899637 L 517.1993747261787 391.546034833081 L 506.5082057898494 399.0295257803954 L 515.4041822875903 391.16660550407835 L 525.7451343023681 378.43677026926224 L 526.4557513966982 337.6351730291464 L 510.3178641183156 345.2378895455958 L 487.6594556516982 374.97443777365027 L 486.36914279590866 369.15162412134214 L 484.5505415254276 362.53787606490613 L 481.7306300343453 355.16178688351505 L 477.32028239972726 347.07061225974644 L 470.95556178437835 338.94419943982507 L 463.34584551429447 331.3499774141755 L 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 469.0266930573369 293.52456075926625 L 506.3816324095624 267.56375864926275 L 554.4410232183324 264.04030592437636 Z M 564.0779637328316 269.65068713807557 L 563.0743008400412 271.2408449748564 L 562.4961982800536 273.476257769861 L 562.3192029316724 276.348906315195 L 562.4925847468808 279.79325618203296 L 562.9508624635871 283.6854906623155 L 563.6293487180723 287.8506735114367 L 564.4788233058968 292.0784602207498 L 565.4744604310282 296.14737321270644 L 566.6160409129626 299.85531242883684 L 567.9198625329683 303.0500635593305 L 569.4063314697318 305.65066853577105 L 571.0888792575647 307.6519025918265 L 572.9682758321425 309.11018926653026 L 575.0327210986961 310.11654122913444 L 577.2610464606532 310.76612463029386 L 579.625709077397 311.1332703395114 L 582.0936321751469 311.25699655279357 L 584.6249259392732 311.1381175398395 L 587.1707273927047 310.74628351803335 L 589.6660033632462 310.03340074633206 L 592.0362041278759 308.9521817238799 L 594.2085161671854 307.4728424813262 L 596.1278170742427 305.59683195181105 L 597.7572680576985 303.3600245698896 L 599.0799277230865 300.82972717783485 L 600.08718519813 298.0927648502792 L 600.7653588961463 295.2420691529348 L 601.090846997827 292.36510786776165 L 601.031289605195 289.53651142681633 L 600.5511582999198 286.8156209583084 L 599.6237082099824 284.2471300765602 L 598.2416250697758 281.86276473053886 L 596.4228548858251 279.68251831937187 L 594.2136638785122 277.71469027691296 L 591.6845207015721 275.95657019991484 L 588.9266254816616 274.39625012496884 L 586.0305789994122 273.0166577795579 L 583.0809246698883 271.79926153276466 L 580.1435200273918 270.7306011727642 L 577.2642178305998 269.809151349793 L 574.4880357138677 269.0490240770369 L 571.8649440984037 268.4851982930254 L 569.4516038107082 268.17665355216354 L 567.3097763543807 268.2046074960079 L 565.5010050784821 268.6642867188101 Z'),
								_Utils_Tuple2(42, 'M 854.7596833944874 275.0194183077218 L 863.1420437072139 304.6694281856416 L 851.9226796773822 311.82154655985045 L 804.9003029121704 301.6792715664301 L 811.0329316033224 275.57117113621 Z'),
								_Utils_Tuple2(43, 'M 564.0779637328316 269.65068713807557 L 565.5010050784821 268.6642867188101 L 567.3097763543807 268.2046074960079 L 569.4516038107082 268.17665355216354 L 571.8649440984037 268.4851982930254 L 574.4880357138677 269.0490240770369 L 577.2642178305998 269.809151349793 L 580.1435200273918 270.7306011727642 L 583.0809246698883 271.79926153276466 L 586.0305789994122 273.0166577795579 L 588.9266254816616 274.39625012496884 L 591.6845207015721 275.95657019991484 L 594.2136638785122 277.71469027691296 L 596.4228548858251 279.68251831937187 L 598.2416250697758 281.86276473053886 L 599.6237082099824 284.2471300765602 L 600.5511582999198 286.8156209583084 L 601.031289605195 289.53651142681633 L 601.090846997827 292.36510786776165 L 600.7653588961463 295.2420691529348 L 600.08718519813 298.0927648502792 L 599.0799277230865 300.82972717783485 L 597.7572680576985 303.3600245698896 L 596.1278170742427 305.59683195181105 L 594.2085161671854 307.4728424813262 L 592.0362041278759 308.9521817238799 L 589.6660033632462 310.03340074633206 L 587.1707273927047 310.74628351803335 L 584.6249259392732 311.1381175398395 L 582.0936321751469 311.25699655279357 L 579.625709077397 311.1332703395114 L 577.2610464606532 310.76612463029386 L 575.0327210986961 310.11654122913444 L 572.9682758321425 309.11018926653026 L 571.0888792575647 307.6519025918265 L 569.4063314697318 305.65066853577105 L 567.9198625329683 303.0500635593305 L 566.6160409129626 299.85531242883684 L 565.4744604310282 296.14737321270644 L 564.4788233058968 292.0784602207498 L 563.6293487180723 287.8506735114367 L 562.9508624635871 283.6854906623155 L 562.4925847468808 279.79325618203296 L 562.3192029316724 276.348906315195 L 562.4961982800536 273.476257769861 L 563.0743008400412 271.2408449748564 Z'),
								_Utils_Tuple2(44, 'M 448.4723159322665 249.9680449464124 L 430.28509304992536 264.99194067817376 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 377.79083270773054 302.19401643590425 L 377.2715637394617 279.9711855398498 L 375.1103474630717 266.96634206582036 L 386.44841051737734 264.1519241214887 L 414.9911648180347 248.37100028748918 Z'),
								_Utils_Tuple2(45, 'M 158.20765235119057 307.587678307326 L 161.81415929203538 301.8269230769231 L 159.46902654867256 308.8461538461538 L 159.46902654867256 355.64102564102564 L 159.46902654867256 374.35897435897436 L 128.8454806793559 380.3107443710137 L 91.65495258381145 367.14443177417104 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 91.24030532078699 357.7614028291209 L 102.36650541936841 340.78511165993837 L 148.5395230102367 326.0186895635514 Z'),
								_Utils_Tuple2(46, 'M 161.81415929203538 301.8269230769231 L 161.81415929203538 301.8269230769231 L 164.5599958426218 308.4463708628705 L 183.8434038416396 331.322661068011 L 222.22787142812956 349.1802477732655 L 231.61564552760632 358.53199565103716 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 231.78641099557342 366.9586140554155 L 204.20497407610588 380.4882079760644 L 159.46902654867256 374.35897435897436 L 159.46902654867256 355.64102564102564 L 159.46902654867256 308.8461538461538 Z'),
								_Utils_Tuple2(47, 'M 395.5908444261514 293.4178011565894 L 425.6316712829299 280.9610122056774 L 431.7292519390126 293.1928485700255 L 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 422.40314181563446 320.9848051184073 L 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 Z'),
								_Utils_Tuple2(48, 'M 700.2588828464105 305.5727533381762 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 702.4866222741701 312.47486056357405 L 698.8517605400123 360.3227107758299 L 698.8495575221239 374.35897435897436 L 673.9015835341877 383.23942553587545 L 631.2226020145381 366.9592561152452 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 629.5550908321075 356.69181222423737 L 654.9257104270032 325.8565778074926 Z'),
								_Utils_Tuple2(49, 'M 702.4866222741701 312.47486056357405 L 705.8849557522124 306.5064102564103 L 705.8849557522124 306.5064102564103 L 711.1853409750156 310.57717976500913 L 755.8719349944882 331.50609678646185 L 772.733733658463 352.1189442490733 L 776.2389380530972 357.98076923076917 L 776.2389380530972 357.98076923076917 L 771.6691786685726 362.78041680530015 L 735.5572945137617 380.04351747574594 L 698.8495575221239 374.35897435897436 L 698.8517605400123 360.3227107758299 Z'),
								_Utils_Tuple2(50, 'M 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 393.249482004293 327.0732370244643 L 391.08293831766326 374.9326192227318 L 346.5725842879565 392.187284640168 L 308.8112440812291 416.1804959754058 L 287.0324182938648 440.10798052489463 L 254.38422039377338 429.4018228562667 L 213.77852443434634 401.11899558699133 L 232.84759750297872 368.0145548218944 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 236.85840707964599 362.6602564102564 L 243.3624462489828 359.9104299184991 L 292.67732591500385 365.78096987687024 L 328.4199062250135 376.7159585078911 L 349.8652889742526 367.00137405402313 L 375.21792033006926 324.560548410458 Z M 242.40062194892664 390.8169678885631 L 260.13840794543677 423.62461779765977 L 289.8366873272332 424.70955586330587 L 298.6866367272702 388.97621523452545 L 276.093757111574 387.35301006063145 L 270.09838865187015 397.7564102564103 L 263.3555323579151 387.4215416952229 Z'),
								_Utils_Tuple2(51, 'M 395.5908444261514 293.4178011565894 L 395.5908444261514 293.4178011565894 L 422.40314181563446 320.9848051184073 L 446.4032559913937 315.85196136432114 L 439.80345333765956 338.214599413176 L 447.27864308612317 346.50197344144186 L 454.86608024260516 354.1405362296682 L 462.76336194477346 360.8352692789382 L 470.3261003032063 365.9116597626119 L 476.93364792988297 369.6687774779382 L 482.67452715913385 372.5816076579225 L 487.6594556516982 374.97443777365027 L 479.17248333999544 384.68640466477785 L 434.78223072410793 405.1230349541456 L 471.64084582234784 408.57977967905424 L 499.7716146768313 402.80190355999815 L 506.5082057898494 399.0295257803954 L 496.2276337119755 406.40028901196075 L 480.22642421481686 416.8901398830197 L 494.7862348376079 414.9241225525488 L 483.63327204199203 422.07905456113906 L 496.78974081032874 420.3504909056657 L 486.68609371717406 426.8472895682808 L 498.77555371895556 425.43546791762634 L 486.4925426642717 438.2056002966925 L 518.1598297292828 436.9617981103728 L 523.2036044845761 432.13310679330624 L 519.0823748163759 438.1443801481703 L 504.67833791947805 485.6655113327942 L 470.88087517740166 516.5936338755142 L 456.779126349408 550.5928573794451 L 481.90904174485433 564.5158006987292 L 518.0667788316039 552.210589292851 L 522.9646017699115 554.5192307692307 L 517.922147710025 554.1678515312043 L 473.54679772896 575.4072973471445 L 440.88495575221236 603.6538461538462 L 436.1946902654867 603.6538461538462 L 427.08028946190996 571.2903578220214 L 418.77160695137354 522.7225942026275 L 374.150385814132 523.0442502546853 L 335.89222276392707 555.0562343468355 L 294.7806918262719 579.5519988963372 L 260.8479747715263 615.8895674758492 L 223.2688832351006 643.9096538227316 L 195.14963739514837 681.3678469850724 L 174.5884414030675 726.3667214724121 L 173.53982300884954 730 L 140.7079646017699 730 L 93.80530973451327 730 L 46.902654867256636 730 L 0 730 L 0 715.9615384615385 L 0 669.1666666666667 L 0 622.3717948717949 L 0 575.5769230769231 L 39.18013586925895 567.8721505546102 L 68.88241553762886 531.9933533829119 L 90.31420226999401 492.5683644981441 L 91.29969039093763 448.29635634982026 L 107.29480220464504 403.2421831708831 L 86.41504349549248 367.69282448078354 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 91.65495258381145 367.14443177417104 L 128.8454806793559 380.3107443710137 L 159.46902654867256 374.35897435897436 L 204.20497407610588 380.4882079760644 L 231.78641099557342 366.9586140554155 L 236.85840707964599 362.6602564102564 L 232.84759750297872 368.0145548218944 L 213.77852443434634 401.11899558699133 L 254.38422039377338 429.4018228562667 L 287.0324182938648 440.10798052489463 L 308.8112440812291 416.1804959754058 L 346.5725842879565 392.187284640168 L 391.08293831766326 374.9326192227318 L 393.249482004293 327.0732370244643 Z M 169.0751377267447 444.5625062853668 L 184.3676349865039 475.3458336507384 L 204.6339578808927 470.85421017004836 L 209.36738568407787 427.5451235827566 L 183.2587830182521 413.93761745697833 Z'),
								_Utils_Tuple2(52, 'M 446.4032559913937 315.85196136432114 L 446.4032559913937 315.85196136432114 L 463.34584551429447 331.3499774141755 L 470.95556178437835 338.94419943982507 L 477.32028239972726 347.07061225974644 L 481.7306300343453 355.16178688351505 L 484.5505415254276 362.53787606490613 L 486.36914279590866 369.15162412134214 L 487.6594556516982 374.97443777365027 L 482.67452715913385 372.5816076579225 L 476.93364792988297 369.6687774779382 L 470.3261003032063 365.9116597626119 L 462.76336194477346 360.8352692789382 L 454.86608024260516 354.1405362296682 L 447.27864308612317 346.50197344144186 L 439.80345333765956 338.214599413176 Z'),
								_Utils_Tuple2(53, 'M 526.4557513966982 337.6351730291464 L 525.7451343023681 378.43677026926224 L 515.4041822875903 391.16660550407835 L 506.5082057898494 399.0295257803954 L 506.5082057898494 399.0295257803954 L 506.5082057898494 399.0295257803954 L 499.7716146768313 402.80190355999815 L 471.64084582234784 408.57977967905424 L 434.78223072410793 405.1230349541456 L 479.17248333999544 384.68640466477785 L 487.6594556516982 374.97443777365027 L 510.3178641183156 345.2378895455958 Z'),
								_Utils_Tuple2(54, 'M 776.2389380530972 357.98076923076917 L 782.4461784405319 356.46728036333474 L 830.1899607272351 360.30757304802086 L 877.0796460212491 360.32051281697085 L 923.9823008810969 360.32051282436277 L 970.8665960064117 360.3388303753157 L 1017.4911983136346 369.97521832496693 L 1060 388.3974358974359 L 1060 435.19230769230774 L 1060 481.9871794871795 L 1060 528.7820512820513 L 1060 575.5769230769231 L 1060 622.3717948717949 L 1060 669.1666666666667 L 1060 673.8461538461539 L 1029.0062623182152 653.294308434572 L 988.7116490378744 627.9835035179697 L 950.096884696053 600.9967099833402 L 905.221238938053 584.9358974358975 L 951.5389891072938 586.691220016243 L 956.7546089150607 556.8158740407616 L 952.2872910705587 509.90108078071773 L 934.5875346450332 466.72682954924045 L 914.1138357416896 421.6406590429126 L 872.3430485856272 407.16161008919914 L 825.4891187497092 407.11777227316855 L 778.0573310008119 415.94882963542545 L 769.2035398230088 439.8717948717949 L 753.111495100331 405.41843593362785 L 776.8548670379471 363.2747671169103 L 776.2389380530972 357.98076923076917 Z'),
								_Utils_Tuple2(55, 'M 0 360.3205128205128 L 46.90265486725663 360.3205128205128 L 79.73451327433628 360.3205128205128 L 86.76991150442478 362.6602564102564 L 86.76991150442478 362.6602564102564 L 86.41504349549248 367.69282448078354 L 107.29480220464504 403.2421831708831 L 91.29969039093763 448.29635634982026 L 90.31420226999401 492.5683644981441 L 68.88241553762886 531.9933533829119 L 39.18013586925895 567.8721505546102 L 0 575.5769230769231 L 0 570.8974358974359 L 16.408320115750826 568.5501007057123 L 49.707785503908205 550.2986844003071 L 73.00031060228196 512.7043650264868 L 87.67569735413721 468.71624116652083 L 81.62660938923916 419.2660976278104 L 46.85127988652709 407.1666415355634 L 0 407.11538461538464 Z'),
								_Utils_Tuple2(56, 'M 506.5082057898494 399.0295257803954 L 517.1993747261787 391.546034833081 L 558.6102881065827 368.6887547899637 L 606.6198622984023 360.49931660123485 L 619.3520845095356 360.3403866325713 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 625.9607599360178 367.56023212655356 L 649.0727750518728 405.214016891258 L 617.1575692558525 442.59830489768945 L 592.5554145593582 464.71013480227134 L 573.091285221721 466.55995452021716 L 528.3545717175713 454.15966892424854 L 577.18508932421 461.2823890632928 L 597.473733135035 455.65397279698107 L 611.3387594534366 418.99273218931876 L 576.30806894862 409.50023958958957 L 532.4249224858091 425.0147105099883 L 529.2463263410996 427.3097131111594 L 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 521.0671073475248 429.43241328352366 L 532.5265499955128 412.0605242531797 L 532.3725611927428 390.2000647997875 L 513.8771709964744 397.6448764667272 L 506.5082057898494 399.0295257803954 Z'),
								_Utils_Tuple2(57, 'M 771.6691786685726 362.78041680530015 L 776.2389380530972 357.98076923076917 L 776.2389380530972 357.98076923076917 L 776.8548670379471 363.2747671169103 L 753.111495100331 405.41843593362785 L 769.2035398230088 439.8717948717949 L 748.737696402512 422.8692565985979 L 712.5950670155473 425.5222232629862 L 708.5937574511081 472.2667907511999 L 729.7808996754146 516.6397385797659 L 762.7949387862427 553.8938739661686 L 808.0499069181932 574.2557230082033 L 854.3920636187129 584.1739074999078 L 900.5311104180789 584.9357607838976 L 905.221238938053 584.9358974358975 L 950.096884696053 600.9967099833402 L 988.7116490378744 627.9835035179697 L 1029.0062623182152 653.294308434572 L 1060 673.8461538461539 L 1060 720.6410256410256 L 1060 730 L 1041.2389380530974 730 L 994.3362831858407 730 L 947.433628318584 730 L 941.992697830063 716.7104784228121 L 917.2155403458025 675.9178770787948 L 885.7744288776777 637.0944286632847 L 841.2480552126284 616.0056594764185 L 802.9582082050117 584.0152080934758 L 760.2759873195776 561.0865240204165 L 716.9737647136122 543.4559040732235 L 675.2899342152006 519.5345550152273 L 628.3615336514536 519.282931550589 L 613.7138311060248 548.7305885058786 L 602.1477561853486 596.085578952793 L 600.3539823008849 608.3333333333334 L 595.6637168141592 608.3333333333334 L 573.2392274670437 579.2319318607107 L 528.1018972308368 558.7527152567521 L 522.9646017699115 554.5192307692307 L 529.1567305262728 557.7002192882867 L 577.2948327570851 561.7828344021752 L 586.0212801344824 537.8844254115654 L 577.2214015119979 491.0281396147294 L 529.9428185719211 482.8204261963117 L 528.3545717175713 454.15966892424854 L 573.091285221721 466.55995452021716 L 592.5554145593582 464.71013480227134 L 617.1575692558525 442.59830489768945 L 649.0727750518728 405.214016891258 L 625.9607599360178 367.56023212655356 L 626.1820031757353 362.6629158906568 L 626.1820031757353 362.6629158906568 L 631.2226020145381 366.9592561152452 L 673.9015835341877 383.23942553587545 L 698.8495575221239 374.35897435897436 L 735.5572945137617 380.04351747574594 Z'),
								_Utils_Tuple2(58, 'M 506.5082057898494 399.0295257803954 L 506.5082057898494 399.0295257803954 L 513.8771709964744 397.6448764667272 L 532.3725611927428 390.2000647997875 L 532.5265499955128 412.0605242531797 L 521.0671073475248 429.43241328352366 L 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 518.1598297292828 436.9617981103728 L 486.4925426642717 438.2056002966925 L 498.77555371895556 425.43546791762634 L 486.68609371717406 426.8472895682808 L 496.78974081032874 420.3504909056657 L 483.63327204199203 422.07905456113906 L 494.7862348376079 414.9241225525488 L 480.22642421481686 416.8901398830197 L 496.2276337119755 406.40028901196075 Z'),
								_Utils_Tuple2(59, 'M 263.3555323579151 387.4215416952229 L 270.09838865187015 397.7564102564103 L 276.093757111574 387.35301006063145 L 298.6866367272702 388.97621523452545 L 289.8366873272332 424.70955586330587 L 260.13840794543677 423.62461779765977 L 242.40062194892664 390.8169678885631 Z'),
								_Utils_Tuple2(60, 'M 0 407.11538461538464 L 46.85127988652709 407.1666415355634 L 81.62660938923916 419.2660976278104 L 87.67569735413721 468.71624116652083 L 73.00031060228196 512.7043650264868 L 49.707785503908205 550.2986844003071 L 16.408320115750826 568.5501007057123 L 0 570.8974358974359 L 0 547.5 L 0 500.70512820512823 L 0 453.9102564102564 Z'),
								_Utils_Tuple2(61, 'M 576.30806894862 409.50023958958957 L 611.3387594534366 418.99273218931876 L 597.473733135035 455.65397279698107 L 577.18508932421 461.2823890632928 L 528.3545717175713 454.15966892424854 L 526.0455232150357 434.9211188349346 L 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 529.2463263410996 427.3097131111594 L 532.4249224858091 425.0147105099883 Z'),
								_Utils_Tuple2(62, 'M 825.4891187497092 407.11777227316855 L 872.3430485856272 407.16161008919914 L 914.1138357416896 421.6406590429126 L 934.5875346450332 466.72682954924045 L 952.2872910705587 509.90108078071773 L 956.7546089150607 556.8158740407616 L 951.5389891072938 586.691220016243 L 905.221238938053 584.9358974358975 L 902.156019598363 555.2376625947151 L 877.7910770593517 528.0722551206347 L 830.1385503643206 514.7819421921527 L 793.3068011675518 481.3367437311158 L 769.2035398230088 439.8717948717949 L 778.0573310008119 415.94882963542545 Z'),
								_Utils_Tuple2(63, 'M 183.2587830182521 413.93761745697833 L 209.36738568407787 427.5451235827566 L 204.6339578808927 470.85421017004836 L 184.3676349865039 475.3458336507384 L 169.0751377267447 444.5625062853668 Z'),
								_Utils_Tuple2(64, 'M 748.737696402512 422.8692565985979 L 769.2035398230088 439.8717948717949 L 793.3068011675518 481.3367437311158 L 830.1385503643206 514.7819421921527 L 877.7910770593517 528.0722551206347 L 902.156019598363 555.2376625947151 L 905.221238938053 584.9358974358975 L 900.5311104180789 584.9357607838976 L 854.3920636187129 584.1739074999078 L 808.0499069181932 574.2557230082033 L 762.7949387862427 553.8938739661686 L 729.7808996754146 516.6397385797659 L 708.5937574511081 472.2667907511999 L 712.5950670155473 425.5222232629862 Z'),
								_Utils_Tuple2(65, 'M 523.2036044845761 432.13310679330624 L 523.2036044845761 432.13310679330624 L 526.0455232150357 434.9211188349346 L 528.3545717175713 454.15966892424854 L 529.9428185719211 482.8204261963117 L 577.2214015119979 491.0281396147294 L 586.0212801344824 537.8844254115654 L 577.2948327570851 561.7828344021752 L 529.1567305262728 557.7002192882867 L 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 518.0667788316039 552.210589292851 L 481.90904174485433 564.5158006987292 L 456.779126349408 550.5928573794451 L 470.88087517740166 516.5936338755142 L 504.67833791947805 485.6655113327942 L 519.0823748163759 438.1443801481703 Z'),
								_Utils_Tuple2(66, 'M 418.77160695137354 522.7225942026275 L 427.08028946190996 571.2903578220214 L 436.1946902654867 603.6538461538462 L 396.129073629804 615.154659938589 L 361.11876998884145 617.660707987174 L 314.2528369373631 617.6973454156155 L 266.9100119426811 621.9376739858706 L 227.9591489907823 648.5891412705569 L 199.83989536361838 686.0473266635812 L 178.23008849557522 730 L 173.53982300884954 730 L 174.5884414030675 726.3667214724121 L 195.14963739514837 681.3678469850724 L 223.2688832351006 643.9096538227316 L 260.8479747715263 615.8895674758492 L 294.7806918262719 579.5519988963372 L 335.89222276392707 555.0562343468355 L 374.150385814132 523.0442502546853 Z M 378.8189697002036 527.7564871608507 L 361.91277323641856 553.5757156188322 L 408.93237929887573 557.800695648931 L 411.90505681358104 556.1704669378026 L 416.30377300331827 529.3116839479554 Z'),
								_Utils_Tuple2(67, 'M 675.2899342152006 519.5345550152273 L 716.9737647136122 543.4559040732235 L 760.2759873195776 561.0865240204165 L 802.9582082050117 584.0152080934758 L 841.2480552126284 616.0056594764185 L 885.7744288776777 637.0944286632847 L 917.2155403458025 675.9178770787948 L 941.992697830063 716.7104784228121 L 947.433628318584 730 L 942.7433628318583 730 L 937.6841230415089 721.0091520356306 L 912.5252748908712 680.5973642265608 L 881.0841633873821 641.7739158463335 L 836.2126662184681 621.0294770638433 L 787.9498408748741 613.0275474870782 L 741.0619468990851 613.0128205163821 L 694.159327732601 613.0127848976505 L 647.7102157499137 612.5602842620904 L 600.3539823008849 608.3333333333334 L 602.1477561853486 596.085578952793 L 613.7138311060248 548.7305885058786 L 628.3615336514536 519.282931550589 Z M 624.9299053308282 529.3169315799856 L 628.9622001989881 556.5415825567352 L 677.2401834848409 558.7709420672177 L 684.7305895528737 552.8631975125566 L 673.6317834664732 525.8702545236148 Z'),
								_Utils_Tuple2(68, 'M 416.30377300331827 529.3116839479554 L 411.90505681358104 556.1704669378026 L 408.93237929887573 557.800695648931 L 361.91277323641856 553.5757156188322 L 378.8189697002036 527.7564871608507 Z'),
								_Utils_Tuple2(69, 'M 673.6317834664732 525.8702545236148 L 684.7305895528737 552.8631975125566 L 677.2401834848409 558.7709420672177 L 628.9622001989881 556.5415825567352 L 624.9299053308282 529.3169315799856 Z'),
								_Utils_Tuple2(70, 'M 517.922147710025 554.1678515312043 L 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 520.6194690265487 561.5384615384615 L 520.6194690265487 608.3333333333334 L 520.6194690265487 622.3717948717949 L 480.9058499060062 632.0145004701083 L 440.88495575221236 603.6538461538462 L 473.54679772896 575.4072973471445 Z'),
								_Utils_Tuple2(71, 'M 522.9646017699115 554.5192307692307 L 522.9646017699115 554.5192307692307 L 528.1018972308368 558.7527152567521 L 573.2392274670437 579.2319318607107 L 595.6637168141592 608.3333333333334 L 565.0295145031666 628.8026892935732 L 520.6194690265487 622.3717948717949 L 520.6194690265487 608.3333333333334 L 520.6194690265487 561.5384615384615 Z'),
								_Utils_Tuple2(72, 'M 436.1946902654867 603.6538461538462 L 440.88495575221236 603.6538461538462 L 465.4500704810963 643.588950516511 L 453.1644953870757 689.3154458749641 L 454.95575221238937 730 L 450.26548672566366 730 L 449.1923188070398 717.0322402226329 L 443.89954308272894 670.8384940869096 L 417.1740800727418 655.3871569285234 L 370.5360147896014 655.1332383453911 L 323.0245529528397 659.2053141398131 L 296.9588979247958 689.3534045696226 L 295.4867256637168 730 L 272.0353982300885 730 L 225.13274336283183 730 L 178.23008849557522 730 L 199.83989536361838 686.0473266635812 L 227.9591489907823 648.5891412705569 L 266.9100119426811 621.9376739858706 L 314.2528369373631 617.6973454156155 L 361.11876998884145 617.660707987174 L 396.129073629804 615.154659938589 Z'),
								_Utils_Tuple2(73, 'M 440.88495575221236 603.6538461538462 L 480.9058499060062 632.0145004701083 L 520.6194690265487 622.3717948717949 L 565.0295145031666 628.8026892935732 L 595.6637168141592 608.3333333333334 L 570.7690704032516 648.8643579509511 L 590.2495260594517 693.2863643103999 L 590.9734513274336 697.2435897435898 L 575.5145807349143 675.2344847768321 L 535.4065200197269 669.9179695001974 L 525.3165016615719 715.9682900588589 L 525.3097345132743 730 L 501.858407079646 730 L 454.95575221238937 730 L 453.1644953870757 689.3154458749641 L 465.4500704810963 643.588950516511 Z'),
								_Utils_Tuple2(74, 'M 595.6637168141592 608.3333333333334 L 600.3539823008849 608.3333333333334 L 647.7102157499137 612.5602842620904 L 694.159327732601 613.0127848976505 L 741.0619468990851 613.0128205163821 L 787.9498408748741 613.0275474870782 L 836.2126662184681 621.0294770638433 L 881.0841633873821 641.7739158463335 L 912.5252748908712 680.5973642265608 L 937.6841230415089 721.0091520356306 L 942.7433628318583 730 L 938.0530973451326 730 L 891.150442477876 730 L 844.2477876106194 730 L 797.3451327433628 730 L 750.4424778761062 730 L 750.4409062003983 725.322080884484 L 747.5134719923374 676.7684288262228 L 721.4001244396025 651.3474085030385 L 675.4047641262475 650.4553266597709 L 628.5469485054953 655.1794603558092 L 595.9210168258826 678.7823497577051 L 590.9734513274336 697.2435897435898 L 590.2495260594517 693.2863643103999 L 570.7690704032516 648.8643579509511 Z'),
								_Utils_Tuple2(75, 'M 675.4047641262475 650.4553266597709 L 721.4001244396025 651.3474085030385 L 747.5134719923374 676.7684288262228 L 750.4409062003983 725.322080884484 L 750.4424778761062 730 L 736.3716814159292 730 L 689.4690265486726 730 L 642.566371681416 730 L 595.6637168141592 730 L 590.9734513274336 697.2435897435898 L 595.9210168258826 678.7823497577051 L 628.5469485054953 655.1794603558092 Z'),
								_Utils_Tuple2(76, 'M 370.5360147896014 655.1332383453911 L 417.1740800727418 655.3871569285234 L 443.89954308272894 670.8384940869096 L 449.1923188070398 717.0322402226329 L 450.26548672566366 730 L 436.1946902654867 730 L 389.29203539823004 730 L 342.3893805309734 730 L 295.4867256637168 730 L 296.9588979247958 689.3534045696226 L 323.0245529528397 659.2053141398131 Z'),
								_Utils_Tuple2(77, 'M 575.5145807349143 675.2344847768321 L 590.9734513274336 697.2435897435898 L 595.6637168141592 730 L 572.2123893805309 730 L 525.3097345132743 730 L 525.3165016615719 715.9682900588589 L 535.4065200197269 669.9179695001974 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 46303.18823892044,
							q: -1,
							r: {b: 77.38938053097344, a: 77.21153846153847},
							c: 0,
							z: _List_fromArray(
								[1, 36, 45]),
							a4: _List_Nil,
							u: {b: 77.38938053097344, a: 77.21153846153847}
						},
							{
							bF: 8051.57560982195,
							q: -1,
							r: {b: 189.95575221238937, a: 236.31410256410257},
							c: 1,
							z: _List_fromArray(
								[0, 2]),
							a4: _List_Nil,
							u: {b: 189.95575221238937, a: 236.31410256410257}
						},
							{
							bF: 28982.078943913893,
							q: -1,
							r: {b: 227.47787610619469, a: 156.76282051282053},
							c: 2,
							z: _List_fromArray(
								[1, 3, 29, 34, 37, 46]),
							a4: _List_Nil,
							u: {b: 227.47787610619469, a: 156.76282051282053}
						},
							{
							bF: 2477.6308423863093,
							q: -1,
							r: {b: 227.47787610619469, a: 30.416666666666668},
							c: 3,
							z: _List_fromArray(
								[2, 4]),
							a4: _List_Nil,
							u: {b: 227.47787610619469, a: 30.416666666666668}
						},
							{
							bF: 15297.300798845765,
							q: -1,
							r: {b: 316.59292035398227, a: 77.21153846153847},
							c: 4,
							z: _List_fromArray(
								[3, 5, 6, 22]),
							a4: _List_Nil,
							u: {b: 316.59292035398227, a: 77.21153846153847}
						},
							{
							bF: 4564.965102224658,
							q: -1,
							r: {b: 363.49557522123894, a: 30.416666666666668},
							c: 5,
							z: _List_fromArray(
								[4]),
							a4: _List_Nil,
							u: {b: 363.49557522123894, a: 30.416666666666668}
						},
							{
							bF: 6485.877099124547,
							q: -1,
							r: {b: 447.92035398230087, a: 67.8525641025641},
							c: 6,
							z: _List_fromArray(
								[4, 7, 18]),
							a4: _List_Nil,
							u: {b: 447.92035398230087, a: 67.8525641025641}
						},
							{
							bF: 4725.148428904787,
							q: -1,
							r: {b: 527.6548672566371, a: 25.73717948717949},
							c: 7,
							z: _List_fromArray(
								[6, 8]),
							a4: _List_Nil,
							u: {b: 527.6548672566371, a: 25.73717948717949}
						},
							{
							bF: 5050.37510469659,
							q: -1,
							r: {b: 598.0088495575221, a: 58.493589743589745},
							c: 8,
							z: _List_fromArray(
								[7, 9, 19]),
							a4: _List_Nil,
							u: {b: 598.0088495575221, a: 58.493589743589745}
						},
							{
							bF: 5751.006249224414,
							q: -1,
							r: {b: 640.221238938053, a: 86.57051282051283},
							c: 9,
							z: _List_fromArray(
								[8, 10, 11, 23]),
							a4: _List_Nil,
							u: {b: 640.221238938053, a: 86.57051282051283}
						},
							{
							bF: 3812.308152135778,
							q: -1,
							r: {b: 644.9115044247787, a: 30.416666666666668},
							c: 10,
							z: _List_fromArray(
								[9]),
							a4: _List_Nil,
							u: {b: 644.9115044247787, a: 30.416666666666668}
						},
							{
							bF: 7259.320297161445,
							q: -1,
							r: {b: 734.0265486725664, a: 35.09615384615385},
							c: 11,
							z: _List_fromArray(
								[9, 12, 28]),
							a4: _List_Nil,
							u: {b: 734.0265486725664, a: 35.09615384615385}
						},
							{
							bF: 3459.315909985682,
							q: -1,
							r: {b: 776.2389380530973, a: 7.01923076923077},
							c: 12,
							z: _List_fromArray(
								[11, 13, 24]),
							a4: _List_Nil,
							u: {b: 776.2389380530973, a: 7.01923076923077}
						},
							{
							bF: 6200.9700543497165,
							q: -1,
							r: {b: 809.0707964601769, a: 21.05769230769231},
							c: 13,
							z: _List_fromArray(
								[12, 14, 20]),
							a4: _List_Nil,
							u: {b: 809.0707964601769, a: 21.05769230769231}
						},
							{
							bF: 5733.528957797855,
							q: -1,
							r: {b: 870.0442477876105, a: 25.73717948717949},
							c: 14,
							z: _List_fromArray(
								[13, 15]),
							a4: _List_Nil,
							u: {b: 870.0442477876105, a: 25.73717948717949}
						},
							{
							bF: 4974.219916712911,
							q: -1,
							r: {b: 959.1592920353982, a: 58.493589743589745},
							c: 15,
							z: _List_fromArray(
								[14, 16, 21, 26]),
							a4: _List_Nil,
							u: {b: 959.1592920353982, a: 58.493589743589745}
						},
							{
							bF: 4940.875218528414,
							q: -1,
							r: {b: 1001.3716814159292, a: 86.57051282051283},
							c: 16,
							z: _List_fromArray(
								[15, 17, 26]),
							a4: _List_Nil,
							u: {b: 1001.3716814159292, a: 86.57051282051283}
						},
							{
							bF: 4371.46186543916,
							q: -1,
							r: {b: 1006.0619469026548, a: 30.416666666666668},
							c: 17,
							z: _List_fromArray(
								[16]),
							a4: _List_Nil,
							u: {b: 1006.0619469026548, a: 30.416666666666668}
						},
							{
							bF: 3130.3335479323305,
							q: -1,
							r: {b: 485.4424778761062, a: 105.28846153846155},
							c: 18,
							z: _List_fromArray(
								[6, 19, 27]),
							a4: _List_Nil,
							u: {b: 485.4424778761062, a: 105.28846153846155}
						},
							{
							bF: 3057.9258679263294,
							q: -1,
							r: {b: 546.4159292035398, a: 105.28846153846155},
							c: 19,
							z: _List_fromArray(
								[8, 18, 27]),
							a4: _List_Nil,
							u: {b: 546.4159292035398, a: 105.28846153846155}
						},
							{
							bF: 2833.540277934557,
							q: -1,
							r: {b: 851.2831858407079, a: 109.96794871794873},
							c: 20,
							z: _List_fromArray(
								[13, 21, 25]),
							a4: _List_Nil,
							u: {b: 851.2831858407079, a: 109.96794871794873}
						},
							{
							bF: 2919.5362984981402,
							q: -1,
							r: {b: 907.5663716814158, a: 105.28846153846155},
							c: 21,
							z: _List_fromArray(
								[15, 20, 25]),
							a4: _List_Nil,
							u: {b: 907.5663716814158, a: 105.28846153846155}
						},
							{
							bF: 8400.410095242849,
							q: -1,
							r: {b: 419.77876106194685, a: 133.3653846153846},
							c: 22,
							z: _List_fromArray(
								[4, 27, 29, 31]),
							a4: _List_Nil,
							u: {b: 419.77876106194685, a: 133.3653846153846}
						},
							{
							bF: 4941.121792843882,
							q: -1,
							r: {b: 616.7699115044247, a: 133.3653846153846},
							c: 23,
							z: _List_fromArray(
								[9, 27, 28]),
							a4: _List_Nil,
							u: {b: 616.7699115044247, a: 133.3653846153846}
						},
							{
							bF: 3933.27892714669,
							q: -1,
							r: {b: 799.6902654867256, a: 138.0448717948718},
							c: 24,
							z: _List_fromArray(
								[12, 25, 28]),
							a4: _List_Nil,
							u: {b: 799.6902654867256, a: 138.0448717948718}
						},
							{
							bF: 26231.73906693035,
							q: -1,
							r: {b: 837.2123893805309, a: 208.2371794871795},
							c: 25,
							z: _List_fromArray(
								[20, 21, 24, 26, 33, 35, 40, 49]),
							a4: _List_Nil,
							u: {b: 837.2123893805309, a: 208.2371794871795}
						},
							{
							bF: 5797.494924331229,
							q: -1,
							r: {b: 968.5398230088495, a: 133.3653846153846},
							c: 26,
							z: _List_fromArray(
								[15, 16, 25, 30]),
							a4: _List_Nil,
							u: {b: 968.5398230088495, a: 133.3653846153846}
						},
							{
							bF: 31708.649000307596,
							q: -1,
							r: {b: 504.20353982300884, a: 240.99358974358975},
							c: 27,
							z: _List_fromArray(
								[18, 19, 22, 23, 32, 35, 41, 44, 47, 48]),
							a4: _List_Nil,
							u: {b: 504.20353982300884, a: 240.99358974358975}
						},
							{
							bF: 10352.816441601193,
							q: -1,
							r: {b: 729.3362831858407, a: 170.80128205128207},
							c: 28,
							z: _List_fromArray(
								[11, 23, 24, 35]),
							a4: _List_Nil,
							u: {b: 729.3362831858407, a: 170.80128205128207}
						},
							{
							bF: 1078.6853981892982,
							q: -1,
							r: {b: 293.14159292035396, a: 147.40384615384616},
							c: 29,
							z: _List_fromArray(
								[2, 22]),
							a4: _List_Nil,
							u: {b: 293.14159292035396, a: 147.40384615384616}
						},
							{
							bF: 10593.300885516728,
							q: -1,
							r: {b: 1006.0619469026548, a: 203.55769230769232},
							c: 30,
							z: _List_fromArray(
								[26, 33]),
							a4: _List_Nil,
							u: {b: 1006.0619469026548, a: 203.55769230769232}
						},
							{
							bF: 7206.005000827678,
							q: -1,
							r: {b: 396.32743362831854, a: 194.19871794871796},
							c: 31,
							z: _List_fromArray(
								[22, 34, 38]),
							a4: _List_Nil,
							u: {b: 396.32743362831854, a: 194.19871794871796}
						},
							{
							bF: 1499.4878335657631,
							q: -1,
							r: {b: 551.1061946902655, a: 184.8397435897436},
							c: 32,
							z: _List_fromArray(
								[27]),
							a4: _List_Nil,
							u: {b: 551.1061946902655, a: 184.8397435897436}
						},
							{
							bF: 13890.859762280044,
							q: -1,
							r: {b: 931.0176991150443, a: 236.31410256410257},
							c: 33,
							z: _List_fromArray(
								[25, 30]),
							a4: _List_Nil,
							u: {b: 931.0176991150443, a: 236.31410256410257}
						},
							{
							bF: 1056.8416602236175,
							q: -1,
							r: {b: 335.3539823008849, a: 198.87820512820514},
							c: 34,
							z: _List_fromArray(
								[2, 31, 38]),
							a4: _List_Nil,
							u: {b: 335.3539823008849, a: 198.87820512820514}
						},
							{
							bF: 8488.556891617307,
							q: -1,
							r: {b: 724.646017699115, a: 273.75},
							c: 35,
							z: _List_fromArray(
								[25, 27, 28]),
							a4: _List_Nil,
							u: {b: 724.646017699115, a: 273.75}
						},
							{
							bF: 4344.879817952326,
							q: -1,
							r: {b: 21.106194690265486, a: 334.58333333333337},
							c: 36,
							z: _List_fromArray(
								[0, 39, 55]),
							a4: _List_Nil,
							u: {b: 21.106194690265486, a: 334.58333333333337}
						},
							{
							bF: 8235.952469324158,
							q: -1,
							r: {b: 283.76106194690266, a: 339.26282051282055},
							c: 37,
							z: _List_fromArray(
								[2, 38, 44, 50]),
							a4: _List_Nil,
							u: {b: 283.76106194690266, a: 339.26282051282055}
						},
							{
							bF: 8287.879266685351,
							q: -1,
							r: {b: 335.3539823008849, a: 273.75},
							c: 38,
							z: _List_fromArray(
								[31, 34, 37]),
							a4: _List_Nil,
							u: {b: 335.3539823008849, a: 273.75}
						},
							{
							bF: 3705.908411546362,
							q: -1,
							r: {b: 30.48672566371681, a: 273.75},
							c: 39,
							z: _List_fromArray(
								[36]),
							a4: _List_Nil,
							u: {b: 30.48672566371681, a: 273.75}
						},
							{
							bF: 12602.273689824302,
							q: -1,
							r: {b: 893.4955752212389, a: 325.224358974359},
							c: 40,
							z: _List_fromArray(
								[25, 42, 54]),
							a4: _List_Nil,
							u: {b: 893.4955752212389, a: 325.224358974359}
						},
							{
							bF: 12024.344437976011,
							q: -1,
							r: {b: 508.8938053097345, a: 320.5448717948718},
							c: 41,
							z: _List_fromArray(
								[27, 43, 52, 53, 56]),
							a4: _List_Nil,
							u: {b: 508.8938053097345, a: 320.5448717948718}
						},
							{
							bF: 1645.0709159172256,
							q: -1,
							r: {b: 827.8318584070796, a: 287.78846153846155},
							c: 42,
							z: _List_fromArray(
								[40]),
							a4: _List_Nil,
							u: {b: 827.8318584070796, a: 287.78846153846155}
						},
							{
							bF: 1275.796147367757,
							q: -1,
							r: {b: 583.5512937298047, a: 291.7682699572705},
							c: 43,
							z: _List_fromArray(
								[41]),
							a4: _List_Nil,
							u: {b: 583.5512937298047, a: 291.7682699572705}
						},
							{
							bF: 1744.9566094045658,
							q: -1,
							r: {b: 390.83076927789915, a: 277.84550913066886},
							c: 44,
							z: _List_fromArray(
								[27, 37]),
							a4: _List_Nil,
							u: {b: 390.83076927789915, a: 277.84550913066886}
						},
							{
							bF: 2900.7120040304635,
							q: -1,
							r: {b: 124.29203539823008, a: 357.9807692307692},
							c: 45,
							z: _List_fromArray(
								[0, 46, 51]),
							a4: _List_Nil,
							u: {b: 124.29203539823008, a: 357.9807692307692}
						},
							{
							bF: 3047.3572139000607,
							q: -1,
							r: {b: 189.95575221238937, a: 357.9807692307692},
							c: 46,
							z: _List_fromArray(
								[2, 45, 51]),
							a4: _List_Nil,
							u: {b: 189.95575221238937, a: 357.9807692307692}
						},
							{
							bF: 1032.4052683341652,
							q: -1,
							r: {b: 433.84955752212386, a: 306.5064102564103},
							c: 47,
							z: _List_fromArray(
								[27, 51]),
							a4: _List_Nil,
							u: {b: 433.84955752212386, a: 306.5064102564103}
						},
							{
							bF: 3667.6120526227605,
							q: -1,
							r: {b: 663.6725663716813, a: 348.6217948717949},
							c: 48,
							z: _List_fromArray(
								[27, 49, 57]),
							a4: _List_Nil,
							u: {b: 663.6725663716813, a: 348.6217948717949}
						},
							{
							bF: 3640.373992915105,
							q: -1,
							r: {b: 729.3362831858407, a: 348.6217948717949},
							c: 49,
							z: _List_fromArray(
								[25, 48, 57]),
							a4: _List_Nil,
							u: {b: 729.3362831858407, a: 348.6217948717949}
						},
							{
							bF: 7358.149099726339,
							q: -1,
							r: {b: 321.283185840708, a: 381.37820512820514},
							c: 50,
							z: _List_fromArray(
								[37, 51, 59]),
							a4: _List_Nil,
							u: {b: 321.283185840708, a: 381.37820512820514}
						},
							{
							bF: 108090.27692713418,
							q: -1,
							r: {b: 152.43362831858406, a: 587.2756410256411},
							c: 51,
							z: _List_fromArray(
								[45, 46, 47, 50, 52, 53, 55, 58, 63, 65, 66, 70, 72]),
							a4: _List_Nil,
							u: {b: 152.43362831858406, a: 587.2756410256411}
						},
							{
							bF: 1132.1610141730634,
							q: -1,
							r: {b: 459.17373998857994, a: 342.59784354949386},
							c: 52,
							z: _List_fromArray(
								[41, 51]),
							a4: _List_Nil,
							u: {b: 459.17373998857994, a: 342.59784354949386}
						},
							{
							bF: 2434.5779929308774,
							q: -1,
							r: {b: 506.811425538286, a: 376.4857909564769},
							c: 53,
							z: _List_fromArray(
								[41, 51]),
							a4: _List_Nil,
							u: {b: 506.811425538286, a: 376.4857909564769}
						},
							{
							bF: 41154.142300514184,
							q: -1,
							r: {b: 987.3008849557522, a: 428.17307692307696},
							c: 54,
							z: _List_fromArray(
								[40, 57, 62]),
							a4: _List_Nil,
							u: {b: 987.3008849557522, a: 428.17307692307696}
						},
							{
							bF: 6367.774956642475,
							q: -1,
							r: {b: 21.106194690265486, a: 381.37820512820514},
							c: 55,
							z: _List_fromArray(
								[36, 51, 60]),
							a4: _List_Nil,
							u: {b: 21.106194690265486, a: 381.37820512820514}
						},
							{
							bF: 6408.5510592879145,
							q: -1,
							r: {b: 616.7699115044247, a: 386.0576923076923},
							c: 56,
							z: _List_fromArray(
								[41, 57, 58, 61]),
							a4: _List_Nil,
							u: {b: 616.7699115044247, a: 386.0576923076923}
						},
							{
							bF: 42503.495627709504,
							q: -1,
							r: {b: 963.8495575221239, a: 666.8269230769231},
							c: 57,
							z: _List_fromArray(
								[48, 49, 54, 56, 64, 65, 67, 71, 74]),
							a4: _List_Nil,
							u: {b: 963.8495575221239, a: 666.8269230769231}
						},
							{
							bF: 1437.753170632379,
							q: -1,
							r: {b: 513.5840707964602, a: 400.09615384615387},
							c: 58,
							z: _List_fromArray(
								[51, 56]),
							a4: _List_Nil,
							u: {b: 513.5840707964602, a: 400.09615384615387}
						},
							{
							bF: 1496.370214122573,
							q: -1,
							r: {b: 288.4513274336283, a: 395.4166666666667},
							c: 59,
							z: _List_fromArray(
								[50]),
							a4: _List_Nil,
							u: {b: 288.4513274336283, a: 395.4166666666667}
						},
							{
							bF: 11427.564645903785,
							q: -1,
							r: {b: 44.557522123893804, a: 460.9294871794872},
							c: 60,
							z: _List_fromArray(
								[55]),
							a4: _List_Nil,
							u: {b: 44.557522123893804, a: 460.9294871794872}
						},
							{
							bF: 3201.270481709129,
							q: -1,
							r: {b: 551.1061946902655, a: 432.85256410256414},
							c: 61,
							z: _List_fromArray(
								[56, 65]),
							a4: _List_Nil,
							u: {b: 551.1061946902655, a: 432.85256410256414}
						},
							{
							bF: 19540.079787569615,
							q: -1,
							r: {b: 855.9734513274336, a: 465.60897435897436},
							c: 62,
							z: _List_fromArray(
								[54, 64]),
							a4: _List_Nil,
							u: {b: 855.9734513274336, a: 465.60897435897436}
						},
							{
							bF: 1674.7999946874625,
							q: -1,
							r: {b: 189.95575221238937, a: 432.85256410256414},
							c: 63,
							z: _List_fromArray(
								[51]),
							a4: _List_Nil,
							u: {b: 189.95575221238937, a: 432.85256410256414}
						},
							{
							bF: 15036.15821312819,
							q: -1,
							r: {b: 752.787610619469, a: 484.3269230769231},
							c: 64,
							z: _List_fromArray(
								[57, 62]),
							a4: _List_Nil,
							u: {b: 752.787610619469, a: 484.3269230769231}
						},
							{
							bF: 8638.2746694964,
							q: -1,
							r: {b: 513.5840707964602, a: 512.4038461538462},
							c: 65,
							z: _List_fromArray(
								[51, 57, 61]),
							a4: _List_Nil,
							u: {b: 513.5840707964602, a: 512.4038461538462}
						},
							{
							bF: 10303.694896402216,
							q: -1,
							r: {b: 340.0442477876106, a: 582.5961538461539},
							c: 66,
							z: _List_fromArray(
								[51, 68, 72]),
							a4: _List_Nil,
							u: {b: 340.0442477876106, a: 582.5961538461539}
						},
							{
							bF: 13791.92059549311,
							q: -1,
							r: {b: 710.5752212389381, a: 577.9166666666667},
							c: 67,
							z: _List_fromArray(
								[57, 69, 74]),
							a4: _List_Nil,
							u: {b: 710.5752212389381, a: 577.9166666666667}
						},
							{
							bF: 1218.7394239668793,
							q: -1,
							r: {b: 391.6371681415929, a: 540.4807692307693},
							c: 68,
							z: _List_fromArray(
								[66]),
							a4: _List_Nil,
							u: {b: 391.6371681415929, a: 540.4807692307693}
						},
							{
							bF: 1593.9405449824117,
							q: -1,
							r: {b: 635.5309734513274, a: 540.4807692307693},
							c: 69,
							z: _List_fromArray(
								[67]),
							a4: _List_Nil,
							u: {b: 635.5309734513274, a: 540.4807692307693}
						},
							{
							bF: 3829.9850598737103,
							q: -1,
							r: {b: 476.0619469026548, a: 601.3141025641025},
							c: 70,
							z: _List_fromArray(
								[51, 71, 73]),
							a4: _List_Nil,
							u: {b: 476.0619469026548, a: 601.3141025641025}
						},
							{
							bF: 3565.3735662536346,
							q: -1,
							r: {b: 551.1061946902655, a: 601.3141025641025},
							c: 71,
							z: _List_fromArray(
								[57, 70, 73]),
							a4: _List_Nil,
							u: {b: 551.1061946902655, a: 601.3141025641025}
						},
							{
							bF: 17264.320077300523,
							q: -1,
							r: {b: 260.30973451327435, a: 666.8269230769231},
							c: 72,
							z: _List_fromArray(
								[51, 66, 73, 76]),
							a4: _List_Nil,
							u: {b: 260.30973451327435, a: 666.8269230769231}
						},
							{
							bF: 10048.570046015288,
							q: -1,
							r: {b: 490.13274336283183, a: 676.1858974358975},
							c: 73,
							z: _List_fromArray(
								[70, 71, 72, 74, 77]),
							a4: _List_Nil,
							u: {b: 490.13274336283183, a: 676.1858974358975}
						},
							{
							bF: 25472.136341008154,
							q: -1,
							r: {b: 804.3805309734513, a: 671.5064102564103},
							c: 74,
							z: _List_fromArray(
								[57, 67, 73, 75]),
							a4: _List_Nil,
							u: {b: 804.3805309734513, a: 671.5064102564103}
						},
							{
							bF: 11248.485856423154,
							q: -1,
							r: {b: 635.5309734513274, a: 690.224358974359},
							c: 75,
							z: _List_fromArray(
								[74, 77]),
							a4: _List_Nil,
							u: {b: 635.5309734513274, a: 690.224358974359}
						},
							{
							bF: 10413.759339201642,
							q: -1,
							r: {b: 330.6637168141593, a: 690.224358974359},
							c: 76,
							z: _List_fromArray(
								[72]),
							a4: _List_Nil,
							u: {b: 330.6637168141593, a: 690.224358974359}
						},
							{
							bF: 3430.4213368207566,
							q: -1,
							r: {b: 555.7964601769911, a: 694.9038461538462},
							c: 77,
							z: _List_fromArray(
								[73, 75]),
							a4: _List_Nil,
							u: {b: 555.7964601769911, a: 694.9038461538462}
						}
						]),
					bc: 1060
				});
		case 'a | !a':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 425,
							bu: 12,
							k: _List_fromArray(
								[
									{
									ah: {b: 117.00564971751413, a: 116.98232323232324},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 0,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 2, 3, 7, 8, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 297.34463276836163, a: 183.52272727272728},
									aa: $elm$core$Maybe$Nothing,
									bl: '!(a)',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 5, 7, 9]),
									a4: _List_Nil
								},
									{
									ah: {b: 338.135593220339, a: 119.12878787878789},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 2,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 1]),
									a4: _List_Nil
								},
									{
									ah: {b: 26.836158192090398, a: 277.96717171717177},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 4, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 39.717514124293785, a: 222.15909090909093},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 4,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3]),
									a4: _List_Nil
								},
									{
									ah: {b: 351.0169491525424, a: 277.96717171717177},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 6, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 301.6384180790961, a: 235.0378787878788},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5]),
									a4: _List_Nil
								},
									{
									ah: {b: 209.3220338983051, a: 243.62373737373738},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 1]),
									a4: _List_Nil
								},
									{
									ah: {b: 149.20903954802262, a: 301.57828282828285},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 9, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 213.61581920903956, a: 297.2853535353536},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 8, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 271.5819209039548, a: 325.18939393939394},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 12, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 82.65536723163842, a: 327.3358585858586},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 3, 12, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 147.0621468926554, a: 370.26515151515156},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a | !(a))',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 9, 10, 11, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 37.57062146892656, a: 387.4368686868687},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11]),
									a4: _List_Nil
								},
									{
									ah: {b: 295.1977401129944, a: 387.4368686868687},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 217.90960451977404, a: 391.72979797979804},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[12, 14]),
									a4: _List_Nil
								}
								]),
							bc: 380
						}),
					dG: true,
					cg: 1.0000000000000004,
					a0: 425,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 49.37853107344633 0 L 98.75706214689266 0 L 148.135593220339 0 L 197.51412429378533 0 L 246.89265536723167 0 L 296.271186440678 0 L 345.64971751412435 0 L 380.00000000000006 0 L 380.00000000000006 49.36868686868687 L 380.00000000000006 79.41919191919193 L 347.7966101694916 79.41919191919193 L 298.41807909604523 79.41919191919193 L 268.2157677281868 83.56633608921918 L 266.2146892655368 133.08080808080808 L 266.21468926552745 182.4494949494856 L 263.263145483277 224.57429716878664 L 246.89265536723167 227.52525252525254 L 225.42372881355934 227.52525252525254 L 176.045197740113 227.52525252525254 L 126.34771500674316 231.49864291832904 L 120.07820504784023 244.15090511776907 L 169.05327402102074 244.23724796782238 L 180.96485589811613 244.35873901379497 L 183.55932203389833 245.77020202020202 L 181.55878401307484 245.9165274771871 L 172.6115692487367 273.4609954377488 L 124.3736343403026 278.89429350411035 L 119.42142526207118 299.70064746596626 L 107.29891659125877 302.6058080884827 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 100.9039548022599 302.6515151515152 L 83.72881355932205 302.6515151515152 L 81.68429045641375 264.1642470593537 L 87.80076355257862 221.17844116140333 L 75.56086050925306 197.05521355916318 L 44.142602020784295 187.68438015990225 L 1.4861939570969387 188.2283532424899 L 0 188.8888888888889 L 0 148.10606060606062 L 0 98.73737373737374 L 0 49.36868686868687 Z'),
								_Utils_Tuple2(1, 'M 298.41807909604523 79.41919191919193 L 298.41814955656383 128.7878083414073 L 303.1435963935313 158.40673792260245 L 349.95782794407876 171.7028494538368 L 380.00000000000006 173.86363636363637 L 380.00000000000006 223.23232323232324 L 380.00000000000006 231.81818181818184 L 378.3869408084855 231.2844547804583 L 332.56872104001735 214.84606541698767 L 297.8832643648836 211.96532478051336 L 273.9109203440678 230.85074016341002 L 275.5477789695688 262.64752850683175 L 258.17575734149466 298.90711517828197 L 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 254.68988128920665 299.148772993347 L 229.27585586370057 270.89611566524627 L 185.8281773233849 247.7947283472671 L 183.55932203389833 245.77020202020202 L 186.31026281050924 247.31273896968963 L 225.49039794448947 261.79535855970107 L 243.94111224001108 258.9177308243979 L 246.89265536723167 227.52525252525254 L 263.263145483277 224.57429716878664 L 266.21468926552745 182.4494949494856 L 266.2146892655368 133.08080808080808 L 268.2157677281868 83.56633608921918 Z'),
								_Utils_Tuple2(2, 'M 298.41807909604523 79.41919191919193 L 347.7966101694916 79.41919191919193 L 380.00000000000006 79.41919191919193 L 380.00000000000006 128.7878787878788 L 380.00000000000006 173.86363636363637 L 349.95782794407876 171.7028494538368 L 303.1435963935313 158.40673792260245 L 298.41814955656383 128.7878083414073 Z'),
								_Utils_Tuple2(3, 'M 44.142602020784295 187.68438015990225 L 75.56086050925306 197.05521355916318 L 87.80076355257862 221.17844116140333 L 81.68429045641375 264.1642470593537 L 83.72881355932205 302.6515151515152 L 49.37261012916591 306.9385246805756 L 0 306.94444444444446 L 0 285.479797979798 L 0 236.11111111111114 L 43.993212361618106 256.52013142994747 L 74.94924333017994 253.09086692294244 L 85.44499396510062 225.10893141603498 L 76.5375301220228 202.51813256727056 L 51.518729847459625 191.0420460822024 L 3.2468914013535777 189.98914403837108 L 0 191.03535353535355 L 0 188.8888888888889 L 1.4861939570969387 188.2283532424899 Z'),
								_Utils_Tuple2(4, 'M 51.518729847459625 191.0420460822024 L 76.5375301220228 202.51813256727056 L 85.44499396510062 225.10893141603498 L 74.94924333017994 253.09086692294244 L 43.993212361618106 256.52013142994747 L 0 236.11111111111114 L 0 191.03535353535355 L 3.2468914013535777 189.98914403837108 Z'),
								_Utils_Tuple2(5, 'M 332.56872104001735 214.84606541698767 L 378.3869408084855 231.2844547804583 L 380.00000000000006 231.81818181818184 L 380.00000000000006 281.1868686868687 L 380.00000000000006 306.94444444444446 L 356.3841807909605 306.94444444444446 L 307.01991282685253 306.9301841786288 L 259.30076565629184 300.0883752577563 L 256.5536723163842 301.57828282828285 L 258.17575734149466 298.90711517828197 L 275.5477789695688 262.64752850683175 L 273.9109203440678 230.85074016341002 L 297.8832643648836 211.96532478051336 Z M 293.7498826612083 216.41859415490677 L 275.88598562784534 234.47668215681227 L 287.47627626976924 255.6365911727441 L 336.2808736083672 256.7946400512382 L 340.55128028011245 254.6248029826033 L 342.8576169489161 230.316622665764 L 326.0500553572258 214.92417020248655 Z'),
								_Utils_Tuple2(6, 'M 326.0500553572258 214.92417020248655 L 342.8576169489161 230.316622665764 L 340.55128028011245 254.6248029826033 L 336.2808736083672 256.7946400512382 L 287.47627626976924 255.6365911727441 L 275.88598562784534 234.47668215681227 L 293.7498826612083 216.41859415490677 Z'),
								_Utils_Tuple2(7, 'M 176.045197740113 227.52525252525254 L 225.42372881355934 227.52525252525254 L 246.89265536723167 227.52525252525254 L 243.94111224001108 258.9177308243979 L 225.49039794448947 261.79535855970107 L 186.31026281050924 247.31273896968963 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 180.96485589811613 244.35873901379497 L 169.05327402102074 244.23724796782238 L 120.07820504784023 244.15090511776907 L 126.34771500674316 231.49864291832904 Z'),
								_Utils_Tuple2(8, 'M 181.55878401307484 245.9165274771871 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 182.00379021909038 248.50790961232155 L 180.33898305084747 298.3585858585859 L 180.33898305084747 317.6767676767677 L 158.21268282720365 325.5724210553323 L 151.29420222070132 328.5095449311373 L 123.61937584480752 322.8699154111979 L 105.92279816564303 306.2195309408494 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 107.29891659125877 302.6058080884827 L 119.42142526207118 299.70064746596626 L 124.3736343403026 278.89429350411035 L 172.6115692487367 273.4609954377488 Z'),
								_Utils_Tuple2(9, 'M 182.00379021909038 248.50790961232155 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 185.8281773233849 247.7947283472671 L 229.27585586370057 270.89611566524627 L 254.68988128920665 299.148772993347 L 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 254.9243836016259 304.2422482247781 L 239.62037256605453 321.1382579217918 L 214.06668638537482 329.00969065622155 L 194.73955640666367 318.4442690323283 L 180.33898305084747 317.6767676767677 L 180.33898305084747 298.3585858585859 Z'),
								_Utils_Tuple2(10, 'M 307.01991282685253 306.9301841786288 L 356.3841807909605 306.94444444444446 L 380.00000000000006 306.94444444444446 L 380.00000000000006 352.020202020202 L 341.3559320949656 349.87373748214077 L 293.1746148494684 351.0707124142911 L 261.85927256638934 358.3979768581424 L 251.18644067796612 388.51010101010104 L 251.45055928099225 377.342924667538 L 236.73306564474143 357.8848368263384 L 229.01500715637007 333.1303996465173 L 246.0298497091577 321.1070619828388 L 257.22634250339513 304.3972835568567 L 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 259.30076565629184 300.0883752577563 Z'),
								_Utils_Tuple2(11, 'M 83.72881355932205 302.6515151515152 L 100.9039548022599 302.6515151515152 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 103.6053431059585 306.3900593414976 L 119.85291384803955 324.48868368190347 L 131.6681166414043 334.5520095687004 L 107.09508961429589 376.8667409628989 L 111.63841807909606 425.00000000000006 L 109.49152542372883 425.00000000000006 L 108.9838170567383 406.1894253310322 L 101.15115657491557 358.21244346959037 L 83.69626084311437 352.05274824663377 L 35.54693558142509 351.07018457519433 L 0 356.31313131313135 L 0 306.94444444444446 L 49.37261012916591 306.9385246805756 Z'),
								_Utils_Tuple2(12, 'M 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 257.22634250339513 304.3972835568567 L 246.0298497091577 321.1070619828388 L 229.01500715637007 333.1303996465173 L 236.73306564474143 357.8848368263384 L 251.45055928099225 377.342924667538 L 251.18644067796612 388.51010101010104 L 235.1275606232898 361.6364866079042 L 196.17496936711137 361.4136373057787 L 186.00274553660563 374.8545525384259 L 184.63276836158232 422.8535353535358 L 184.63276836158195 425.00000000000006 L 161.0169491525424 425.00000000000006 L 111.63841807909606 425.00000000000006 L 107.09508961429589 376.8667409628989 L 131.6681166414043 334.5520095687004 L 119.85291384803955 324.48868368190347 L 103.6053431059585 306.3900593414976 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 105.92279816564303 306.2195309408494 L 123.61937584480752 322.8699154111979 L 151.29420222070132 328.5095449311373 L 158.21268282720365 325.5724210553323 L 180.33898305084747 317.6767676767677 L 194.73955640666367 318.4442690323283 L 214.06668638537482 329.00969065622155 L 239.62037256605453 321.1382579217918 L 254.9243836016259 304.2422482247781 Z'),
								_Utils_Tuple2(13, 'M 83.69626084311437 352.05274824663377 L 101.15115657491557 358.21244346959037 L 108.9838170567383 406.1894253310322 L 109.49152542372883 425.00000000000006 L 98.75706214689266 425.00000000000006 L 49.37853107344633 425.00000000000006 L 0 425.00000000000006 L 0 405.6818181818182 L 0 356.31313131313135 L 35.54693558142509 351.07018457519433 Z'),
								_Utils_Tuple2(14, 'M 341.3559320949656 349.87373748214077 L 380.00000000000006 352.020202020202 L 380.00000000000006 401.3888888888889 L 380.00000000000006 425.00000000000006 L 349.9435028248588 425.00000000000006 L 300.5649717514125 425.00000000000006 L 251.18644067796612 425.00000000000006 L 251.18644067796612 388.51010101010104 L 261.85927256638934 358.3979768581424 L 293.1746148494684 351.0707124142911 Z'),
								_Utils_Tuple2(15, 'M 235.1275606232898 361.6364866079042 L 251.18644067796612 388.51010101010104 L 251.18644067796612 425.00000000000006 L 234.01129943502826 425.00000000000006 L 184.63276836158195 425.00000000000006 L 184.63276836158232 422.8535353535358 L 186.00274553660563 374.8545525384259 L 196.17496936711137 361.4136373057787 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 71324.25476306284,
							q: -1,
							r: {b: 117.00564971751413, a: 116.98232323232324},
							c: 0,
							z: _List_fromArray(
								[1, 2, 3, 7, 8, 11]),
							a4: _List_Nil,
							u: {b: 117.00564971751413, a: 116.98232323232324}
						},
							{
							bF: 11146.905284408402,
							q: -1,
							r: {b: 297.34463276836163, a: 183.52272727272728},
							c: 1,
							z: _List_fromArray(
								[0, 2, 5, 7, 9]),
							a4: _List_Nil,
							u: {b: 297.34463276836163, a: 183.52272727272728}
						},
							{
							bF: 7117.0956239903335,
							q: -1,
							r: {b: 338.135593220339, a: 119.12878787878789},
							c: 2,
							z: _List_fromArray(
								[0, 1]),
							a4: _List_Nil,
							u: {b: 338.135593220339, a: 119.12878787878789}
						},
							{
							bF: 5039.022281749318,
							q: -1,
							r: {b: 26.836158192090398, a: 277.96717171717177},
							c: 3,
							z: _List_fromArray(
								[0, 4, 11]),
							a4: _List_Nil,
							u: {b: 26.836158192090398, a: 277.96717171717177}
						},
							{
							bF: 4590.666609666601,
							q: -1,
							r: {b: 39.717514124293785, a: 222.15909090909093},
							c: 4,
							z: _List_fromArray(
								[3]),
							a4: _List_Nil,
							u: {b: 39.717514124293785, a: 222.15909090909093}
						},
							{
							bF: 7184.924625896809,
							q: -1,
							r: {b: 351.0169491525424, a: 277.96717171717177},
							c: 5,
							z: _List_fromArray(
								[1, 6, 10]),
							a4: _List_Nil,
							u: {b: 351.0169491525424, a: 277.96717171717177}
						},
							{
							bF: 2260.678882349792,
							q: -1,
							r: {b: 301.6384180790961, a: 235.0378787878788},
							c: 6,
							z: _List_fromArray(
								[5]),
							a4: _List_Nil,
							u: {b: 301.6384180790961, a: 235.0378787878788}
						},
							{
							bF: 2661.738184713191,
							q: -1,
							r: {b: 209.3220338983051, a: 243.62373737373738},
							c: 7,
							z: _List_fromArray(
								[0, 1]),
							a4: _List_Nil,
							u: {b: 209.3220338983051, a: 243.62373737373738}
						},
							{
							bF: 3163.521982309585,
							q: -1,
							r: {b: 149.20903954802262, a: 301.57828282828285},
							c: 8,
							z: _List_fromArray(
								[0, 9, 12]),
							a4: _List_Nil,
							u: {b: 149.20903954802262, a: 301.57828282828285}
						},
							{
							bF: 3951.8499108421784,
							q: -1,
							r: {b: 213.61581920903956, a: 297.2853535353536},
							c: 9,
							z: _List_fromArray(
								[1, 8, 12]),
							a4: _List_Nil,
							u: {b: 213.61581920903956, a: 297.2853535353536}
						},
							{
							bF: 6944.644663009472,
							q: -1,
							r: {b: 271.5819209039548, a: 325.18939393939394},
							c: 10,
							z: _List_fromArray(
								[5, 12, 14]),
							a4: _List_Nil,
							u: {b: 271.5819209039548, a: 325.18939393939394}
						},
							{
							bF: 6074.552438278076,
							q: -1,
							r: {b: 82.65536723163842, a: 327.3358585858586},
							c: 11,
							z: _List_fromArray(
								[0, 3, 12, 13]),
							a4: _List_Nil,
							u: {b: 82.65536723163842, a: 327.3358585858586}
						},
							{
							bF: 9318.15841155246,
							q: -1,
							r: {b: 147.0621468926554, a: 370.26515151515156},
							c: 12,
							z: _List_fromArray(
								[8, 9, 10, 11, 15]),
							a4: _List_Nil,
							u: {b: 147.0621468926554, a: 370.26515151515156}
						},
							{
							bF: 7630.342829203022,
							q: -1,
							r: {b: 37.57062146892656, a: 387.4368686868687},
							c: 13,
							z: _List_fromArray(
								[11]),
							a4: _List_Nil,
							u: {b: 37.57062146892656, a: 387.4368686868687}
						},
							{
							bF: 9203.09112832546,
							q: -1,
							r: {b: 295.1977401129944, a: 387.4368686868687},
							c: 14,
							z: _List_fromArray(
								[10, 15]),
							a4: _List_Nil,
							u: {b: 295.1977401129944, a: 387.4368686868687}
						},
							{
							bF: 3888.5523806425335,
							q: -1,
							r: {b: 217.90960451977404, a: 391.72979797979804},
							c: 15,
							z: _List_fromArray(
								[12, 14]),
							a4: _List_Nil,
							u: {b: 217.90960451977404, a: 391.72979797979804}
						}
						]),
					bc: 380
				});
		case 'a & !a':
			return $elm$core$Maybe$Just(
				{
					dF: $elm$core$Maybe$Just(
						{
							a0: 425,
							bu: 12,
							k: _List_fromArray(
								[
									{
									ah: {b: 117.00564971751413, a: 116.98232323232324},
									aa: $elm$core$Maybe$Nothing,
									bl: 'a',
									c: 0,
									bo: $elm$core$Maybe$Just('a'),
									z: _List_fromArray(
										[1, 2, 3, 7, 8, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 297.34463276836163, a: 183.52272727272728},
									aa: $elm$core$Maybe$Nothing,
									bl: '!(a)',
									c: 1,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 2, 5, 7, 9]),
									a4: _List_Nil
								},
									{
									ah: {b: 338.135593220339, a: 119.12878787878789},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 2,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 1]),
									a4: _List_Nil
								},
									{
									ah: {b: 26.836158192090398, a: 277.96717171717177},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 3,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 4, 11]),
									a4: _List_Nil
								},
									{
									ah: {b: 39.717514124293785, a: 222.15909090909093},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 4,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[3]),
									a4: _List_Nil
								},
									{
									ah: {b: 351.0169491525424, a: 277.96717171717177},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 5,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 6, 10]),
									a4: _List_Nil
								},
									{
									ah: {b: 301.6384180790961, a: 235.0378787878788},
									aa: $elm$core$Maybe$Just(1),
									bl: '',
									c: 6,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5]),
									a4: _List_Nil
								},
									{
									ah: {b: 209.3220338983051, a: 243.62373737373738},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 7,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 1]),
									a4: _List_Nil
								},
									{
									ah: {b: 149.20903954802262, a: 301.57828282828285},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 8,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 9, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 213.61581920903956, a: 297.2853535353536},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 9,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[1, 8, 12]),
									a4: _List_Nil
								},
									{
									ah: {b: 271.5819209039548, a: 325.18939393939394},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 10,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[5, 12, 14]),
									a4: _List_Nil
								},
									{
									ah: {b: 82.65536723163842, a: 327.3358585858586},
									aa: $elm$core$Maybe$Nothing,
									bl: '',
									c: 11,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[0, 3, 12, 13]),
									a4: _List_Nil
								},
									{
									ah: {b: 147.0621468926554, a: 370.26515151515156},
									aa: $elm$core$Maybe$Nothing,
									bl: '(a & !(a))',
									c: 12,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[8, 9, 10, 11, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 37.57062146892656, a: 387.4368686868687},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 13,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[11]),
									a4: _List_Nil
								},
									{
									ah: {b: 295.1977401129944, a: 387.4368686868687},
									aa: $elm$core$Maybe$Just(0),
									bl: '',
									c: 14,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[10, 15]),
									a4: _List_Nil
								},
									{
									ah: {b: 217.90960451977404, a: 391.72979797979804},
									aa: $elm$core$Maybe$Just(2),
									bl: '',
									c: 15,
									bo: $elm$core$Maybe$Nothing,
									z: _List_fromArray(
										[12, 14]),
									a4: _List_Nil
								}
								]),
							bc: 380
						}),
					dG: true,
					cg: 1.0000000000000004,
					a0: 425,
					eh: $elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(0, 'M 0 0 L 49.37853107344633 0 L 98.75706214689266 0 L 148.135593220339 0 L 197.51412429378533 0 L 246.89265536723167 0 L 296.271186440678 0 L 345.64971751412435 0 L 380.00000000000006 0 L 380.00000000000006 49.36868686868687 L 380.00000000000006 79.41919191919193 L 347.7966101694916 79.41919191919193 L 298.41807909604523 79.41919191919193 L 268.2157677281868 83.56633608921918 L 266.2146892655368 133.08080808080808 L 266.21468926552745 182.4494949494856 L 263.263145483277 224.57429716878664 L 246.89265536723167 227.52525252525254 L 225.42372881355934 227.52525252525254 L 176.045197740113 227.52525252525254 L 126.34771500674316 231.49864291832904 L 120.07820504784023 244.15090511776907 L 169.05327402102074 244.23724796782238 L 180.96485589811613 244.35873901379497 L 183.55932203389833 245.77020202020202 L 181.55878401307484 245.9165274771871 L 172.6115692487367 273.4609954377488 L 124.3736343403026 278.89429350411035 L 119.42142526207118 299.70064746596626 L 107.29891659125877 302.6058080884827 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 100.9039548022599 302.6515151515152 L 83.72881355932205 302.6515151515152 L 81.68429045641375 264.1642470593537 L 87.80076355257862 221.17844116140333 L 75.56086050925306 197.05521355916318 L 44.142602020784295 187.68438015990225 L 1.4861939570969387 188.2283532424899 L 0 188.8888888888889 L 0 148.10606060606062 L 0 98.73737373737374 L 0 49.36868686868687 Z'),
								_Utils_Tuple2(1, 'M 298.41807909604523 79.41919191919193 L 298.41814955656383 128.7878083414073 L 303.1435963935313 158.40673792260245 L 349.95782794407876 171.7028494538368 L 380.00000000000006 173.86363636363637 L 380.00000000000006 223.23232323232324 L 380.00000000000006 231.81818181818184 L 378.3869408084855 231.2844547804583 L 332.56872104001735 214.84606541698767 L 297.8832643648836 211.96532478051336 L 273.9109203440678 230.85074016341002 L 275.5477789695688 262.64752850683175 L 258.17575734149466 298.90711517828197 L 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 254.68988128920665 299.148772993347 L 229.27585586370057 270.89611566524627 L 185.8281773233849 247.7947283472671 L 183.55932203389833 245.77020202020202 L 186.31026281050924 247.31273896968963 L 225.49039794448947 261.79535855970107 L 243.94111224001108 258.9177308243979 L 246.89265536723167 227.52525252525254 L 263.263145483277 224.57429716878664 L 266.21468926552745 182.4494949494856 L 266.2146892655368 133.08080808080808 L 268.2157677281868 83.56633608921918 Z'),
								_Utils_Tuple2(2, 'M 298.41807909604523 79.41919191919193 L 347.7966101694916 79.41919191919193 L 380.00000000000006 79.41919191919193 L 380.00000000000006 128.7878787878788 L 380.00000000000006 173.86363636363637 L 349.95782794407876 171.7028494538368 L 303.1435963935313 158.40673792260245 L 298.41814955656383 128.7878083414073 Z'),
								_Utils_Tuple2(3, 'M 44.142602020784295 187.68438015990225 L 75.56086050925306 197.05521355916318 L 87.80076355257862 221.17844116140333 L 81.68429045641375 264.1642470593537 L 83.72881355932205 302.6515151515152 L 49.37261012916591 306.9385246805756 L 0 306.94444444444446 L 0 285.479797979798 L 0 236.11111111111114 L 43.993212361618106 256.52013142994747 L 74.94924333017994 253.09086692294244 L 85.44499396510062 225.10893141603498 L 76.5375301220228 202.51813256727056 L 51.518729847459625 191.0420460822024 L 3.2468914013535777 189.98914403837108 L 0 191.03535353535355 L 0 188.8888888888889 L 1.4861939570969387 188.2283532424899 Z'),
								_Utils_Tuple2(4, 'M 51.518729847459625 191.0420460822024 L 76.5375301220228 202.51813256727056 L 85.44499396510062 225.10893141603498 L 74.94924333017994 253.09086692294244 L 43.993212361618106 256.52013142994747 L 0 236.11111111111114 L 0 191.03535353535355 L 3.2468914013535777 189.98914403837108 Z'),
								_Utils_Tuple2(5, 'M 332.56872104001735 214.84606541698767 L 378.3869408084855 231.2844547804583 L 380.00000000000006 231.81818181818184 L 380.00000000000006 281.1868686868687 L 380.00000000000006 306.94444444444446 L 356.3841807909605 306.94444444444446 L 307.01991282685253 306.9301841786288 L 259.30076565629184 300.0883752577563 L 256.5536723163842 301.57828282828285 L 258.17575734149466 298.90711517828197 L 275.5477789695688 262.64752850683175 L 273.9109203440678 230.85074016341002 L 297.8832643648836 211.96532478051336 Z M 293.7498826612083 216.41859415490677 L 275.88598562784534 234.47668215681227 L 287.47627626976924 255.6365911727441 L 336.2808736083672 256.7946400512382 L 340.55128028011245 254.6248029826033 L 342.8576169489161 230.316622665764 L 326.0500553572258 214.92417020248655 Z'),
								_Utils_Tuple2(6, 'M 326.0500553572258 214.92417020248655 L 342.8576169489161 230.316622665764 L 340.55128028011245 254.6248029826033 L 336.2808736083672 256.7946400512382 L 287.47627626976924 255.6365911727441 L 275.88598562784534 234.47668215681227 L 293.7498826612083 216.41859415490677 Z'),
								_Utils_Tuple2(7, 'M 176.045197740113 227.52525252525254 L 225.42372881355934 227.52525252525254 L 246.89265536723167 227.52525252525254 L 243.94111224001108 258.9177308243979 L 225.49039794448947 261.79535855970107 L 186.31026281050924 247.31273896968963 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 180.96485589811613 244.35873901379497 L 169.05327402102074 244.23724796782238 L 120.07820504784023 244.15090511776907 L 126.34771500674316 231.49864291832904 Z'),
								_Utils_Tuple2(8, 'M 181.55878401307484 245.9165274771871 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 182.00379021909038 248.50790961232155 L 180.33898305084747 298.3585858585859 L 180.33898305084747 317.6767676767677 L 158.21268282720365 325.5724210553323 L 151.29420222070132 328.5095449311373 L 123.61937584480752 322.8699154111979 L 105.92279816564303 306.2195309408494 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 107.29891659125877 302.6058080884827 L 119.42142526207118 299.70064746596626 L 124.3736343403026 278.89429350411035 L 172.6115692487367 273.4609954377488 Z'),
								_Utils_Tuple2(9, 'M 182.00379021909038 248.50790961232155 L 183.55932203389833 245.77020202020202 L 183.55932203389833 245.77020202020202 L 185.8281773233849 247.7947283472671 L 229.27585586370057 270.89611566524627 L 254.68988128920665 299.148772993347 L 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 254.9243836016259 304.2422482247781 L 239.62037256605453 321.1382579217918 L 214.06668638537482 329.00969065622155 L 194.73955640666367 318.4442690323283 L 180.33898305084747 317.6767676767677 L 180.33898305084747 298.3585858585859 Z'),
								_Utils_Tuple2(10, 'M 307.01991282685253 306.9301841786288 L 356.3841807909605 306.94444444444446 L 380.00000000000006 306.94444444444446 L 380.00000000000006 352.020202020202 L 341.3559320949656 349.87373748214077 L 293.1746148494684 351.0707124142911 L 261.85927256638934 358.3979768581424 L 251.18644067796612 388.51010101010104 L 251.45055928099225 377.342924667538 L 236.73306564474143 357.8848368263384 L 229.01500715637007 333.1303996465173 L 246.0298497091577 321.1070619828388 L 257.22634250339513 304.3972835568567 L 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 259.30076565629184 300.0883752577563 Z'),
								_Utils_Tuple2(11, 'M 83.72881355932205 302.6515151515152 L 100.9039548022599 302.6515151515152 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 103.6053431059585 306.3900593414976 L 119.85291384803955 324.48868368190347 L 131.6681166414043 334.5520095687004 L 107.09508961429589 376.8667409628989 L 111.63841807909606 425.00000000000006 L 109.49152542372883 425.00000000000006 L 108.9838170567383 406.1894253310322 L 101.15115657491557 358.21244346959037 L 83.69626084311437 352.05274824663377 L 35.54693558142509 351.07018457519433 L 0 356.31313131313135 L 0 306.94444444444446 L 49.37261012916591 306.9385246805756 Z'),
								_Utils_Tuple2(12, 'M 256.5536723163842 301.57828282828285 L 256.5536723163842 301.57828282828285 L 257.22634250339513 304.3972835568567 L 246.0298497091577 321.1070619828388 L 229.01500715637007 333.1303996465173 L 236.73306564474143 357.8848368263384 L 251.45055928099225 377.342924667538 L 251.18644067796612 388.51010101010104 L 235.1275606232898 361.6364866079042 L 196.17496936711137 361.4136373057787 L 186.00274553660563 374.8545525384259 L 184.63276836158232 422.8535353535358 L 184.63276836158195 425.00000000000006 L 161.0169491525424 425.00000000000006 L 111.63841807909606 425.00000000000006 L 107.09508961429589 376.8667409628989 L 131.6681166414043 334.5520095687004 L 119.85291384803955 324.48868368190347 L 103.6053431059585 306.3900593414976 L 104.12429378531073 303.7247474747475 L 104.12429378531073 303.7247474747475 L 105.92279816564303 306.2195309408494 L 123.61937584480752 322.8699154111979 L 151.29420222070132 328.5095449311373 L 158.21268282720365 325.5724210553323 L 180.33898305084747 317.6767676767677 L 194.73955640666367 318.4442690323283 L 214.06668638537482 329.00969065622155 L 239.62037256605453 321.1382579217918 L 254.9243836016259 304.2422482247781 Z'),
								_Utils_Tuple2(13, 'M 83.69626084311437 352.05274824663377 L 101.15115657491557 358.21244346959037 L 108.9838170567383 406.1894253310322 L 109.49152542372883 425.00000000000006 L 98.75706214689266 425.00000000000006 L 49.37853107344633 425.00000000000006 L 0 425.00000000000006 L 0 405.6818181818182 L 0 356.31313131313135 L 35.54693558142509 351.07018457519433 Z'),
								_Utils_Tuple2(14, 'M 341.3559320949656 349.87373748214077 L 380.00000000000006 352.020202020202 L 380.00000000000006 401.3888888888889 L 380.00000000000006 425.00000000000006 L 349.9435028248588 425.00000000000006 L 300.5649717514125 425.00000000000006 L 251.18644067796612 425.00000000000006 L 251.18644067796612 388.51010101010104 L 261.85927256638934 358.3979768581424 L 293.1746148494684 351.0707124142911 Z'),
								_Utils_Tuple2(15, 'M 235.1275606232898 361.6364866079042 L 251.18644067796612 388.51010101010104 L 251.18644067796612 425.00000000000006 L 234.01129943502826 425.00000000000006 L 184.63276836158195 425.00000000000006 L 184.63276836158232 422.8535353535358 L 186.00274553660563 374.8545525384259 L 196.17496936711137 361.4136373057787 Z')
							])),
					ek: false,
					U: 7,
					Y: _List_fromArray(
						[
							{
							bF: 71324.25476306284,
							q: -1,
							r: {b: 117.00564971751413, a: 116.98232323232324},
							c: 0,
							z: _List_fromArray(
								[1, 2, 3, 7, 8, 11]),
							a4: _List_Nil,
							u: {b: 117.00564971751413, a: 116.98232323232324}
						},
							{
							bF: 11146.905284408402,
							q: -1,
							r: {b: 297.34463276836163, a: 183.52272727272728},
							c: 1,
							z: _List_fromArray(
								[0, 2, 5, 7, 9]),
							a4: _List_Nil,
							u: {b: 297.34463276836163, a: 183.52272727272728}
						},
							{
							bF: 7117.0956239903335,
							q: -1,
							r: {b: 338.135593220339, a: 119.12878787878789},
							c: 2,
							z: _List_fromArray(
								[0, 1]),
							a4: _List_Nil,
							u: {b: 338.135593220339, a: 119.12878787878789}
						},
							{
							bF: 5039.022281749318,
							q: -1,
							r: {b: 26.836158192090398, a: 277.96717171717177},
							c: 3,
							z: _List_fromArray(
								[0, 4, 11]),
							a4: _List_Nil,
							u: {b: 26.836158192090398, a: 277.96717171717177}
						},
							{
							bF: 4590.666609666601,
							q: -1,
							r: {b: 39.717514124293785, a: 222.15909090909093},
							c: 4,
							z: _List_fromArray(
								[3]),
							a4: _List_Nil,
							u: {b: 39.717514124293785, a: 222.15909090909093}
						},
							{
							bF: 7184.924625896809,
							q: -1,
							r: {b: 351.0169491525424, a: 277.96717171717177},
							c: 5,
							z: _List_fromArray(
								[1, 6, 10]),
							a4: _List_Nil,
							u: {b: 351.0169491525424, a: 277.96717171717177}
						},
							{
							bF: 2260.678882349792,
							q: -1,
							r: {b: 301.6384180790961, a: 235.0378787878788},
							c: 6,
							z: _List_fromArray(
								[5]),
							a4: _List_Nil,
							u: {b: 301.6384180790961, a: 235.0378787878788}
						},
							{
							bF: 2661.738184713191,
							q: -1,
							r: {b: 209.3220338983051, a: 243.62373737373738},
							c: 7,
							z: _List_fromArray(
								[0, 1]),
							a4: _List_Nil,
							u: {b: 209.3220338983051, a: 243.62373737373738}
						},
							{
							bF: 3163.521982309585,
							q: -1,
							r: {b: 149.20903954802262, a: 301.57828282828285},
							c: 8,
							z: _List_fromArray(
								[0, 9, 12]),
							a4: _List_Nil,
							u: {b: 149.20903954802262, a: 301.57828282828285}
						},
							{
							bF: 3951.8499108421784,
							q: -1,
							r: {b: 213.61581920903956, a: 297.2853535353536},
							c: 9,
							z: _List_fromArray(
								[1, 8, 12]),
							a4: _List_Nil,
							u: {b: 213.61581920903956, a: 297.2853535353536}
						},
							{
							bF: 6944.644663009472,
							q: -1,
							r: {b: 271.5819209039548, a: 325.18939393939394},
							c: 10,
							z: _List_fromArray(
								[5, 12, 14]),
							a4: _List_Nil,
							u: {b: 271.5819209039548, a: 325.18939393939394}
						},
							{
							bF: 6074.552438278076,
							q: -1,
							r: {b: 82.65536723163842, a: 327.3358585858586},
							c: 11,
							z: _List_fromArray(
								[0, 3, 12, 13]),
							a4: _List_Nil,
							u: {b: 82.65536723163842, a: 327.3358585858586}
						},
							{
							bF: 9318.15841155246,
							q: -1,
							r: {b: 147.0621468926554, a: 370.26515151515156},
							c: 12,
							z: _List_fromArray(
								[8, 9, 10, 11, 15]),
							a4: _List_Nil,
							u: {b: 147.0621468926554, a: 370.26515151515156}
						},
							{
							bF: 7630.342829203022,
							q: -1,
							r: {b: 37.57062146892656, a: 387.4368686868687},
							c: 13,
							z: _List_fromArray(
								[11]),
							a4: _List_Nil,
							u: {b: 37.57062146892656, a: 387.4368686868687}
						},
							{
							bF: 9203.09112832546,
							q: -1,
							r: {b: 295.1977401129944, a: 387.4368686868687},
							c: 14,
							z: _List_fromArray(
								[10, 15]),
							a4: _List_Nil,
							u: {b: 295.1977401129944, a: 387.4368686868687}
						},
							{
							bF: 3888.5523806425335,
							q: -1,
							r: {b: 217.90960451977404, a: 391.72979797979804},
							c: 15,
							z: _List_fromArray(
								[12, 14]),
							a4: _List_Nil,
							u: {b: 217.90960451977404, a: 391.72979797979804}
						}
						]),
					bc: 380
				});
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$FormulaMosaic$drawingFrames = function (_final) {
	var count = $elm$core$List$length(_final.Y);
	var frame = function (step) {
		return _Utils_eq(step, count) ? _Utils_update(
			_final,
			{ca: _List_Nil}) : _Utils_update(
			_final,
			{
				ca: (step > 0) ? A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					A2(
						$elm$core$Maybe$map,
						function (tile) {
							return _List_fromArray(
								[tile.b0.c]);
						},
						$elm$core$List$head(
							A2($elm$core$List$drop, step - 1, _final.Y)))) : _List_Nil,
				b_: 'Drawing — revealing the next region.',
				Y: A2(
					$elm$core$List$indexedMap,
					F2(
						function (index, tile) {
							return (_Utils_cmp(index, step) < 0) ? tile : _Utils_update(
								tile,
								{dD: -1});
						}),
					_final.Y)
			});
	};
	return A2(
		$elm$core$List$map,
		frame,
		A2($elm$core$List$range, 0, count));
};
var $author$project$GenerativeTiling$coloredFromColors = F4(
	function (tiling, colors, changed, status) {
		var map = A2(
			$elm$core$Maybe$withDefault,
			{a0: tiling.a0, bu: -1, k: _List_Nil, bc: tiling.bc},
			tiling.dF);
		var tileView = function (tile) {
			var region = $elm$core$List$head(
				A2($elm$core$List$drop, tile.c, map.k));
			var note = A2(
				$elm$core$Maybe$withDefault,
				'',
				A2(
					$elm$core$Maybe$map,
					function (r) {
						return (r.bl !== '') ? r.bl : ((!_Utils_eq(r.aa, $elm$core$Maybe$Nothing)) ? 'Fixed palette clue' : 'Three-color constraint region');
					},
					region));
			var input = A2(
				$elm$core$Maybe$andThen,
				function ($) {
					return $.bo;
				},
				region);
			var constant = A2(
				$elm$core$Maybe$andThen,
				function ($) {
					return $.aa;
				},
				region);
			var color = A2(
				$elm$core$Maybe$withDefault,
				-1,
				A2($elm$core$Array$get, tile.c, colors));
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
						return _Utils_eq(tile.c, map.bu) ? ('OUT=' + value) : '';
					}
				}
			}();
			return {dD: color, ax: label, bq: note, b0: tile, aI: color, c1: input};
		};
		return {
			ca: changed,
			cc: $elm$core$Maybe$Nothing,
			aO: _List_Nil,
			b_: status,
			Y: A2($elm$core$List$map, tileView, tiling.Y),
			Z: tiling
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
			{a0: tiling.a0, bu: -1, k: _List_Nil, bc: tiling.bc},
			tiling.dF);
		var fixed = A2($author$project$ConstraintMap$fixedInputs, assignment, map);
		var adjacency = A2(
			$elm$core$List$map,
			function ($) {
				return $.z;
			},
			tiling.Y);
		var colors = A3($author$project$GenerativeTiling$solveColors, adjacency, fixed, tiling.Y);
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
			return {ca: _List_Nil, dE: colors, b_: 'Settled. Shared-border constraints derive OUT from the inputs.'};
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
					ca: A2(
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
					dE: after,
					b_: status
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
										{ca: _List_Nil, dE: partial, b_: 'Repair budget reached. Some tiles remain unresolved; try a simpler formula.'}
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
											{ca: _List_Nil, dE: partial, b_: 'No local repair exists for these input pins.'}
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
			if (_Utils_eq(prior.Z, tiling)) {
				var _v1 = tiling.dF;
				if (!_v1.$) {
					var map = _v1.a;
					return $elm$core$List$reverse(
						A3(
							$elm$core$List$foldl,
							F2(
								function (frame, _v2) {
									var last = _v2.a;
									var frames = _v2.b;
									var next = A4($author$project$GenerativeTiling$coloredFromColors, tiling, frame.dE, frame.ca, frame.b_);
									var tiles = A3(
										$elm$core$List$map2,
										F2(
											function (old, tile) {
												return _Utils_update(
													tile,
													{
														aI: (tile.dD < 0) ? old.aI : tile.dD
													});
											}),
										last.Y,
										next.Y);
									var shaded = _Utils_update(
										next,
										{Y: tiles});
									return _Utils_Tuple2(
										shaded,
										A2($elm$core$List$cons, shaded, frames));
								}),
							_Utils_Tuple2(prior, _List_Nil),
							A3(
								$author$project$SignalPropagation$repair,
								A2(
									$elm$core$List$map,
									function ($) {
										return $.z;
									},
									tiling.Y),
								A2($author$project$ConstraintMap$fixedInputs, assignment, map),
								$elm$core$Array$fromList(
									A2(
										$elm$core$List$map,
										function ($) {
											return $.dD;
										},
										prior.Y)))).b);
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
		return A3($author$project$GenerativeTiling$propagateConstraints, previous, tiling, row.bG);
	});
var $author$project$GenerativeTiling$recolorFrom = F5(
	function (previous, tiling, row, variables, formulaText) {
		return A3($author$project$GenerativeTiling$graphColor, previous, tiling, row.bG);
	});
var $author$project$GenerativeTiling$recolor = $author$project$GenerativeTiling$recolorFrom($elm$core$Maybe$Nothing);
var $author$project$FormulaMosaic$seekSignal = F2(
	function (requested, model) {
		var index = A3(
			$elm$core$Basics$clamp,
			0,
			A2(
				$elm$core$Basics$max,
				0,
				$elm$core$List$length(model.aG) - 1),
			requested);
		var pending = A2($elm$core$List$drop, index + 1, model.aG);
		var current = $elm$core$List$head(
			A2($elm$core$List$drop, index, model.aG));
		return _Utils_update(
			model,
			{
				G: A2(
					$elm$core$Maybe$withDefault,
					model.G,
					A2($elm$core$Maybe$map, $elm$core$Maybe$Just, current)),
				am: A2(
					$elm$core$Maybe$withDefault,
					model.am,
					A2($elm$core$Maybe$map, $elm$core$Maybe$Just, current)),
				bv: pending,
				bw: pending,
				W: index
			});
	});
var $author$project$FormulaMosaic$paintRow = F2(
	function (index, model) {
		var _v0 = model.au;
		if (_v0.$ === 1) {
			return model;
		} else {
			var formula = _v0.a;
			var nextIndex = A3(
				$elm$core$Basics$clamp,
				0,
				$elm$core$List$length(formula.ap) - 1,
				index);
			var row = $elm$core$List$head(
				A2($elm$core$List$drop, nextIndex, formula.ap));
			if (row.$ === 1) {
				return model;
			} else {
				var r = row.a;
				var newMap = A2(
					$elm$core$Maybe$withDefault,
					true,
					A2(
						$elm$core$Maybe$map,
						function (prior) {
							return !_Utils_eq(prior.Z, model.Z);
						},
						model.G));
				var frames = newMap ? $author$project$FormulaMosaic$drawingFrames(
					A4($author$project$GenerativeTiling$recolor, model.Z, r, formula.aJ, formula.I)) : A5($author$project$GenerativeTiling$propagate, model.G, model.Z, r, formula.aJ, formula.I);
				return A2(
					$author$project$FormulaMosaic$seekSignal,
					0,
					_Utils_update(
						model,
						{
							aE: nextIndex,
							aG: frames,
							aR: newMap ? 'Drawing' : 'Recoloring'
						}));
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
		return {ce: col, dI: contextStack, cM: problem, aE: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.aE, s.ce, x, s.i));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.d),
			s.f) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
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
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.d);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.f, offset) < 0,
					0,
					{ce: col, i: s0.i, j: s0.j, f: offset, aE: row, d: s0.d});
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
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.f, s.aE, s.ce, s);
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
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.f, s.aE, s.ce, s.d);
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
			{ce: newCol, i: s.i, j: s.j, f: newOffset, aE: newRow, d: s.d});
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
				return {ce: col, i: context, j: indent, f: offset, aE: row, d: src};
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
		var firstOffset = A3($elm$parser$Parser$Advanced$isSubChar, i.ez, s.f, s.d);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.ck));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7($elm$parser$Parser$Advanced$varHelp, i.d0, s.f + 1, s.aE + 1, 1, s.d, s.j, s.i) : A7($elm$parser$Parser$Advanced$varHelp, i.d0, firstOffset, s.aE, s.ce + 1, s.d, s.j, s.i);
			var name = A3($elm$core$String$slice, s.f, s1.f, s.d);
			return A2($elm$core$Set$member, name, i.el) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, i.ck)) : A3($elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var $elm$parser$Parser$variable = function (i) {
	return $elm$parser$Parser$Advanced$variable(
		{ck: $elm$parser$Parser$ExpectingVariable, d0: i.d0, el: i.el, ez: i.ez});
};
var $author$project$FormulaParser$variable = $elm$parser$Parser$variable(
	{d0: $elm$core$Char$isAlpha, el: $elm$core$Set$empty, ez: $elm$core$Char$isAlpha});
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
		return {ce: col, cM: problem, aE: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.aE, p.ce, p.cM);
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
			{ce: 1, i: _List_Nil, j: 1, f: 0, aE: 1, d: src});
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
var $author$project$FormulaMosaic$generate = function (model) {
	if ($elm$core$String$length(model.Q) > 120) {
		return _Utils_update(
			model,
			{P: 'For this lab, use at most six variables and 120 characters.'});
	} else {
		var _v0 = $author$project$FormulaParser$parse(model.Q);
		if (_v0.$ === 1) {
			return _Utils_update(
				model,
				{P: 'Use variable names, !, &, |, and parentheses. For example: !(a & b).'});
		} else {
			var ast = _v0.a;
			var variables = $author$project$FormulaParser$collectVariables(ast);
			if ($elm$core$List$length(variables) > 6) {
				return _Utils_update(
					model,
					{P: 'For this lab, use at most six variables and 120 characters.'});
			} else {
				var tiling = function () {
					if (model.U === 7) {
						var _v1 = $author$project$Generated$ExampleTilings$get(model.Q);
						if (!_v1.$) {
							var cached = _v1.a;
							return cached;
						} else {
							return A2($author$project$GenerativeTiling$generateOrganic, model.U, ast);
						}
					} else {
						return A2($author$project$GenerativeTiling$generateOrganic, model.U, ast);
					}
				}();
				return A2(
					$author$project$FormulaMosaic$paintRow,
					0,
					_Utils_update(
						model,
						{
							P: '',
							au: $elm$core$Maybe$Just(
								{
									b7: ast,
									I: model.Q,
									ap: $author$project$FormulaParser$buildTruthTable(ast),
									aJ: variables
								}),
							aQ: tiling,
							Z: tiling
						}));
			}
		}
	}
};
var $author$project$FormulaMosaic$init = $author$project$FormulaMosaic$generate(
	{C: true, bk: 44, P: '', au: $elm$core$Maybe$Nothing, Q: '!(a & b)', G: $elm$core$Maybe$Nothing, am: $elm$core$Maybe$Nothing, aQ: $author$project$Generated$DefaultTiling$tiling, bv: _List_Nil, bw: _List_Nil, aE: 0, U: 7, aF: 600, aG: _List_Nil, W: 0, aR: 'Drawing', Z: $author$project$Generated$DefaultTiling$tiling});
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
			config.U,
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
				model.Q,
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.I;
					},
					model.au)),
			{dJ: density, a0: 600, U: seed, bc: 960});
		return A2(
			$author$project$FormulaMosaic$paintRow,
			model.aE,
			_Utils_update(
				model,
				{bk: density, aQ: tiling, U: seed, Z: tiling}));
	});
var $author$project$FormulaMosaic$toggle = F2(
	function (variable, model) {
		var _v0 = model.au;
		if (_v0.$ === 1) {
			return model;
		} else {
			var formula = _v0.a;
			var _v1 = $elm$core$List$head(
				A2($elm$core$List$drop, model.aE, formula.ap));
			if (_v1.$ === 1) {
				return model;
			} else {
				var row = _v1.a;
				var assignment = A3(
					$elm$core$Dict$update,
					variable,
					$elm$core$Maybe$map($elm$core$Basics$not),
					row.bG);
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
									return _Utils_eq(r.bG, assignment);
								},
								A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, formula.ap)))));
				return A2($author$project$FormulaMosaic$paintRow, index, model);
			}
		}
	});
var $author$project$FormulaMosaic$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 6:
				return model.C ? A2($author$project$FormulaMosaic$seekSignal, model.W + 1, model) : model;
			case 10:
				return A2(
					$author$project$FormulaMosaic$seekSignal,
					model.W + 1,
					_Utils_update(
						model,
						{C: false}));
			case 7:
				return A2(
					$author$project$FormulaMosaic$seekSignal,
					model.W - 1,
					_Utils_update(
						model,
						{C: false}));
			case 8:
				return A2(
					$author$project$FormulaMosaic$seekSignal,
					0,
					_Utils_update(
						model,
						{C: true}));
			case 9:
				var raw = msg.a;
				var _v1 = $elm$core$String$toInt(raw);
				if (!_v1.$) {
					var delay = _v1.a;
					return _Utils_update(
						model,
						{
							aF: A3($elm$core$Basics$clamp, 50, 2500, delay)
						});
				} else {
					return model;
				}
			case 11:
				var enabled = msg.a;
				return _Utils_update(
					model,
					{C: enabled});
			case 0:
				var source = msg.a;
				return $author$project$FormulaMosaic$generate(
					_Utils_update(
						model,
						{P: '', Q: source}));
			case 1:
				var source = msg.a;
				return $author$project$FormulaMosaic$generate(
					_Utils_update(
						model,
						{Q: source, G: $elm$core$Maybe$Nothing}));
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
								return $.c1;
							},
							A2(
								$elm$core$Maybe$andThen,
								function (organic) {
									return $elm$core$List$head(
										A2(
											$elm$core$List$filter,
											function (t) {
												return _Utils_eq(t.b0.c, cell);
											},
											organic.Y));
								},
								model.am))));
			case 5:
				var cell = msg.a;
				var _v2 = model.G;
				if (_v2.$ === 1) {
					return model;
				} else {
					var mosaic = _v2.a;
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
									return $.c1;
								},
								$elm$core$List$head(
									A2(
										$elm$core$List$filter,
										function (t) {
											return _Utils_eq(t.b0.c, cell);
										},
										mosaic.Y)))));
				}
			case 12:
				return A3($author$project$FormulaMosaic$rebuildTiling, model.U + 11, model.bk, model);
			default:
				var raw = msg.a;
				var _v3 = $elm$core$String$toInt(raw);
				if (!_v3.$) {
					var n = _v3.a;
					return A3(
						$author$project$FormulaMosaic$rebuildTiling,
						model.U,
						A3($elm$core$Basics$clamp, 30, 56, n),
						model);
				} else {
					return model;
				}
		}
	});
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
var $author$project$FormulaMosaic$Reseed = {$: 12};
var $author$project$FormulaMosaic$ToggleInput = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$a = _VirtualDom_node('a');
var $author$project$FormulaExamples$all = _List_fromArray(
	[
		{H: 'NAND', I: '!(a & b)'},
		{H: 'OR', I: 'a | b'},
		{H: 'AND', I: 'a & b'},
		{H: 'NOR', I: '!(a | b)'},
		{H: 'Exclusive OR', I: '(a | b) & !(a & b)'},
		{H: 'Implication', I: '!a | b'},
		{H: 'Multiplexer', I: '(!s & a) | (s & b)'},
		{H: 'Majority of three', I: '(a & b) | (a & c) | (b & c)'},
		{H: 'Enabled OR', I: '(a | b) & !c'},
		{H: 'Three pairs', I: '(a & b) | (c & d) | (e & f)'},
		{H: 'Always true', I: 'a | !a'},
		{H: 'Contradiction', I: 'a & !a'}
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
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$html$Html$Attributes$maxlength = function (n) {
	return A2(
		_VirtualDom_attribute,
		'maxlength',
		$elm$core$String$fromInt(n));
};
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
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$pointerEvents = _VirtualDom_attribute('pointer-events');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $author$project$GenerativeTiling$px = function (p) {
	return $elm$core$String$fromFloat(p.b) + (' ' + $elm$core$String$fromFloat(p.a));
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
		var dx = a.b - b.b;
		return $elm$core$Basics$sqrt((dx * dx) + (dy * dy));
	});
var $elm$core$List$map3 = _List_map3;
var $author$project$GenerativeTiling$mix = F3(
	function (t, a, b) {
		return {b: a.b + ((b.b - a.b) * t), a: a.a + ((b.a - a.a) * t)};
	});
var $author$project$GenerativeTiling$near = F2(
	function (a, b) {
		return A2($author$project$GenerativeTiling$distance, a, b) < 0.00001;
	});
var $author$project$GenerativeTiling$pointKey = function (p) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(p.b * 1000000)) + (',' + $elm$core$String$fromInt(
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
			return (p.b > 0.001) && ((p.a > 0.001) && ((_Utils_cmp(p.b, tiling.bc - 0.001) < 0) && ((_Utils_cmp(p.a, tiling.a0 - 0.001) < 0) && ($elm$core$List$length(
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
							t.a4);
					},
					tiling.Y)) === 2))));
		};
		var points = tile.a4;
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
					t.a4,
					_Utils_ap(
						A2($elm$core$List$drop, 1, t.a4),
						A2($elm$core$List$take, 1, t.a4)));
			},
			tiling.Y);
		var clearance = function (p) {
			var toSegment = function (_v3) {
				var a = _v3.a;
				var b = _v3.b;
				var dy = b.a - a.a;
				var dx = b.b - a.b;
				var t = A3(
					$elm$core$Basics$clamp,
					0,
					1,
					(((p.b - a.b) * dx) + ((p.a - a.a) * dy)) / A2($elm$core$Basics$max, 0.000001, (dx * dx) + (dy * dy)));
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
			(!_Utils_eq(tiling.dF, $elm$core$Maybe$Nothing)) ? $author$project$GenerativeTiling$outline(tile.a4) : A2($author$project$GenerativeTiling$wavyPath, tiling, tile),
			A2($elm$core$Dict$get, tile.c, tiling.eh));
	});
var $author$project$GenerativeTiling$interactionOutline = F3(
	function (tiling, changed, tile) {
		return A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d(
					A2($author$project$GenerativeTiling$tilePath, tiling, tile.b0)),
					$elm$svg$Svg$Attributes$class('tile-highlight'),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-highlight',
					$elm$core$String$fromInt(tile.b0.c)),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-changing',
					A2($elm$core$List$member, tile.b0.c, changed) ? 'true' : 'false'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$pointerEvents('none'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round'),
					A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke')
				]),
			_List_Nil);
	});
var $author$project$GenerativeTiling$mapKind = function (tiling) {
	return tiling.ek ? 'tiles' : ((!$elm$core$Dict$isEmpty(tiling.eh)) ? 'organic' : 'graph');
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$GenerativeTiling$neighborInspector = function (colored) {
	var scope = '.mosaic-map[data-view=\"' + ($author$project$GenerativeTiling$mapKind(colored.Z) + '\"]');
	var selector = F2(
		function (id, pseudo) {
			return scope + (((pseudo === ':focus-visible') ? ':not(:has(.mosaic-cell:hover))' : '') + (':has(.mosaic-cell[data-region=\"' + ($elm$core$String$fromInt(id) + ('\"]' + (pseudo + ')')))));
		});
	var rules = function (tile) {
		var roots = A2(
			$elm$core$List$map,
			selector(tile.b0.c),
			_List_fromArray(
				[':hover', ':focus-visible']));
		var highlighted = A2(
			$elm$core$List$map,
			function (root) {
				return root + (' .tile-highlight[data-highlight=\"' + ($elm$core$String$fromInt(tile.b0.c) + '\"]'));
			},
			roots);
		return A2($elm$core$String$join, ',', highlighted) + ('{stroke:#fffdf6;stroke-width:3;opacity:1;filter:drop-shadow(0 0 1px #142126)}' + (A2(
			$elm$core$String$join,
			',',
			A2(
				$elm$core$List$map,
				function (root) {
					return root + (' .map-region-info[data-info=\"' + ($elm$core$String$fromInt(tile.b0.c) + '\"]'));
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
					$author$project$GenerativeTiling$mapKind(colored.Z) + ('-region-info-' + $elm$core$String$fromInt(tile.b0.c))),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-info',
					$elm$core$String$fromInt(tile.b0.c))
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							'Region ' + ($elm$core$String$fromInt(tile.b0.c + 1) + ((tile.ax === '') ? '' : (' · ' + tile.ax))))
						])),
					$elm$html$Html$text(
					' — ' + (tile.bq + ('. Shared-border neighbors: ' + (A2(
						$elm$core$String$join,
						', ',
						A2(
							$elm$core$List$map,
							function (id) {
								return $elm$core$String$fromInt(id + 1);
							},
							tile.b0.z)) + '.'))))
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
							A2($elm$core$List$map, rules, colored.Y)))
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
				A2($elm$core$List$map, info, colored.Y))
			]));
};
var $elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var $elm$svg$Svg$pattern = $elm$svg$Svg$trustedNode('pattern');
var $elm$svg$Svg$Attributes$patternUnits = _VirtualDom_attribute('patternUnits');
var $elm$svg$Svg$Attributes$preserveAspectRatio = _VirtualDom_attribute('preserveAspectRatio');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$svg$Svg$radialGradient = $elm$svg$Svg$trustedNode('radialGradient');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$stop = $elm$svg$Svg$trustedNode('stop');
var $elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var $elm$svg$Svg$Attributes$stopOpacity = _VirtualDom_attribute('stop-opacity');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var $elm$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$Attributes$fontWeight = _VirtualDom_attribute('font-weight');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$MosaicPalette$getColor = function (index) {
	switch (index) {
		case 0:
			return '#bb5961';
		case 1:
			return '#397d68';
		case 2:
			return '#426f9f';
		default:
			return '#999999';
	}
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
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$title = $elm$svg$Svg$trustedNode('title');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$GenerativeTiling$viewTile = F4(
	function (onTile, tiling, changed, tile) {
		var path = A2($author$project$GenerativeTiling$tilePath, tiling, tile.b0);
		var labeled = tile.ax !== '';
		var labelPoint = tile.b0.r;
		var fill = $author$project$MosaicPalette$getColor(tile.aI);
		var clickable = !_Utils_eq(tile.c1, $elm$core$Maybe$Nothing);
		var attrs = clickable ? _List_fromArray(
			[
				$elm$html$Html$Events$onClick(
				onTile(tile.b0.c)),
				A2($elm$html$Html$Attributes$attribute, 'tabindex', '0'),
				A2($elm$html$Html$Attributes$attribute, 'role', 'button'),
				$author$project$GenerativeTiling$keyActivate(
				onTile(tile.b0.c)),
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
						$elm$core$String$fromInt(tile.b0.c)),
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-color',
						$elm$core$String$fromInt(tile.dD)),
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-neighbors',
						A2(
							$elm$core$String$join,
							',',
							A2($elm$core$List$map, $elm$core$String$fromInt, tile.b0.z))),
						A2(
						$elm$html$Html$Attributes$attribute,
						'aria-describedby',
						$author$project$GenerativeTiling$mapKind(tiling) + ('-region-info-' + $elm$core$String$fromInt(tile.b0.c))),
						A2(
						$elm$html$Html$Attributes$attribute,
						'data-changing',
						A2($elm$core$List$member, tile.b0.c, changed) ? 'true' : 'false'),
						A2(
						$elm$html$Html$Attributes$attribute,
						'aria-label',
						labeled ? tile.ax : 'Mosaic region')
					])),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$title,
					_List_Nil,
					_List_fromArray(
						[
							$elm$svg$Svg$text(
							'Region ' + ($elm$core$String$fromInt(tile.b0.c + 1) + (' · ' + tile.bq)))
						])),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d(path),
							$elm$svg$Svg$Attributes$fill(fill),
							A2(
							$elm$html$Html$Attributes$style,
							'filter',
							(tile.dD < 0) ? 'brightness(0.82) saturate(0.8)' : ''),
							$elm$svg$Svg$Attributes$fillRule('evenodd'),
							$elm$svg$Svg$Attributes$class('mosaic-region'),
							A2($elm$html$Html$Attributes$style, 'stroke-linejoin', 'miter'),
							A2($elm$html$Html$Attributes$style, 'stroke-miterlimit', '2'),
							A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('mosaic-sheen-wrap'),
							$elm$svg$Svg$Attributes$pointerEvents('none')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$d(path),
									$elm$svg$Svg$Attributes$fill('url(#mosaic-sheen)'),
									$elm$svg$Svg$Attributes$fillRule('evenodd'),
									$elm$svg$Svg$Attributes$class('mosaic-sheen')
								]),
							_List_Nil)
						])),
					labeled ? A2(
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$x(
							$elm$core$String$fromFloat(labelPoint.b)),
							$elm$svg$Svg$Attributes$y(
							$elm$core$String$fromFloat(labelPoint.a)),
							$elm$svg$Svg$Attributes$textAnchor('middle'),
							$elm$svg$Svg$Attributes$dominantBaseline('middle'),
							$elm$svg$Svg$Attributes$fontSize(
							($author$project$GenerativeTiling$mapKind(tiling) === 'graph') ? '9' : '15'),
							A2(
							$elm$html$Html$Attributes$style,
							'fill',
							(tile.aI === 2) ? '#ffffff' : 'var(--mosaic-label)'),
							A2(
							$elm$html$Html$Attributes$style,
							'stroke',
							(tile.aI === 2) ? '#101b35' : 'var(--mosaic-label-halo)'),
							$elm$svg$Svg$Attributes$strokeWidth(
							($author$project$GenerativeTiling$mapKind(tiling) === 'graph') ? '1.4' : '2.2'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round'),
							A2($elm$html$Html$Attributes$style, 'paint-order', 'stroke'),
							$elm$svg$Svg$Attributes$fontWeight('650'),
							$elm$svg$Svg$Attributes$letterSpacing('0.015em'),
							$elm$svg$Svg$Attributes$pointerEvents('none')
						]),
					_List_fromArray(
						[
							$elm$svg$Svg$text(tile.ax)
						])) : $elm$svg$Svg$text('')
				]));
	});
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$GenerativeTiling$paint = F2(
	function (onTile, colored) {
		var w = colored.Z.bc;
		var h = colored.Z.a0;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('mosaic-map'),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-view',
					$author$project$GenerativeTiling$mapKind(colored.Z)),
					A2(
					$elm$html$Html$Attributes$attribute,
					'data-propagating',
					(A2($elm$core$String$startsWith, 'Propagating', colored.b_) || A2($elm$core$String$startsWith, 'Drawing', colored.b_)) ? 'true' : 'false')
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
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$radialGradient,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$id('mosaic-sheen'),
											$elm$svg$Svg$Attributes$cx('34%'),
											$elm$svg$Svg$Attributes$cy('28%'),
											$elm$svg$Svg$Attributes$r('88%')
										]),
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$stop,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$offset('0%'),
													$elm$svg$Svg$Attributes$stopColor('#ffffff'),
													$elm$svg$Svg$Attributes$stopOpacity('0.32')
												]),
											_List_Nil),
											A2(
											$elm$svg$Svg$stop,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$offset('46%'),
													$elm$svg$Svg$Attributes$stopColor('#ffffff'),
													$elm$svg$Svg$Attributes$stopOpacity('0.06')
												]),
											_List_Nil),
											A2(
											$elm$svg$Svg$stop,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$offset('100%'),
													$elm$svg$Svg$Attributes$stopColor('#1e3b32'),
													$elm$svg$Svg$Attributes$stopOpacity('0.16')
												]),
											_List_Nil)
										])),
									A2(
									$elm$svg$Svg$pattern,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$id('mosaic-dots'),
											$elm$svg$Svg$Attributes$width('24'),
											$elm$svg$Svg$Attributes$height('24'),
											$elm$svg$Svg$Attributes$patternUnits('userSpaceOnUse')
										]),
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$circle,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$cx('1'),
													$elm$svg$Svg$Attributes$cy('1'),
													$elm$svg$Svg$Attributes$r('1'),
													$elm$svg$Svg$Attributes$fill('var(--mosaic-grid)')
												]),
											_List_Nil)
										]))
								])),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$svg$Svg$rect,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x('-12'),
										$elm$svg$Svg$Attributes$y('-12'),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(w + 24)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(h + 24)),
										$elm$svg$Svg$Attributes$class('mosaic-ground')
									]),
								_List_Nil),
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
											$elm$svg$Svg$Attributes$fill('url(#mosaic-dots)'),
											$elm$svg$Svg$Attributes$class('mosaic-dots'),
											$elm$svg$Svg$Attributes$pointerEvents('none')
										]),
									_List_Nil),
								_Utils_ap(
									A2(
										$elm$core$List$map,
										A3($author$project$GenerativeTiling$viewTile, onTile, colored.Z, colored.ca),
										colored.Y),
									_Utils_ap(
										A2(
											$elm$core$List$map,
											A2($author$project$GenerativeTiling$interactionOutline, colored.Z, colored.ca),
											colored.Y),
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
														$elm$svg$Svg$Attributes$class('mosaic-frame'),
														$elm$svg$Svg$Attributes$pointerEvents('none'),
														A2($elm$html$Html$Attributes$attribute, 'vector-effect', 'non-scaling-stroke')
													]),
												_List_Nil)
											]))))))),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('small-note mosaic-boundary-note')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							colored.Z.ek ? 'Original 6 × 5 tile map: every pair of tiles sharing a border must have different colors. Input and OUT clues use formula values. Opposite edges do not connect.' : (($author$project$GenerativeTiling$mapKind(colored.Z) === 'organic') ? 'Cells grow and merge into a fully packed map. Equal pins share territory; neutral and extra cells fill the remaining space. Shared borders preserve the logic, and OUT is forced by the inputs. Shaded tiles retain their last color while the signal travels; opposite edges do not connect.' : 'The same nodes and colors before expansion. Every contact represents a three-color constraint.'))
						])),
					$author$project$GenerativeTiling$neighborInspector(colored)
				]));
	});
var $author$project$GenerativeTiling$paintSkeleton = F2(
	function (onTile, colored) {
		var _v0 = colored.Z.dF;
		if (_v0.$ === 1) {
			return $elm$html$Html$text('');
		} else {
			var map = _v0.a;
			var tiles = A2(
				$elm$core$List$map,
				function (r) {
					return {
						bF: $elm$core$Basics$abs(
							$author$project$GenerativeTiling$shoelace(r.a4)),
						q: -1,
						r: r.ah,
						c: r.c,
						z: r.z,
						a4: r.a4,
						u: r.ah
					};
				},
				map.k);
			var values = A3(
				$elm$core$List$map2,
				F2(
					function (value, tile) {
						return _Utils_update(
							value,
							{b0: tile});
					}),
				colored.Y,
				tiles);
			var original = colored.Z;
			var tiling = _Utils_update(
				original,
				{eh: $elm$core$Dict$empty, Y: tiles});
			return A2(
				$author$project$GenerativeTiling$paint,
				onTile,
				_Utils_update(
					colored,
					{Y: values, Z: tiling}));
		}
	});
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
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
							$author$project$MosaicPalette$getColor(color))
						]),
					_List_Nil),
					$elm$html$Html$text(name)
				]));
	});
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$FormulaMosaic$AnimateSignals = function (a) {
	return {$: 11, a: a};
};
var $author$project$FormulaMosaic$PreviousSignal = {$: 7};
var $author$project$FormulaMosaic$ReplaySignals = {$: 8};
var $author$project$FormulaMosaic$SetSignalDelay = function (a) {
	return {$: 9, a: a};
};
var $author$project$FormulaMosaic$SignalStep = {$: 10};
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
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
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
var $elm$html$Html$output = _VirtualDom_node('output');
var $elm$html$Html$progress = _VirtualDom_node('progress');
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $author$project$FormulaMosaic$viewPlayback = function (model) {
	var total = A2(
		$elm$core$Basics$max,
		0,
		$elm$core$List$length(model.aG) - 1);
	var pending = $author$project$FormulaMosaic$hasPending(model);
	var state = (model.P !== '') ? 'Invalid formula' : ((!pending) ? (A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.b_;
				},
				$elm$core$String$startsWith('Settled')),
			model.G)) ? 'Finished' : 'Needs attention') : (model.C ? model.aR : ((!model.W) ? 'Ready' : 'Paused')));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mosaic-playback'),
				A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Coloring playback')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mosaic-playback-heading')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('mosaic-playback-state'),
								A2($elm$html$Html$Attributes$attribute, 'role', 'status'),
								A2($elm$html$Html$Attributes$attribute, 'aria-live', 'polite'),
								A2($elm$html$Html$Attributes$attribute, 'data-state', state)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(state)
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hint')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								(!total) ? 'No color changes' : ((_Utils_eq(state, model.aR) ? 'Step ' : (model.aR + ' · step ')) + ($elm$core$String$fromInt(model.W) + (' of ' + $elm$core$String$fromInt(total)))))
							]))
					])),
				A2(
				$elm$html$Html$progress,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$max(
						$elm$core$String$fromInt(
							A2($elm$core$Basics$max, 1, total))),
						$elm$html$Html$Attributes$value(
						$elm$core$String$fromInt(
							(!pending) ? A2($elm$core$Basics$max, 1, total) : model.W)),
						A2($elm$html$Html$Attributes$attribute, 'aria-label', 'Coloring progress')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mosaic-row wrap propagation-controls')
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
										$elm$html$Html$Attributes$checked(model.C),
										$elm$html$Html$Events$onCheck($author$project$FormulaMosaic$AnimateSignals)
									]),
								_List_Nil),
								$elm$html$Html$text(' Animate coloring')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$disabled(!pending),
								$elm$html$Html$Events$onClick(
								$author$project$FormulaMosaic$AnimateSignals(!model.C))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								model.C ? 'Pause coloring' : 'Resume coloring')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$disabled(!model.W),
								$elm$html$Html$Events$onClick($author$project$FormulaMosaic$PreviousSignal)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Previous step')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$disabled(!pending),
								$elm$html$Html$Events$onClick($author$project$FormulaMosaic$SignalStep)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Next step')
							])),
						A2(
						$elm$html$Html$button,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('button'),
								$elm$html$Html$Attributes$disabled(!total),
								$elm$html$Html$Events$onClick($author$project$FormulaMosaic$ReplaySignals)
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Replay coloring')
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('mosaic-speed')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$label,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('mosaic-step-delay')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Time per step')
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$id('mosaic-step-delay'),
								$elm$html$Html$Attributes$type_('range'),
								$elm$html$Html$Attributes$min('50'),
								$elm$html$Html$Attributes$max('2500'),
								$elm$html$Html$Attributes$step('50'),
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(model.aF)),
								A2(
								$elm$html$Html$Attributes$attribute,
								'aria-valuetext',
								$elm$core$String$fromFloat(model.aF / 1000) + ' seconds per step'),
								$elm$html$Html$Events$onInput($author$project$FormulaMosaic$SetSignalDelay)
							]),
						_List_Nil),
						A2(
						$elm$html$Html$output,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$for('mosaic-step-delay')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromFloat(model.aF / 1000) + ' s / step')
							])),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('hint')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Left = faster · right = slower. Stepping pauses playback.')
							]))
					]))
			]));
};
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
											formula.aJ),
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
															_Utils_eq(i, model.aE))
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
																		A2($elm$core$Dict$get, name, row.bG),
																		$elm$core$Maybe$Just(true)) ? '1' : '0')
																]));
													},
													formula.aJ),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$td,
														_List_Nil,
														_List_fromArray(
															[
																$elm$html$Html$text(
																row.cT ? '1' : '0')
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
																		_Utils_eq(i, model.aE) ? 'Selected' : ('View row ' + $elm$core$String$fromInt(i + 1)))
																	]))
															]))
													])));
									}),
								formula.ap))
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
									$elm$html$Html$text('3-SAT · LOGIC · COLOR')
								])),
							A2(
							$elm$html$Html$h1,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('3-SAT')
								])),
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									comparison ? 'Explore the original tiles.' : 'Explore Boolean satisfiability with connected logic regions.')
								]))
						])),
					A2(
					$elm$html$Html$section,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('mosaic-bar mosaic-about')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('What is 3-SAT?')
								])),
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('3-SAT is a special case of the Boolean satisfiability problem (SAT). It asks whether a Boolean formula, written in conjunctive normal form with at most three literals per clause, can be made true by assigning TRUE or FALSE to its variables. If such an assignment exists, the formula is satisfiable; otherwise it is unsatisfiable.')
								])),
							A2(
							$elm$html$Html$p,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('3-SAT is NP-complete: it is one of Karp\'s 21 NP-complete problems and a standard starting point for proving that other problems are NP-hard. This experiment turns Boolean constraints into neighboring regions that settle through local repairs. The formula field accepts general Boolean expressions, and the truth table below shows whether the current formula is satisfiable.')
								])),
							A2(
							$elm$html$Html$p,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mosaic-about-source')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$a,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$href('https://en.wikipedia.org/wiki/Boolean_satisfiability_problem'),
											$elm$html$Html$Attributes$target('_blank'),
											$elm$html$Html$Attributes$rel('noopener noreferrer')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('Read more on Wikipedia ↗')
										]))
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
											$elm$html$Html$Attributes$value(model.Q),
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
												$author$project$FormulaMosaic$Example(example.I)),
												$elm$html$Html$Attributes$title(example.I)
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(example.H)
											]));
								},
								$author$project$FormulaExamples$all)),
							(model.P === '') ? $elm$html$Html$text('') : A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('mosaic-error'),
									A2($elm$html$Html$Attributes$attribute, 'role', 'alert')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(model.P)
								]))
						])),
					function () {
					var _v0 = model.au;
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
																$elm$core$List$length(model.aQ.Y)) + ' graph cells') : ($elm$core$String$fromInt(
																$elm$core$List$length(model.Z.Y)) + ' tiles'))
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
													$elm$html$Html$text('Input and output colors: red = false, green = true, blue = neutral. Shaded tiles are waiting for the signal to settle. Click an input tile to toggle it.')
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
												formula.aJ)),
											$author$project$FormulaMosaic$viewPlayback(model),
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
																	$elm$html$Html$text('Shared-border constraints compute OUT from the inputs.')
																])),
															A2(
															$elm$core$Maybe$withDefault,
															$elm$html$Html$text(''),
															A2(
																$elm$core$Maybe$map,
																$author$project$GenerativeTiling$paint($author$project$FormulaMosaic$ClickTile),
																model.G))
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
																	$elm$html$Html$text('Graph regions maintain constraints.')
																])),
															A2(
															$elm$core$Maybe$withDefault,
															$elm$html$Html$text(''),
															A2(
																$elm$core$Maybe$map,
																$author$project$GenerativeTiling$paint($author$project$FormulaMosaic$ClickOrganicTile),
																model.am))
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
																model.am))
														]))
												])) : A2(
											$elm$core$Maybe$withDefault,
											$elm$html$Html$text(''),
											A2(
												$elm$core$Maybe$map,
												$author$project$GenerativeTiling$paint($author$project$FormulaMosaic$ClickTile),
												model.G)),
											comparison ? A2(
											$elm$html$Html$button,
											_List_fromArray(
												[
													$elm$html$Html$Events$onClick($author$project$FormulaMosaic$Reseed)
												]),
											_List_fromArray(
												[
													$elm$html$Html$text('Reshape tiles')
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
																return $.b_;
															},
															comparison ? model.am : model.G)))
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
													'Generated formula: ' + (formula.I + (' · seed ' + ($elm$core$String$fromInt(model.U) + (' · ' + ($elm$core$String$fromInt(
														$elm$core$List$length(
															comparison ? model.aQ.Y : model.Z.Y)) + ' regions. A changed input releases conflicting neighbors, then local constraints settle the affected tiles. OUT is derived, never supplied.'))))))
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
													$elm$html$Html$text('Select a row to send new inputs to the tiles.')
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
															return $.cT;
														},
														formula.ap) ? 'The formula is satisfiable: at least one row is true.' : 'The formula is unsatisfiable: every row is false.')
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
							$elm$html$Html$text('These tiles encode Boolean gates using three-color constraints.Settled neighbors always have different colors; OUT follows from the input pins.')
						]))
				]));
	});
var $author$project$FormulaMosaic$view = $author$project$FormulaMosaic$viewPage(false);
var $author$project$FormulaMosaic$main = $elm$browser$Browser$element(
	{
		d$: function (_v0) {
			return _Utils_Tuple2($author$project$FormulaMosaic$init, $elm$core$Platform$Cmd$none);
		},
		eD: function (model) {
			return (model.C && $author$project$FormulaMosaic$hasPending(model)) ? A2(
				$elm$time$Time$every,
				model.aF,
				function (_v1) {
					return $author$project$FormulaMosaic$SignalTick;
				}) : $elm$core$Platform$Sub$none;
		},
		eX: F2(
			function (msg, model) {
				return _Utils_Tuple2(
					A2($author$project$FormulaMosaic$update, msg, model),
					$elm$core$Platform$Cmd$none);
			}),
		eY: $author$project$FormulaMosaic$view
	});
_Platform_export({'FormulaMosaic':{'init':$author$project$FormulaMosaic$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));