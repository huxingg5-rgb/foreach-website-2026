# 隔膜泵图片、2D、3D 映射审计

- 审计时间：2026/7/25 11:31:00
- 产品选择数据：`data/products/selection/diaphragm-pump-selection.generated.ts`
- 产品详情数据：`data/products/generated/pumps/diaphragm-pumps/detail/index.json`
- 共识别产品：8
- 存在问题：8
- 暂未发现问题：0

## 判断规则

- DB / DS：有刷
- BB / BS：无刷
- DPGL800：无刷
- 卡片图、详情图、2D、3D 必须属于同一系列和同一有刷/无刷版本

## 错配汇总

| 型号 | 系列 | 应有版本 | 详情 Slug | 卡片图片 | 问题 |
|---|---|---|---|---|---|
| diaphragm-dpl30-brushed | DPL30 | 有刷 | dpl30-24db-ep-ps-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp | 详情图片 dpl30-brushed-liquid-diaphragm-pump-main.webp：文件不存在；详情图片 dpl30-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；详情图片 public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；2D 图纸 dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；2D 图纸 dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；3D 模型 dpl30-brushed-liquid-diaphragm-pump.glb：文件不存在；3D 模型 dpl30-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；卡片图与详情图片版本不一致：卡片为 有刷，详情包含 有刷、无刷 |
| diaphragm-dpl30-brushless | DPL30 | 无刷 | dpl30-24bb-ep-ps-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp | 详情图片 dpl30-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；详情图片 public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；详情图片 dpl30-brushless-liquid-diaphragm-pump-main.webp：文件不存在；2D 图纸 dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；2D 图纸 dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；3D 模型 dpl30-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；3D 模型 dpl30-brushless-liquid-diaphragm-pump.glb：文件不存在；卡片图与详情图片版本不一致：卡片为 无刷，详情包含 有刷、无刷 |
| diaphragm-dpl60-brushed | DPL60 | 有刷 | dpl60-24db-ep-ps-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp | 详情图片 dpl60-brushed-liquid-diaphragm-pump-main.webp：文件不存在；详情图片 dpl60-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；详情图片 public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；2D 图纸 dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；2D 图纸 dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；3D 模型 dpl60-brushed-liquid-diaphragm-pump.glb：文件不存在；3D 模型 dpl60-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；3D 模型 public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；卡片图与详情图片版本不一致：卡片为 有刷，详情包含 有刷、无刷 |
| diaphragm-dpl60-brushless | DPL60 | 无刷 | dpl60-24bb-ep-ps-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp | 详情图片 dpl60-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；详情图片 public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；详情图片 dpl60-brushless-liquid-diaphragm-pump-main.webp：文件不存在；2D 图纸 dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；2D 图纸 dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；3D 模型 dpl60-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；3D 模型 public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；3D 模型 dpl60-brushless-liquid-diaphragm-pump.glb：文件不存在；卡片图与详情图片版本不一致：卡片为 无刷，详情包含 有刷、无刷 |
| diaphragm-dpl30h-brushed | DPL30H | 有刷 | dpl30h-24ds-ep-ps-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp | 详情图片 dpl30h-brushed-liquid-diaphragm-pump-main.webp：文件不存在；详情图片 dpl30h-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；详情图片 public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；2D 图纸 dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；2D 图纸 dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；3D 模型 dpl30h-brushed-liquid-diaphragm-pump.glb：文件不存在；3D 模型 dpl30h-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在；3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；卡片图与详情图片版本不一致：卡片为 有刷，详情包含 有刷、无刷 |
| diaphragm-dpl30h-brushless | DPL30H | 无刷 | dpl30h-24bs-ep-ps-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp | 详情图片 dpl30h-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；详情图片 public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；详情图片 dpl30h-brushless-liquid-diaphragm-pump-main.webp：文件不存在；2D 图纸 dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；2D 图纸 dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；3D 模型 dpl30h-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在；3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；3D 模型 dpl30h-brushless-liquid-diaphragm-pump.glb：文件不存在；卡片图与详情图片版本不一致：卡片为 无刷，详情包含 有刷、无刷 |
| diaphragm-dpgl800-ep | DPGL800 | 无刷 | dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp | 详情图片 dpgl800-gas-liquid-diaphragm-pump-main.webp：文件不存在；2D 图纸 dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；3D 模型 dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump.glb：文件不存在 |
| diaphragm-dpgl800-ff | DPGL800 | 无刷 | dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump | /images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp | 详情图片 dpgl800-gas-liquid-diaphragm-pump-main.webp：文件不存在；2D 图纸 dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在；3D 模型 dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump.glb：文件不存在 |

