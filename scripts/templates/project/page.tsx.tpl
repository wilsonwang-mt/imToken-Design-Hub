import ProjectOverview, { projectMetadata } from '@/components/project/ProjectOverview'
import { project } from '@/content/projects/__SLUG__/project'

export const metadata = projectMetadata(project)

// 概览页的固定区块由 <ProjectOverview> 按 project.ts 渲染，一般不用改这个文件。
// 需要项目特有的区块时，写成 children（会出现在「当前状态」之后），样式用 .__PREFIX__-*，见 docs/style-guide.md。
export default function Page() {
  return <ProjectOverview project={project} />
}
