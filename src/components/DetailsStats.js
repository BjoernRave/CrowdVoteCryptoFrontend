import React, { Component } from "react";

export default class DetailStats extends Component {
  render() {
    const data = this.props.data;
    const marketdata = data.market_data;
    return (
      <div className="detailStats">
        <table class="table-fill">
          {/* <thead>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Data</th>
            </tr>
          </thead> */}
          <tbody class="table-hover">
            <tr>
              <td class="text-left">Price</td>
              <td class="text-left">
                ${Intl.NumberFormat().format(marketdata.current_price.usd)}
              </td>
            </tr>
            <tr>
              <td class="text-left"> Market Cap </td>
              <td class="text-left">
                ${Intl.NumberFormat().format(
                  Number(marketdata.market_cap.usd).toFixed(0)
                )}
              </td>
            </tr>
            <tr>
              <td class="text-left"> Market Cap Change(24h) </td>
              <td class="text-left">
                ${Intl.NumberFormat().format(
                  Number(marketdata.market_cap_change_24h).toFixed(0)
                )}
                ({Number(marketdata.market_cap_change_percentage_24h).toFixed(
                  2
                )}%)
              </td>
            </tr>
            <tr>
              <td class="text-left"> Total Volume </td>
              <td class="text-left">
                ${Intl.NumberFormat().format(
                  Number(marketdata.total_volume.usd).toFixed(0)
                )}
              </td>
            </tr>
            <tr>
              <td class="text-left"> Total Volume Change(24h) </td>
              <td class="text-left">
                ${Intl.NumberFormat().format(
                  Number(marketdata.volume_change_24h).toFixed(0)
                )}({Number(marketdata.volume_change_percentage_24h).toFixed(2)}%)
              </td>
            </tr>
            <tr>
              <td class="text-left"> Circulating Supply </td>
              <td class="text-left">
                {Intl.NumberFormat().format(marketdata.circulating_supply)}
              </td>
            </tr>
            <tr>
              <td class="text-left"> CoinGecko Score </td>
              <td class="text-left"> {data.coingecko_score}%</td>
            </tr>
            <tr>
              <td class="text-left"> Facebook Likes </td>
              <td class="text-left">
                {" "}
                {Intl.NumberFormat().format(data.community_data.facebook_likes)}
              </td>
            </tr>
            <tr>
              <td class="text-left">Twitter Follower </td>
              <td class="text-left">
                {Intl.NumberFormat().format(
                  data.community_data.twitter_followers
                )}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                Reddit Data
                <button onClick={this.props.handleDeveloperExpand}>+</button>
              </td>
            </tr>
            {this.props.developerExpand && [
              <tr>
                <td class="text-left"> Average Posts(48h) </td>
                <td class="text-left">
                  {data.community_data.reddit_average_posts_48h}
                </td>
              </tr>,
              <tr>
                <td class="text-left"> Average Comments(48h)</td>
                <td class="text-left">
                  {data.community_data.reddit_average_comments_48h}
                </td>
              </tr>,
              <tr>
                <td class="text-left">Subscriber </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(
                    data.community_data.reddit_subscribers
                  )}
                </td>
              </tr>,
              <tr>
                <td class="text-left">Active Accounts(48h) </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(
                    data.community_data.reddit_accounts_active_48h
                  )}
                </td>
              </tr>
            ]}
            <tr>
              <td>
                Developer Data(Github)
                <button onClick={this.props.handleRedditExpand}>+</button>
              </td>
            </tr>
            {this.props.redditExpand && [
              <tr>
                <td class="text-left">Forks </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(data.developer_data.forks)}{" "}
                </td>
              </tr>,
              <tr>
                <td class="text-left">Stars </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(data.developer_data.stars)}{" "}
                </td>
              </tr>,
              <tr>
                <td class="text-left"> Subscriber</td>
                <td class="text-left">
                  {Intl.NumberFormat().format(data.developer_data.subscribers)}{" "}
                </td>
              </tr>,
              <tr>
                <td class="text-left"> Total Issues</td>
                <td class="text-left">
                  {" "}
                  {Intl.NumberFormat().format(
                    data.developer_data.total_issues
                  )}{" "}
                </td>
              </tr>,
              <tr>
                <td class="text-left">Closed Issues </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(
                    data.developer_data.closed_issues
                  )}{" "}
                </td>
              </tr>,
              <tr>
                <td class="text-left">Pull-Request Contributors </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(
                    data.developer_data.pull_request_contributors
                  )}
                </td>
              </tr>,
              <tr>
                <td class="text-left">Pull-Requests merged </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(
                    data.developer_data.pull_requests_merged
                  )}
                </td>
              </tr>,
              <tr>
                <td class="text-left"> Commits last 4 weeks </td>
                <td class="text-left">
                  {Intl.NumberFormat().format(
                    data.developer_data.commit_count_4_weeks
                  )}
                </td>
              </tr>
            ]}
          </tfoot>
        </table>
      </div>
    );
  }
}
