const table = {
    data() {
        return {
            tableParams: {
                list: [],
                selectList: [],
                pageNum: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                total: 0,
                layout: "total, sizes, prev, pager, next, jumper",
                isCheckBoxClick: false // 点击复选框标示
            },
            pk: "id",
            allData: [],
            reset: false
        };
    },
    watch: {},
    mounted() {
        this.initTableServer && this.initTableServer().then(() => {
            if (!this.initTableServer.disabledInit) {
                this.setTableParams()
                this.requestData()
            }
        })
    },
    computed: {
        hasSelect() {
            return !!this.tableParams.selectList.length;
        },
        tableSelectLength() {
            return this.tableParams.selectList.length;
        },
        currentPage: {
            get() {
                return this.tableParams.pageNum;
            }
        },
        selectedIds() {
            return this.tableParams.selectList.map(item => {
                return item[this.pk];
            });
        }
    },
    methods: {
        loadList() {
            this.$message.info("请在页面实例重写loadList");
        },
        onSearch() {
            // 重置
            // this.tableParams.selectList = [];
            this.reset = true
            this.allData = []
            this.tableParams.pageNum = 1;
            this.loadList();
        },
        clearSelection() {
            this.tableParams.selectList = []
            this.loadList()
        },
        afterChange() {
            if (this.tableParams.list.length > 1) {
                this.loadList()
            } else {
                this.onSearch()
            }
        },
        // 表单重置
        onReset() {
            console.log(this.$refs.searchForm);
            if (this.$refs.searchForm) {
                this.$refs.searchForm.resetFields();
                if (this.onRangeChange && typeof this.onRangeChange === "function") {
                    this.rangeTime = [];
                    this.onRangeChange([]);
                }
                this.onSearch();
            }
        },
        initialTableData() {
            const tableParams = this.tableParams;
            let allData = this.allData;
            tableParams.total = allData.length;
            tableParams.list = Object.freeze(allData.slice((tableParams.pageNum - 1) * tableParams.pageSize, tableParams.pageNum * tableParams.pageSize));
        },
        requestData() {
            if (this.tableServer && this.tableServer.loadTableData) {
                this.tableServer.loadTableData(this.paramsHandler()).then(() => {
                    this.initialTableData(this.tableServer.dataList())
                })
            }
        },
        onSelectionChange(selection) {
            this.tableParams.selectList = selection;
            this.tableParams.isCheckBoxClick = true;
        },
        handleCurrentChange(p) {
            this.tableParams.pageNum = p;
            this.initialTableData();
        },
        handleSizeChange(pz) {
            this.$set(this.tableParams, 'pageSize', pz);
            this.initialTableData();
        },
        initSelection(list) {
            let vm = this;
            vm.tableParams.list = Object.freeze(list);
            if (
                vm.tableParams.selectList.length > -1 &&
                vm.$refs["table"] != undefined
            ) {
                setTimeout(() => {
                    let $table = vm.$refs["table"];
                    let section = vm.tableParams.selectList;
                    let map = {};
                    list.forEach(v => {
                        map[v[vm.pk]] = v;
                    });
                    // 支持翻页后选中状态保持
                    for (let i = 0, l = section.length; i < l; i++) {
                        let v = section[i];
                        if (map[v[vm.pk]]) {
                            section.splice(i, 1, map[v[vm.pk]]);
                            $table.toggleRowSelection(map[v[vm.pk]], true);
                        }
                    }
                }, 0);
            } else {
                vm.tableParams.selectList = [];
            }
        },
        assignQuery(query) {
            return {
                pageNum: this.tableParams.pageNum,
                pageSize: this.tableParams.pageSize,
                ...query
            };
        },
        handleSelectionChange(val) {
            // this.tableParams.selectList = val
            let selection = this.tableParams.selectList
            let list = this.tableParams.list
            this.tableParams.isCheckBoxClick = true
            list.forEach(v => {
                let index = selection.indexOf(v)
                if (val.indexOf(v) === -1) {
                    if (index > -1) {
                        selection.splice(index, 1)
                    }
                } else {
                    if (index === -1) {
                        selection.push(v)
                    }
                }
            })
        },
        setSelection(list) {
            let vm = this;
            vm.tableParams.list = list
            if (vm.tableParams.selectList.length > -1 && vm.$refs['table'] != undefined) {
                setTimeout(() => {
                    let $table = vm.$refs['table']
                    let section = vm.tableParams.selectList
                    let map = {}
                    list.forEach(v => {
                        map[v.id] = v
                    })
                    // 支持翻页后选中状态保持
                    for (let i = 0, l = section.length; i < l; i++) {
                        let v = section[i]
                        if (map[v.id]) {
                            section.splice(i, 1, map[v.id])
                            $table.toggleRowSelection(map[v.id], true)
                        }
                    }
                }, 0)
            } else {
                vm.tableParams.selectList = []
            }
        },
    }
};

export default table;