## 每个型号的完整资源

### diaphragm-dpl30-brushed

- Slug：`dpl30-24db-ep-ps-liquid-diaphragm-pump`
- 系列：DPL30
- 应有版本：有刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpl30-brushed-liquid-diaphragm-pump-main.webp`｜DPL30｜有刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp`｜DPL30｜有刷｜文件存在
- `dpl30-brushless-liquid-diaphragm-pump-main.webp`｜DPL30｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp`｜DPL30｜无刷｜文件存在

#### 2D 图纸

- `dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜有刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜有刷｜文件存在
- `dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜无刷｜文件存在

#### 3D 模型

- `dpl30-brushed-liquid-diaphragm-pump.glb`｜DPL30｜有刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushed-liquid-diaphragm-pump.glb`｜DPL30｜有刷｜文件存在
- `dpl30-brushless-liquid-diaphragm-pump.glb`｜DPL30｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushless-liquid-diaphragm-pump.glb`｜DPL30｜无刷｜文件存在

#### 当前问题

- 详情图片 dpl30-brushed-liquid-diaphragm-pump-main.webp：文件不存在
- 详情图片 dpl30-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 详情图片 public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷
- 2D 图纸 dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 2D 图纸 dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷
- 3D 模型 dpl30-brushed-liquid-diaphragm-pump.glb：文件不存在
- 3D 模型 dpl30-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷
- 卡片图与详情图片版本不一致：卡片为 有刷，详情包含 有刷、无刷

### diaphragm-dpl30-brushless

- Slug：`dpl30-24bb-ep-ps-liquid-diaphragm-pump`
- 系列：DPL30
- 应有版本：无刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpl30-brushed-liquid-diaphragm-pump-main.webp`｜DPL30｜有刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp`｜DPL30｜有刷｜文件存在
- `dpl30-brushless-liquid-diaphragm-pump-main.webp`｜DPL30｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp`｜DPL30｜无刷｜文件存在

#### 2D 图纸

- `dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜有刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜有刷｜文件存在
- `dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30｜无刷｜文件存在

#### 3D 模型

- `dpl30-brushed-liquid-diaphragm-pump.glb`｜DPL30｜有刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushed-liquid-diaphragm-pump.glb`｜DPL30｜有刷｜文件存在
- `dpl30-brushless-liquid-diaphragm-pump.glb`｜DPL30｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushless-liquid-diaphragm-pump.glb`｜DPL30｜无刷｜文件存在

#### 当前问题

- 详情图片 dpl30-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 详情图片 public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷
- 详情图片 dpl30-brushless-liquid-diaphragm-pump-main.webp：文件不存在
- 2D 图纸 dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷
- 2D 图纸 dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 3D 模型 dpl30-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷
- 3D 模型 dpl30-brushless-liquid-diaphragm-pump.glb：文件不存在
- 卡片图与详情图片版本不一致：卡片为 无刷，详情包含 有刷、无刷

### diaphragm-dpl60-brushed

- Slug：`dpl60-24db-ep-ps-liquid-diaphragm-pump`
- 系列：DPL60
- 应有版本：有刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpl60-brushed-liquid-diaphragm-pump-main.webp`｜DPL60｜有刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp`｜DPL60｜有刷｜文件存在
- `dpl60-brushless-liquid-diaphragm-pump-main.webp`｜DPL60｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp`｜DPL60｜无刷｜文件存在

#### 2D 图纸

- `dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜有刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜有刷｜文件存在
- `dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜无刷｜文件存在

#### 3D 模型

- `dpl60-brushed-liquid-diaphragm-pump.glb`｜DPL60｜有刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushed-liquid-diaphragm-pump.glb`｜DPL60｜有刷｜文件存在
- `dpl60-brushless-liquid-diaphragm-pump.glb`｜DPL60｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushless-liquid-diaphragm-pump.glb`｜DPL60｜无刷｜文件存在

#### 当前问题

- 详情图片 dpl60-brushed-liquid-diaphragm-pump-main.webp：文件不存在
- 详情图片 dpl60-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 详情图片 public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷
- 2D 图纸 dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 2D 图纸 dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷
- 3D 模型 dpl60-brushed-liquid-diaphragm-pump.glb：文件不存在
- 3D 模型 dpl60-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 3D 模型 public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷
- 卡片图与详情图片版本不一致：卡片为 有刷，详情包含 有刷、无刷

### diaphragm-dpl60-brushless

- Slug：`dpl60-24bb-ep-ps-liquid-diaphragm-pump`
- 系列：DPL60
- 应有版本：无刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpl60-brushed-liquid-diaphragm-pump-main.webp`｜DPL60｜有刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp`｜DPL60｜有刷｜文件存在
- `dpl60-brushless-liquid-diaphragm-pump-main.webp`｜DPL60｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp`｜DPL60｜无刷｜文件存在

