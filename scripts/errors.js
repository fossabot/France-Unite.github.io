const { Enum } = require("enumify");

/**
 * Enum of the different available values for BoundExceededError
 *
 * @see {#BoundExceededError}
 */
export class AvailableBoundTypes extends Enum {}
AvailableBoundTypes.initEnum(["<", "<=", "=", "!=", ">", ">="]);

/**
 * Error throw when argument are null or empty
 */
export class NullOrEmptyArgError extends Error {
  constructor(...params) {
    super(...params);
    this.name = "NullOrEmptyArgError";
    this.message = "At least one argument is null or empty";
  }
}

/**
 * Error throw when the type are invalid
 *
 * @param expected {array|string} Expected type
 * @param actual Current type
 * @param additionalMessage Additional message to provide more detail about the error (like parameter or methods name)
 */
export class InvalidTypeError extends Error {
  constructor({ expected, actual, additionalMessage = undefined }, ...params) {
    super(...params);
    let expectedType;
    if (expected.constructor.name === "Array") {
      expectedType = '["' + expected.join('","') + '"]';
    } else {
      expectedType = `"${expected}"`;
    }
    this.name = "InvalidTypeError";
    this.message = `Invalid type${
      additionalMessage ? " " + additionalMessage : ""
    }, expected ${expectedType} but was "${typeof actual === "object" ? JSON.stringify(actual) : actual}"`;
  }
}

/**
 * Error throw when the comparator size are invalid
 *
 * @see {utils#checkFormNumeric}
 */
export class InvalidComparatorSize extends Error {
  constructor(...params) {
    super(...params);
    this.name = "InvalidComparatorSize";
    this.message = "Comparator should contains only two values";
  }
}

/**
 * Error throw when the comparator size are invalid
 *
 * @see {utils#checkFormNumeric}
 */
export class InvalidComparatorError extends Error {
  constructor({ firstParam, value }, ...params) {
    super(...params);
    let message;
    if (firstParam) {
      message =
        "Invalid value or type for the first comparator value, " +
        'expected string with value "<", "<=", ">", ">=", "==" or "===" or a number but was "' +
        value +
        '"';
    } else {
      message = `Invalid type for the second comparator value, expected "number" but was "${value}"`;
    }

    this.name = "InvalidComparatorError";
    this.message = message;
  }
}

/**
 * Error throw when a field is null
 *
 * @param field Parameter name in the function
 * @param funcName Name of the function
 */
export class FieldNullError extends Error {
  constructor({ field, funcName }, ...params) {
    super(...params);

    this.name = "FieldNullError";
    this.message = `The field "${field}" in "${funcName}" cannot be null`;
  }
}

/**
 * Error throw when a value is not between bounds
 *
 * @param value Value that cause the error
 * @param lowerBound Lower bound
 * @param upperBound Upper bound
 * @param additionalMessage Additional message to provide more detail about the error (like parameter or methods name)
 */
export class NotInBoundsError extends Error {
  constructor({ value, lowerBound, upperBound, additionalMessage = undefined }, ...params) {
    super(...params);

    this.name = "NotInBoundsError";
    this.message = `Value "${value}" is not between ${lowerBound} and ${upperBound}${
      additionalMessage ? " " + additionalMessage : ""
    }`;
  }
}

/**
 * Error throw when a value are not matched by a regex test.
 *
 * @param value Value that cause the error
 * @param regex The regular expression that value should match
 * @param additionalMessage Additional message to provide more detail about the error (like parameter or methods name)
 */
export class InvalidRegexMatchError extends Error {
  constructor({ value, regex, additionalMessage = undefined }, ...params) {
    super(...params);

    this.name = "InvalidRegexMatchError";
    this.message = `Value "${value}" is not allowed. Should match ${regex}${
      additionalMessage ? " " + additionalMessage : ""
    }`;
  }
}

/**
 * Error throw when the value is [<,<=,=,!=,>,>=] than boundValue
 *
 * @param type {AvailableBoundTypes} Type of the comparison, should be one of: [<,<=,=,!=,>,>=]
 * @param value Value that cause the error
 * @param boundValue Bound exceeded
 * @param additionalMessage Additional message to provide more detail about the error (like parameter or methods name)
 */
export class BoundExceededError extends Error {
  constructor({ type, value, boundValue, additionalMessage = undefined }, ...params) {
    super(...params);

    this.name = "BoundExceededError";
    this.message = `"${value}" should not be ${type.name} than ${boundValue}${
      additionalMessage ? " " + additionalMessage : ""
    }`;
  }
}

/**
 * Error throw when an object does not contain a key it should have.
 *
 * @param key {string} Type of the comparison, should be one of: [<,<=,=,!=,>,>=]
 * @param objectName {string} Value that cause the error
 * @param additionalMessage Additional message to provide more detail about the error (like parameter or methods name)
 */
export class KeyNotFoundError extends Error {
  constructor({ key, objectName, additionalMessage = undefined }, ...params) {
    super(...params);

    this.name = "KeyNotFoundError";
    this.message = `"${key}" not found in ${objectName}${additionalMessage ? " " + additionalMessage : ""}`;
  }
}

/**
 * Error throw when the key already exists in urlQuery in store.
 * @param key Key that already exists
 */
export class keyAlreadyExistsInUrlQueryException extends Error {
  constructor({ key }, ...params) {
    super(...params);

    this.name = "keyAlreadyExistsInUrlQueryException";
    this.message = `"${key}" already defined in state.urlQuery`;
  }
}

/**
 * Error throw when the key already exists in urlQuery or in urlQueryNamespace in store.
 * @param key Key that already exists
 */
export class keyAlreadyExistsInUrlQueryOrUrlQueryNamespaceException extends Error {
  constructor({ key }, ...params) {
    super(...params);

    this.name = "keyAlreadyExistsInUrlQueryOrUrlQueryNamespaceException";
    this.message = `"${key}" already defined in state.urlQuery or state.urlQueryNamespace`;
  }
}

/**
 * Error throw when a namespace are not found in urlQueryNamespace in store.
 * @param namespace Namespace that is not found
 */
export class namespaceNotFoundException extends Error {
  constructor({ namespace }, ...params) {
    super(...params);

    this.name = "namespaceNotFoundException";
    this.message = `"${namespace}" not found in state.urlQueryNamespace`;
  }
}
