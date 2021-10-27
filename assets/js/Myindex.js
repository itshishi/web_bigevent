$(function() {
    // 调用函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮退出登录
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' },
            function(index) {

                // 1.清除本地token
                localStorage.removeItem('token')

                // 2.跳转登录界面
                location.href = '/Mylogin.html'

                // 关闭confirm询问框
                layer.close(index)
            })
    })
})

// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像函数
function renderAvatar(user) {
    var uname = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        var first = uname[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}