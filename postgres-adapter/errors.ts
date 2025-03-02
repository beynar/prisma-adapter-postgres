import { DriverAdapterError } from "@prisma/driver-adapter-utils";

/**
 * PostgreSQL error code classifications
 * Based on: https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
export enum PostgresErrorCode {
  // Class 00 — Successful Completion
  SUCCESSFUL_COMPLETION = "00000",

  // Class 01 — Warning
  WARNING = "01000",
  NULL_VALUE_ELIMINATED_IN_SET_FUNCTION = "01003",
  STRING_DATA_RIGHT_TRUNCATION_WARNING = "01004",
  PRIVILEGE_NOT_GRANTED = "01007",
  PRIVILEGE_NOT_REVOKED = "01006",
  IMPLICIT_ZERO_BIT_PADDING = "01008",
  DYNAMIC_RESULT_SETS_RETURNED = "0100C",
  DEPRECATED_FEATURE = "01P01",

  // Class 02 — No Data
  NO_DATA = "02000",
  NO_ADDITIONAL_DYNAMIC_RESULT_SETS_RETURNED = "02001",

  // Class 03 — SQL Statement Not Yet Complete
  SQL_STATEMENT_NOT_YET_COMPLETE = "03000",

  // Class 08 — Connection Exception
  CONNECTION_EXCEPTION = "08000",
  SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION = "08001",
  CONNECTION_DOES_NOT_EXIST = "08003",
  SQLSERVER_REJECTED_ESTABLISHMENT_OF_SQLCONNECTION = "08004",
  CONNECTION_FAILURE = "08006",
  TRANSACTION_RESOLUTION_UNKNOWN = "08007",
  PROTOCOL_VIOLATION = "08P01",

  // Class 09 — Triggered Action Exception
  TRIGGERED_ACTION_EXCEPTION = "09000",

  // Class 0A — Feature Not Supported
  FEATURE_NOT_SUPPORTED = "0A000",

  // Class 0B — Invalid Transaction Initiation
  INVALID_TRANSACTION_INITIATION = "0B000",

  // Class 0F — Locator Exception
  LOCATOR_EXCEPTION = "0F000",
  INVALID_LOCATOR_SPECIFICATION = "0F001",

  // Class 0L — Invalid Grantor
  INVALID_GRANTOR = "0L000",
  INVALID_GRANT_OPERATION = "0LP01",

  // Class 0P — Invalid Role Specification
  INVALID_ROLE_SPECIFICATION = "0P000",

  // Class 0Z — Diagnostics Exception
  DIAGNOSTICS_EXCEPTION = "0Z000",
  STACKED_DIAGNOSTICS_ACCESSED_WITHOUT_ACTIVE_HANDLER = "0Z002",

  // Class 20 — Case Not Found
  CASE_NOT_FOUND = "20000",

  // Class 21 — Cardinality Violation
  CARDINALITY_VIOLATION = "21000",

  // Class 22 — Data Exception
  DATA_EXCEPTION = "22000",
  STRING_DATA_RIGHT_TRUNCATION = "22001",
  NULL_VALUE_NO_INDICATOR_PARAMETER = "22002",
  NUMERIC_VALUE_OUT_OF_RANGE = "22003",
  NULL_VALUE_NOT_ALLOWED = "22004",
  ERROR_IN_ASSIGNMENT = "22005",
  INVALID_DATETIME_FORMAT = "22007",
  DATETIME_FIELD_OVERFLOW = "22008",
  INVALID_TIME_ZONE_DISPLACEMENT_VALUE = "22009",
  ESCAPE_CHARACTER_CONFLICT = "2200B",
  INVALID_USE_OF_ESCAPE_CHARACTER = "2200C",
  INVALID_ESCAPE_OCTET = "2200D",
  ZERO_LENGTH_CHARACTER_STRING = "2200F",
  MOST_SPECIFIC_TYPE_MISMATCH = "2200G",
  SEQUENCE_GENERATOR_LIMIT_EXCEEDED = "2200H",
  NOT_AN_XML_DOCUMENT = "2200L",
  INVALID_XML_DOCUMENT = "2200M",
  INVALID_XML_CONTENT = "2200N",
  INVALID_XML_COMMENT = "2200S",
  INVALID_XML_PROCESSING_INSTRUCTION = "2200T",
  INVALID_INDICATOR_PARAMETER_VALUE = "22010",
  SUBSTRING_ERROR = "22011",
  DIVISION_BY_ZERO = "22012",
  INVALID_PRECEDING_OR_FOLLOWING_SIZE = "22013",
  INVALID_ARGUMENT_FOR_NTILE_FUNCTION = "22014",
  INTERVAL_FIELD_OVERFLOW = "22015",
  INVALID_ARGUMENT_FOR_NTH_VALUE_FUNCTION = "22016",
  INVALID_CHARACTER_VALUE_FOR_CAST = "22018",
  INVALID_ESCAPE_CHARACTER = "22019",
  INVALID_REGULAR_EXPRESSION = "2201B",
  INVALID_ARGUMENT_FOR_LOGARITHM = "2201E",
  INVALID_ARGUMENT_FOR_POWER_FUNCTION = "2201F",
  INVALID_ARGUMENT_FOR_WIDTH_BUCKET_FUNCTION = "2201G",
  INVALID_ROW_COUNT_IN_LIMIT_CLAUSE = "2201W",
  INVALID_ROW_COUNT_IN_RESULT_OFFSET_CLAUSE = "2201X",
  INVALID_LIMIT_VALUE = "22020",
  CHARACTER_NOT_IN_REPERTOIRE = "22021",
  INDICATOR_OVERFLOW = "22022",
  INVALID_PARAMETER_VALUE = "22023",
  UNTERMINATED_C_STRING = "22024",
  INVALID_ESCAPE_SEQUENCE = "22025",
  STRING_DATA_LENGTH_MISMATCH = "22026",
  TRIM_ERROR = "22027",
  ARRAY_SUBSCRIPT_ERROR = "2202E",
  INVALID_TABLESAMPLE_REPEAT = "2202G",
  INVALID_TABLESAMPLE_ARGUMENT = "2202H",
  DUPLICATE_JSON_OBJECT_KEY_VALUE = "22030",
  INVALID_JSON_TEXT = "22032",
  INVALID_SQL_JSON_SUBSCRIPT = "22033",
  MORE_THAN_ONE_SQL_JSON_ITEM = "22034",
  NO_SQL_JSON_ITEM = "22035",
  NON_NUMERIC_SQL_JSON_ITEM = "22036",
  NON_UNIQUE_KEYS_IN_A_JSON_OBJECT = "22037",
  SINGLETON_SQL_JSON_ITEM_REQUIRED = "22038",
  SQL_JSON_ARRAY_NOT_FOUND = "22039",
  SQL_JSON_MEMBER_NOT_FOUND = "2203A",
  SQL_JSON_NUMBER_NOT_FOUND = "2203B",
  SQL_JSON_OBJECT_NOT_FOUND = "2203C",
  TOO_MANY_JSON_ARRAY_ELEMENTS = "2203D",
  TOO_MANY_JSON_OBJECT_MEMBERS = "2203E",
  SQL_JSON_SCALAR_REQUIRED = "2203F",
  PROHIBITED_SQL_JSON_OBJECT_ATTRIBUTE = "2203G",
  INVALID_ARGUMENT_FOR_SQL_JSON_DATETIME_FUNCTION = "2203T",
  INVALID_JSON_VALUE = "2203U",
  INVALID_SQL_JSON_SUBSCRIPT = "2203V",
  INVALID_DATETIME_FORMAT_TEXT_REP = "22V0",
  INVALID_TIME_FORMAT = "22V1",
  INVALID_TIME_VALUE = "22V2",
  INVALID_TIME_ZONE_DISPLACEMENT_VALUE = "22V3",
  INVALID_TIME_ZONE_DISPLACEMENT_HOURS_VALUE = "22V4",
  INVALID_TIME_ZONE_DISPLACEMENT_MINUTES_VALUE = "22V5",
  INVALID_DATALINK_VALUE = "22V6",
  INVALID_JSON_PATH_LANGUAGE_ITEM = "22V7",
  FLOATING_POINT_EXCEPTION = "22P01",
  INVALID_TEXT_REPRESENTATION = "22P02",
  INVALID_BINARY_REPRESENTATION = "22P03",
  BAD_COPY_FILE_FORMAT = "22P04",
  UNTRANSLATABLE_CHARACTER = "22P05",
  NONSTANDARD_USE_OF_ESCAPE_CHARACTER = "22P06",
  INVALID_JSON_PATH_ARRAY_INDEX = "22P07",

  // Class 23 — Integrity Constraint Violation
  INTEGRITY_CONSTRAINT_VIOLATION = "23000",
  RESTRICT_VIOLATION = "23001",
  NOT_NULL_VIOLATION = "23502",
  FOREIGN_KEY_VIOLATION = "23503",
  UNIQUE_VIOLATION = "23505",
  CHECK_VIOLATION = "23514",
  EXCLUSION_VIOLATION = "23P01",

  // Class 24 — Invalid Cursor State
  INVALID_CURSOR_STATE = "24000",

  // Class 25 — Invalid Transaction State
  INVALID_TRANSACTION_STATE = "25000",
  ACTIVE_SQL_TRANSACTION = "25001",
  BRANCH_TRANSACTION_ALREADY_ACTIVE = "25002",
  HELD_CURSOR_REQUIRES_SAME_ISOLATION_LEVEL = "25008",
  INAPPROPRIATE_ACCESS_MODE_FOR_BRANCH_TRANSACTION = "25003",
  INAPPROPRIATE_ISOLATION_LEVEL_FOR_BRANCH_TRANSACTION = "25004",
  NO_ACTIVE_SQL_TRANSACTION_FOR_BRANCH_TRANSACTION = "25005",
  READ_ONLY_SQL_TRANSACTION = "25006",
  SCHEMA_AND_DATA_STATEMENT_MIXING_NOT_SUPPORTED = "25007",
  NO_ACTIVE_SQL_TRANSACTION = "25P01",
  IN_FAILED_SQL_TRANSACTION = "25P02",
  IDLE_IN_TRANSACTION_SESSION_TIMEOUT = "25P03",

  // Class 26 — Invalid SQL Statement Name
  INVALID_SQL_STATEMENT_NAME = "26000",

  // Class 27 — Triggered Data Change Violation
  TRIGGERED_DATA_CHANGE_VIOLATION = "27000",

  // Class 28 — Invalid Authorization Specification
  INVALID_AUTHORIZATION_SPECIFICATION = "28000",
  INVALID_PASSWORD = "28P01",

  // Class 2B — Dependent Privilege Descriptors Still Exist
  DEPENDENT_PRIVILEGE_DESCRIPTORS_STILL_EXIST = "2B000",
  DEPENDENT_OBJECTS_STILL_EXIST = "2BP01",

  // Class 2D — Invalid Transaction Termination
  INVALID_TRANSACTION_TERMINATION = "2D000",

  // Class 2F — SQL Routine Exception
  SQL_ROUTINE_EXCEPTION = "2F000",
  FUNCTION_EXECUTED_NO_RETURN_STATEMENT = "2F005",
  MODIFYING_SQL_DATA_NOT_PERMITTED = "2F002",
  PROHIBITED_SQL_STATEMENT_ATTEMPTED = "2F003",
  READING_SQL_DATA_NOT_PERMITTED = "2F004",

  // Class 34 — Invalid Cursor Name
  INVALID_CURSOR_NAME = "34000",

  // Class 38 — External Routine Exception
  EXTERNAL_ROUTINE_EXCEPTION = "38000",
  CONTAINING_SQL_NOT_PERMITTED = "38001",
  MODIFYING_SQL_DATA_NOT_PERMITTED_EXTERNAL = "38002",
  PROHIBITED_SQL_STATEMENT_ATTEMPTED_EXTERNAL = "38003",
  READING_SQL_DATA_NOT_PERMITTED_EXTERNAL = "38004",

  // Class 39 — External Routine Invocation Exception
  EXTERNAL_ROUTINE_INVOCATION_EXCEPTION = "39000",
  INVALID_SQLSTATE_RETURNED = "39001",
  NULL_VALUE_NOT_ALLOWED_EXTERNAL = "39004",
  TRIGGER_PROTOCOL_VIOLATED = "39P01",
  SRF_PROTOCOL_VIOLATED = "39P02",
  EVENT_TRIGGER_PROTOCOL_VIOLATED = "39P03",

  // Class 3B — Savepoint Exception
  SAVEPOINT_EXCEPTION = "3B000",
  INVALID_SAVEPOINT_SPECIFICATION = "3B001",

  // Class 3D — Invalid Catalog Name
  INVALID_CATALOG_NAME = "3D000",

  // Class 3F — Invalid Schema Name
  INVALID_SCHEMA_NAME = "3F000",

  // Class 40 — Transaction Rollback
  TRANSACTION_ROLLBACK = "40000",
  TRANSACTION_INTEGRITY_CONSTRAINT_VIOLATION = "40002",
  SERIALIZATION_FAILURE = "40001",
  STATEMENT_COMPLETION_UNKNOWN = "40003",
  DEADLOCK_DETECTED = "40P01",

  // Class 42 — Syntax Error or Access Rule Violation
  SYNTAX_ERROR_OR_ACCESS_RULE_VIOLATION = "42000",
  SYNTAX_ERROR = "42601",
  INSUFFICIENT_PRIVILEGE = "42501",
  CANNOT_COERCE = "42846",
  GROUPING_ERROR = "42803",
  WINDOWING_ERROR = "42P20",
  INVALID_RECURSION = "42P19",
  INVALID_FOREIGN_KEY = "42830",
  INVALID_NAME = "42602",
  NAME_TOO_LONG = "42622",
  RESERVED_NAME = "42939",
  DATATYPE_MISMATCH = "42804",
  INDETERMINATE_DATATYPE = "42P18",
  COLLATION_MISMATCH = "42P21",
  INDETERMINATE_COLLATION = "42P22",
  WRONG_OBJECT_TYPE = "42809",
  GENERATED_ALWAYS = "428C9",
  UNDEFINED_COLUMN = "42703",
  UNDEFINED_FUNCTION = "42883",
  UNDEFINED_TABLE = "42P01",
  UNDEFINED_PARAMETER = "42P02",
  UNDEFINED_OBJECT = "42704",
  DUPLICATE_COLUMN = "42701",
  DUPLICATE_CURSOR = "42P03",
  DUPLICATE_DATABASE = "42P04",
  DUPLICATE_FUNCTION = "42723",
  DUPLICATE_PREPARED_STATEMENT = "42P05",
  DUPLICATE_SCHEMA = "42P06",
  DUPLICATE_TABLE = "42P07",
  DUPLICATE_ALIAS = "42712",
  DUPLICATE_OBJECT = "42710",
  AMBIGUOUS_COLUMN = "42702",
  AMBIGUOUS_FUNCTION = "42725",
  AMBIGUOUS_PARAMETER = "42P08",
  AMBIGUOUS_ALIAS = "42P09",
  INVALID_COLUMN_REFERENCE = "42P10",
  INVALID_COLUMN_DEFINITION = "42611",
  INVALID_CURSOR_DEFINITION = "42P11",
  INVALID_DATABASE_DEFINITION = "42P12",
  INVALID_FUNCTION_DEFINITION = "42P13",
  INVALID_PREPARED_STATEMENT_DEFINITION = "42P14",
  INVALID_SCHEMA_DEFINITION = "42P15",
  INVALID_TABLE_DEFINITION = "42P16",
  INVALID_OBJECT_DEFINITION = "42P17",

  // Class 44 — WITH CHECK OPTION Violation
  WITH_CHECK_OPTION_VIOLATION = "44000",

  // Class 53 — Insufficient Resources
  INSUFFICIENT_RESOURCES = "53000",
  DISK_FULL = "53100",
  OUT_OF_MEMORY = "53200",
  TOO_MANY_CONNECTIONS = "53300",
  CONFIGURATION_LIMIT_EXCEEDED = "53400",

  // Class 54 — Program Limit Exceeded
  PROGRAM_LIMIT_EXCEEDED = "54000",
  STATEMENT_TOO_COMPLEX = "54001",
  TOO_MANY_COLUMNS = "54011",
  TOO_MANY_ARGUMENTS = "54023",

  // Class 55 — Object Not In Prerequisite State
  OBJECT_NOT_IN_PREREQUISITE_STATE = "55000",
  OBJECT_IN_USE = "55006",
  CANT_CHANGE_RUNTIME_PARAM = "55P02",
  LOCK_NOT_AVAILABLE = "55P03",
  UNSAFE_NEW_ENUM_VALUE_USAGE = "55P04",

  // Class 57 — Operator Intervention
  OPERATOR_INTERVENTION = "57000",
  QUERY_CANCELED = "57014",
  ADMIN_SHUTDOWN = "57P01",
  CRASH_SHUTDOWN = "57P02",
  CANNOT_CONNECT_NOW = "57P03",
  DATABASE_DROPPED = "57P04",
  IDLE_SESSION_TIMEOUT = "57P05",

  // Class 58 — System Error (errors external to PostgreSQL itself)
  SYSTEM_ERROR = "58000",
  IO_ERROR = "58030",
  UNDEFINED_FILE = "58P01",
  DUPLICATE_FILE = "58P02",

  // Class 72 — Snapshot Failure
  SNAPSHOT_TOO_OLD = "72000",

  // Class F0 — Configuration File Error
  CONFIG_FILE_ERROR = "F0000",
  LOCK_FILE_EXISTS = "F0001",

  // Class HV — Foreign Data Wrapper Error (SQL/MED)
  FDW_ERROR = "HV000",
  FDW_COLUMN_NAME_NOT_FOUND = "HV005",
  FDW_DYNAMIC_PARAMETER_VALUE_NEEDED = "HV002",
  FDW_FUNCTION_SEQUENCE_ERROR = "HV010",
  FDW_INCONSISTENT_DESCRIPTOR_INFORMATION = "HV021",
  FDW_INVALID_ATTRIBUTE_VALUE = "HV024",
  FDW_INVALID_COLUMN_NAME = "HV007",
  FDW_INVALID_COLUMN_NUMBER = "HV008",
  FDW_INVALID_DATA_TYPE = "HV004",
  FDW_INVALID_DATA_TYPE_DESCRIPTORS = "HV006",
  FDW_INVALID_DESCRIPTOR_FIELD_IDENTIFIER = "HV091",
  FDW_INVALID_HANDLE = "HV00B",
  FDW_INVALID_OPTION_INDEX = "HV00C",
  FDW_INVALID_OPTION_NAME = "HV00D",
  FDW_INVALID_STRING_LENGTH_OR_BUFFER_LENGTH = "HV090",
  FDW_INVALID_STRING_FORMAT = "HV00A",
  FDW_INVALID_USE_OF_NULL_POINTER = "HV009",
  FDW_TOO_MANY_HANDLES = "HV014",
  FDW_OUT_OF_MEMORY = "HV001",
  FDW_NO_SCHEMAS = "HV00P",
  FDW_OPTION_NAME_NOT_FOUND = "HV00J",
  FDW_REPLY_HANDLE = "HV00K",
  FDW_SCHEMA_NOT_FOUND = "HV00Q",
  FDW_TABLE_NOT_FOUND = "HV00R",
  FDW_UNABLE_TO_CREATE_EXECUTION = "HV00L",
  FDW_UNABLE_TO_CREATE_REPLY = "HV00M",
  FDW_UNABLE_TO_ESTABLISH_CONNECTION = "HV00N",

  // Class P0 — PL/pgSQL Error
  PLPGSQL_ERROR = "P0000",
  RAISE_EXCEPTION = "P0001",
  NO_DATA_FOUND = "P0002",
  TOO_MANY_ROWS = "P0003",
  ASSERT_FAILURE = "P0004",

  // Class XX — Internal Error
  INTERNAL_ERROR = "XX000",
  DATA_CORRUPTED = "XX001",
  INDEX_CORRUPTED = "XX002"
}

/**
 * Maps PostgreSQL error codes to user-friendly error messages
 */