#### 2D 图纸

- `dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜有刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜有刷｜文件存在
- `dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL60｜无刷｜文件存在

#### 3D 模型

- `dpl60-brushed-liquid-diaphragm-pump.glb`｜DPL60｜有刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushed-liquid-diaphragm-pump.glb`｜DPL60｜有刷｜文件存在
- `dpl60-brushless-liquid-diaphragm-pump.glb`｜DPL60｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushless-liquid-diaphragm-pump.glb`｜DPL60｜无刷｜文件存在

#### 当前问题

- 详情图片 dpl60-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 详情图片 public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷
- 详情图片 dpl60-brushless-liquid-diaphragm-pump-main.webp：文件不存在
- 2D 图纸 dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷
- 2D 图纸 dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 3D 模型 dpl60-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 3D 模型 public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷
- 3D 模型 dpl60-brushless-liquid-diaphragm-pump.glb：文件不存在
- 卡片图与详情图片版本不一致：卡片为 无刷，详情包含 有刷、无刷

### diaphragm-dpl30h-brushed

- Slug：`dpl30h-24ds-ep-ps-liquid-diaphragm-pump`
- 系列：DPL30H
- 应有版本：有刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpl30h-brushed-liquid-diaphragm-pump-main.webp`｜DPL30H｜有刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp`｜DPL30H｜有刷｜文件存在
- `dpl30h-brushless-liquid-diaphragm-pump-main.webp`｜DPL30H｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp`｜DPL30H｜无刷｜文件存在

#### 2D 图纸

- `dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜有刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜有刷｜文件存在
- `dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜无刷｜文件存在

#### 3D 模型

- `dpl30h-brushed-liquid-diaphragm-pump.glb`｜DPL30H｜有刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushed-liquid-diaphragm-pump.glb`｜DPL30H｜有刷｜文件存在
- `dpl30h-brushless-liquid-diaphragm-pump.glb`｜DPL30H｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushless-liquid-diaphragm-pump.glb`｜DPL30H｜无刷｜文件存在

#### 当前问题

- 详情图片 dpl30h-brushed-liquid-diaphragm-pump-main.webp：文件不存在
- 详情图片 dpl30h-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 详情图片 public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 有刷，实际为 无刷
- 2D 图纸 dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 2D 图纸 dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 有刷，实际为 无刷
- 3D 模型 dpl30h-brushed-liquid-diaphragm-pump.glb：文件不存在
- 3D 模型 dpl30h-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷；文件不存在
- 3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushless-liquid-diaphragm-pump.glb：有刷无刷错配：应为 有刷，实际为 无刷
- 卡片图与详情图片版本不一致：卡片为 有刷，详情包含 有刷、无刷

### diaphragm-dpl30h-brushless

- Slug：`dpl30h-24bs-ep-ps-liquid-diaphragm-pump`
- 系列：DPL30H
- 应有版本：无刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpl30h-brushed-liquid-diaphragm-pump-main.webp`｜DPL30H｜有刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp`｜DPL30H｜有刷｜文件存在
- `dpl30h-brushless-liquid-diaphragm-pump-main.webp`｜DPL30H｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp`｜DPL30H｜无刷｜文件存在

#### 2D 图纸

