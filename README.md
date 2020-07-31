# hybridcode
hybrid of "Visual base" and "Text base" programming

## Concept
[コンセプト図](https://github.com/satorufukuhara/hybridcode/files/5004988/figure.pdf)

## Minimum Value Product
- 処理を直書きした関数同士を接続したグラフの作成
- そのままコンパイル可能なテキストファイルへの書き出し

## 主な2つのノード
- Operation
```a += b``` などの操作を直接書き込むためのノード．
「内部にノードをつくれないが，直接文字を書き込めるHolder」とも考えられる．

- Holder
ノード（Operationや別のHolder）を内部に配置できるノード．