const errorMessages: Record<string, string> = {
  [PostgresErrorCode.UNIQUE_VIOLATION]: "A unique constraint would be violated.",
  [PostgresErrorCode.FOREIGN_KEY_VIOLATION]: "A foreign key constraint would be violated.",
  [PostgresErrorCode.NOT_NULL_VIOLATION]: "A not-null constraint would be violated.",
  [PostgresErrorCode.CHECK_VIOLATION]: "A check constraint would be violated.",
  [PostgresErrorCode.EXCLUSION_VIOLATION]: "An exclusion constraint would be violated.",
  [PostgresErrorCode.NUMERIC_VALUE_OUT_OF_RANGE]: "Numeric value out of range.",
  [PostgresErrorCode.INVALID_TEXT_REPRESENTATION]: "Invalid text representation.",
  [PostgresErrorCode.NULL_VALUE_NOT_ALLOWED]: "NULL value not allowed.",
  [PostgresErrorCode.SYNTAX_ERROR]: "Syntax error in SQL statement.",
  [PostgresErrorCode.UNDEFINED_COLUMN]: "Column does not exist.",
  [PostgresErrorCode.UNDEFINED_TABLE]: "Table does not exist.",
  [PostgresErrorCode.UNDEFINED_FUNCTION]: "Function does not exist.",
  [PostgresErrorCode.DUPLICATE_COLUMN]: "Column already exists.",
  [PostgresErrorCode.DUPLICATE_TABLE]: "Table already exists.",
  [PostgresErrorCode.DUPLICATE_OBJECT]: "Object already exists.",
  [PostgresErrorCode.TOO_MANY_CONNECTIONS]: "Too many connections.",
  [PostgresErrorCode.QUERY_CANCELED]: "Query was canceled.",
  [PostgresErrorCode.CONNECTION_EXCEPTION]: "Connection exception.",
  [PostgresErrorCode.CONNECTION_DOES_NOT_EXIST]: "Connection does not exist.",
  [PostgresErrorCode.CONNECTION_FAILURE]: "Connection failure.",
  [PostgresErrorCode.DEADLOCK_DETECTED]: "Deadlock detected.",
  [PostgresErrorCode.SERIALIZATION_FAILURE]: "Serialization failure.",
  [PostgresErrorCode.INVALID_TRANSACTION_STATE]: "Invalid transaction state.",
  [PostgresErrorCode.TRANSACTION_ROLLBACK]: "Transaction has been rolled back."
};

