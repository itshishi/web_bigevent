$(function() {
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    // 点击上传按钮
    $('#btnChooseImg').on('click', function() {
        $('#file').click()
    })

    // 为文件框绑定change事件
    $('#file').change(function(e) {
        var filelist = e.target.files
        if (filelist.length === 0) return layui.layer.msg('请选择照片')

        // 拿到用户选择的文件，转化为路径
        var imgURL = URL.createObjectURL(filelist[0])

        // 重新初始化裁剪区
        $image.cropper('destroy').attr('src', imgURL).cropper(options)
    })

    // 点击确定上传头像
    $('#btnUpload').click(function() {
        // 拿到用户裁剪后的头像
        var dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')


        // 调用接口，上传到服务器
        $.ajax({
            url: '/my/update/avatar',
            method: 'POST',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) return layui.layer.msg('更新头像失败')
                layui.layer.msg('更新头像成功')
                window.parent.getUserInfo()
            }
        })
    })

})