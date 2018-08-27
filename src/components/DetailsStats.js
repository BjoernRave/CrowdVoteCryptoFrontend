import React, { Component } from "react";

export default class DetailStats extends Component {
  render() {
    const data = this.props.data;
    const marketdata = data.market_data;

    return (
      <div className="detailStats">
        <table className="table-fill">
          {/* <thead>
            <tr>
              <th className="text-left">Type</th>
              <th className="text-left">Data</th>
            </tr>
          </thead> */}
          <tbody className="table-hover">
            <tr>
              <td className="text-left">Price in {this.props.currency}</td>
              <td className="text-left">
                {new Intl.NumberFormat("de-DE", {
                  maximumSignificantDigits: 7
                }).format(
                  marketdata.current_price[this.props.currency.toLowerCase()]
                )}
              </td>
            </tr>
            <tr>
              <td className="text-left">
                {" "}
                Market Cap in {this.props.currency}{" "}
              </td>
              <td className="text-left">
                {Intl.NumberFormat().format(
                  Number(
                    marketdata.market_cap[this.props.currency.toLowerCase()]
                  ).toFixed(0)
                )}
              </td>
            </tr>
            <tr>
              <td className="text-left">
                {" "}
                Market Cap Change(24h) in {this.props.currency}{" "}
              </td>
              <td className="text-left">
                {Intl.NumberFormat().format(
                  Number(marketdata.market_cap_change_24h).toFixed(0)
                )}
                (
                {Number(marketdata.market_cap_change_percentage_24h).toFixed(2)}
                %)
              </td>
            </tr>
            <tr>
              <td className="text-left">
                {" "}
                Total Volume in {this.props.currency}
              </td>
              <td className="text-left">
                {Intl.NumberFormat().format(
                  Number(
                    marketdata.total_volume[this.props.currency.toLowerCase()]
                  ).toFixed(0)
                )}
              </td>
            </tr>
            {/* <tr>
              <td className="text-left"> Total Volume Change(24h) </td>
              <td className="text-left">
                ${Intl.NumberFormat().format(
                  Number(marketdata.volume_change_24h).toFixed(0)
                )}({Number(marketdata.volume_change_percentage_24h).toFixed(2)}%)
              </td>
            </tr> */}
            <tr>
              <td className="text-left">
                {" "}
                Circulating Supply in {this.props.data.symbol}{" "}
              </td>
              <td className="text-left">
                {Intl.NumberFormat().format(marketdata.circulating_supply)}
              </td>
            </tr>
            <tr>
              <td className="text-left"> Facebook Likes </td>
              <td className="text-left">
                {" "}
                {Intl.NumberFormat().format(data.community_data.facebook_likes)}
              </td>
            </tr>
            <tr>
              <td className="text-left">Twitter Follower </td>
              <td className="text-left">
                {Intl.NumberFormat().format(
                  data.community_data.twitter_followers
                )}
              </td>
            </tr>
          </tbody>
          {/* <tfoot>
            <tr>
              <td onClick={this.props.handleDeveloperExpand}>
                Reddit Data
                <span>{!this.props.developerExpand ? "+" : "-"}</span>
              </td>
            </tr>
            {this.props.developerExpand && (
              <div className="developerExpand">
                <tr>
                  <td className="text-left"> Average Posts(48h) </td>
                  <td className="text-left">
                    {data.community_data.reddit_average_posts_48h}
                  </td>
                </tr>
                <tr>
                  <td className="text-left"> Average Comments(48h)</td>
                  <td className="text-left">
                    {data.community_data.reddit_average_comments_48h}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Subscriber </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.community_data.reddit_subscribers
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Active Accounts(48h) </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.community_data.reddit_accounts_active_48h
                    )}
                  </td>
                </tr>
              </div>
            )}
            <tr>
              <td onClick={this.props.handleRedditExpand}>
                Developer Data(Github)
                <span>{!this.props.redditExpand ? "+" : "-"}</span>
              </td>
            </tr>
            {this.props.redditExpand && (
              <div className="redditExpand">
                <tr>
                  <td className="text-left">Forks </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(data.developer_data.forks)}{" "}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Stars </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(data.developer_data.stars)}{" "}
                  </td>
                </tr>
                <tr>
                  <td className="text-left"> Subscriber</td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.developer_data.subscribers
                    )}{" "}
                  </td>
                </tr>
                <tr>
                  <td className="text-left"> Total Issues</td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.developer_data.total_issues
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Closed Issues </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.developer_data.closed_issues
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Pull-Request Contributors </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.developer_data.pull_request_contributors
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left">Pull-Requests merged </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.developer_data.pull_requests_merged
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="text-left"> Commits last 4 weeks </td>
                  <td className="text-left">
                    {Intl.NumberFormat().format(
                      data.developer_data.commit_count_4_weeks
                    )}
                  </td>
                </tr>
              </div>
            )}
          </tfoot> */}
        </table>
      </div>
    );
  }
}