- `dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜有刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜有刷｜文件存在
- `dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf`｜DPL30H｜无刷｜文件存在

#### 3D 模型

- `dpl30h-brushed-liquid-diaphragm-pump.glb`｜DPL30H｜有刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushed-liquid-diaphragm-pump.glb`｜DPL30H｜有刷｜文件存在
- `dpl30h-brushless-liquid-diaphragm-pump.glb`｜DPL30H｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushless-liquid-diaphragm-pump.glb`｜DPL30H｜无刷｜文件存在

#### 当前问题

- 详情图片 dpl30h-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 详情图片 public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp：有刷无刷错配：应为 无刷，实际为 有刷
- 详情图片 dpl30h-brushless-liquid-diaphragm-pump-main.webp：文件不存在
- 2D 图纸 dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 2D 图纸 public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf：有刷无刷错配：应为 无刷，实际为 有刷
- 2D 图纸 dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 3D 模型 dpl30h-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷；文件不存在
- 3D 模型 public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushed-liquid-diaphragm-pump.glb：有刷无刷错配：应为 无刷，实际为 有刷
- 3D 模型 dpl30h-brushless-liquid-diaphragm-pump.glb：文件不存在
- 卡片图与详情图片版本不一致：卡片为 无刷，详情包含 有刷、无刷

### diaphragm-dpgl800-ep

- Slug：`dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump`
- 系列：DPGL800
- 应有版本：无刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpgl800-gas-liquid-diaphragm-pump-main.webp`｜DPGL800｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp`｜DPGL800｜无刷｜文件存在

#### 2D 图纸

- `dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf`｜DPGL800｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf`｜DPGL800｜无刷｜文件存在

#### 3D 模型

- `dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump.glb`｜DPGL800｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpgl800/dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump.glb`｜DPGL800｜无刷｜文件存在

#### 当前问题

- 详情图片 dpgl800-gas-liquid-diaphragm-pump-main.webp：文件不存在
- 2D 图纸 dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 3D 模型 dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump.glb：文件不存在

### diaphragm-dpgl800-ff

- Slug：`dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump`
- 系列：DPGL800
- 应有版本：无刷
- 卡片图片：`/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp`

#### 详情图片

- `dpgl800-gas-liquid-diaphragm-pump-main.webp`｜DPGL800｜无刷｜文件不存在
- `public/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp`｜DPGL800｜无刷｜文件存在

#### 2D 图纸

- `dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf`｜DPGL800｜无刷｜文件不存在
- `public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf`｜DPGL800｜无刷｜文件存在

#### 3D 模型

- `dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump.glb`｜DPGL800｜无刷｜文件不存在
- `public/models/products/pumps/diaphragm-pumps/dpgl800/dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump.glb`｜DPGL800｜无刷｜文件存在

#### 当前问题

- 详情图片 dpgl800-gas-liquid-diaphragm-pump-main.webp：文件不存在
- 2D 图纸 dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump-2d-drawing.pdf：文件不存在
- 3D 模型 dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump.glb：文件不存在

## 可能的权威源及生成脚本

- `.local-backups/next-dev-cache-corrupt-20260724-001/dev/server/chunks/ssr/0r19_products_generated_pumps_diaphragm-pumps_detail_index_json_[json]_cjs_040~q6s._.js`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page.js`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page.js.nft.json`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page/app-paths-manifest.json`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page/build-manifest.json`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page/next-font-manifest.json`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page/react-loadable-manifest.json`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page/server-reference-manifest.json`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/app/products/pumps/diaphragm-pumps/[slug]/page_client-reference-manifest.js`
- `.local-backups/next-dev-cache-corrupt-20260724-001/server/chunks/ssr/0zjb_server_app_products_pumps_diaphragm-pumps_[slug]_page_actions_0do.g13.js`
- `.local-backups/next-dev-cache-global-buttons-20260724-001/dev/server/chunks/ssr/0r19_products_generated_pumps_diaphragm-pumps_detail_index_json_[json]_cjs_040~q6s._.js`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpgl800-gas-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpl30-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpl30h-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/dpl60-liquid-diaphragm-pump.json`
- `data/products/generated/pumps/diaphragm-pumps/detail/index.json`
- `data/products/generated/pumps/diaphragm-pumps/media/media.json`
- `data/products/generated/pumps/diaphragm-pumps/routes/routes.json`
- `data/products/generated/pumps/diaphragm-pumps/selection/cards.json`
- `data/products/generated/pumps/diaphragm-pumps/summary/summary.json`
- `data/products/selection/diaphragm-pump-selection.generated.ts`
- `scripts/products/generate-diaphragm-pump-data.js`