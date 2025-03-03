import { type ColumnType, ColumnTypeEnum } from "@prisma/driver-adapter-utils";
import { parse as parseArray } from "postgres-array";

/**
 * PostgreSQL column types based on the OIDs.
 *
 * See the semantics of each of this code in:
 *   https://github.com/postgres/postgres/blob/master/src/include/catalog/pg_type.dat
 */
export const ScalarColumnType = {
  BOOL: 16,
  BYTEA: 17,
  CHAR: 18,
  NAME: 19,
  INT8: 20,
  INT2: 21,
  INT4: 23,
  REGPROC: 24,
  TEXT: 25,
  OID: 26,
  TID: 27,
  XID: 28,
  CID: 29,
  JSON: 114,
  XML: 142,
  POINT: 600,
  LSEG: 601,
  PATH: 602,
  BOX: 603,
  POLYGON: 604,
  LINE: 628,
  CIDR: 650,
  FLOAT4: 700,
  FLOAT8: 701,
  ABSTIME: 702,
  RELTIME: 703,
  TINTERVAL: 704,
  CIRCLE: 718,
  MACADDR8: 774,
  MONEY: 790,
  MACADDR: 829,
  INET: 869,
  ACLITEM: 1033,
  BPCHAR: 1042,
  VARCHAR: 1043,
  DATE: 1082,
  TIME: 1083,
  TIMESTAMP: 1114,
  TIMESTAMPTZ: 1184,
  INTERVAL: 1186,
  TIMETZ: 1266,
  BIT: 1560,
  VARBIT: 1562,
  NUMERIC: 1700,
  REFCURSOR: 1790,
  REGPROCEDURE: 2202,
  REGOPER: 2203,
  REGOPERATOR: 2204,
  REGCLASS: 2205,
  REGTYPE: 2206,
  UUID: 2950,
  TXID_SNAPSHOT: 2970,
  PG_LSN: 3220,
  PG_NDISTINCT: 3361,
  PG_DEPENDENCIES: 3402,
  TSVECTOR: 3614,
  TSQUERY: 3615,
  GTSVECTOR: 3642,
  REGCONFIG: 3734,
  REGDICTIONARY: 3769,
  JSONB: 3802,
  REGNAMESPACE: 4089,

  REGROLE: 4096
};

/**
 * PostgreSQL array column types.
 *
 * See the semantics of each of this code in:
 *   https://github.com/postgres/postgres/blob/master/src/include/catalog/pg_type.dat
 */
export const ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1000,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIME_ARRAY: 1183,
  TIMETZ_ARRAY: 1185,
  TIMESTAMPZ_ARRAY: 1270,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};

export class UnsupportedNativeDataType extends Error {
  // map of type codes to type names
  static typeNames: { [key: number]: string } = {
    16: "bool",
    17: "bytea",
    18: "char",
    19: "name",
    20: "int8",
    21: "int2",
    22: "int2vector",
    23: "int4",
    24: "regproc",
    25: "text",
    26: "oid",
    27: "tid",
    28: "xid",
    29: "cid",
    30: "oidvector",
    32: "pg_ddl_command",
    71: "pg_type",
    75: "pg_attribute",
    81: "pg_proc",
    83: "pg_class",
    114: "json",
    142: "xml",
    194: "pg_node_tree",
    269: "table_am_handler",
    325: "index_am_handler",
    600: "point",
    601: "lseg",
    602: "path",
    603: "box",
    604: "polygon",
    628: "line",
    650: "cidr",
    700: "float4",
    701: "float8",
    702: "abstime",
    703: "reltime",
    704: "tinterval",
    705: "unknown",
    718: "circle",
    774: "macaddr8",
    790: "money",
    829: "macaddr",
    869: "inet",
    1000: "_bool",
    1001: "_bytea",
    1002: "_char",
    1003: "_name",
    1005: "_int2",
    1007: "_int4",
    1009: "_text",
    1014: "_bpchar",
    1015: "_varchar",
    1016: "_int8",
    1021: "_float4",
    1022: "_float8",
    1028: "_oid",
    1033: "aclitem",
    1041: "_inet",
    1042: "bpchar",
    1043: "varchar",
    1082: "date",
    1083: "time",
    1114: "timestamp",
    1115: "_timestamp",
    1182: "_date",
    1183: "_time",
    1184: "timestamptz",
    1186: "interval",
    1231: "_numeric",
    1266: "timetz",
    1560: "bit",
    1561: "_bit",
    1562: "varbit",
    1563: "_varbit",
    1700: "numeric",
    1790: "refcursor",
    2202: "regprocedure",
    2203: "regoper",
    2204: "regoperator",
    2205: "regclass",
    2206: "regtype",
    2249: "record",
    2275: "cstring",
    2276: "any",
    2277: "anyarray",
    2278: "void",
    2279: "trigger",
    2280: "language_handler",
    2281: "internal",
    2283: "anyelement",
    2287: "_record",
    2776: "anynonarray",
    2950: "uuid",
    2951: "_uuid",
    2970: "txid_snapshot",
    3115: "fdw_handler",
    3220: "pg_lsn",
    3310: "tsm_handler",
    3361: "pg_ndistinct",
    3402: "pg_dependencies",
    3500: "anyenum",
    3614: "tsvector",
    3615: "tsquery",
    3642: "gtsvector",
    3734: "regconfig",
    3769: "regdictionary",
    3802: "jsonb",
    3807: "_jsonb",
    3831: "anyrange",
    3838: "event_trigger",
    3904: "int4range",
    3906: "numrange",
    3908: "tsrange",
    3910: "tstzrange",
    3912: "daterange",
    3926: "int8range",
    4072: "jsonpath",
    4089: "regnamespace",
    4096: "regrole",
    4191: "regcollation",
    4451: "int4multirange",
    4532: "nummultirange",
    4533: "tsmultirange",
    4534: "tstzmultirange",
    4535: "datemultirange",
    4536: "int8multirange",
    4537: "anymultirange",
    4538: "anycompatiblemultirange",
    4600: "pg_brin_bloom_summary",
    4601: "pg_brin_minmax_multi_summary",
    5017: "pg_mcv_list",
    5038: "pg_snapshot",
    5069: "xid8",
    5077: "anycompatible",
    5078: "anycompatiblearray",
    5079: "anycompatiblenonarray",
    5080: "anycompatiblerange"
  };

