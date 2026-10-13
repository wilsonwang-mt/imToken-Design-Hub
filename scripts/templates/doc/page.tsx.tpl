import ProjectDoc, { docMetadata } from '@/components/project/ProjectDoc'
import { project } from '@/content/projects/__SLUG__/project'

export const metadata = docMetadata(project, '__KEY__')

// 标题区、面包屑、材料切换和页脚由 <ProjectDoc> 统一渲染；这里只写正文。
// 「__TYPE_LABEL__」至少要有的内容见 docs/project-template.md。
export default function Page() {
  return (
    <ProjectDoc project={project} docKey="__KEY__">
      <section className="wrap block" aria-labelledby="__KEY__-1">
        <div className="block-head">
          <p className="eyebrow">SECTION</p>
          <h2 id="__KEY__-1">【待填写】第一部分</h2>
        </div>
        <div className="glass pj-box">
          <p>【待填写】正文</p>
        </div>
      </section>
    </ProjectDoc>
  )
}
