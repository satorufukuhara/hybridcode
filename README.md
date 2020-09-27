# hybridcode
hybrid of "Visual base" and "Text base" programming

## Concept
![figure](https://user-images.githubusercontent.com/34291742/89000385-418ff380-d332-11ea-8290-fe342bd1a351.png)

## Minimum Value Product
- 処理を直書きした関数同士を接続したグラフの作成
- そのままコンパイル可能なテキストファイルへの書き出し

## 主な2つのノード
- Operation
```a += b``` などの操作を直接書き込むためのノード．
「内部にノードをつくれないが，直接文字を書き込めるHolder」とも考えられる．

- Holder
ノード（Operationや別のHolder）を内部に配置できるノード．

## 思想
Operationの中では「副作用」が起こらないようにする．
（mutableとして変数をinputした場合，必ずその変数をoutputする．）

## 使用予定フレームワーク・言語等
- Electron
- Typescript
- SCSS (BEM記法)

## 適用先言語
最初はRust.

# To Do
## ノード
- 多階層ノード

## その他機能
- 一時保存の方法
    - オブジェクトの構造に座標を加えてJSONとして保存したい．
- 元に戻すなどへの対応
- Node本体の削除
- OutputPinに推論された型を表示

## UI
- BigPotのCSS(どこまで共通化するか)
- マウスドラッグが時々イレギュラーな挙動（マウスイベントのエラー処理）
- マウスドラッグが時々イレギュラーな挙動
    - 文字が選択されたりする．
- 関数記述エリアの拡大に合わせてノードを調整


# 環境構築
## Setup
```
 $ git clone git@github.com:satorufukuhara/hybridcode.git
 $ cd hybridcode
 $ npm install
```
## Build
```
 $ npm run ts
```

## Launch Electron
```
 $ npm start
```

# Class仕様
通常のコードにおける「一つの関数」それぞれに対してオブジェクトを生成する．
このオブジェクトの名前は「Node」や「Function」などが考えられるが，Node.js上で動かすうえでどこかで障害が出うるため，「Pot(鉢植え)」とする．
Potの中にもPotを置くことができる．このようなPotをBigPotとする．内部に置かれたPotは自身が置かれたPotを「Garden」として参照する．
Main関数も1つのBigPotであるが，これは内部にあるPotからアクセスすることもあるため特別に「Planet」という名前をつける．気持ちとしてはPlanetに属する変数をglobal変数として使える．

## 名前
## Operation Node
- Planet
    - OperationNode(SmallPot)
        - InputArea
            - InputTitle
            - InputImmutablePinArea
                - AddInputBtn
                - InputPin(input-area__inputpin)
                    - InputPinBtn
                    - InputPinInfo (input-area__inputpin-info)//Name and Type
        - TextArea (node-operation__text)
        - OutputArea
            - OutputTitle
            - OutputImmutablePinAreaPin
                - AddOutputBtn
                - OutputPin
                    - OutputPinBtn
                    - OutputPinInfo //Name Text

# Script
## General
- index.ts moduleのexport用．
- global.ts　最初に実行し，main関数に相当する編集エリアを生成．
- main_class.ts main関数に相当するclassを生成する．global変数にしたいものは，このなかのPlanetの変数として保存している．
- generatecode.ts コード生成用．

## Pot関連
- main_class.ts Pot全体の定義
- potelement_class.ts Potで使う要素などのclass定義
- SmallPot(中にPotを含まないPot)
    - operationnode_class.ts
        - inputarea_class.ts
        - textarea_class.ts
        - outputarea_class.ts
        - deletepinbtn_class.ts

## マウス操作関連
- connectpins.ts ノード同士を接続する．
- drawedge.ts エッジの描画を担う関数群．
- dragnode.ts ノードのドラッグ．

# sample output
以下のようなコードを出力することを目指す．

```rust
//--function definition
fn five() -> i32 {5}
fn two() -> i32 {2}
fn add_and_minus(a:i32, b:i32) -> i32{(a+b,a-b)}
//-- execute main function
fn main(){
    let a = five();
    let b = two();
    let (c,d) = add(a,b);
}
```