// 每次调用ajax时，都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options) {
    // 统一拼接请求根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限的接口 设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // 如果验证身份信息失败
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 强制清除token
            localStorage.removeItem('token')

            // 强制跳转登录页面
            location.href = '/Mylogin.html'
        }
    }

})