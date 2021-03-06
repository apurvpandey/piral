import * as ts from 'typescript';

/**
 * Expose the internal TypeScript APIs that are used by TypeDoc
 */
declare module 'typescript' {
  interface Symbol {
    id?: number;
    parent?: ts.Symbol;
    target?: any;
    declaredType?: ts.Type;
  }

  interface Type {
    id?: number;
    typeName?: ts.Identifier;
    intrinsicName?: string;
    parent?: ts.Type;
    typeParameters?: Array<ts.TypeParameter>;
    typeParameter?: ts.TypeParameter;
  }

  interface Node {
    symbol?: ts.Symbol;
    localSymbol?: ts.Symbol;
  }

  interface Declaration {
    questionToken?: ts.Token<ts.SyntaxKind.QuestionToken>;
    dotDotDotToken?: ts.Token<ts.SyntaxKind.DotDotDotToken>;
    default?: ts.Node;
    type?: ts.Node;
  }

  interface Expression {
    text?: string;
  }

  interface SourceFile {
    resolvedModules: ts.Map<ts.ResolvedModule>;
  }
}

export interface DeclVisitorContext {
  modules: Record<string, TypeRefs>;
  checker: ts.TypeChecker;
  refs: TypeRefs;
  ids: Array<number>;
  usedImports: Array<string>;
  availableImports: Array<string>;
}

export type TypeRefs = Record<string, TypeModel>;

export interface WithTypeArgs {
  readonly types: Array<TypeModel>;
}

export interface WithTypeComments {
  readonly comment?: string;
}

export type TypeModel =
  | TypeModelString
  | TypeMemberModel
  | TypeModelDefault
  | TypeModelProp
  | TypeModelBoolean
  | TypeModelNumber
  | TypeModelVariable
  | TypeModelObject
  | TypeModelUnidentified
  | TypeModelAny
  | TypeModelUnknown
  | TypeModelEnum
  | TypeModelBigInt
  | TypeModelStringLiteral
  | TypeModelNumberLiteral
  | TypeModelBooleanLiteral
  | TypeModelEnumLiteral
  | TypeModelBigIntLiteral
  | TypeModelESSymbol
  | TypeModelUniqueESSymbol
  | TypeModelVoid
  | TypeModelUndefined
  | TypeModelNull
  | TypeModelNever
  | TypeModelTypeParameter
  | TypeModelFunctionParameter
  | TypeModelUnion
  | TypeModelIntersection
  | TypeModelDefault
  | TypeModelIndex
  | TypeModelIndexedAccess
  | TypeModelConditional
  | TypeModelSubstitution
  | TypeModelNonPrimitive
  | TypeModelTuple
  | TypeModelFunction
  | TypeModelRef
  | TypeModelKeyOf
  | TypeModelAlias
  | TypeModelMapped
  | TypeModelInfer;

export interface TypeModelDefault extends WithTypeComments {
  readonly kind: 'default';
  readonly value: TypeModel;
}

export interface TypeModelProp extends WithTypeComments {
  readonly name: string;
  readonly optional: boolean;
  readonly kind: 'prop';
  readonly valueType: TypeModel;
  readonly id: number;
}

export interface TypeModelDefault extends WithTypeComments {
  readonly kind: 'default';
  readonly value: TypeModel;
}

export interface TypeModelVariable extends WithTypeComments {
  readonly kind: 'const';
  readonly value: TypeModel;
}

export interface TypeModelRef extends WithTypeArgs {
  readonly kind: 'ref';
  readonly refName: string;
  readonly external?: ts.Type;
}

export interface TypeModelKeyOf {
  readonly kind: 'keyof';
  readonly value: TypeModel;
}

export interface TypeModelAny {
  readonly kind: 'any';
}

export interface TypeModelUnknown {
  readonly kind: 'unknown';
}

export interface TypeModelString {
  readonly kind: 'string';
}

export interface TypeModelNumber {
  readonly kind: 'number';
}

export interface TypeModelBoolean {
  readonly kind: 'boolean';
}

export interface TypeModelFunction extends WithTypeArgs {
  readonly kind: 'function';
  readonly comment?: string;
  readonly parameters: Array<TypeModelFunctionParameter>;
  readonly returnType: TypeModel;
}

