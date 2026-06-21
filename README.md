# update-nodejs

GitHub Actions のワークフロー内で Node.js のバージョンを更新する Action。

## Usage

```yaml
- uses: tanmen/update-nodejs@master
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    mode: lts   # lts | all | major | minor（既定: lts）
```

## Inputs

| name | required | default | 説明 |
|---|---|---|---|
| `github-token` | ✓ | | GitHub トークン |
| `mode` | | `lts` | 更新モード（下記） |

### mode

- `lts` — LTS 版のみ更新（メジャー更新を含む）
- `all` — 全バージョン更新
- `major` — minor / patch を更新
- `minor` — patch を更新
