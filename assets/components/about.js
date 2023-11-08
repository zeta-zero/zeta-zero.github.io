---
---
    
const About = {
    template: `
    <div id="personal-info">
        <h3>{{site.Author.Name}}</h3>
        <p style="font-size: 12px;color: gray;">{{site.Author.Info}}</p>
        <p>{{site.Author.Intro}}</p>
    </div>
    <hr>
    <!-- 描述 -->
    <div margin="10px" id="personal-data">
        <table >
            <tr>
                <td>经验值: </td>
                <td>{{site.Author.EXP}}</td>
            </tr>
            <tr>
                <td>状态: </td>
                <td> {{site.Author.State}}</td>
            </tr>
            <tr>
                <td>访问量</td>
                <td><span id="busuanzi_value_site_uv"></span></td>
            </tr>
        </table>
    </div>`,
};

export default About;