$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间';
            }
        }
    })

    initUserInfo()

    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败')
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 点击重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 提交更新用户信息
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})