  type: string;

  constructor(code: number) {
    const typeName = UnsupportedNativeDataType.typeNames[code] || `unknown(${code})`;
    const message = `Unsupported column type: ${typeName}`;
    super(message);
    this.type = typeName;
    this.name = "UnsupportedNativeDataType";
  }
}

/**
 * Map PostgreSQL type OIDs to Prisma ColumnTypes
 */
export function fieldToColumnType(fieldTypeId: number): ColumnType {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
    case ArrayColumnType.TIMETZ_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMPZ_ARRAY:
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      // Postgres custom types (types that come from extensions and user's enums).
      // We don't use `ColumnTypeEnum.Enum` for enums here and defer the decision to
      // the serializer in QE because it has access to the query schema, while on
      // this level we would have to query the catalog to introspect the type.
      if (fieldTypeId >= 10_000) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}

export function fixArrayBufferValues(values: unknown[]) {
  for (let i = 0; i < values.length; i++) {
    const list = values[i];
    if (!Array.isArray(list)) {
      continue;
    }

    for (let j = 0; j < list.length; j++) {
      const listItem = list[j];
      if (ArrayBuffer.isView(listItem)) {
        list[j] = Buffer.from(listItem.buffer, listItem.byteOffset, listItem.byteLength);
      }
    }
  }

  return values;
}
/**
 * Parse a PostgreSQL array string into a JavaScript array
 */
export function parsePostgresArray(value: string): unknown[] {
  return parseArray(value);
}

/**
 * Normalizes timestamp values to ISO format
 */
export function normalizeTimestamp(value: string): string {
  return value;
}

/**
 * Normalizes date values to ISO format
 */
export function normalizeDate(value: string): string {
  return value;
}

/**
 * Normalizes time values to standard format
 */
export function normalizeTime(value: string): string {
  return value.split("+")[0].replace("T", " ");
}

function normalize_timestampz(time: string): string {
  // Parse the input time string
  return time.split("+")[0].replace("T", " ");
}

/**
 * TODO:
 * 1. Check if using base64 would be more efficient than this encoding.
 * 2. Consider the possibility of eliminating re-encoding altogether
 *    and passing bytea hex format to the engine if that can be aligned
 *    with other adapters of the same database provider.
 */
function encodeBuffer(buffer: Buffer) {
  return Array.from(new Uint8Array(buffer));
}

/*
 * BYTEA - arbitrary raw binary strings
 */

const parsePgBytes = (x: string) => Buffer.from(x.slice(2), "hex");

/**
 * Convert bytes to a JSON-encodable representation since we can't
 * currently send a parsed Buffer or ArrayBuffer across JS to Rust
 * boundary.
 */
function convertBytes(serializedBytes: string): number[] {
  const buffer = parsePgBytes(serializedBytes);
  return encodeBuffer(buffer);
}

/******************/
/* Money handling */
/******************/

function normalize_money(money: string): string {
  return money.slice(1);
}

/**
 * Custom parsers for specific PostgreSQL types that need special handling
 */
export const customParsers: { [key: number]: (value: string) => unknown } = {
  // // UUID - just pass through
  // [ScalarColumnType.UUID]: (value: string) => value,

  // // JSON and JSONB - parse to JavaScript objects
  [ScalarColumnType.JSON]: (value: string) => JSON.parse(value),
  [ScalarColumnType.JSONB]: (value: string) => JSON.parse(value),

  // // Arrays - use postgres-array parser
  // [ArrayColumnType.TEXT_ARRAY]: parsePostgresArray,
  // [ArrayColumnType.INT4_ARRAY]: parsePostgresArray,
  // [ArrayColumnType.INT8_ARRAY]: parsePostgresArray,
  // [ArrayColumnType.FLOAT8_ARRAY]: parsePostgresArray,
  [ArrayColumnType.BOOL_ARRAY]: parsePostgresArray,
  // [ArrayColumnType.UUID_ARRAY]: parsePostgresArray,
  // [ArrayColumnType.DATE_ARRAY]: parsePostgresArray,
  // [ArrayColumnType.JSONB_ARRAY]: parsePostgresArray,

  // Date/time - normalize to standard formats
  [ScalarColumnType.TIMESTAMP]: normalizeTimestamp,
  [ScalarColumnType.DATE]: normalizeDate,
  [ScalarColumnType.TIME]: normalizeTime,
  [ScalarColumnType.TIMETZ]: normalizeTime,
  // [1270]: normalizeTime,
  [ScalarColumnType.BYTEA]: convertBytes,
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestampz,
  [ScalarColumnType.MONEY]: normalize_money
  // [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
};