/**
 * Maps PostgreSQL error codes to Prisma error kinds
 */
function mapPostgresErrorCodeToPrismaErrorKind(code: string): string {
  // Handle the most common error types
  switch (code) {
    // Constraint violations
    case PostgresErrorCode.UNIQUE_VIOLATION:
      return "UniqueConstraintViolation";
    case PostgresErrorCode.FOREIGN_KEY_VIOLATION:
      return "ForeignKeyConstraintViolation";
    case PostgresErrorCode.NOT_NULL_VIOLATION:
      return "NotNullConstraintViolation";
    case PostgresErrorCode.CHECK_VIOLATION:
    case PostgresErrorCode.EXCLUSION_VIOLATION:
      return "ConstraintViolation";

    // Value errors
    case PostgresErrorCode.NUMERIC_VALUE_OUT_OF_RANGE:
    case PostgresErrorCode.INVALID_TEXT_REPRESENTATION:
    case PostgresErrorCode.NULL_VALUE_NOT_ALLOWED:
      return "InputValueTooLong";

    // Syntax and undefined objects
    case PostgresErrorCode.SYNTAX_ERROR:
      return "SyntaxError";
    case PostgresErrorCode.UNDEFINED_COLUMN:
    case PostgresErrorCode.UNDEFINED_TABLE:
    case PostgresErrorCode.UNDEFINED_FUNCTION:
      return "TableDoesNotExist";

    // Duplicate objects
    case PostgresErrorCode.DUPLICATE_COLUMN:
    case PostgresErrorCode.DUPLICATE_TABLE:
    case PostgresErrorCode.DUPLICATE_OBJECT:
      return "AlreadyExists";

    // Connection issues
    case PostgresErrorCode.TOO_MANY_CONNECTIONS:
    case PostgresErrorCode.CONNECTION_EXCEPTION:
    case PostgresErrorCode.CONNECTION_DOES_NOT_EXIST:
    case PostgresErrorCode.CONNECTION_FAILURE:
      return "ConnectionError";

    // Transaction issues
    case PostgresErrorCode.DEADLOCK_DETECTED:
    case PostgresErrorCode.SERIALIZATION_FAILURE:
    case PostgresErrorCode.INVALID_TRANSACTION_STATE:
    case PostgresErrorCode.TRANSACTION_ROLLBACK:
      return "TransactionError";

    // Cancellation
    case PostgresErrorCode.QUERY_CANCELED:
      return "QueryEngineTimeout";

    // Default error kind for other types
    default:
      return "QueryError";
  }
}

