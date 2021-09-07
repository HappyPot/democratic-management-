import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/questionnaireinvestigation',
  name: 'questionnaire-investigation',
  meta,
  redirect: { name: 'survey-list' },
  component: layoutHeaderAside,
  children: [
    { path: 'surveylist', name: 'survey-list', component: _import('QuestionnaireInvestigation/SurveyList'), meta: { ...meta, title: '调查列表' } },
  ]
}
