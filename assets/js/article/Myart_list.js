$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    var q = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        // 定义美化时间格式的过滤器
    template.defaults.imports.dateFormat = function(val) {
        const dt = new Date(val);

        const y = dt.getFullYear();
        const m = dt.getMonth() + 1;
        const d = dt.getDate();

        const hh = dt.getHours();
        const mm = dt.getMinutes();
        const ss = dt.getSeconds();

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }

    initTable()
    initCate()


    // 获取文章列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取文章列表失败');
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 渲染分页
                randerPage(res.total)

            }
        })
    }

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取分类数据失败');
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)

                form.render()

            }
        })
    }

    // 点击筛选
    $('#form-search').submit(function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state

        console.log(q);
        initTable()
    })

    // 渲染分页
    function randerPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 5, 10, 15], // 每页展示多少条
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) initTable()
            }
        })
    }

    // 删除文章
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg('删除文章失败！')
                    layer.msg('删除文章成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index)
        })
    })
})