$(function() {
    initArtCateList()

    var layer = layui.layer
    var form = layui.form

    // 获取分类列表
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function(res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('.layui-table tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null

    // 添加类别
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 绑定提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                // console.log(res);    
                if (res.status !== 0) return layer.msg('新增分类失败')
                layer.msg('新增分类成功')
                initArtCateList()

                // 关闭弹出层
                layer.close(indexAdd)
            }

        })
    })

    var indexEdit = null

    // 绑定编辑事件
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function(res) {
                // console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    // 绑定提交编辑事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('修改分类失败')
                layer.msg('修改分类成功')

                // 关闭弹出层
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 删除分类
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除分类失败')
                    layer.msg('删除分类成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })

})