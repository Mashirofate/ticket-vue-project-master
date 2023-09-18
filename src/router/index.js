import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/exhibition/:id',
        name: '展示',
        hidden: true,
        component: () =>
            import ('@/views/exhibition/index'),
        meta: { title: '展示', icon: 'dashboard' }
    },
    {
        path: '/exhibitionAaa/:id',
        name: '旧展示',
        hidden: true,
        component: () =>
            import ('@/views/exhibitionAaa/index'),
        meta: { title: '旧展示', icon: 'dashboard' }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '展示页面',
        meta: { title: '展示页面', icon: 'example', roles: ['admin'] },
        children: [{
                path: 'dashboard',
                name: '展会',
                component: () =>
                    import ('@/views/dashboard/index'),
                meta: { title: '展会', icon: 'dashboard' }
            },
            {
                path: 'ticketing',
                name: '演唱会',
                component: () =>
                    import ('@/views/dashboardVocal/index'),
                meta: { title: '演唱会', icon: 'peoples' }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        name: '数据管理',
        meta: { title: '数据管理', icon: 'peoples', roles: ['admin'] },
        children: [{
            path: 'index',
            name: '用户管理',
            component: () =>
                import ('@/views/user/index'),
            meta: { title: '用户管理', icon: 'user' }
        }]
    },
    {
        path: '/data',
        component: Layout,
        redirect: '/data/vm',
        name: '数据管理',
        meta: { title: '数据管理', icon: 'chart', roles: ['admin'] },
        children: [{
                path: 'ticketing',
                name: '票务人员管理',
                component: () =>
                    import ('@/views/ticketingStaff/index'),
                meta: { title: '票务人员管理', icon: 'peoples' }
            },
            {
                path: 'addticketingBatch',
                hidden: true,
                name: '批量导入票务人员管理',
                component: () =>
                    import ('@/views/ticketingStaff/addBatch/index'),
                meta: { title: '批量导入票务人员管理', icon: 'dashboard' }
            },
            {
                path: 'activity',
                name: '活动管理',
                component: () =>
                    import ('@/views/activity/index'),
                meta: { title: '活动管理', icon: 'component' }
            },
            {
                path: 'vm',
                name: '场馆管理',
                component: () =>
                    import ('@/views/venueManagement/index'),
                meta: { title: '场馆管理', icon: 'example' }
            },
            {
                path: 'em',
                name: '场馆入口管理',
                component: () =>
                    import ('@/views/entranceManagement/index'),
                meta: { title: '场馆入口管理', icon: 'tree-table' }
            },
            {
                path: 'es',
                name: '入场日志',
                component: () =>
                    import ('@/views/enters/index'),
                meta: { title: '入场日志', icon: 'documentation' }
            },
            {
                path: 'de',
                name: '设备管理',
                component: () =>
                    import ('@/views/device/index'),
                meta: { title: '设备管理', icon: 'tab' }
            },
            {
                path: 'ea',
                name: '区域座位信息',
                component: () =>
                    import ('@/views/exhibitionActivities/index'),
                meta: { title: '区域座位信息', icon: 'component' }
            },
            {
                path: 'cc',
                name: '清楚卡',
                component: () =>
                    import ('@/views/clearcard/index'),
                meta: { title: '清楚卡', icon: 'component' }
            },
            {
                path: 'ai',
                name: '区域通道',
                component: () =>
                    import ('@/views/aisle/index'),
                meta: { title: '区域通道', icon: 'component' }
            },
            {
                path: 'addBatch',
                hidden: true,
                name: '批量添加人员',
                component: () =>
                    import ('@/views/user/addBatch/index'),
                meta: { title: '批量添加人员', icon: 'dashboard' }
            }
        ]
    },
    {
        path: '/face',
        component: Layout,
        redirect: '/face/fr',
        name: '人脸管理',
        meta: { title: '人脸管理', icon: 'example' },
        children: [{
                path: 'fr',
                name: '人脸查询',
                component: () =>
                    import ('@/views/facerefer/index'),
                meta: { title: '人脸查询', icon: 'eye-open' }
            }

        ]
    },
    {
        path: '/reportform',
        component: Layout,
        redirect: '/reportform/tf',
        name: '报表',
        meta: { title: '报表', icon: 'example', roles: ['admin'] },
        children: [{
                path: 'tf',
                name: '活动入口报表',
                component: () =>
                    import ('@/views/ticketforms/index'),
                meta: { title: '活动入口报表', icon: 'skill' }
            },
            {
                path: '/rate/:id',
                name: '活动入口打印',
                // hidden: true 表示不显示在菜单栏
                hidden: true,
                component: () =>
                    import ('@/views/ticketforms/rate/index'),
                meta: { title: '活动入口打印', icon: 'dashboard' }
            },
            {
                path: 'et',
                name: '活动出口报表',
                component: () =>
                    import ('@/views/exhibitionExport/index'),
                meta: { title: '活动出口报表', icon: 'skill' }
            },
            {
                path: '/export/:id',
                name: '活动出口报表打印',
                // hidden: true 表示不显示在菜单栏
                hidden: true,
                component: () =>
                    import ('@/views/exhibitionExport/exports/index'),
                meta: { title: '活动出口报表打印', icon: 'dashboard' }
            },
            {
                path: 'svg',
                name: '座位图',
                component: () =>
                    import ('@/views/seat/index'),
                meta: { title: '座位图', icon: 'skill' }
            },
            {
                path: 'vi',
                name: '视频监控',
                component: () =>
                    import ('@/views/video/index'),
                meta: { title: '视频监控', icon: 'skill' }
            }
        ]
    },

    {
        path: '/example',
        component: Layout,
        hidden: true,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'example' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        hidden: true,
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        hidden: true,
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [{
                path: 'menu1',
                component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [{
                        path: 'menu1-1',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [{
                                path: 'menu1-2-1',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () =>
                    import ('@/views/nested/menu2/index'),
                meta: { title: 'menu2' }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        hidden: true,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true },
    {
        path: '/buyticket/bt',
        component: Layout,
        name: '活动名称',
        component: () =>
            import ('@/views/OneBuyticket/index'),
        alwaysShow: false,
        breadcrumb: false,
        hidden: true,
        meta: { title: '活动名称', icon: 'example', requiresAuth: false },

    },
    {
        path: '/buyticket/crs',
        component: Layout,
        name: '绑定票务',
        component: () =>
            import ('@/views/OneBuyticket/createClues'),
        alwaysShow: false,
        breadcrumb: false,
        hidden: true,
        meta: { title: '绑定票务', icon: 'example', requiresAuth: false },

    },

]

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router