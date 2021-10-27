$(function() {

    // 点击去注册
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui获取对象
    var form = layui.form
    var layer = layui.layer

    // 表单校验
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能有空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册提交表单事件
    $('#form_reg').submit(function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            console.log(res);
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            $('#link_login').click()
        })
    })

    // 监听登录提交表单事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)

                // 本地储存token
                localStorage.setItem('token', res.token)

                // 跳转到首页
                location.href = '/Myindex.html'
            }
        })

    })










})