export interface TypeModelFunctionParameter {
  readonly kind: 'parameter';
  readonly param: string;
  readonly value: TypeModel;
  readonly optional: boolean;
  readonly spread: boolean;
}

export interface TypeModelEnum extends WithTypeComments {
  readonly kind: 'enum';
  readonly comment?: string;
  readonly values: Array<TypeMemberModel>;
}

export interface TypeModelBigInt {
  readonly kind: 'bigint';
}

export interface TypeModelStringLiteral {
  readonly kind: 'stringLiteral';
  readonly value: string;
}

export interface TypeModelNumberLiteral {
  readonly kind: 'numberLiteral';
  readonly value: number;
}

export interface TypeModelBooleanLiteral {
  readonly kind: 'booleanLiteral';
  readonly value: boolean;
}

export interface TypeModelEnumLiteral extends WithTypeComments {
  readonly kind: 'enumLiteral';
  readonly const: boolean;
  readonly values: Array<TypeMemberModel>;
}

export interface TypeMemberModel extends WithTypeComments {
  readonly kind: 'member';
  readonly name: string;
  readonly value: TypeModel;
}

export interface TypeModelBigIntLiteral {
  readonly kind: 'bigintLiteral';
  readonly value: ts.PseudoBigInt;
}

export interface TypeModelESSymbol {
  readonly kind: 'esSymbol';
}

export interface TypeModelUniqueESSymbol {
  readonly kind: 'uniqueEsSymbol';
}

export interface TypeModelVoid {
  readonly kind: 'void';
}

export interface TypeModelUndefined {
  readonly kind: 'undefined';
}

export interface TypeModelNull {
  readonly kind: 'null';
}

export interface TypeModelNever {
  readonly kind: 'never';
}

export interface TypeModelInfer {
  readonly kind: 'infer';
  readonly parameter: TypeModel;
}

export interface TypeModelTypeParameter {
  readonly kind: 'typeParameter';
  readonly parameter: TypeModel;
  readonly constraint?: TypeModel;
  readonly default?: TypeModel;
}

export interface TypeModelUnion extends WithTypeArgs {
  readonly kind: 'union';
}

export interface TypeModelIntersection extends WithTypeArgs {
  readonly kind: 'intersection';
}

export type TypeModelIndexKey = TypeModelUnion | TypeModelString | TypeModelNumber;

export interface TypeModelIndex {
  readonly kind: 'index';
  readonly keyName: string;
  readonly keyType: TypeModelIndexKey;
  readonly valueType: TypeModel;
  readonly optional: boolean;
}

export interface TypeModelIndexedAccess {
  readonly kind: 'indexedAccess';
  readonly index: TypeModel;
  readonly object: TypeModel;
}

export interface TypeModelConditional {
  readonly kind: 'conditional';
  readonly condition: TypeModel;
  readonly primary: TypeModel;
  readonly alternate: TypeModel;
}

export interface TypeModelSubstitution {
  readonly kind: 'substitution';
  readonly variable: TypeModel;
}

export interface TypeModelNonPrimitive {
  readonly kind: 'nonPrimitive';
  readonly name?: string;
}

export interface TypeModelUnidentified {
  readonly kind: 'unidentified';
}

export interface TypeModelMapped {
  readonly kind: 'mapped';
  readonly name: string;
  readonly constraint: TypeModel;
  readonly optional: boolean;
  readonly value: TypeModel;
}

export interface TypeModelObject extends WithTypeArgs, WithTypeComments {
  readonly kind: 'object';
  readonly props: Array<TypeModelProp>;
  readonly calls: Array<TypeModelFunction>;
  readonly indices: Array<TypeModelIndex>;
  readonly extends: Array<TypeModelRef>;
  readonly mapped?: TypeModelMapped;
}

export interface TypeModelTuple extends WithTypeArgs {
  readonly kind: 'tuple';
}

export interface TypeModelAlias extends WithTypeArgs, WithTypeComments {
  readonly kind: 'alias';
  readonly child: TypeModel;
}

export type TypeModelKinds = TypeModel['kind'];
