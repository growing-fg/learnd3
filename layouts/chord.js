(function () {
    // 弦图
    var city_name = [ "北京" , "上海" , "广州" , "深圳" , "香港"  ];

    var population = [
      [ 1000,  3045　 , 4567　, 1234 , 3714 ],
      [ 3214,  2000　 , 2060　, 124  , 3234 ],
      [ 8761,  6545　 , 3000　, 8045 , 647  ],
      [ 3211,  1067  , 3214 , 4000  , 1006 ],
      [ 2146,  1034　 , 6745 , 4764  , 5000 ]
    ];

    // 布局
    var chord = d3.layout.chord()
            .padding(0.01) // 节点间隔
            .sortSubgroups(d3.descending)
            .matrix(population);

    var color = d3.scale.category10();

    var groups = chord.groups();
    var chords = chord.chords();

    var innerRadius = cw / 2 * 0.6;
    var outerRadius = innerRadius * 1.1;
    var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

    var canvas = makeCanvas('弦图')
            .attr('transform', 'translate(' + cw/2 + ',' + ch/2 + ')');

    var nodes = canvas.selectAll('g.node')
        .data(groups)
        .enter()
      .append('g')
        .attr('class', 'node');

    // 节点
    nodes.append('path')
        .attr('fill', function (d) {return color(d.index); })
        .attr('d', arc);

    // 文字
    nodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('font-size', 14)
        .attr('transform', function (d) {
            // arc在创建弧度时会默认有一个负90度的偏转以实现从顶部开始
            var angle = (d.startAngle + d.endAngle) / 2,
                degree = angle * 180 / Math.PI,
                dr = outerRadius + 20;

//                        return ['translate(', arc.centroid(d),  ')'].join('');
            return ['rotate(', degree, ')',
                    'translate(', 0, ',', -dr, ')',
                    degree - 90 > 0 && degree - 90 < 180 ? 'rotate(180)' : ''
                   ].join('');
        })
        .text(function (d, i) { return city_name[i];});

    // 连线
    var chord_edge = d3.svg.chord().radius(innerRadius);

    canvas.selectAll('path.chord')
        .data(chords)
        .enter()
        .append('path')
        .attr('class', 'chord')
        .attr('d', chord_edge)
        .attr('fill', function(d) { return color(d.source.index);})
        .attr('opacity', 0.7)
        .on('mouseover', function (d, i) {
            d3.select(this)
                .attr('fill', 'yellow');
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr('fill', color(d.source.index));
    })
})()