/**
 * Formats an error message with additional context
 */
function formatErrorMessage(error: any): string {
  const code = error.code as string;
  const baseMessage = error.message || "Unknown database error";
  const userMessage = errorMessages[code] || baseMessage;

  // Add helpful context to the error message
  let message = userMessage;

  if (error.detail) {
    message += ` ${error.detail}`;
  }

  if (error.hint) {
    message += ` Hint: ${error.hint}`;
  }

  if (error.table) {
    message += ` Table: ${error.table}`;
  }

  if (error.column) {
    message += ` Column: ${error.column}`;
  }

  return message;
}

/**
 * Converts a PostgreSQL error to a Prisma driver adapter error
 */
export function handlePostgresError(error: any): DriverAdapterError {
  // If it's already a DriverAdapterError, just return it
  if (error instanceof DriverAdapterError) {
    return error;
  }

  // For Postgres.js errors
  if (error && typeof error.code === "string") {
    const code = error.code;
    const kind = mapPostgresErrorCodeToPrismaErrorKind(code);
    const message = formatErrorMessage(error);

    return new DriverAdapterError({
      kind: "postgres",
      code,
      message,
      severity: error.severity || "ERROR",
      detail: error.detail,
      column: error.column,
      hint: error.hint,
      meta: {
        target: error.table || error.column,
        pgKind: kind
      }
    });
  }

  // For unknown errors, return a generic error
  return new DriverAdapterError({
    kind: "postgres",
    code: "UNKNOWN",
    message: error.message || "Unknown database error",
    severity: "ERROR"
  });
}

