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
- Node.js
ランタイム．

- Typescript
- SCSS (BEM記法)

## 適用先言語
最初はRust.

# To Do
## 仕様レベルToDo
- 一時保存の方法

## 実装Todo
- 要素を削除するUI
- 関数の出力

# 実行
```tsc```でscripts中の.tsをbuild.
```npm start```でelectronを起動.

# Class仕様
## Operation Node
- OperationNode
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