/**
 * Collection of helper functions to test PostgreSQL error codes
 */
export const ErrorHelpers = {
  isUniqueViolation: (error: any): boolean => error?.code === PostgresErrorCode.UNIQUE_VIOLATION,

  isForeignKeyViolation: (error: any): boolean => error?.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION,

  isNotNullViolation: (error: any): boolean => error?.code === PostgresErrorCode.NOT_NULL_VIOLATION,

  isCheckViolation: (error: any): boolean => error?.code === PostgresErrorCode.CHECK_VIOLATION,

  isConnectionError: (error: any): boolean =>
    [
      PostgresErrorCode.CONNECTION_EXCEPTION,
      PostgresErrorCode.CONNECTION_DOES_NOT_EXIST,
      PostgresErrorCode.CONNECTION_FAILURE,
      PostgresErrorCode.CANNOT_CONNECT_NOW
    ].includes(error?.code),

  isTransactionError: (error: any): boolean =>
    [
      PostgresErrorCode.DEADLOCK_DETECTED,
      PostgresErrorCode.SERIALIZATION_FAILURE,
      PostgresErrorCode.INVALID_TRANSACTION_STATE,
      PostgresErrorCode.TRANSACTION_ROLLBACK
    ].includes(error?.code),

  isQueryCanceled: (error: any): boolean => error?.code === PostgresErrorCode.QUERY_CANCELED
};
